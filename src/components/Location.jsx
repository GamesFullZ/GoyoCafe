import React, { useState, useEffect } from 'react';
import { MapPin, Copy, Clock, Phone, MessageCircle, ExternalLink } from 'lucide-react';

export default function Location() {
  const [currentDay, setCurrentDay] = useState(1);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Calcular día de la semana en Hermosillo
    const now = new Date();
    const hermosilloDateStr = now.toLocaleString('en-US', { timeZone: 'America/Hermosillo' });
    const hTime = new Date(hermosilloDateStr);
    setCurrentDay(hTime.getDay());
  }, []);

  const copyAddress = async () => {
    const address = "Av. Nayarit y Yáñez 102, Colonia Nayarit, C.P. 83190, Hermosillo, Sonora";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = address;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast("¡Dirección copiada al portapapeles!");
    } catch (e) {
      showToast("Dirección: " + address);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const schedule = [
    { dayIndex: 1, name: 'Lunes', hours: '7:00 a.m. – 9:00 p.m.' },
    { dayIndex: 2, name: 'Martes', hours: '7:00 a.m. – 9:00 p.m.' },
    { dayIndex: 3, name: 'Miércoles', hours: '7:00 a.m. – 9:00 p.m.' },
    { dayIndex: 4, name: 'Jueves', hours: '7:00 a.m. – 9:00 p.m.' },
    { dayIndex: 5, name: 'Viernes', hours: '7:00 a.m. – 9:00 p.m.' },
    { dayIndex: 6, name: 'Sábado', hours: '9:00 a.m. – 9:00 p.m.' },
    { dayIndex: 0, name: 'Domingo', hours: '9:00 a.m. – 9:00 p.m.' },
  ];

  return (
    <section id="visitanos" className="band-cream">
      <div className="container">
        <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <span className="eyebrow-zine">Pasa a Saludarnos</span>
          <h2 className="section-title-editorial">Visítanos en Nuestra Esquina</h2>
          <p className="section-subtitle-editorial" style={{ margin: '0 auto' }}>
            Te esperamos todos los días en la colonia Nayarit para preparar tu bebida favorita y ofrecerte una pausa de calidad.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Columna Izquierda: Información Práctica, Horarios y Contacto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Tarjeta de Dirección */}
            <div className="location-zine-card reveal-on-scroll delay-100">
              <h3 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} color="var(--color-terracotta)" aria-hidden="true" />
                <span>Ubicación Exacta</span>
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                Av. Nayarit y Yáñez 102, Colonia Nayarit, C.P. 83190, Hermosillo, Sonora.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                <button onClick={copyAddress} className="tab-pill" style={{ padding: '8px 16px', fontSize: '0.75rem' }} type="button">
                  <Copy size={14} style={{ display: 'inline', marginRight: '6px' }} aria-hidden="true" />
                  <span>Copiar dirección</span>
                </button>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Plus Code: <strong>32VR+VG Hermosillo</strong>
                </div>
              </div>
            </div>

            {/* Horarios con Detección Automática de Hoy */}
            <div className="location-zine-card reveal-on-scroll delay-200">
              <h3 style={{ fontFamily: 'var(--font-display-serif)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} color="var(--color-terracotta)" aria-hidden="true" />
                <span>Horarios de Atención</span>
              </h3>
              <div className="hours-zine-table">
                {schedule.map(item => (
                  <div
                    key={item.dayIndex}
                    className={`hours-zine-row ${currentDay === item.dayIndex ? 'current-day' : ''}`}
                  >
                    <span>
                      {item.name} {currentDay === item.dayIndex ? '(Hoy ✦)' : ''}
                    </span>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                🌿 Abierto los 7 días de la semana de forma continua
              </div>
            </div>

            {/* Botones de Contacto Directo */}
            <div className="reveal-on-scroll delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href="tel:6623557949" className="btn-pill btn-pill-outline" style={{ flex: '1 1 200px' }}>
                <Phone size={18} aria-hidden="true" />
                <span>662 355 7949</span>
              </a>

              <a
                href="https://wa.me/526623557949?text=Hola%20Goyo%20Real%20Coffee,%20me%20gustar%C3%ADa%20consultar%20sobre%20el%20men%C3%BA%20del%20d%C3%ADa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-dark"
                style={{ flex: '1 1 200px', backgroundColor: 'var(--color-signal)' }}
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>WhatsApp Directo</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Mapa con Marco Zine */}
          <div className="reveal-on-scroll delay-200" style={{ position: 'relative' }}>
            <div className="map-zine-frame" style={{ height: '420px' }}>
              <iframe
                style={{ width: '100%', height: '100%', border: 'none' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3486.299581961605!2d-110.9599557!3d29.0915174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ce844781cf6977%3A0x6b8eb7c22ee3a652!2sAv%20Nayarit%20%26%20Calle%20Gral.%20Jos%C3%A9%20Mar%C3%ADa%20Y%C3%A1%C3%B1ez%2C%20San%20Benito%2C%2083190%20Hermosillo%2C%20Son.!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                title="Ubicación de Goyo Real Coffee en Hermosillo"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Mapa de Google con la ubicación de Goyo Real Coffee"
              />
            </div>

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <a
                href="https://maps.google.com/?q=Av.+Nayarit+y+Yáñez+102,+Hermosillo,+Sonora"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-dark"
                style={{ width: '100%' }}
              >
                <MapPin size={18} aria-hidden="true" />
                <span>Abrir en Google Maps para Navegación</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast-notice ${toastMessage ? 'show' : ''}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </section>
  );
}
