# Arquitectura de Información y Estructura del Sitio Web
## Proyecto: Goyo Real Coffee — Sitio Web Oficial y Menú Digital

| Metadato | Detalle |
| :--- | :--- |
| **Documento** | Arquitectura de Información, Rutas y Componentes |
| **Documento Base** | [PRD.md](file:///c:/Users/Administrator/Downloads/Goyo%20Real%20Coffe/PRD.md) |
| **Versión** | 1.0.0 |
| **Objetivo** | Servir como plano estructural directo para la etapa de wireframes y desarrollo técnico posterior |

---

## 1. Estrategia de Arquitectura y Enrutamiento

Para responder con máxima eficiencia a los objetivos del PRD (descubrimiento local ágil, experiencia fluida y visualización rápida en mesa mediante código QR), se define un modelo de **Landing Page Principal (SPA)** con navegación por anclajes semánticos, complementado con una **Ruta Específica de Menú Digital**:

```
[Dominio Base]
│
├── / (Ruta Principal: Experiencia de Marca, Descubrimiento y Conversión Local)
│   ├── #inicio (Hero & Propuesta de Valor)
│   ├── #concepto (Tu Tercer Lugar & Diferenciadores)
│   ├── #menu (Carta Interactiva Categorizada)
│   ├── #galeria (Ambiente, Bebidas y Factor Humano)
│   ├── #resenas (Prueba Social y Calificación Google 4.5★)
│   └── #visitanos (Ubicación, Horarios, Mapa y Contacto)
│
└── /menu (Ruta Dedicada: Menú Digital para QR en Mesa / Acceso Rápido)
    └── Vista limpia, de carga ultra ligera, centrada exclusivamente en la consulta de productos y precios.
```

---

## 2. Mapa de Recorridos de Usuario (User Journeys)

Se diseñan tres flujos principales basados estrictamente en los perfiles y necesidades validadas en el PRD:

### Recorrido A: Descubrimiento Local desde Buscadores (Google Search / Maps)
* **Punto de entrada:** Búsqueda orgánica (*"cafetería aesthetic Hermosillo"*, *"matcha Hermosillo"*).
* **Paso 1:** Llega a `/` (`#inicio`). Visualiza el H1, los badges de confianza (4.5★ en Google Maps) y el indicador dinámico de estado (*"Abierto ahora"*).
* **Paso 2:** Hace scroll o clic en *"Explorar Menú"* (`#menu`) para validar la oferta artesanal (matcha auténtico, café de especialidad, jarabes caseros) y el rango de precio informado ($100–$200 MXN).
* **Paso 3:** Se desplaza a `#visitanos`. Verifica la dirección exacta (esquina Nayarit y Yáñez), el horario de hoy y pulsa el CTA *"Cómo Llegar"* para abrir Google Maps en su teléfono.
* **Resultado:** Visita presencial generada con expectativas de aforo y precio claras.

### Recorrido B: Tráfico Referido de Redes Sociales (Link en Bio de Instagram)
* **Punto de entrada:** Enlace en la biografía de `@goyorealcoffee`.
* **Paso 1:** Aterriza en `/` desde un navegador integrado en móvil.
* **Paso 2:** Busca confirmar información práctica que Instagram fragmenta: horarios completos, dirección con mapa interactivo y lista de bebidas disponibles.
* **Paso 3:** Consulta la sección `#resenas` y `#concepto` para validar la atmósfera del "tercer lugar".
* **Paso 4:** Utiliza el botón de contacto para comunicarse vía telefónica o WhatsApp para consultar dudas específicas del día.
* **Resultado:** Reducción de fricción de consulta y canalización a visita o contacto.

### Recorrido C: Cliente In-Situ en Mesa o Barra (Modo Menú QR)
* **Punto de entrada:** Escaneo físico del código QR en las mesas del local hacia `/menu`.
* **Paso 1:** Carga instantánea de la vista de menú sin elementos pesados de cabecera o marketing innecesario.
* **Paso 2:** Navega rápidamente entre pestañas de categorías: *Matcha & Tés*, *Café de Especialidad*, *Jarabes Caseros & Temporada*, *Postres & Menú del Día*.
* **Paso 3:** Lee ingredientes, notas de preparación y distintivos de favoritos para decidir su pedido antes de ser atendido por el barista.
* **Resultado:** Disminución del tiempo de espera en mostrador y alivio operativo en horas pico con personal reducido.

---

## 3. Jerarquía de Contenido por Sección (Página Principal `/`)

A continuación se detalla el árbol jerárquico de información y elementos funcionales para cada sección de la landing page:

### 3.1. Encabezado Global (Header / Navbar)
* **Tipo:** Barra de navegación fija (*sticky*), semántica (`<header><nav>`).
* **Elementos y Contenido:**
  1. **Marca:** Logotipo y nombre comercial: *Goyo Real Coffee*.
  2. **Widget Dinámico de Estado:** Indicador en tiempo real (*"Abierto ahora"* / *"Cerrado ahora"* con desglose del horario de apertura correspondiente según la hora local de Hermosillo).
  3. **Menú de Enlaces:**
     * Concepto (`#concepto`)
     * Menú (`#menu`)
     * Galería (`#galeria`)
     * Reseñas (`#resenas`)
     * Ubicación & Horarios (`#visitanos`)
  4. **CTA Primario de Acción:** Botón directo a Menú (`#menu`).
  5. **Disparador Móvil:** Botón de menú hamburguesa accesible para pantallas pequeñas.

---

### 3.2. Sección Hero (`#inicio`)
* **Jerarquía Semántica:**
  * **H1:** *"Un lugar para pausar y sentir. Tu esquina favorita en Hermosillo."*
  * **Bajada / Párrafo:** Café de especialidad, matcha auténtico y jarabes caseros en un ambiente diseñado como tu tercer lugar.
* **Módulo de Prueba Rápida (Trust Badges):**
  * Badge 1: 4.5 / 5 estrellas en Google Maps (165+ opiniones).
  * Badge 2: Abierto todos los días (desde 7:00 a.m. L-V / 9:00 a.m. S-D).
  * Badge 3: Ticket promedio informado: $100–$200 MXN por persona.
* **Acciones Principales (CTAs):**
  * Botón Primario: *"Explorar Menú"* (scroll a `#menu`).
  * Botón Secundario: *"Cómo Llegar"* (enlace externo a Google Maps con geolocalización de la cafetería).
* **Recurso de Soporte:** Imagen/recurso representativo del producto insignia (matcha latte o café con latte art) y el ambiente interior.

---

### 3.3. Sección Concepto e Identidad (`#concepto`)
* **Jerarquía Semántica:**
  * **H2:** *"Tu Tercer Lugar: Una Esquina Pequeña para Pausar y Sentir"*
  * **Párrafo Introductorio:** Explicación del concepto de tercer lugar (el espacio de desconexión entre el trabajo y el hogar).
* **Matriz de Pilares / Diferenciadores (Grid de 4 bloques):**
  1. **Matcha 100% Auténtico:** Preparación genuina con sabor intenso y natural, calificado por los visitantes como insuperable.
  2. **Café de Especialidad:** Granos seleccionados, extracción precisa y bebidas elaboradas con técnica artesanal.
  3. **Jarabes Caseros y Sabores de Temporada:** Recetas propias hechas en casa, sin syrups industriales estandarizados.
  4. **Atención Cálida y Cercana:** Trato personalizado de baristas que buscan que cada visita sea un momento especial.
* **Cita del Propietario:**
  * Bloque de texto destacado: *"Somos una esquina pequeña pero intentamos que cada visita se sienta especial."*

---

### 3.4. Sección Menú & Especialidades (`#menu`)
* **Jerarquía Semántica:**
  * **H2:** *"Nuestra Carta y Especialidades"*
  * **Párrafo Guía:** Bebidas artesanales y alimentos preparados al momento.
  * **Nota de Transparencia:** Rango promedio de consumo: $100–$200 MXN por persona.
* **Control de Navegación de Categorías (Tabs):**
  * Pestaña 1: **Matcha & Tés** (Matcha Latte frío/caliente, Té Matcha, Foam Matcha, Té con leche).
  * Pestaña 2: **Café de Especialidad** (Espresso, Americano, Cortado, Latte, Bebidas con foam).
  * Pestaña 3: **Jarabes Caseros & Temporada** (Creaciones especiales con recetas de la casa).
  * Pestaña 4: **Postres & Menú del Día** (Galletas horneadas, repostería y opciones rotativas del día).
* **Estructura de Ficha de Producto (Tarjeta de Menú):**
  * Nombre de la bebida o alimento (H3).
  * Descripción de ingredientes y perfil de sabor.
  * Etiqueta de distinción (ej. *"Insignia de la Casa"*, *"Temporada"*).
* **Módulo de Acción Rápida:**
  * Botón para cambiar a vista dedicada de pantalla completa o descargar/compartir enlace QR.

---

### 3.5. Sección Galería & Ambiente (`#galeria`)
* **Jerarquía Semántica:**
  * **H2:** *"El Espacio y la Experiencia"*
  * **Párrafo:** Momentos, tazas y la calidez de nuestra esquina.
* **Estructura de Visualización:**
  * Grid accesible de imágenes optimizadas con descripciones textuales alternativas (`alt`):
    * Fotografías de bebidas (Matcha latte con foam denso, café servido).
    * Tomas del espacio interior (mesas de lectura, luz natural, detalles íntimos).
    * Tomas de barismo en acción (preparación y cuidado en barra).
* **CTA Social:**
  * Enlace con icono a Instagram: *"Síguenos en @goyorealcoffee para ver los especiales del día"*.

---

### 3.6. Sección Reseñas y Prueba Social (`#resenas`)
* **Jerarquía Semántica:**
  * **H2:** *"Lo que Dicen Quienes Nos Visitan"*
* **Módulo Central de Reputación:**
  * Puntuación promedio: `4.5 / 5.0` estrellas.
  * Base de opiniones: `165 reseñas verificadas en Google Maps`.
* **Tarjetas de Testimonios Comprobados (Citas literales de la investigación):**
  * Testimonio 1: Respaldo de calidad de matcha (*"El matcha latte es 1000/10, realmente sabe a matcha"*).
  * Testimonio 2: Respaldo de atención y baristas (*"Personal amable y atento, baristas bien buena onda, excelente servicio"*).
  * Testimonio 3: Respaldo de estética y atmósfera (*"Amé la estética de este lugar, ambiente muy acogedor"*).
  * Testimonio 4: Respaldo de diferenciación artesanal (*"Los jarabes caseros y los sabores únicos de temporada son un plus"*).
* **Enlace de Validación:**
  * Botón secundario: *"Ver todas las opiniones en Google Maps"*.

---

### 3.7. Sección Ubicación, Horarios & Visítanos (`#visitanos`)
* **Jerarquía Semántica:**
  * **H2:** *"Visítanos en Nuestra Esquina"*
  * **Párrafo:** Te esperamos todos los días para tu pausa de café o matcha.
* **Bloque de Datos Esenciales:**
  * **Dirección Completa:** Av. Nayarit y Yáñez 102, Colonia Nayarit, C.P. 83190, Hermosillo, Sonora.
  * **Botón Interactivo:** *"Copiar dirección"* (para pegar en apps de movilidad).
  * **Código Plus:** `32VR+VG Hermosillo, Sonora`.
  * **Horarios Desglosados:**
    * Lunes a Viernes: `7:00 a.m. – 9:00 p.m.`
    * Sábados y Domingos: `9:00 a.m. – 9:00 p.m.`
    * Indicador de recordatorio: *"Abierto todos los días"*.
  * **Canales de Contacto Directo:**
    * Teléfono de contacto: `662 355 7949` (con enlace nativo `tel:`).
    * Mensajería directa: Botón para abrir chat con mensaje predeterminado.
* **Bloque de Mapa:**
  * Mapa embebido interactivo centrado exactamente en la intersección de Nayarit y Yáñez.
  * Botón flotante o sobre el mapa: *"Cómo llegar en Google Maps"*.

---

### 3.8. Pie de Página Global (Footer)
* **Estructura Semántica:** `<footer>`.
* **Contenido:**
  * Logotipo resumido de *Goyo Real Coffee*.
  * Tagline oficial: *"Un lugar para pausar y sentir. Tu esquina favorita. Tu tercer lugar."*
  * Enlaces de navegación rápida a las secciones principales.
  * Datos esenciales de contacto (teléfono, dirección, enlace a Instagram).
  * Aviso de propiedad intelectual y año de vigencia.

---

## 4. Jerarquía de Contenido de la Ruta Dedicada (`/menu`)

Esta vista responde directamente al requerimiento **RF-06 (Modo Menú QR)** y al **Recorrido C (Cliente In-Situ)**:

1. **Barra Superior Minimalista:**
   * Nombre del local (*Goyo Real Coffee*).
   * Enlace discreto para volver a la página principal (*"← Volver al sitio principal"*).
2. **Encabezado del Menú:**
   * Título: *"Menú Digital"*
   * Rango de ticket informado: $100–$200 MXN.
   * Aviso sobre consultar especialidades del día directamente en barra con los baristas.
3. **Selector Rápido de Categorías:**
   * Filtros horizontales de acceso táctil con anclaje inmediato:
     * *Matcha & Tés*
     * *Café de Especialidad*
     * *Jarabes & Temporada*
     * *Postres*
4. **Listado Completo y Continuo de Productos:**
   * Listado vertical agrupado por categoría, optimizado para lectura en pantallas móviles y con bajo consumo de datos.
5. **Cierre de Página:**
   * Recordatorio de amabilidad del personal: *"¿Tienes dudas o buscas una recomendación? Nuestros baristas están listos para ayudarte en barra"*.

---

## 5. Catálogo y Especificación de Componentes

Para asegurar un desarrollo modular, reutilizable y escalable, se definen los siguientes componentes desacoplados de estilo:

| Componente | Responsabilidad | Propiedades / Datos de Entrada | Elementos que lo Componen |
| :--- | :--- | :--- | :--- |
| **`HeaderNavbar`** | Gestionar la navegación principal, el acceso rápido a secciones y el estado de servicio. | `currentStatus` (Abierto/Cerrado), `navLinks` | Contenedor semántico, logo, lista de enlaces, botón de acción, badge de estado, botón hamburguesa. |
| **`StatusBadge`** | Calcular y mostrar si el local está abierto o cerrado según la hora local de Hermosillo. | `businessHours` (L-V 7-21, S-D 9-21), `currentTime` | Indicador visual de estado, texto dinámico (*"Abierto ahora"* / *"Cerrado: abre mañana 7:00 am"*). |
| **`TrustBadge`** | Mostrar credenciales clave de forma concisa. | `iconType`, `title`, `subtitle` | Icono representativo, etiqueta de texto principal, texto secundario. |
| **`ConceptCard`** | Presentar cada pilar de valor de la cafetería. | `title`, `description`, `iconIdentifier` | Encabezado H3, párrafo descriptivo, marcador de icono temático. |
| **`MenuTabs`** | Permitir la conmutación entre categorías de la carta sin recargar la página. | `categories`, `activeCategory`, `onSelectCategory` | Barra de botones de categoría accesibles mediante atributos ARIA (`role="tablist"`). |
| **`MenuItemCard`** | Representar un producto individual del menú con sus particularidades. | `name`, `description`, `badgeText` (opcional), `isFavorite` | Título del producto (H3/H4), descripción de preparación, distintivo contextual. |
| **`GalleryGrid`** | Presentar la colección visual de productos y espacio de forma ordenada y accesible. | `imagesList` (`src`, `altText`, `caption`, `category`) | Contenedor de cuadrícula adaptable, imágenes con lazy loading y textos alternativos descriptivos. |
| **`ReviewCard`** | Presentar una reseña auténtica extraída de la investigación. | `quoteText`, `authorName`, `ratingScore`, `sourcePlatform` | Puntuación en estrellas, texto de la reseña entrecomillado, firma del autor, badge de Google Maps. |
| **`HoursTable`** | Desglosar los horarios semanales de forma clara y sin ambigüedades. | `scheduleData` | Tabla o lista de definición (`<dl>`) con pares día-horario y resaltado del día en curso. |
| **`MapEmbed`** | Renderizar el mapa de localización interactivo. | `coordinates`, `plusCode`, `embedUrl` | Iframe accesible con título descriptivo y botón de enlace externo a GPS. |
| **`ContactActionGroup`** | Agrupar las vías de contacto y acción inmediata. | `phoneNumber`, `whatsappLink`, `addressText` | Botón de llamada (`tel:`), botón de mensajería externa, botón de copiar dirección. |
| **`FloatingActions`** | Botón flotante de acceso rápido visible durante todo el scroll. | `whatsappUrl`, `qrMenuUrl` | Botón táctil flotante con anclaje a contacto directo o menú. |
| **`Footer`** | Contener los enlaces finales, el resumen de marca y créditos legales. | `legalInfo`, `socialLinks`, `brandSummary` | Contenedor `<footer>`, enlaces estructurados, copyright. |

---

## 6. Accesibilidad Estructural y SEO Técnico

### 6.1. Estructura de Encabezados (Heading Hierarchy)
* **Un único H1 por página:**
  * En `/`: `H1: "Un lugar para pausar y sentir. Tu esquina favorita en Hermosillo."`
  * En `/menu`: `H1: "Menú Digital — Goyo Real Coffee"`
* **Nivel H2 para cada bloque principal:**
  * `#concepto` -> `H2: "Tu Tercer Lugar: Una Esquina Pequeña para Pausar y Sentir"`
  * `#menu` -> `H2: "Nuestra Carta y Especialidades"`
  * `#galeria` -> `H2: "El Espacio y la Experiencia"`
  * `#resenas` -> `H2: "Lo que Dicen Quienes Nos Visitan"`
  * `#visitanos` -> `H2: "Visítanos en Nuestra Esquina"`
* **Nivel H3 para subelementos:** Títulos de pilares, categorías y nombres de productos individuales.

### 6.2. Atributos Semánticos y Roles ARIA
* Regiones principales definidas con `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`.
* Navegación por pestañas de menú (`MenuTabs`) con roles `tablist`, `tab` y `tabpanel`, vinculados con `aria-selected` y `aria-controls`.
* Atributo `aria-label` en enlaces de sólo icono (WhatsApp, Instagram, botón hamburguesa).
* Textos alternativos descriptivos en todas las imágenes que aporten contexto informativo (ej. *"Taza de matcha latte con espuma densa servida en mesa de madera"* en lugar de *"foto1"*).

### 6.3. Estructura de Datos para SEO Local (Schema.org)
La página principal incorporará en su `<head>` el esquema JSON-LD:
* `@context`: `https://schema.org`
* `@type`: `CafeOrCoffeeShop`
* `name`: `Goyo Real Coffee`
* `address`:
  * `streetAddress`: `Av. Nayarit y Yáñez 102, Colonia Nayarit`
  * `addressLocality`: `Hermosillo`
  * `addressRegion`: `Sonora`
  * `postalCode`: `83190`
  * `addressCountry`: `MX`
* `telephone`: `+526623557949`
* `priceRange`: `$$` (Rango de $100–$200 MXN)
* `aggregateRating`:
  * `ratingValue`: `4.5`
  * `reviewCount`: `165`
* `openingHoursSpecification`:
  * Lunes a Viernes de 07:00 a 21:00
  * Sábado y Domingo de 09:00 a 21:00

---

## 7. Criterios de Transición hacia la Etapa de Wireframes

El presente documento establece con precisión la distribución y lógica de la información. La siguiente etapa (diseño estructural y wireframing) deberá respetar:
1. La secuencia definida de secciones sin alterar el orden del recorrido del usuario.
2. La presencia obligatoria de los elementos informativos comprobados (datos de contacto, horarios y dirección).
3. La preservación de la separación de la vista `/menu` para garantizar una respuesta operativa efectiva ante el escaneo de códigos QR en el local.
