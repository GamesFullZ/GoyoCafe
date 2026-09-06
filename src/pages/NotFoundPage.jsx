import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft, BookOpen, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-wrapper">
      <div className="container" style={{ textAlign: 'center', maxWidth: '640px', padding: '120px 20px 80px 20px' }}>
        <div className="not-found-badge font-mono">
          <span>Error 404 ✦ Página no encontrada</span>
        </div>

        <div className="not-found-icon-box" aria-hidden="true">
          <Coffee size={56} strokeWidth={1.5} />
        </div>

        <h1 className="not-found-title">
          ¡Oops! Se derramó el café
        </h1>

        <p className="not-found-desc">
          Parece que esta mesa no está disponible o la taza se enfrió antes de tiempo. 
          No te preocupes, nuestra barra en Nayarit y Yáñez siempre tiene café recién extraído y matcha listo.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-pill btn-pill-dark">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Volver al Inicio</span>
          </Link>
          <Link to="/menu" className="btn-pill btn-pill-sunshine">
            <BookOpen size={16} aria-hidden="true" />
            <span>Explorar la Carta</span>
          </Link>
        </div>

        <div className="not-found-suggestions font-mono">
          <span>O visita: </span>
          <Link to="/concepto">El Concepto</Link> • <Link to="/galeria">Galería</Link> • <Link to="/visitanos">Ubicación</Link>
        </div>
      </div>
    </div>
  );
}
