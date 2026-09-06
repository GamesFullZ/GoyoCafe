import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, DollarSign, Star } from 'lucide-react';
import { BlurFade } from './ui/blur-fade';

export default function Hero() {
  return (
    <section id="inicio" className="band-terracotta">
      <div className="container">
        <div className="hero-editorial-grid">
          {/* Contenido Textual Editorial con efecto BlurFade */}
          <div className="hero-content">
            <BlurFade delay={0.1} inView>
              <span className="eyebrow-zine">
                Cafetería de Especialidad ✦ Hermosillo, Sonora
              </span>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <h1 className="hero-editorial-title">
                Matcha ceremonial, café de especialidad y jarabes caseros.
              </h1>
            </BlurFade>
            
            {/* Chips de Identidad Visual con BlurFade escalonado */}
            <div className="hero-specialties-row">
              <BlurFade delay={0.3} inView>
                <span className="hero-specialty-chip">🍵 Matcha 1000/10</span>
              </BlurFade>
              <BlurFade delay={0.35} inView>
                <span className="hero-specialty-chip">☕ Café de Especialidad</span>
              </BlurFade>
              <BlurFade delay={0.4} inView>
                <span className="hero-specialty-chip">🍯 Jarabes Hechos en Casa</span>
              </BlurFade>
              <BlurFade delay={0.45} inView>
                <span className="hero-specialty-chip">🍪 Horneado Diario</span>
              </BlurFade>
            </div>

            <BlurFade delay={0.5} inView>
              <p className="hero-editorial-subtitle">
                Tu esquina favorita en la colonia Nayarit: un espacio acogedor para pausar el reloj, disfrutar bebidas preparadas al detalle y sentirte en tu tercer lugar.
              </p>
            </BlurFade>

            <BlurFade delay={0.6} inView>
              <div className="hero-editorial-actions">
                <Link to="/menu" className="btn-pill btn-pill-dark">
                  <span>Explorar Carta y Especialidades</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link to="/visitanos" className="btn-pill btn-pill-outline">
                  <MapPin size={18} aria-hidden="true" />
                  <span>Cómo Llegar (Nayarit y Yáñez)</span>
                </Link>
              </div>
            </BlurFade>

            {/* Fila de Trust Badges en Estilo Zine */}
            <BlurFade delay={0.7} inView>
              <div className="trust-badges-zine-grid">
                <div className="trust-badge-zine">
                  <div className="trust-badge-zine-header">
                    <Star size={16} fill="var(--color-sunshine)" color="var(--color-ink)" aria-hidden="true" />
                    <span>4.5 Google Maps</span>
                  </div>
                  <div className="trust-badge-zine-sub">165+ opiniones verificadas</div>
                </div>

                <div className="trust-badge-zine">
                  <div className="trust-badge-zine-header">
                    <Clock size={16} aria-hidden="true" />
                    <span>Abierto Todos los Días</span>
                  </div>
                  <div className="trust-badge-zine-sub">L-V 7am-9pm | S-D 9am-9pm</div>
                </div>

                <div className="trust-badge-zine">
                  <div className="trust-badge-zine-header">
                    <DollarSign size={16} aria-hidden="true" />
                    <span>Consumo Promedio</span>
                  </div>
                  <div className="trust-badge-zine-sub">$100 – $200 MXN</div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Marco Visual con Sello Circular Flotante */}
          <BlurFade delay={0.35} inView style={{ width: '100%' }}>
            <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
              <div className="hero-image-frame">
                <img
                  src="/assets/images/hero_matcha_coffee.jpg"
                  alt="Taza de Matcha Latte ceremonial y café de especialidad servidos en Goyo Real Coffee"
                  width="700"
                  height="700"
                  fetchpriority="high"
                />
              </div>
              
              {/* Sello circular craft de Touchy Coffee */}
              <div className="circular-origin-stamp" aria-hidden="true">
                <span>MATCHA 100%</span>
                <span style={{ fontSize: '0.8125rem' }}>CEREMONIAL</span>
                <span>1000/10</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
