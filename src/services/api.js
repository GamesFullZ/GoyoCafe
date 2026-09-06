/**
 * GOYO REAL COFFEE — CLIENTE DE SEGURIDAD Y API
 * Sanitización de entrada (Sanity Input), validación y comunicación con Gateway seguro.
 */

/**
 * Sanitización local en cliente para prevenir inyecciones antes de enviar al servidor
 */
export function sanitizeClientString(str, maxLength = 200) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, maxLength);
}

/**
 * Enviar pedido al endpoint seguro con validación, cifrado AES-256 y firma HMAC
 */
export async function createSecureOrder(orderItems) {
  // 1. Sanitizar ítems en cliente
  const sanitizedItems = orderItems.map(item => ({
    id: item.id,
    name: sanitizeClientString(item.name, 60),
    quantity: Math.max(1, Math.min(20, parseInt(item.quantity, 10) || 1)),
    temperature: item.temperature ? sanitizeClientString(item.temperature, 30) : null,
    milk: item.milk ? sanitizeClientString(item.milk, 40) : null,
    syrup: item.syrup ? sanitizeClientString(item.syrup, 40) : null,
    sweetener: item.sweetener ? sanitizeClientString(item.sweetener, 40) : null,
    notes: sanitizeClientString(item.notes || '', 200),
    priceNumeric: item.priceNumeric || null
  }));

  try {
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ items: sanitizedItems })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        whatsappUrl: data.whatsappUrl,
        orderToken: data.orderToken,
        hmacSignature: data.hmacSignature,
        encryptedTicket: data.encryptedTicket,
        isServerValidated: true
      };
    }

    if (response.status === 429) {
      const errData = await response.json();
      return {
        success: false,
        error: errData.error || 'Límite de solicitudes alcanzado. Espera unos minutos antes de volver a pedir.',
        isRateLimited: true
      };
    }
  } catch (err) {
    // Si el backend no está disponible en este momento, fallback local seguro
    console.warn('[Security] Gateway no disponible, usando generador local seguro sanitizado:', err.message);
  }

  // Fallback local seguro (sanitizado)
  const phone = '526623557949';
  let text = `Hola Goyo Real Coffee ☕\nQuisiera hacer el siguiente pedido para pasar a recoger en barra (Nayarit y Yáñez):\n\n`;

  let totalEstimated = 0;
  sanitizedItems.forEach((item) => {
    text += `*${item.quantity}x ${item.name}*\n`;
    if (item.temperature) text += `  • Formato: ${item.temperature}\n`;
    if (item.milk) text += `  • Leche: ${item.milk}\n`;
    if (item.syrup && item.syrup !== 'Sin jarabe') text += `  • Jarabe: ${item.syrup}\n`;
    if (item.sweetener && item.sweetener !== 'Sin azúcar') text += `  • Endulzante: ${item.sweetener}\n`;
    if (item.notes) text += `  • Notas: ${item.notes}\n`;
    if (item.priceNumeric) totalEstimated += item.priceNumeric * item.quantity;
    text += `\n`;
  });

  const totalCount = sanitizedItems.reduce((acc, i) => acc + i.quantity, 0);
  text += `Total de bebidas: ${totalCount}\n`;
  if (totalEstimated > 0) text += `Estimado: ~$${totalEstimated} MXN\n`;
  text += `¿Me confirman tiempo estimado de preparación? ¡Muchas gracias!`;

  return {
    success: true,
    whatsappUrl: `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    orderToken: `LOCAL-${Date.now()}`,
    isServerValidated: false
  };
}
