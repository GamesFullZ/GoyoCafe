import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { OrderProvider, useOrder } from './context/OrderContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import QRMenuModal from './components/QRMenuModal';
import OrderCustomizerModal from './components/OrderCustomizerModal';
import OrderDrawer from './components/OrderDrawer';
import PortfolioCaseStudyModal from './components/PortfolioCaseStudyModal';
import ScrollToTop from './components/ScrollToTop';

// Páginas Independientes
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ConceptPage from './pages/ConceptPage';
import GalleryPage from './pages/GalleryPage';
import LocationPage from './pages/LocationPage';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  const [showQRMenu, setShowQRMenu] = useState(false);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const location = useLocation();
  const { totalItemCount, setIsDrawerOpen } = useOrder();

  useEffect(() => {
    // Inicializar IntersectionObserver para animaciones al cambiar de página o scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="app-root">
      <ScrollToTop />
      
      {/* Navegación Suspendida Compartida */}
      <Header
        onOpenQRMenu={() => setShowQRMenu(true)}
        totalItemCount={totalItemCount}
        onOpenCart={() => setIsDrawerOpen(true)}
      />

      {/* Vistas / Páginas Separadas */}
      <main id="mainContent">
        <Routes>
          <Route path="/" element={<HomePage onOpenQRMenu={() => setShowQRMenu(true)} />} />
          <Route path="/menu" element={<MenuPage onOpenQRMenu={() => setShowQRMenu(true)} />} />
          <Route path="/concepto" element={<ConceptPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/visitanos" element={<LocationPage />} />
          {/* Ruta 404 Editorial */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Pie de Página Compartido */}
      <Footer
        onOpenQRMenu={() => setShowQRMenu(true)}
        onOpenCaseStudy={() => setShowCaseStudy(true)}
      />
      
      {/* Botón Flotante de WhatsApp */}
      <FloatingWhatsApp />

      {/* Modal Dedicado del Menú QR */}
      {showQRMenu && (
        <QRMenuModal onClose={() => setShowQRMenu(false)} />
      )}

      {/* Modal de Personalización de Bebidas (Order Builder) */}
      <OrderCustomizerModal />

      {/* Drawer Lateral del Carrito y Enlace WhatsApp */}
      <OrderDrawer />

      {/* Modal de Ficha Técnica / Case Study para Portafolio */}
      <PortfolioCaseStudyModal
        isOpen={showCaseStudy}
        onClose={() => setShowCaseStudy(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <AppContent />
      </OrderProvider>
    </BrowserRouter>
  );
}

