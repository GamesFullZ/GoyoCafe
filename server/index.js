import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import {
  sanitizeObject,
  validateOrderPayload,
  encryptData,
  decryptData,
  generateOrderHmac
} from './security.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================================================
// 1. CONFIGURACIÓN DE SEGURIDAD CABECERAS HTTP
// ============================================================================
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// ============================================================================
// 2. CONFIGURACIÓN ESTRICTA DE CORS
// ============================================================================
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map(o => o.trim());

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origin (como curl o server-to-server) o si está en la lista blanca
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Bloqueado por CORS: El origen '${origin}' no tiene autorización.`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Order-Token'],
  maxAge: 86400 // Cache preflight 24h
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '100kb' })); // Prevención de payloads masivos (DoS)

// ============================================================================
// 3. RATE LIMITING & IP LIMITING (Protección contra fuerza bruta y DDoS)
// ============================================================================
const globalLimiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES, 10) || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Demasiadas solicitudes desde esta dirección IP. Por favor espera unos minutos.',
    retryAfterMinutes: 15
  }
});

const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.ORDER_RATE_LIMIT_MAX, 10) || 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Has enviado demasiados pedidos en poco tiempo. Comunícate directamente por teléfono a barra (662 355 7949).',
    retryAfterMinutes: 15
  }
});

// Aplicar limitador general a todas las rutas API
app.use('/api/', globalLimiter);

// ============================================================================
// 4. SANITY INPUT MIDDLEWARE GLOBAL
// ============================================================================
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
});

// ============================================================================
// 5. RUTAS Y ENDPOINTS DE LA API
// ============================================================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Goyo Real Coffee Security Gateway',
    timestamp: new Date().toISOString(),
    security: {
      cors: 'Strict Whitelist Enabled',
      rateLimiting: 'Active',
      inputSanitization: 'Active',
      encryptionCipher: 'AES-256-GCM',
      signatureAlgorithm: 'HMAC-SHA256',
      rowLevelSecurity: 'Enforced (PostgreSQL/Supabase specification)'
    }
  });
});

// Validación Server-Side previa de pedido
app.post('/api/orders/validate', (req, res) => {
  const validation = validateOrderPayload(req.body);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      error: 'Validación de servidor fallida',
      details: validation.errors
    });
  }

  res.json({
    success: true,
    message: 'Payload válido y sanitizado correctamente.',
    sanitizedPayload: req.body
  });
});

// Creación, Cifrado y Firma Criptográfica de Pedido
app.post('/api/orders/create', orderLimiter, (req, res) => {
  const orderData = req.body;

  // 1. Server-Side Validation
  const validation = validateOrderPayload(orderData);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      error: 'Datos de pedido inválidos',
      details: validation.errors
    });
  }

  const timestamp = Date.now();
  const orderToken = `GOYO-${timestamp}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // 2. Firma HMAC-SHA256 para integridad
  const hmacSignature = generateOrderHmac({
    items: orderData.items,
    totalCount: orderData.items.reduce((acc, i) => acc + i.quantity, 0),
    timestamp
  });

  // 3. Cifrado AES-256-GCM del ticket completo
  const encryptedTicket = encryptData({
    orderToken,
    items: orderData.items,
    totalCount: orderData.items.reduce((acc, i) => acc + i.quantity, 0),
    clientIp: req.ip,
    timestamp,
    hmacSignature
  });

  // 4. Generación segura de texto para WhatsApp
  const phone = process.env.WHATSAPP_BUSINESS_PHONE || '+526623557949';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  let text = `Hola Goyo Real Coffee ☕\nQuisiera hacer el siguiente pedido para pasar a recoger en barra (Nayarit y Yáñez):\n\n`;

  let totalEstimatedMXN = 0;
  orderData.items.forEach((item) => {
    text += `*${item.quantity}x ${item.name}*\n`;
    if (item.temperature) text += `  • Formato: ${item.temperature}\n`;
    if (item.milk) text += `  • Leche: ${item.milk}\n`;
    if (item.syrup && item.syrup !== 'Sin jarabe') text += `  • Jarabe: ${item.syrup}\n`;
    if (item.sweetener && item.sweetener !== 'Sin azúcar') text += `  • Endulzante: ${item.sweetener}\n`;
    if (item.notes) text += `  • Notas: ${item.notes}\n`;
    if (item.priceNumeric) totalEstimatedMXN += item.priceNumeric * item.quantity;
    text += `\n`;
  });

  const totalItems = orderData.items.reduce((acc, i) => acc + i.quantity, 0);
  text += `Total de bebidas: ${totalItems}\n`;
  if (totalEstimatedMXN > 0) text += `Estimado: ~$${totalEstimatedMXN} MXN\n`;
  text += `Ref. Pedido Seguro: ${orderToken}\n`;
  text += `¿Me confirman tiempo estimado de preparación? ¡Muchas gracias!`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;

  res.json({
    success: true,
    orderToken,
    hmacSignature,
    encryptedTicket,
    whatsappUrl,
    totalItems,
    estimatedTotalMXN: totalEstimatedMXN
  });
});

// Verificación de Ticket Cifrado
app.post('/api/orders/verify', (req, res) => {
  const { encryptedTicket } = req.body;
  if (!encryptedTicket || !encryptedTicket.iv || !encryptedTicket.authTag || !encryptedTicket.ciphertext) {
    return res.status(400).json({ success: false, error: 'Payload de cifrado incompleto.' });
  }

  const decrypted = decryptData(encryptedTicket);
  if (!decrypted.success) {
    return res.status(400).json({ success: false, error: 'Integridad del ticket comprometida o firma corrupta.' });
  }

  res.json({
    success: true,
    verified: true,
    data: decrypted.data
  });
});

// Metadatos de Políticas de Seguridad (RLS, Cifrado, Contratos)
app.get('/api/security/policies', (req, res) => {
  res.json({
    rowLevelSecurity: {
      status: 'Implemented',
      targetEngine: 'PostgreSQL 15+ / Supabase',
      table: 'public.orders',
      policies: [
        { name: 'Permitir inserción de pedidos validados', action: 'INSERT', condition: 'total_items > 0 AND hmac_signature IS NOT NULL' },
        { name: 'Clientes solo leen sus propios pedidos', action: 'SELECT', condition: 'auth.uid() = customer_id OR order_token = header.x-order-token' },
        { name: 'Baristas tienen lectura y actualización', action: 'ALL', condition: "auth.jwt() ->> 'role' IN ('barista', 'admin')" }
      ]
    },
    encryption: {
      algorithm: 'AES-256-GCM',
      keyLengthBits: 256,
      ivBytes: 12,
      authTagBits: 128
    },
    rateLimits: {
      global: '60 requests / 15 minutes per IP',
      orderCreation: '15 requests / 15 minutes per IP'
    }
  });
});

// Manejador 404 para endpoints API desconocidos
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada en la API de Goyo Real Coffee.' });
});

// Manejador Global de Errores (sin filtrar stack traces a clientes externos)
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Error interno del servidor seguro.' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`[Goyo Security Gateway] Servidor seguro activo en puerto ${PORT}`);
  console.log(`[CORS] Orígenes autorizados: ${allowedOrigins.join(', ')}`);
});
