import React from 'react';
import { Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Concept from '../components/Concept';

export default function ConceptPage() {
  return (
    <div className="concept-page" style={{ paddingTop: '70px' }}>
      <Concept />

      {/* Franja de llamada a la acción */}
      <section className="band-terracotta" style={{ padding: '60px 0', borderBottom: '2px solid var(--color-ink)' }}>
        <div className="container">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <h3 className="section-title-editorial" style={{ color: '#FFFFFF', fontSize: '2rem', marginBottom: '14px' }}>
              Ven a vivir la experiencia
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Encuentra tu lugar favorito para leer, platicar o simplemente disfrutar un momento de calma en Hermosillo.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/visitanos" className="btn-pill btn-pill-sunshine">
                <span>Cómo Llegar a Nuestra Esquina</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/menu" className="btn-pill btn-pill-outline">
                <span>Ver Qué Ofrecemos</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
