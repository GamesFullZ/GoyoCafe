import React from 'react';
import { ShoppingBag, X, MessageCircle, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function OrderDrawer() {
  const {
    orderItems,
    isDrawerOpen,
    setIsDrawerOpen,
    removeItem,
    updateQuantity,
    clearOrder,
    totalItemCount,
    totalEstimatedMXN,
    generateWhatsAppUrl,
  } = useOrder();

  const whatsappUrl = generateWhatsAppUrl();

  return (
    <>
      {/* Botón Flotante Disparador de Pedido */}
      {totalItemCount > 0 && !isDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            zIndex: 9998,
            animation: 'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="btn-pill btn-pill-sunshine"
            style={{
              padding: '12px 20px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            aria-label="Ver mi pedido para barra"
          >
            <ShoppingBag size={18} />
            <span>Mi Pedido ({totalItemCount})</span>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-signal)',
                display: 'inline-block'
              }}
            />
          </button>
        </div>
      )}

      {/* Drawer Desplegable */}
      {isDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(26, 22, 19, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 10001,
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              height: '100%',
              backgroundColor: 'var(--color-cream)',
              borderLeft: '2px solid var(--color-ink)',
              boxShadow: '-8px 0 24px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              overflowY: 'auto',
              animation: 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Canasta de pedido para barra"
          >
            {/* Header del Drawer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1.5px solid var(--color-ink)', paddingBottom: '14px' }}>
              <div>
                <span className="zine-tag" style={{ fontSize: '0.625rem', padding: '3px 8px', marginBottom: '4px', display: 'inline-block' }}>
                  Barra Goyo
                </span>
                <h2 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1.375rem', fontWeight: 800, margin: 0 }}>
                  Tu Pedido para Barra
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--color-ink)',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Cerrar pedido"
              >
                <X size={18} />
              </button>
            </div>

            {/* Lista de Ítems */}
            <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
              {orderItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--color-text-muted)' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.3, margin: '0 auto 12px auto' }} />
                  <p style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
                    Tu canasta está vacía
                  </p>
                  <p style={{ fontSize: '0.8125rem', lineHeight: '1.5' }}>
                    Selecciona una bebida de la carta, personalízala a tu gusto y prepárala para recoger en barra.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orderItems.map((item) => (
                    <div
                      key={item.orderUid}
                      style={{
                        background: '#FFFFFF',
                        border: '1.5px solid var(--color-ink)',
                        borderRadius: '16px',
                        padding: '16px',
                        boxShadow: '3px 3px 0 var(--color-ink)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h4 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                            {item.name}
                          </h4>
                          {item.priceTag && (
                            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-terracotta)', fontWeight: 700 }}>
                              {item.priceTag}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.orderUid)}
                          style={{ color: '#C62828', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                          aria-label={`Eliminar ${item.name}`}
                          title="Eliminar ítem"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Opciones Seleccionadas */}
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '12px' }}>
                        {item.temperature && <div>• Formato: <strong style={{ color: 'var(--color-ink)' }}>{item.temperature}</strong></div>}
                        {item.milk && <div>• Leche: <strong style={{ color: 'var(--color-ink)' }}>{item.milk}</strong></div>}
                        {item.syrup && item.syrup !== 'Sin jarabe' && (
                          <div>• Jarabe: <strong style={{ color: 'var(--color-ink)' }}>{item.syrup}</strong></div>
                        )}
                        {item.sweetener && item.sweetener !== 'Sin azúcar' && (
                          <div>• Endulzante: <strong style={{ color: 'var(--color-ink)' }}>{item.sweetener}</strong></div>
                        )}
                        {item.notes && (
                          <div style={{ fontStyle: 'italic', marginTop: '4px', background: 'var(--color-cream)', padding: '4px 8px', borderRadius: '6px' }}>
                            "{item.notes}"
                          </div>
                        )}
                      </div>

                      {/* Stepper de Cantidad */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--color-ink)', borderRadius: 'var(--radius-pill)', background: 'var(--color-cream)' }}>
                          <button
                            onClick={() => updateQuantity(item.orderUid, -1)}
                            style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            aria-label="Restar 1"
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8125rem', minWidth: '24px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.orderUid, 1)}
                            style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            aria-label="Sumar 1"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer con Total y Enviar a WhatsApp */}
            {orderItems.length > 0 && (
              <div style={{ borderTop: '1.5px solid var(--color-ink)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                  <span>Total de bebidas:</span>
                  <strong>{totalItemCount} {totalItemCount === 1 ? 'bebida' : 'bebidas'}</strong>
                </div>
                {totalEstimatedMXN > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                    <span>Estimado en barra:</span>
                    <strong style={{ color: 'var(--color-terracotta)', fontSize: '1rem' }}>~${totalEstimatedMXN} MXN</strong>
                  </div>
                )}
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-dark"
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-signal)',
                    borderColor: 'var(--color-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '10px'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Enviar Pedido por WhatsApp</span>
                  <ArrowRight size={16} />
                </a>

                <button
                  type="button"
                  onClick={clearOrder}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Vaciar canasta de pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
