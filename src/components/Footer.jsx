import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Clock, Instagram, Star, Share2 } from 'lucide-react';

export default function Footer({ onOpenQRMenu, onOpenCaseStudy }) {
  return (
    <footer className="band-ink" role="contentinfo">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Columna 1: Marca */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-display-serif)', fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-cream)', marginBottom: '14px' }}>
              <Coffee size={24} aria-hidden="true" />
              <span>Goyo Real Coffee</span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'rgba(250, 247, 242, 0.7)', lineHeight: '1.6' }}>
              Un lugar para pausar y sentir. Tu esquina favorita. Tu tercer lugar en Hermosillo.
            </p>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-sunshine)', marginBottom: '16px' }}>
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/" className="footer-zine-link">Inicio</Link></li>
              <li><Link to="/menu" className="footer-zine-link">Carta y Especialidades</Link></li>
              <li><Link to="/concepto" className="footer-zine-link">El Concepto</Link></li>
              <li><Link to="/galeria" className="footer-zine-link">Galería</Link></li>
              <li><Link to="/visitanos" className="footer-zine-link">Ubicación y Horarios</Link></li>
              <li>
                <button onClick={onOpenQRMenu} className="footer-zine-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Menú QR en Mesa
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCaseStudy}
                  className="footer-zine-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-sunshine)', fontWeight: 600 }}
                >
                  ✦ Ficha Técnica / Case Study
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto y Horarios */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-sunshine)', marginBottom: '16px' }}>
              Visítanos
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: 'rgba(250, 247, 242, 0.8)' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ flexShrink: 0, color: 'var(--color-sunshine)' }} aria-hidden="true" />
                <span>Av. Nayarit y Yáñez 102, Col. Nayarit, Hermosillo, Sonora</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} style={{ flexShrink: 0, color: 'var(--color-sunshine)' }} aria-hidden="true" />
                <span>Tel: 662 355 7949</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Clock size={18} style={{ flexShrink: 0, color: 'var(--color-sunshine)' }} aria-hidden="true" />
                <span className="font-mono">L-V: 7am - 9pm | S-D: 9am - 9pm</span>
              </div>
            </div>
          </div>

          {/* Columna 4: Comunidad Social */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-sunshine)', marginBottom: '16px' }}>
              Comunidad
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <a
                  href="https://www.instagram.com/goyorealcoffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-zine-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Instagram size={16} />
                  <span>@goyorealcoffee</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Av.+Nayarit+y+Yáñez+102,+Hermosillo,+Sonora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-zine-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Star size={16} fill="var(--color-sunshine)" color="var(--color-sunshine)" />
                  <span>Google Maps (4.5★ • 165 reseñas)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?text=¡Mira%20esta%20cafetería%20de%20especialidad%20en%20Hermosillo!%20Goyo%20Real%20Coffee%20tiene%20matcha%20ceremonial%201000/10%20y%20jarabes%20caseros:%20https://goyorealcoffee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-zine-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--color-sunshine)',
                    fontWeight: 600,
                    marginTop: '4px'
                  }}
                >
                  <Share2 size={16} />
                  <span>Compartir cafetería por WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(250, 247, 242, 0.15)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'rgba(250, 247, 242, 0.5)'
        }}>
          <p>© 2026 Goyo Real Coffee. Todos los derechos reservados. Hermosillo, Sonora, México.</p>
          <button
            onClick={onOpenCaseStudy}
            className="footer-case-pill"
            aria-label="Abrir ficha técnica y arquitectura del proyecto"
          >
            ✦ Ver Ficha Técnica & Arquitectura
          </button>
        </div>
      </div>
    </footer>
  );
}
