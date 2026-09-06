import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';

export default function QRMenuModal({ onClose }) {
  const [activePill, setActivePill] = useState('matcha');

  const scrollToCat = (catId) => {
    setActivePill(catId);
    const el = document.getElementById(`qr-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="menu-qr-page" style={{ position: 'fixed', inset: 0, overflowY: 'auto', zIndex: 9999 }}>
      {/* Barra superior */}
      <header className="qr-top-bar">
        <button onClick={onClose} className="qr-back-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={18} />
          <span>Volver al sitio</span>
        </button>

        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
          Goyo Real Coffee
        </span>

        <span className="qr-brand-badge">En barra y para llevar</span>
      </header>

      {/* Encabezado */}
      <div className="qr-header-block">
        <h1 className="qr-main-title">Menú de Nuestra Esquina</h1>
        <p className="qr-price-info">Consumo promedio informado: <strong>$100 – $200 MXN</strong> por persona</p>
        <p className="qr-welcome-text">
          Si tienes alguna duda o buscas una recomendación personalizada, consúltalo con confianza con nuestros baristas en barra.
        </p>
      </div>

      {/* Pills de categorías (Sticky) */}
      <nav className="qr-sticky-pills" aria-label="Categorías del Menú QR">
        <button
          onClick={() => scrollToCat('matcha')}
          className={`qr-pill ${activePill === 'matcha' ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          Matcha & Tés
        </button>
        <button
          onClick={() => scrollToCat('cafe')}
          className={`qr-pill ${activePill === 'cafe' ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          Café de Especialidad
        </button>
        <button
          onClick={() => scrollToCat('temporada')}
          className={`qr-pill ${activePill === 'temporada' ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          Jarabes & Temporada
        </button>
        <button
          onClick={() => scrollToCat('postres')}
          className={`qr-pill ${activePill === 'postres' ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          Postres & Alimentos
        </button>
      </nav>

      {/* Listado de Productos */}
      <main className="qr-section-container">
        {/* 1. Matcha & Tés */}
        <section id="qr-matcha" className="qr-category-group">
          <h2 className="qr-category-title">Matcha & Tés</h2>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Matcha Latte (Frío / Caliente)</span>
              <span className="item-badge badge-favorite">Calificado 1000/10</span>
            </div>
            <p className="qr-item-desc">
              Matcha ceremonial auténtico batido al momento con leche texturizada. Disponible en versión fría sobre hielo o caliente con microespuma.
            </p>
          </div>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Foam Matcha Latte</span>
              <span className="item-badge badge-season">Especial</span>
            </div>
            <p className="qr-item-desc">
              Matcha intenso coronado con suave crema fría de foam artesanal preparada en casa.
            </p>
          </div>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Té Matcha Tradicional</span>
              <span className="item-badge badge-house">Ceremonial</span>
            </div>
            <p className="qr-item-desc">
              Batido al momento con agua a temperatura controlada. Sabor puro y vegetal sin añadidos.
            </p>
          </div>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Té con Leche</span>
              <span className="item-badge badge-house">Infusión</span>
            </div>
            <p className="qr-item-desc">
              Infusiones seleccionadas con base láctea suave y perfil aromático reconfortante.
            </p>
          </div>
        </section>

        {/* 2. Café de Especialidad */}
        <section id="qr-cafe" className="qr-category-group">
          <h2 className="qr-category-title">Café de Especialidad</h2>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Espresso Doble</span>
              <span className="item-badge badge-house">Clásico</span>
            </div>
            <p className="qr-item-desc">
              Extracción limpia, balanceada y con notas complejas de café de origen seleccionado.
            </p>
          </div>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Café Americano</span>
              <span className="item-badge badge-house">Clásico</span>
            </div>
            <p className="qr-item-desc">
              Base de espresso doble y agua caliente filtrada, conservando el perfil aromático de la molienda.
            </p>
          </div>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Cortado</span>
              <span className="item-badge badge-favorite">Favorito</span>
            </div>
            <p className="qr-item-desc">
              Proporción equilibrada a partes iguales de café de especialidad y leche vaporizada sedosa.
            </p>
          </div>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Latte de la Casa</span>
              <span className="item-badge badge-house">Especialidad</span>
            </div>
            <p className="qr-item-desc">
              Espresso suave y leche cremosa con opción de foam artesanal. Disponible caliente o iced.
            </p>
          </div>
        </section>

        {/* 3. Jarabes Caseros & Sabores de Temporada */}
        <section id="qr-temporada" className="qr-category-group">
          <h2 className="qr-category-title">Jarabes Caseros & Sabores de Temporada</h2>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Bebidas con Jarabe Artesanal de la Casa</span>
              <span className="item-badge badge-season">Receta Exclusiva</span>
            </div>
            <p className="qr-item-desc">
              Elaborados en nuestra propia cocina con especias, vainas y frutos naturales, sin jarabes comerciales ni saborizantes artificiales. Pregunta en barra por el especial del mes.
            </p>
          </div>
        </section>

        {/* 4. Postres & Alimentos */}
        <section id="qr-postres" className="qr-category-group">
          <h2 className="qr-category-title">Postres & Alimentos</h2>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Galletas Horneadas en Casa</span>
              <span className="item-badge badge-house">Horneado Diario</span>
            </div>
            <p className="qr-item-desc">
              Receta artesanal recién horneada en pequeños lotes para acompañar tus bebidas calientes o frías.
            </p>
          </div>

          <div className="qr-item-row">
            <div className="qr-item-header">
              <span className="qr-item-name">Repostería y Menú del Día</span>
              <span className="item-badge badge-season">Rotativo</span>
            </div>
            <p className="qr-item-desc">
              Opciones frescas de panadería y repostería que rotan durante la semana. Consulta disponibilidad directa con nuestro barista.
            </p>
          </div>
        </section>

        {/* Pie con Consulta en Barra */}
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
          <a href="tel:6623557949" className="btn btn-secondary" style={{ width: '100%', maxWidth: '320px', marginBottom: '12px' }}>
            <Phone size={18} aria-hidden="true" />
            <span>Llamar / Consulta Rápida a Barra</span>
          </a>

          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '10px' }}>
            Goyo Real Coffee • Av. Nayarit y Yáñez 102, Hermosillo, Sonora
          </p>
        </div>
      </main>

      {/* Botón flotante WhatsApp Barista */}
      <a
        href="https://wa.me/526623557949?text=Hola,%20estoy%20en%20el%20local%20y%20quiero%20consultar%20sobre%20el%20men%C3%BA"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Consultar por WhatsApp"
      >
        <MessageCircle size={24} aria-hidden="true" />
        <span className="whatsapp-label">Barista en Barra</span>
      </a>
    </div>
  );
}
