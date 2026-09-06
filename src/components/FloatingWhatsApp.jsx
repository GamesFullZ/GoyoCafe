import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/526623557949?text=Hola%20Goyo%20Real%20Coffee,%20quiero%20hacer%20una%20consulta"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      aria-label="Escríbenos por WhatsApp"
    >
      <MessageCircle size={24} aria-hidden="true" />
      <span className="whatsapp-label">¿Preguntas? Escríbenos</span>
    </a>
  );
}
