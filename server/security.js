import crypto from 'crypto';

/**
 * 1. SANITY INPUT (Sanitización profunda contra XSS e inyección de datos)
 * Limpia y neutraliza caracteres peligrosos, etiquetas HTML, scripts y bytes nulos.
 */
export function sanitizeString(str, maxLength = 250) {
  if (typeof str !== 'string') return '';

  return str
    // Eliminar bytes nulos y caracteres de control ASCII
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Escapar etiquetas HTML esenciales contra XSS
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Prevenir inyección de javascript: o data:
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    // Recortar espacios y truncar longitud máxima para evitar ataques de desbordamiento
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitización recursiva de objetos para evitar prototype pollution
 */
export function sanitizeObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return typeof obj === 'string' ? sanitizeString(obj) : obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    // Protección estricta contra Prototype Pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    const safeKey = sanitizeString(key, 50);
    cleaned[safeKey] = sanitizeObject(value);
  }
  return cleaned;
}

/**
 * 2. CIFRADO AUTENTICADO DE ALTO NIVEL (AES-256-GCM)
 * Encripta datos sensibles con Vector de Inicialización (IV) y Authentication Tag.
 */
const DEFAULT_KEY = 'e83bf60413fa5c7329d7d4f9b2d98c11e2f3a4b5c6d7e8f90123456789abcdef';

function getEncryptionKey(hexKey) {
  const rawKey = hexKey || process.env.DATA_ENCRYPTION_KEY || DEFAULT_KEY;
  return Buffer.from(rawKey.slice(0, 64), 'hex');
}

export function encryptData(data, secretHexKey) {
  try {
    const key = getEncryptionKey(secretHexKey);
    const iv = crypto.randomBytes(12); // 96 bits recomendado para GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const plaintext = typeof data === 'string' ? data : JSON.stringify(data);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return {
      success: true,
      iv: iv.toString('hex'),
      authTag,
      ciphertext: encrypted,
      algorithm: 'AES-256-GCM'
    };
  } catch (error) {
    return { success: false, error: 'Error al cifrar datos' };
  }
}

export function decryptData(encryptedPayload, secretHexKey) {
  try {
    const { iv, authTag, ciphertext } = encryptedPayload;
    const key = getEncryptionKey(secretHexKey);

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    try {
      return { success: true, data: JSON.parse(decrypted) };
    } catch {
      return { success: true, data: decrypted };
    }
  } catch (error) {
    return { success: false, error: 'Integridad comprometida o clave inválida' };
  }
}

/**
 * 3. FIRMA HMAC-SHA256 PARA INTEGRIDAD DE TICKETS DE PEDIDO
 * Garantiza que un pedido no fue manipulado entre cliente y servidor.
 */
export function generateOrderHmac(order, secretKey) {
  const key = secretKey || process.env.API_SECRET_KEY || 'goyo_default_secret_key_2026';
  const canonical = JSON.stringify({
    items: order.items?.map(i => ({ id: i.id, q: i.quantity, t: i.temperature, m: i.milk })),
    totalCount: order.totalCount,
    timestamp: order.timestamp
  });

  return crypto.createHmac('sha256', key).update(canonical).digest('hex');
}

/**
 * 4. SERVER-SIDE VALIDATION (Validación estricta de payloads)
 */
const VALID_TEMPS = ['Iced / Frío (16 oz)', 'Caliente (12 oz)', null];
const VALID_MILKS = [
  'Entera de origen',
  'Deslactosada',
  'Leche de Avena (+ vegetal)',
  'Leche de Almendra',
  null
];
const VALID_SYRUPS = [
  'Sin jarabe',
  'Vainilla natural casera',
  'Canela artesanal en rama',
  'Jarabe de temporada',
  null
];
const VALID_SWEETENERS = [
  'Sin azúcar',
  'Estándar (azúcar mascabado)',
  'Monk fruit natural',
  'Miel de abeja de Sonora',
  null
];

export function validateOrderPayload(body) {
  const errors = [];

  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: ['El cuerpo de la solicitud debe ser un objeto válido.'] };
  }

  const items = body.items;
  if (!Array.isArray(items) || items.length === 0) {
    errors.push('El pedido debe contener al menos 1 producto.');
  } else if (items.length > 25) {
    errors.push('El pedido supera el límite máximo permitido de 25 productos por orden.');
  }

  if (Array.isArray(items)) {
    items.forEach((item, idx) => {
      if (!item.id || typeof item.id !== 'number') {
        errors.push(`Ítem #${idx + 1}: Identificador de producto inválido.`);
      }
      if (!item.name || typeof item.name !== 'string') {
        errors.push(`Ítem #${idx + 1}: Nombre de producto requerido.`);
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
        errors.push(`Ítem #${idx + 1}: La cantidad debe ser un número entero entre 1 y 20.`);
      }
      if (item.temperature && !VALID_TEMPS.includes(item.temperature)) {
        errors.push(`Ítem #${idx + 1}: Temperatura/formato no permitido.`);
      }
      if (item.milk && !VALID_MILKS.includes(item.milk)) {
        errors.push(`Ítem #${idx + 1}: Tipo de leche no permitido.`);
      }
      if (item.syrup && !VALID_SYRUPS.includes(item.syrup)) {
        errors.push(`Ítem #${idx + 1}: Jarabe no permitido.`);
      }
      if (item.sweetener && !VALID_SWEETENERS.includes(item.sweetener)) {
        errors.push(`Ítem #${idx + 1}: Endulzante no permitido.`);
      }
      if (item.notes && (typeof item.notes !== 'string' || item.notes.length > 200)) {
        errors.push(`Ítem #${idx + 1}: Las indicaciones no pueden exceder 200 caracteres.`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
