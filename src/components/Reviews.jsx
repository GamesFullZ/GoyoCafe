import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      quote: 'El matcha latte es 1000/10, realmente sabe a matcha y no a leche con azúcar como en otros lados. Se convirtió en mi lugar favorito de Hermosillo.',
      author: 'Cliente Frecuente',
      source: 'Google Maps',
      stars: '★★★★★'
    },
    {
      quote: 'Muy buenos cafés y un servicio excelente siempre. Los baristas son bien buena onda, amables y te explican todo con calma.',
      author: 'Visitante Verificado',
      source: 'Google Maps',
      stars: '★★★★★'
    },
    {
      quote: 'Amé la estética de este lugar. Es una esquina pequeña pero sumamente acogedora, ideal para leer un buen libro o platicar a gusto.',
      author: 'Reseña Local',
      source: 'Google Maps',
      stars: '★★★★★'
    },
    {
      quote: 'El café es delicioso y los jarabes hechos en casa le dan un toque único de temporada que no encuentras en las cafeterías de cadena.',
      author: 'Cliente de Especialidad',
      source: 'Google Maps',
      stars: '★★★★★'
    }
  ];

  return (
    <section id="resenas" className="band-sky">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="reveal-on-scroll" style={{ maxWidth: '780px', margin: '0 auto 36px auto' }}>
          <span className="eyebrow-zine">Opiniones Reales</span>
          <h2 className="section-title-editorial">Lo que Dicen Quienes Ya Nos Conocen</h2>
        </div>

        {/* Módulo Central Google Maps */}
        <div className="reveal-on-scroll" style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--color-ink)',
          borderRadius: 'var(--radius-card)',
          padding: '24px',
          boxShadow: '4px 4px 0 var(--color-ink)',
          maxWidth: '520px',
          margin: '0 auto 40px auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-display-serif)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-ink)' }}>4.5</span>
            <div style={{ color: '#E6A23C', fontSize: '1.375rem', letterSpacing: '2px' }} aria-label="Calificación 4.5 de 5 estrellas">
              <span>★</span><span>★</span><span>★</span><span>★</span><span style={{ opacity: 0.4 }}>★</span>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Calificación promedio basada en <strong>165+ opiniones verificadas</strong> en Google Maps
          </div>
        </div>

        {/* Grid de 4 Reseñas en Color-Block Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
          textAlign: 'left'
        }}>
          {reviews.map((rev, idx) => (
            <article key={idx} className={`review-card-colorblock reveal-on-scroll delay-${(idx + 1) * 100}`}>
              <div>
                <div className="review-stars-solid">{rev.stars}</div>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: 'var(--color-text-primary)', marginBottom: '20px' }}>
                  “{rev.quote}”
                </p>
              </div>
              <div style={{ borderTop: '1px solid rgba(26,22,19,0.15)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="review-author-underlined">{rev.author}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {rev.source}
                </span>
              </div>
            </article>
          ))}
        </div>

        <a
          href="https://maps.google.com/?q=Av.+Nayarit+y+Yáñez+102,+Hermosillo,+Sonora"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill btn-pill-dark reveal-on-scroll"
        >
          <span>Leer todas las opiniones en Google Maps</span>
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
