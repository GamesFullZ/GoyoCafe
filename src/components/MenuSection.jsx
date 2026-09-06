import React, { useState } from 'react';
import { QrCode, Search, X, Sparkles, Coffee } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function MenuSection({ onOpenQRMenu }) {
  const { setSelectedProduct } = useOrder();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dietFilter, setDietFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos los Productos' },
    { id: 'matcha', label: 'Matcha & Tés' },
    { id: 'cafe', label: 'Café de Especialidad' },
    { id: 'temporada', label: 'Jarabes & Temporada' },
    { id: 'postres', label: 'Postres & Menú del Día' },
  ];

  const dietFilters = [
    { id: 'all', label: 'Todos los estilos' },
    { id: 'favorite', label: '★ Favoritos 1000/10' },
    { id: 'plant', label: '🌱 Opción Leche Vegetal' },
    { id: 'house', label: '🍯 Hecho en Casa' },
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Matcha Latte Ceremonial',
      category: 'matcha',
      categoryLabel: 'Matcha & Tés',
      badge: '★ 1000/10 Favorito',
      desc: 'Matcha ceremonial auténtico batido al punto con leche fresca. Sabor vegetal dulce, cremoso y natural.',
      priceNumeric: 75,
      priceTag: '$75 MXN',
      img: '/assets/images/iced_matcha.jpg',
      isFavorite: true,
      hasPlantMilk: true,
      isHouseMade: false
    },
    {
      id: 2,
      name: 'Foam Matcha Latte',
      category: 'matcha',
      categoryLabel: 'Matcha & Tés',
      badge: 'Especial de Barra',
      desc: 'Base sedosa de leche coronada con una densa y suave capa de crema fría de matcha ceremonial batido.',
      priceNumeric: 85,
      priceTag: '$85 MXN',
      img: '/assets/images/matcha_cookie.jpg',
      isFavorite: true,
      hasPlantMilk: true,
      isHouseMade: true
    },
    {
      id: 3,
      name: 'Té Matcha Puro Ceremonial',
      category: 'matcha',
      categoryLabel: 'Matcha & Tés',
      badge: '100% Puro',
      desc: 'Matcha puro batido con chasen y agua a temperatura controlada. Intenso, antioxidante y genuino.',
      priceNumeric: 65,
      priceTag: '$65 MXN',
      img: '/assets/images/hero_matcha_coffee.jpg',
      isFavorite: false,
      hasPlantMilk: false,
      isHouseMade: false
    },
    {
      id: 4,
      name: 'Café Filtrado Pour Over V60',
      category: 'cafe',
      categoryLabel: 'Café de Especialidad',
      badge: 'Extracción Manual',
      desc: 'Método artesanal de goteo calibrado al gramo para resaltar la dulzura y notas limpias de origen.',
      priceNumeric: 70,
      priceTag: '$70 MXN',
      img: '/assets/images/pourover_coffee.jpg',
      isFavorite: true,
      hasPlantMilk: false,
      isHouseMade: false
    },
    {
      id: 5,
      name: 'Latte de la Casa & Arte Latte',
      category: 'cafe',
      categoryLabel: 'Café de Especialidad',
      badge: 'Calibrado',
      desc: 'Shot doble de espresso con microespuma cremosa texturizada a temperatura óptima.',
      priceNumeric: 65,
      priceTag: '$65 MXN',
      img: '/assets/images/latte_art.jpg',
      isFavorite: false,
      hasPlantMilk: true,
      isHouseMade: false
    },
    {
      id: 6,
      name: 'Cortado Tradicional',
      category: 'cafe',
      categoryLabel: 'Café de Especialidad',
      badge: 'Cuerpo Intenso',
      desc: 'Proporción 1:1 de espresso doble y leche texturizada para saborear la fuerza y crema del grano.',
      priceNumeric: 55,
      priceTag: '$55 MXN',
      img: '/assets/images/barista.jpg',
      isFavorite: false,
      hasPlantMilk: true,
      isHouseMade: false
    },
    {
      id: 7,
      name: 'Lattes con Jarabe Casero',
      category: 'temporada',
      categoryLabel: 'Jarabes & Temporada',
      badge: 'Hecho en Casa',
      desc: 'Infusionado en nuestra barra con especias naturales (canela, vainilla natural) sin químicos.',
      priceNumeric: 75,
      priceTag: '$75 MXN',
      img: '/assets/images/iced_syrup_latte.jpg',
      isFavorite: true,
      hasPlantMilk: true,
      isHouseMade: true
    },
    {
      id: 8,
      name: 'Galletas Artesanales',
      category: 'postres',
      categoryLabel: 'Postres',
      badge: 'Horneado Diario',
      desc: 'Receta casera horneada en pequeños lotes con trozos de chocolate para maridar tu café.',
      priceNumeric: 45,
      priceTag: '$45 MXN',
      img: '/assets/images/matcha_cookie.jpg',
      isFavorite: false,
      hasPlantMilk: false,
      isHouseMade: true
    },
    {
      id: 9,
      name: 'Especiales & Menú del Día',
      category: 'postres',
      categoryLabel: 'Postres',
      badge: 'Rotativo',
      desc: 'Repostería artesanal fresca que rota según ingredientes de temporada y disponibilidad del día.',
      priceNumeric: 55,
      priceTag: 'Desde $55 MXN',
      img: '/assets/images/reading_corner.jpg',
      isFavorite: false,
      hasPlantMilk: false,
      isHouseMade: true
    }
  ];

  // Filtro combinado: categoría + búsqueda en vivo + filtro dietético
  const filteredItems = menuItems.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch =
      searchTerm.trim() === '' ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());

    let matchDiet = true;
    if (dietFilter === 'favorite') matchDiet = item.isFavorite;
    if (dietFilter === 'plant') matchDiet = item.hasPlantMilk;
    if (dietFilter === 'house') matchDiet = item.isHouseMade;

    return matchCat && matchSearch && matchDiet;
  });

  return (
    <section id="menu" className="band-sage">
      <div className="container">
        <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
          <span className="eyebrow-zine">Nuestras Creaciones</span>
          <h2 className="section-title-editorial">Carta y Especialidades</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            margin: '8px 0 16px 0'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 18px',
              background: 'var(--color-cream)',
              border: '1.5px solid var(--color-ink)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              boxShadow: '2px 2px 0 var(--color-ink)'
            }}>
              Consumo promedio informado: <strong>$100 – $200 MXN</strong> por persona
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              background: '#D1E7DD',
              border: '1.5px solid #0F5132',
              color: '#0F5132',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              boxShadow: '2px 2px 0 #0F5132'
            }}>
              <span>⚡</span> Barra Activa • Espera estimada 5-8 min
            </div>
          </div>
          <p className="section-subtitle-editorial" style={{ margin: '0 auto', color: 'var(--color-ink)' }}>
            Preparaciones artesanales con matcha ceremonial, granos de especialidad y jarabes caseros. Puedes personalizar tu bebida y pedirla directo a barra por WhatsApp.
          </p>
        </div>

        {/* Buscador en Vivo */}
        <div className="reveal-on-scroll" style={{ maxWidth: '580px', margin: '0 auto 28px auto', position: 'relative' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{ position: 'absolute', left: '18px', color: 'var(--color-ink)', pointerEvents: 'none' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por bebida, ingrediente o nota (ej: matcha, canela, v60...)"
              style={{
                width: '100%',
                padding: '14px 44px 14px 48px',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--color-ink)',
                backgroundColor: 'var(--color-cream)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                outline: 'none',
                boxShadow: '3px 3px 0 var(--color-ink)'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink)' }}
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Tabs de Categorías */}
        <div className="menu-tabs-zine reveal-on-scroll delay-100" role="tablist" aria-label="Categorías del Menú">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`tab-pill ${activeCategory === cat.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filtros Secundarios Dietéticos / Estilo */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
          {dietFilters.map((df) => (
            <button
              key={df.id}
              type="button"
              onClick={() => setDietFilter(df.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--color-ink)',
                background: dietFilter === df.id ? 'var(--color-sunshine)' : 'var(--color-cream)',
                color: 'var(--color-ink)',
                fontWeight: dietFilter === df.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {df.label}
            </button>
          ))}
        </div>

        {/* Grid de Productos Zine Visuales */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: 'var(--radius-card)', border: '1.5px solid var(--color-ink)', maxWidth: '600px', margin: '0 auto 48px auto' }}>
            <Coffee size={40} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
            <h3 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1.25rem', marginBottom: '8px' }}>
              No encontramos bebidas que coincidan
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Intenta con otro término o limpia los filtros para ver toda nuestra carta.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
                setDietFilter('all');
              }}
              className="tab-pill active"
            >
              Mostrar todas las bebidas
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {filteredItems.map((item, idx) => (
              <article key={item.id} className={`zine-product-card reveal-on-scroll delay-${(idx % 3 + 1) * 100}`}>
                {/* Foto de Producto */}
                <div className="zine-product-thumb-frame">
                  <span className="zine-product-thumb-badge">{item.badge}</span>
                  <img src={item.img} alt={item.name} loading="lazy" />
                </div>

                <div>
                  <div className="zine-product-top">
                    <h3 className="zine-product-name">{item.name}</h3>
                  </div>
                  <p className="zine-product-desc">{item.desc}</p>
                </div>

                <div className="zine-product-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                      {item.categoryLabel}
                    </span>
                    <span className="zine-price-stamp">{item.priceTag}</span>
                  </div>

                  {/* Botón de Personalización y Pedido */}
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(item)}
                    className="btn-pill btn-pill-sunshine"
                    style={{ width: '100%', padding: '9px 16px', fontSize: '0.75rem' }}
                  >
                    <span>Personalizar & Pedir ✦</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Botón hacia Menú QR */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center' }}>
          <button onClick={onOpenQRMenu} className="btn-pill btn-pill-dark">
            <QrCode size={18} aria-hidden="true" />
            <span>Abrir Menú Digital para Escaneo QR en Mesa</span>
          </button>
        </div>
      </div>
    </section>
  );
}
