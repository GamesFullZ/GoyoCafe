import React, { useState } from 'react';
import { X, Check, Coffee, Plus, Minus } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function OrderCustomizerModal() {
  const { selectedProduct, setSelectedProduct, addItemToOrder } = useOrder();

  if (!selectedProduct) return null;

  const isDrink = selectedProduct.category === 'matcha' || selectedProduct.category === 'cafe' || selectedProduct.category === 'temporada';

  const [temperature, setTemperature] = useState('Iced / Frío (16 oz)');
  const [milk, setMilk] = useState('Entera de origen');
  const [syrup, setSyrup] = useState('Sin jarabe');
  const [sweetener, setSweetener] = useState('Sin azúcar');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const temperatures = ['Iced / Frío (16 oz)', 'Caliente (12 oz)'];
  const milks = ['Entera de origen', 'Deslactosada', 'Leche de Avena (+ vegetal)', 'Leche de Almendra'];
  const syrups = ['Sin jarabe', 'Vainilla natural casera', 'Canela artesanal en rama', 'Jarabe de temporada'];
  const sweeteners = ['Sin azúcar', 'Estándar (mascabado)', 'Monk fruit natural', 'Miel de abeja de Sonora'];

  const handleAdd = (e) => {
    e.preventDefault();
    addItemToOrder({
      id: selectedProduct.id,
      name: selectedProduct.name,
      category: selectedProduct.category,
      priceTag: selectedProduct.priceTag,
      priceNumeric: selectedProduct.priceNumeric || null,
      img: selectedProduct.img,
      temperature: isDrink ? temperature : null,
      milk: isDrink ? milk : null,
      syrup: isDrink ? syrup : null,
      sweetener: isDrink ? sweetener : null,
      notes: notes.trim(),
      quantity,
    });
    setSelectedProduct(null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(26, 22, 19, 0.7)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={() => setSelectedProduct(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '2px solid var(--color-ink)',
          borderRadius: 'var(--radius-card)',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '6px 6px 0 var(--color-ink)',
          padding: '28px',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1.5px solid var(--color-ink)',
            background: 'var(--color-cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Cerrar modal de personalización"
        >
          <X size={18} />
        </button>

        {/* Encabezado del producto */}
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '24px', paddingRight: '36px' }}>
          {selectedProduct.img && (
            <div style={{ width: '80px', height: '80px', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid var(--color-ink)', flexShrink: 0 }}>
              <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div>
            <span className="zine-tag" style={{ marginBottom: '6px', display: 'inline-block' }}>
              {selectedProduct.badge || 'Especialidad'}
            </span>
            <h2 id="order-modal-title" style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-ink)' }}>
              {selectedProduct.name}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              {selectedProduct.priceTag || 'Consulta en Barra'}
            </p>
          </div>
        </div>

        {isDrink && (
          <>
            {/* Formato / Temperatura */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                1. Formato & Temperatura:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {temperatures.map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    className={`tab-pill ${temperature === temp ? 'active' : ''}`}
                    style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                    onClick={() => setTemperature(temp)}
                  >
                    {temperature === temp && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {temp}
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo de Leche */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                2. Selección de Leche:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {milks.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`tab-pill ${milk === m ? 'active' : ''}`}
                    style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                    onClick={() => setMilk(m)}
                  >
                    {milk === m && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Jarabe Casero */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                3. Jarabe Artesanal Hecho en Casa:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {syrups.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`tab-pill ${syrup === s ? 'active' : ''}`}
                    style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                    onClick={() => setSyrup(s)}
                  >
                    {syrup === s && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Endulzante */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                4. Endulzante Natural:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sweeteners.map((sw) => (
                  <button
                    key={sw}
                    type="button"
                    className={`tab-pill ${sweetener === sw ? 'active' : ''}`}
                    style={{ padding: '8px 14px', fontSize: '0.75rem' }}
                    onClick={() => setSweetener(sw)}
                  >
                    {sweetener === sw && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {sw}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Notas Adicionales con Sanitización */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
            Indicaciones Especiales (Opcional - Máx. 150 caracteres):
          </label>
          <input
            type="text"
            value={notes}
            maxLength={150}
            onChange={(e) => setNotes(e.target.value.replace(/<[^>]*>?/gm, ''))}
            placeholder="Ej: Poco hielo, leche bien espumada, para llevar..."
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--radius-pill)',
              border: '1.5px solid var(--color-ink)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--color-cream)',
              outline: 'none'
            }}
          />
        </div>

        {/* Cantidad y Botón Agregar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', borderTop: '1px solid rgba(26,22,19,0.15)', paddingTop: '20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--color-ink)', borderRadius: 'var(--radius-pill)', background: 'var(--color-cream)' }}>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Restar cantidad"
            >
              <Minus size={16} />
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9375rem', minWidth: '32px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Sumar cantidad"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="btn-pill btn-pill-dark"
            style={{ flexGrow: 1 }}
          >
            <span>Agregar a mi Pedido ({quantity})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
