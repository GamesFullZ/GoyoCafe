import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export default function GalleryLightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', handleKeyDown);
    // Evitar scroll de fondo mientras el visor está abierto
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !items || !items[currentIndex]) return null;

  const current = items[currentIndex];

  return (
    <div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotografía a pantalla completa"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lightbox-topbar">
        <div className="lightbox-counter font-mono">
          <Camera size={16} aria-hidden="true" />
          <span>{currentIndex + 1} / {items.length}</span>
        </div>
        <button
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Cerrar visor de fotografía"
        >
          <X size={24} />
        </button>
      </div>

      <div className="lightbox-content">
        <button
          className="lightbox-nav-btn prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Fotografía anterior"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="lightbox-image-container">
          <img
            src={current.img}
            alt={current.alt}
            className="lightbox-image"
          />
          <div className="lightbox-meta">
            <h3 className="lightbox-title">{current.title}</h3>
            <p className="lightbox-sub font-mono">{current.sub}</p>
          </div>
        </div>

        <button
          className="lightbox-nav-btn next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Siguiente fotografía"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
