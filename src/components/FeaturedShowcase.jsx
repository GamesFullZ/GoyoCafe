import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedShowcase({ onOpenQRMenu }) {
  const featured = [
    {
      img: '/assets/images/iced_matcha.jpg',
      alt: 'Vaso de Iced Matcha Latte ceremonial en capas en Goyo Real Coffee',
      tag: '★ Favorito 1000/10',
      title: 'Matcha Latte Ceremonial',
      subtitle: 'Matcha auténtico grado ceremonial sin mezclas artificiales. Sabor vegetal dulce, cremoso y genuino.',
      price: 'Especialidad',
      target: 'matcha'
    },
    {
      img: '/assets/images/pourover_coffee.jpg',
      alt: 'Café de especialidad en extracción manual pour over con bolsa de granos de origen',
      tag: 'Extracción Calibrada',
      title: 'Café de Especialidad Filtrado',
      subtitle: 'Granos de origen seleccionados, molidos y extraídos al momento para resaltar cada nota aromática.',
      price: 'Origen Único',
      target: 'cafe'
    },
    {
      img: '/assets/images/iced_syrup_latte.jpg',
      alt: 'Iced Latte con jarabe casero y canela en rama servido en vaso con condensación',
      tag: 'Jarabe Casero',
      title: 'Latte con Jarabe Artesanal',
      subtitle: 'Recetas exclusivas preparadas en nuestra barra con especias naturales sin esencias químicas.',
      price: 'Receta de la Casa',
      target: 'temporada'
    },
    {
      img: '/assets/images/matcha_cookie.jpg',
      alt: 'Vaso de matcha con espuma cremosa y galleta artesanal horneada con trozos de chocolate',
      tag: 'Horneado Diario',
      title: 'Matcha Foam & Galleta',
      subtitle: 'Capa sedosa de espuma de matcha sobre leche fresca, maridada con repostería recién horneada.',
      price: 'Dúo del Día',
      target: 'postres'
    }
  ];

  return (
    <section className="featured-showcase-section">
      <div className="container">
        <div className="featured-showcase-header reveal-on-scroll">
          <span className="eyebrow-zine">
            <Sparkles size={14} aria-hidden="true" />
            <span>Lo Más Pedido en Nuestra Barra</span>
          </span>
          <h2 className="section-title-editorial">Lo Que Nos Hace Especiales</h2>
          <p className="section-subtitle-editorial" style={{ margin: '0 auto' }}>
            Nuestras 4 especialidades más queridas por quienes visitan nuestra esquina en Hermosillo.
          </p>
        </div>

        {/* Grid de 4 Cards Visuales */}
        <div className="featured-grid">
          {featured.map((item, idx) => (
            <article key={idx} className={`featured-card reveal-on-scroll delay-${(idx + 1) * 100}`}>
              <div className="featured-card-img-wrap">
                <span className="featured-card-tag">{item.tag}</span>
                <img src={item.img} alt={item.alt} loading="lazy" />
              </div>
              <div className="featured-card-body">
                <div>
                  <h3 className="featured-card-title">{item.title}</h3>
                  <p className="featured-card-subtitle">{item.subtitle}</p>
                </div>
                <div className="featured-card-footer">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700 }}>
                    {item.price}
                  </span>
                  <Link
                    to="/menu"
                    className="tab-pill"
                    style={{ padding: '6px 14px', fontSize: '0.6875rem' }}
                  >
                    <span>Ver Carta</span>
                    <ArrowRight size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
