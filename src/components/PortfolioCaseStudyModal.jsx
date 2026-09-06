import React, { useEffect } from 'react';
import { X, Code2, Sparkles, Smartphone, Zap, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function PortfolioCaseStudyModal({ isOpen, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="case-study-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Ficha Técnica y Arquitectura del Proyecto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="case-study-modal">
        {/* Header */}
        <div className="case-study-header">
          <div>
            <span className="eyebrow-zine" style={{ marginBottom: '4px', display: 'inline-block' }}>
              ✦ Portfolio Case Study ✦
            </span>
            <h2 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
              Goyo Real Coffee — Arquitectura & Frontend
            </h2>
          </div>
          <button
            className="lightbox-close-btn"
            style={{ position: 'static', background: '#F4F1EA', color: 'var(--color-ink)' }}
            onClick={onClose}
            aria-label="Cerrar ficha técnica"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="case-study-body">
          {/* Tech Badges */}
          <div className="case-study-badges">
            <span className="case-badge"><Code2 size={14} /> React 18 + Vite</span>
            <span className="case-badge"><Zap size={14} /> Framer Motion</span>
            <span className="case-badge"><Smartphone size={14} /> Mobile-First Responsive</span>
            <span className="case-badge"><Sparkles size={14} /> WhatsApp Order Builder</span>
          </div>

          {/* Section 1: Concept & Problem */}
          <div className="case-study-section">
            <h3 className="case-study-subtitle">🎯 Desafío & Concepto</h3>
            <p className="case-study-text">
              Diseñar y desarrollar la experiencia web completa para <strong>Goyo Real Coffee</strong> (Hermosillo, Sonora), 
              combinando la calidez visual de un <em>Zine artesanal</em> con la tipografía editorial y la practicidad de un e-commerce ligero. 
              El objetivo: que el cliente perciba de inmediato la especialidad en café y matcha, explore la carta interactiva y pueda encargar bebidas personalizadas directamente a la barra vía WhatsApp sin fricciones ni registros obligatorios.
            </p>
          </div>

          {/* Section 2: Key Implemented Features */}
          <div className="case-study-section">
            <h3 className="case-study-subtitle">⚡ Características Clave Desarrolladas</h3>
            <div className="case-study-grid">
              <div className="case-card">
                <div className="case-card-icon"><Sparkles size={18} /></div>
                <h4>Personalizador de Bebidas</h4>
                <p>Order Builder dinámico que permite configurar temperatura, tipo de leche (Avena, Almendra, etc.), jarabes artesanales hechos en casa y notas especiales.</p>
              </div>

              <div className="case-card">
                <div className="case-card-icon"><CheckCircle2 size={18} /></div>
                <h4>Carrito & Generador WhatsApp</h4>
                <p>Context API con persistencia en <code>localStorage</code>. Codifica el pedido completo estructurado en un enlace directo a la barra (+52 662 355 7949).</p>
              </div>

              <div className="case-card">
                <div className="case-card-icon"><Zap size={18} /></div>
                <h4>Filtros y Búsqueda en Vivo</h4>
                <p>Filtrado reactivo instantáneo por término de búsqueda y etiquetas dietéticas (Leche vegetal, Jarabe casero, Favoritos 1000/10).</p>
              </div>

              <div className="case-card">
                <div className="case-card-icon"><Smartphone size={18} /></div>
                <h4>Lightbox Cinemático</h4>
                <p>Visor a pantalla completa para la galería con soporte para navegación táctil, teclas de flechas (←/→) y Escape.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Performance & UX */}
          <div className="case-study-section">
            <h3 className="case-study-subtitle">💡 Decisiones de UX y Rendimiento</h3>
            <ul className="case-study-list">
              <li>
                <strong>Animaciones a 60fps:</strong> Combinación de <code>IntersectionObserver</code> nativo para lazy-reveal al scrollear y Framer Motion con <code>blur-fade</code> para evitar jank en dispositivos de gama media y baja.
              </li>
              <li>
                <strong>Horario en Tiempo Real:</strong> Algoritmo sincronizado con el huso horario oficial de Sonora (<code>America/Hermosillo</code>, UTC-7), indicando en el navbar si la barra está abierta o cerrada con precisión de minutos.
              </li>
              <li>
                <strong>Accesibilidad (a11y):</strong> Focus outlines visibles, roles ARIA en modales y cajones, navegación por teclado completa y contraste de color auditado para legibilidad en exteriores.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="case-study-footer">
          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-charcoal)' }}>
            ✦ Listo para demostración en portafolio frontend
          </div>
          <button className="btn-pill btn-pill-dark" onClick={onClose}>
            Entendido, volver a la web
          </button>
        </div>
      </div>
    </div>
  );
}
