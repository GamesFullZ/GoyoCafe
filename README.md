# Goyo Real Coffee ☕✦
> Web interactiva, accesible y de alta seguridad para la cafetería de especialidad y barra de matcha ceremonial en Hermosillo, Sonora.

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)
![Security](https://img.shields.io/badge/Security-AES--256--GCM%20%7C%20RateLimit-green?style=for-the-badge)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey?style=for-the-badge&logo=express)

---

## 📖 Descripción General
**Goyo Real Coffee** es una experiencia digital diseñada bajo una estética *coffee-zine editorial*, combinando la calidez artesanal del café de especialidad con un sistema interactivo de pedidos en barra, menú digital QR, personalizador dinámico de bebidas y una arquitectura de seguridad de nivel empresarial.

- 📍 **Ubicación:** Av. Nayarit y Yáñez 102, Col. Nayarit, Hermosillo, Sonora, México.
- 🍵 **Especialidad:** Matcha Ceremonial auténtico (1000/10), café de especialidad y jarabes caseros infusionados con canela y vainilla natural.
- ⭐ **Calificación:** 4.5★ en Google Maps (+165 reseñas).

---

## 🚀 Características Principales

### 1. 🎨 Experiencia de Usuario & Frontend
* **Order Builder Interactivo:** Modal táctil para personalizar bebidas seleccionando tipo de leche (Entera, Deslactosada, Avena, Almendra), formato/temperatura (Caliente vs Iced), endulzantes (Monk fruit, miel de Sonora, azúcar de caña) y notas especiales para el barista.
* **Cajón Lateral de Pedidos (Cart Drawer):** Estado reactivo persistente en `localStorage`, cálculo de precios en tiempo real en Pesos Mexicanos ($ MXN) y botón directo para enviar pedido estructurado a WhatsApp (+52 662 355 7949).
* **Carta Dinámica & Buscador en Vivo:** Filtrado instantáneo por texto, ingredientes y etiquetas dietéticas (*★ Favoritos 1000/10*, *🌱 Opción Leche Vegetal*, *🍯 Hecho en Casa*).
* **Menú Digital QR:** Modal con QR generado para escaneo y consumo en mesa.
* **Galería con Lightbox Cinemático:** Visor a pantalla completa con navegación por teclado (`Escape`, `←`, `→`).
* **Diseño 100% Responsive:** Optimizado con áreas táctiles `>= 44px` y rendimiento a 60 FPS sin desbordamientos horizontales.

### 2. 🛡️ Suite de Seguridad Enterprise (Backend & API)
* **Rate Limiting & IP Limiting:**
  * Limitador global por IP: 60 peticiones / 15 min.
  * Limitador de pedidos: 15 pedidos / 15 min por IP para mitigar saturación y ataques de denegación de servicio (DoS), respondiendo con `HTTP 429 Too Many Requests`.
* **Sanitización de Entradas (Sanity Input):**
  * Neutralización de caracteres de control ASCII (`\x00-\x1F`) y escape de entidades HTML anti-XSS.
  * Protección contra ataques de Prototype Pollution (`__proto__`, `constructor`).
* **Validación en el Servidor (Server-Side Validation):**
  * Validación rigurosa de esquemas con control de enums, rangos y tipado antes de procesar cualquier pedido.
* **Cifrado AES-256-GCM y Firmas HMAC:**
  * Cifrado simétrico autenticado para datos sensibles con IV único y Auth Tag.
  * Generación de firmas HMAC-SHA256 (`receiptSignature`) para verificar que los tickets no hayan sido alterados.
* **Row Level Security (RLS):**
  * Esquema SQL para PostgreSQL/Supabase (`server/rls_policies.sql`) con políticas granulares por rol (`customer`, `barista`, `admin`).
* **CORS Estricto & Cabeceras HTTP:**
  * Whitelist de orígenes permitidos (`ALLOWED_ORIGINS`).
  * Cabeceras `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` y `X-XSS-Protection`.

---

## 🛠️ Stack Tecnológico
* **Frontend:** React 18, React Router v6, Tailwind CSS, Lucide Icons, Vite 6.
* **Backend:** Node.js, Express 4, `express-rate-limit`, `crypto` (nativo).
* **Estilos:** Vanilla CSS con variables de diseño, sistema de diseño editorial zine, clamp responsivo.

---

## 📦 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/goyo-real-coffee.git
cd goyo-real-coffee
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```
Asegúrate de definir tus claves criptográficas y orígenes permitidos.

### 4. Iniciar el servidor backend de seguridad
```bash
node server/index.js
```
El servidor correrá en `http://localhost:3001`.

### 5. Iniciar el entorno de desarrollo frontend
En otra terminal:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

### 6. Compilar para producción
```bash
npm run build
```

---

## 📄 Licencia
Distribuido bajo la Licencia MIT. Consulta `LICENSE` para más información.
