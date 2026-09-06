import React, { useState } from 'react';
import { Instagram, ExternalLink, ZoomIn, Sparkles, Coffee, Compass } from 'lucide-react';
import GalleryLightbox from './GalleryLightbox';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    {
      id: 1,
      category: 'matcha',
      categoryLabel: 'Matcha',
      img: '/assets/images/iced_matcha.jpg',
      alt: 'Vaso de Iced Matcha Latte con capas de color bien definidas sobre mesa de madera',
      title: 'Iced Matcha Latte Ceremonial',
      sub: 'Capas artesanales de matcha grado ceremonial y leche texturizada',
      tag: '#01 • Bestseller',
      span: 'tall'
    },
    {
      id: 2,
      category: 'cafe',
      categoryLabel: 'Café',
      img: '/assets/images/latte_art.jpg',
      alt: 'Taza de cerámica con arte latte detallado sobre mesa rústica',
      title: 'Arte Latte & Espuma Sedosa',
      sub: 'Calibración diaria de espresso con microespuma aterciopelada',
      tag: '#02 • Barra Caliente',
      span: 'normal'
    },
    {
      id: 3,
      category: 'matcha',
      categoryLabel: 'Matcha',
      img: '/assets/images/matcha_cookie.jpg',
      alt: 'Vaso de cold foam matcha con galleta horneada con chispas de chocolate',
      title: 'Cold Foam Matcha & Cookie',
      sub: 'Espuma fría sedosa coronada con nuestra galleta horneada del día',
      tag: '#03 • Dúo Favorito',
      span: 'normal'
    },
    {
      id: 4,
      category: 'espacio',
      categoryLabel: 'Espacio',
      img: '/assets/images/reading_corner.jpg',
      alt: 'Rincón acogedor de la cafetería con sillón de piel, mesa de madera, libro y plantas con luz de ventana',
      title: 'Rincón de Lectura & Pausa',
      sub: 'Sillones cómodos, buena música y luz cálida: tu tercer lugar en Hermosillo',
      tag: '#04 • Tercer Lugar',
      span: 'wide'
    },
    {
      id: 5,
      category: 'cafe',
      categoryLabel: 'Café',
      img: '/assets/images/pourover_coffee.jpg',
      alt: 'Jarra de cristal con café pour over filtrado y taza de cerámica',
      title: 'Extracción V60 en Jarra',
      sub: 'Métodos filtrados de origen único que resaltan notas frutales y florales',
      tag: '#05 • Filtrados',
      span: 'normal'
    },
    {
      id: 6,
      category: 'matcha',
      categoryLabel: 'Matcha',
      img: '/assets/images/iced_syrup_latte.jpg',
      alt: 'Vaso de latte helado con jarabe artesanal infusionado sobre mesa de madera',
      title: 'Iced Latte con Jarabe Casero',
      sub: 'Infusión en frío de jarabe de canela en rama y vainilla natural',
      tag: '#06 • Jarabes Caseros',
      span: 'normal'
    },
    {
      id: 7,
      category: 'cafe',
      categoryLabel: 'Café',
      img: '/assets/images/barista.jpg',
      alt: 'Barista preparando café pour over con atención al detalle en la barra de madera',
      title: 'Baristas en Acción',
      sub: 'Precisión miligramo a miligramo en cada vertido en nuestra barra de Nayarit',
      tag: '#07 • En Barra',
      span: 'normal'
    },
    {
      id: 8,
      category: 'espacio',
      categoryLabel: 'Espacio',
      img: '/assets/images/hero_matcha_coffee.jpg',
      alt: 'Taza de matcha latte y taza de café en mesa con cobija acogedora',
      title: 'Mañanas en Nuestra Esquina',
      sub: 'El punto de encuentro perfecto para comenzar el día sin prisas',
      tag: '#08 • Comunidad',
      span: 'wide'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todas las Fotografías (8)', icon: Sparkles },
    { id: 'matcha', label: '🍵 Matcha & Especiales (3)', icon: null },
    { id: 'cafe', label: '☕ Café de Especialidad (3)', icon: Coffee },
    { id: 'espacio', label: '🛋️ Nuestro Tercer Lugar (2)', icon: Compass }
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="galeria" className="band-cream">
      <div className="container">
        {/* Encabezado Editorial */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
          <span className="eyebrow-zine">La Experiencia en Fotos</span>
          <h2 className="section-title-editorial">Nuestra Esquina y Cada Detalle</h2>
          <p className="section-subtitle-editorial" style={{ margin: '0 auto' }}>
            Un recorrido visual por el cuidado de nuestras bebidas, el método artesanal en barra y los rincones de paz en la colonia Nayarit.
          </p>
        </div>

        {/* Píldoras de Filtro por Categoría */}
        <div className="gallery-filter-bar reveal-on-scroll">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`tab-pill gallery-tab-btn ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                {Icon && <Icon size={14} aria-hidden="true" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid con Marcos Zine y Animación */}
        <div className="gallery-bento-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className={`gallery-card gallery-span-${item.span} reveal-on-scroll delay-${((idx % 4) + 1) * 100}`}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxIndex(idx);
                }
              }}
              aria-label={`Ampliar fotografía: ${item.title}`}
            >
              {/* Badge Zine Superior */}
              <div className="gallery-card-header">
                <span className="gallery-card-tag font-mono">{item.tag}</span>
                <span className="gallery-card-category font-mono">{item.categoryLabel}</span>
              </div>

              {/* Imagen */}
              <div className="gallery-card-img-wrap">
                <img src={item.img} alt={item.alt} className="gallery-img" loading="lazy" />
              </div>

              {/* Pie de Foto / Overlay Estructurado */}
              <div className="gallery-card-footer">
                <div style={{ flexGrow: 1, paddingRight: '12px' }}>
                  <h3 className="gallery-caption-title">{item.title}</h3>
                  <p className="gallery-caption-sub">{item.sub}</p>
                </div>
                <span className="gallery-zoom-badge" aria-hidden="true" title="Ampliar imagen">
                  <ZoomIn size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Conexión a Instagram */}
        <div className="instagram-banner reveal-on-scroll">
          <div className="instagram-info">
            <div className="instagram-icon-box" aria-hidden="true">
              <Instagram size={24} />
            </div>
            <div>
              <div className="instagram-handle">@goyorealcoffee en Hermosillo</div>
              <div className="instagram-followers">Más de 5,900 amantes del buen café y matcha</div>
            </div>
          </div>
          <a
            href="https://www.instagram.com/goyorealcoffee/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-dark"
          >
            <span>Ver más en Instagram</span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Visor Modal Cinemático */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}


