import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Coffee, Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';

export default function Header({ onOpenQRMenu, totalItemCount = 0, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState({ isOpen: true, textMobile: 'Abierto', textDesktop: 'Abierto ahora • L-V 7am-9pm | S-D 9am-9pm' });

  useEffect(() => {
    function updateStatus() {
      const now = new Date();
      // Hora local de Hermosillo, Sonora (UTC-7)
      const hermosilloDateStr = now.toLocaleString('en-US', { timeZone: 'America/Hermosillo' });
      const hTime = new Date(hermosilloDateStr);
      
      const day = hTime.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
      const hour = hTime.getHours();
      const minute = hTime.getMinutes();
      const currentMinutes = hour * 60 + minute;

      const isWeekend = (day === 0 || day === 6);
      const openMinutes = isWeekend ? 9 * 60 : 7 * 60; // 09:00 o 07:00
      const closeMinutes = 21 * 60; // 21:00

      const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

      if (isOpen) {
        setStatus({
          isOpen: true,
          textMobile: 'Abierto',
          textDesktop: isWeekend 
            ? 'Abierto ahora • S-D 9:00 am - 9:00 pm' 
            : 'Abierto ahora • L-V 7:00 am - 9:00 pm'
        });
      } else {
        const nextDay = (day + 1) % 7;
        const nextOpensAt = (nextDay === 0 || nextDay === 6) ? '9:00 a.m.' : '7:00 a.m.';
        setStatus({
          isOpen: false,
          textMobile: 'Cerrado',
          textDesktop: `Cerrado ahora • Abre mañana a las ${nextOpensAt}`
        });
      }
    }

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="nav-capsule-wrapper" role="banner">
        <div className="nav-capsule">
          {/* Marca / Logotipo */}
          <Link to="/" className="capsule-brand" onClick={closeMobile} aria-label="Goyo Real Coffee - Inicio">
            <Coffee size={22} aria-hidden="true" />
            <span>Goyo Real Coffee</span>
          </Link>

          {/* Menú Desktop con Enlaces de Rutas */}
          <nav className="capsule-nav-links" aria-label="Navegación principal">
            <NavLink to="/" end className={({ isActive }) => `capsule-link ${isActive ? 'active' : ''}`}>
              Inicio
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => `capsule-link ${isActive ? 'active' : ''}`}>
              Carta & Menú
            </NavLink>
            <NavLink to="/concepto" className={({ isActive }) => `capsule-link ${isActive ? 'active' : ''}`}>
              El Concepto
            </NavLink>
            <NavLink to="/galeria" className={({ isActive }) => `capsule-link ${isActive ? 'active' : ''}`}>
              Galería
            </NavLink>
            <NavLink to="/visitanos" className={({ isActive }) => `capsule-link ${isActive ? 'active' : ''}`}>
              Visítanos
            </NavLink>
          </nav>

          {/* Status Badge */}
          <div className={`capsule-status-badge ${status.isOpen ? 'open' : 'closed'}`} aria-live="polite">
            <span className="capsule-status-dot" aria-hidden="true"></span>
            <span className="font-mono">{status.textMobile}</span>
          </div>

          {/* Acciones */}
          <div className="capsule-actions">
            {totalItemCount > 0 && (
              <button
                className="btn-capsule-cart"
                onClick={onOpenCart}
                aria-label={`Ver pedido actual: ${totalItemCount} bebidas`}
                title="Ver pedido"
              >
                <ShoppingBag size={18} />
                <span className="cart-count-pill font-mono">{totalItemCount}</span>
              </button>
            )}

            <Link to="/menu" className="btn-pill btn-pill-dark" style={{ padding: '8px 18px', minHeight: '36px', fontSize: '0.75rem' }} onClick={closeMobile}>
              Ver Menú
            </Link>
            <button
              className="btn-mobile-capsule"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div className="capsule-mobile-dropdown">
            <NavLink to="/" end className="capsule-mobile-link" onClick={closeMobile}>
              Inicio
            </NavLink>
            <NavLink to="/menu" className="capsule-mobile-link" onClick={closeMobile}>
              Carta & Menú
            </NavLink>
            <NavLink to="/concepto" className="capsule-mobile-link" onClick={closeMobile}>
              El Concepto
            </NavLink>
            <NavLink to="/galeria" className="capsule-mobile-link" onClick={closeMobile}>
              Galería Fotográfica
            </NavLink>
            <NavLink to="/visitanos" className="capsule-mobile-link" onClick={closeMobile}>
              Visítanos & Horarios
            </NavLink>
            <button
              className="btn-pill btn-pill-dark"
              style={{ width: '100%', marginTop: '8px' }}
              onClick={() => {
                closeMobile();
                if (onOpenQRMenu) onOpenQRMenu();
              }}
            >
              Abrir Menú QR en Mesa
            </button>
          </div>
        )}
      </header>
    </>
  );
}
