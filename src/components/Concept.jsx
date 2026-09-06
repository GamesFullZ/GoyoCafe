import React from 'react';
import { Leaf, Coffee, FlaskConical, Heart } from 'lucide-react';

export default function Concept() {
  const concepts = [
    {
      icon: <Leaf size={24} aria-hidden="true" />,
      tag: '100% Ceremonial',
      title: 'Matcha Genuino 1000/10',
      desc: 'Sin mezclas industriales ni azúcar añadida. Auténtico matcha ceremonial batido con chasen.'
    },
    {
      icon: <Coffee size={24} aria-hidden="true" />,
      tag: 'Extracción al Gramo',
      title: 'Café de Especialidad',
      desc: 'Granos seleccionados de origen, calibración diaria y microespuma sedosa a temperatura justa.'
    },
    {
      icon: <FlaskConical size={24} aria-hidden="true" />,
      tag: 'Recetas de la Barra',
      title: 'Jarabes Hechos en Casa',
      desc: 'Infusiones preparadas en nuestra cocina con especias naturales sin esencias artificiales.'
    },
    {
      icon: <Heart size={24} aria-hidden="true" />,
      tag: 'Hermosillo, Sonora',
      title: 'Tu Tercer Lugar',
      desc: 'Una esquina pequeña y acogedora en la colonia Nayarit para pausar el reloj y sentirte en casa.'
    }
  ];

  return (
    <section id="concepto" className="band-cream">
      <div className="container">
        <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <span className="eyebrow-zine">Nuestra Esencia</span>
          <h2 className="section-title-editorial">
            Tu Tercer Lugar en Hermosillo
          </h2>
          <p className="section-subtitle-editorial" style={{ margin: '0 auto' }}>
            Un espacio pensado para desconectar del ritmo diario y disfrutar café y matcha como deben ser.
          </p>
        </div>

        {/* Matriz de 4 ConceptCards en Zine Card Style */}
        <div className="concept-zine-grid">
          {concepts.map((item, idx) => (
            <article key={idx} className={`concept-zine-card reveal-on-scroll delay-${(idx + 1) * 100}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div className="concept-zine-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <span className="zine-tag">{item.tag}</span>
              </div>
              <h3 className="concept-zine-title">{item.title}</h3>
              <p className="concept-zine-desc">{item.desc}</p>
            </article>
          ))}
        </div>

        {/* Cita Editorial del Propietario (Portal Editorial Block) */}
        <div className="editorial-quote-box reveal-on-scroll">
          <blockquote className="editorial-quote-text">
            “Somos una esquina pequeña pero intentamos que cada visita se sienta especial.”
          </blockquote>
          <cite className="editorial-quote-author">
            — Filosofía de servicio en Goyo Real Coffee, Hermosillo ✦
          </cite>
        </div>
      </div>
    </section>
  );
}
