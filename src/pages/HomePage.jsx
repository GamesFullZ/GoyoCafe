import React from 'react';
import { ArrowRight, Star, Clock, MapPin, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedShowcase from '../components/FeaturedShowcase';
import Reviews from '../components/Reviews';

export default function HomePage({ onOpenQRMenu }) {
  return (
    <div className="home-page">
      <Hero />

      {/* Marquee Ticker */}
      <div className="brand-marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          <span>UN LUGAR PARA PAUSAR Y SENTIR ✦</span>
          <span>TU ESQUINA FAVORITA ✦</span>
          <span>TU TERCER LUGAR EN HERMOSILLO ✦</span>
          <span>MATCHA AUTÉNTICO 1000/10 ✦</span>
          <span>JARABES CASEROS ✦</span>
          <span>CAFÉ DE ESPECIALIDAD CALIBRADO ✦</span>
          <span>NAYARIT Y YÁÑEZ ✦</span>
          {/* Duplicado para loop infinito fluido */}
          <span>UN LUGAR PARA PAUSAR Y SENTIR ✦</span>
          <span>TU ESQUINA FAVORITA ✦</span>
          <span>TU TERCER LUGAR EN HERMOSILLO ✦</span>
          <span>MATCHA AUTÉNTICO 1000/10 ✦</span>
          <span>JARABES CASEROS ✦</span>
          <span>CAFÉ DE ESPECIALIDAD CALIBRADO ✦</span>
          <span>NAYARIT Y YÁÑEZ ✦</span>
        </div>
      </div>

      {/* Lo Que Nos Hace Especiales (Showcase Visual) */}
      <FeaturedShowcase onOpenQRMenu={onOpenQRMenu} />

      {/* Banner de Invitación al Concepto */}
      <section className="band-terracotta" style={{ padding: '60px 0', borderBottom: '2px solid var(--color-ink)' }}>
        <div className="container">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span className="eyebrow-zine" style={{ background: 'var(--color-sunshine)' }}>
              ✦ Filosofía de la Casa
            </span>
            <h2 className="section-title-editorial" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              “Somos una esquina pequeña pero intentamos que cada visita se sienta especial.”
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.0625rem', lineHeight: '1.6', marginBottom: '28px' }}>
              Descubre por qué Goyo Real Coffee se convirtió en el tercer lugar favorito de la colonia Nayarit en Hermosillo.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/concepto" className="btn-pill btn-pill-sunshine">
                <span>Conoce Nuestra Filosofía</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/menu" className="btn-pill btn-pill-outline">
                <span>Explorar Carta Completa</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reseñas de Clientes */}
      <Reviews />

      {/* Mini Banner de Ubicación y Horarios para Inicio */}
      <section className="band-cream" style={{ padding: '60px 0', borderBottom: '2px solid var(--color-ink)' }}>
        <div className="container">
          <div className="reveal-on-scroll" style={{
            background: '#FFFFFF',
            border: '2px solid var(--color-ink)',
            borderRadius: 'var(--radius-card)',
            padding: '36px',
            boxShadow: '6px 6px 0 var(--color-ink)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="eyebrow-zine" style={{ marginBottom: '8px' }}>Visítanos Hoy</span>
                <h3 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-ink)' }}>
                  ¿Listo para tu pausa del día?
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginTop: '4px' }}>
                  Av. Nayarit y Yáñez 102, Col. Nayarit • Abierto todos los días de la semana
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/visitanos" className="btn-pill btn-pill-dark">
                  <MapPin size={16} />
                  <span>Ver Mapa y Horarios</span>
                </Link>
                <Link to="/galeria" className="btn-pill btn-pill-outline">
                  <span>Ver Galería</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
