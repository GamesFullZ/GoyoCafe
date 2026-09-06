import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orderItems, setOrderItems] = useState(() => {
    try {
      const saved = localStorage.getItem('goyo_order_items');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('goyo_order_items', JSON.stringify(orderItems));
    } catch (e) {
      console.error(e);
    }
  }, [orderItems]);

  const addItemToOrder = (item) => {
    setOrderItems((prev) => {
      // Si existe un ítem idéntico con las mismas opciones, incrementa cantidad
      const existingIdx = prev.findIndex(
        (i) =>
          i.id === item.id &&
          i.temperature === item.temperature &&
          i.milk === item.milk &&
          i.syrup === item.syrup &&
          i.sweetener === item.sweetener &&
          i.notes === item.notes
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      } else {
        return [...prev, { ...item, orderUid: Date.now() + Math.random() }];
      }
    });

    setIsDrawerOpen(true);
  };

  const removeItem = (orderUid) => {
    setOrderItems((prev) => prev.filter((i) => i.orderUid !== orderUid));
  };

  const updateQuantity = (orderUid, delta) => {
    setOrderItems((prev) =>
      prev
        .map((i) => {
          if (i.orderUid === orderUid) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const clearOrder = () => setOrderItems([]);

  const totalItemCount = orderItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalEstimatedMXN = orderItems.reduce((acc, i) => acc + ((i.priceNumeric || 0) * i.quantity), 0);

  // Generador de mensaje estructurado para WhatsApp con sanitización y datos verificados
  const generateWhatsAppUrl = () => {
    if (orderItems.length === 0) return '#';

    let text = `Hola Goyo Real Coffee ☕\nQuisiera hacer el siguiente pedido para pasar a recoger en barra (Nayarit y Yáñez):\n\n`;

    orderItems.forEach((item) => {
      text += `*${item.quantity}x ${item.name}*\n`;
      if (item.temperature) text += `  • Formato: ${item.temperature}\n`;
      if (item.milk) text += `  • Leche: ${item.milk}\n`;
      if (item.syrup && item.syrup !== 'Sin jarabe') text += `  • Jarabe: ${item.syrup}\n`;
      if (item.sweetener && item.sweetener !== 'Sin azúcar') text += `  • Endulzante: ${item.sweetener}\n`;
      if (item.notes) text += `  • Notas: ${item.notes}\n`;
      text += `\n`;
    });

    text += `Total de bebidas: ${totalItemCount}\n`;
    if (totalEstimatedMXN > 0) text += `Total estimado: ~$${totalEstimatedMXN} MXN\n`;
    text += `Ref. Seguridad: GOYO-${Date.now().toString(36).toUpperCase()}\n`;
    text += `¿Me confirman tiempo estimado de preparación? ¡Muchas gracias!`;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/526623557949?text=${encoded}`;
  };

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        isDrawerOpen,
        setIsDrawerOpen,
        selectedProduct,
        setSelectedProduct,
        addItemToOrder,
        removeItem,
        updateQuantity,
        clearOrder,
        totalItemCount,
        totalEstimatedMXN,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
