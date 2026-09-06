# Concepto Visual y Sistema de Diseño Combinado
## Goyo Real Coffee — "The Indie Coffee Zine meets Twilight Editorial"

> **Fusión estilística:** La autenticidad artesanal, táctil y lúdica de un fanzine de café (*Touchy Coffee*) combinada con la elegancia tipográfica de una revista editorial retro (*Portal*).

---

## 1. Filosofía y Atmósfera de la Marca

**Goyo Real Coffee** no es una cadena corporativa fría ni una startup genérica: es *"tu esquina favorita, tu tercer lugar"*. 

Este sistema de diseño fusiona dos corrientes visuales contemporáneas con fuerte personalidad:
1. **La calidez analógica del Coffee Zine (*Touchy Coffee*):** Bandas de color arquitectónicas de pared completa (terracota arcilloso, verde matcha orgánico, crema tostado, cielo sereno), controles en cápsula extrema (*extreme pill* de 100px), etiquetas monospaciadas con sabor a máquina de escribir y bolsas de café de especialidad.
2. **La sofisticación editorial (*Portal*):** Titulares display en una serif retro contundente (*Playfair Display / Recoleta*), cápsula de navegación flotante minimalista con bordes nítidos de 1px y halos suaves, combinada con micro-interacciones sutiles que le otorgan un aire literario, pausado e íntimo.

---

## 2. Tokens — Paleta de Color (The Earthy Editorial Palette)

La paleta abandona los fondos neutros estériles para trabajar con **bandas de color completas** (*color bands*) y tarjetas de papel crema de alto contraste.

| Nombre | Valor HEX | Variable CSS | Rol y Aplicación en Goyo |
| :--- | :--- | :--- | :--- |
| **Ink Black** | `#1A1613` | `--color-ink` | Tinta tipográfica principal, bordes estructurales de 1.5px, botones pill invertidos |
| **Matcha Moss** | `#4A6B4A` | `--color-matcha` | Verde matcha ceremonial auténtico; color de acento funcional y badges insignia |
| **Terracotta Roast** | `#9F4920` | `--color-terracotta` | Banda cálida de café tostado y arcilla; fondo de la sección Hero e identidad de grano |
| **Sage Canvas** | `#788C8C` | `--color-sage` | Banda neutra terrosa dominante; canvas para la sección del Menú y la Carta |
| **Cream Paper** | `#FAF7F2` | `--color-cream` | Superficie de lectura de tarjetas, inputs y fondos base; blanco cálido sin brillo digital |
| **Buttery Sunshine** | `#FFF78F` | `--color-sunshine` | Franja de transición luminosa y estrellas de calificación en reseñas |
| **Sky Dawn** | `#D0EAF4` | `--color-sky` | Banda fresca y aireada para la sección de Visítanos / Tercer Lugar |
| **Lavender Mist** | `#A697C6` | `--color-lavender` | Acento violeta sutil para bordes de etiquetas especiales y horas pico |
| **Signal Action** | `#1D6A42` | `--color-signal` | Verde profundo de interacción para WhatsApp y botones de acción primaria |

---

## 3. Tokens — Tipografía Híbrida (Editorial Serif + Craft Monospace)

El sistema utiliza una fórmula tipográfica rigurosa de dos voces contrastantes:

```
[ Titulares H1 / H2 ]  →  Playfair Display / Recoleta (Retro Serif Editorial)
[ UI / Precios / Tags ] →  Space Mono / Apercu Mono (Typewriter Craft Monospace)
[ Lectura Corrida ]    →  Inter / Space Grotesk (Legibilidad óptima con tracking ajustado)
```

### 3.1. Display & Titulares — *Retro Serif Editorial*
* **Fuente:** `'Playfair Display', Recoleta, Georgia, serif` (`--font-display-serif`)
* **Uso exclusivo:** Display H1 (44–56px) y títulos de sección H2 (32–40px), con `line-height: 1.05` y peso 600–700.
* **Intención:** Transmite pausa, literatura, aroma de café y personalidad de revista independiente.

### 3.2. Controles, Precios y Metadatos — *Craft Monospace*
* **Fuente:** `'Space Mono', 'Apercu Mono', monospace` (`--font-mono`)
* **Uso:** Navegación, botones pill, precios, badges de origen, ingredientes, etiquetas de horarios y notas técnicas.
* **Intención:** Remite al etiquetado directo sobre bolsas de café en grano, sellos de aduana y cartas tipeadas a máquina.

### 3.3. Escala Tipográfica

| Nivel | Tamaño | Altura de Línea | Familia Tipográfica | Token |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | 48px – 56px | 1.05 | Serif Retro | `--text-display` |
| **Heading H2** | 32px – 38px | 1.15 | Serif Retro | `--text-h2` |
| **Heading H3** | 20px – 22px | 1.25 | Mono / Serif | `--text-h3` |
| **Body UI** | 15px – 16px | 1.55 | Inter / Sans | `--text-body` |
| **Mono Label** | 12px – 14px | 1.20 | Space Mono | `--text-mono` |
| **Badge Micro**| 11px | 1.10 | Space Mono Bold | `--text-micro` |

---

## 4. Tokens — Formas, Bordes y Radios

El contraste formal entre botones y contenedores es la firma del sistema:

* **Controles y Botones (*Extreme Pill*):** `border-radius: 100px` obligatorio para todos los botones, inputs, badges y selectores.
* **Tarjetas y Marcos de Imagen (*Soft Rounded Square*):** `border-radius: 20px – 24px` para contenedores de contenido y fotografías.
* **Cápsula de Navegación Flotante:** `border-radius: 100px` con padding de cápsula suspendida.
* **Bordes:** Líneas sólidas de `1.5px` en `#1A1613` (Ink) sobre superficies pintadas, y `1px` sutil con halo de luz sobre blanco.
* **Elevación:** Cero sombras oscuras degradadas. Se utiliza la técnica del **Soft Glow Ring** (`0 0 0 4px rgba(255,255,255,0.6)` o `0 0 0 1px #1A1613`), manteniendo la estética plana y editorial.

---

## 5. Arquitectura de Bandas Cromáticas (Color Band System)

El sitio fluye a través de una secuencia rítmica de superficies a sangre completa (*full-bleed*):

```
┌────────────────────────────────────────────────────────┐
│  [Nav Capsule Flotante]                                │
│  BANDA 1: Terracotta (#9F4920) ── Hero & Manifiesto    │
├────────────────────────────────────────────────────────┤
│  BANDA 2: Cream Paper (#FAF7F2) ── Concepto & Pilares   │
├────────────────────────────────────────────────────────┤
│  BANDA 3: Sage Canvas (#788C8C) ── Menú & Carta Craft  │
├────────────────────────────────────────────────────────┤
│  BANDA 4: Sunshine Band (#FFF78F) ── Banner Marquee    │
├────────────────────────────────────────────────────────┤
│  BANDA 5: Sky Dawn (#D0EAF4) ── Reseñas & Comunidad    │
├────────────────────────────────────────────────────────┤
│  BANDA 6: Cream Paper (#FAF7F2) ── Ubicación & Horario │
├────────────────────────────────────────────────────────┤
│  BANDA 7: Ink Black (#1A1613) ── Footer Editorial      │
└────────────────────────────────────────────────────────┘
```

---

## 6. Catálogo de Componentes Fusionados

### 6.1. Cápsula de Navegación Flotante (`FloatingNavCapsule`)
* **Estructura:** Píldora suspendida a 16px del borde superior, fondo blanco crema translúcido (`rgba(250,247,242,0.92)` con `backdrop-filter`), borde de 1.5px en tinta negra y radio de 100px.
* **Elementos:** Logotipo con tipografía serifa con carácter, badge de estado abierto/cerrado con tipografía monospace, enlaces en Space Mono y botón de acción en píldora negra sólida.

### 6.2. Botón de Acción Extrema (`ExtremePillButton`)
* **Primario:** Fondo `#1A1613`, texto en Space Mono `#FAF7F2` en mayúsculas, radio de 100px, padding vertical 12px y horizontal 24px.
* **Secundario / Outline:** Fondo transparente o crema, borde negro de 1.5px, texto en Space Mono `#1A1613`.

### 6.3. Ficha de Menú Tipo Fanzine (`ZineProductCard`)
* **Superficie:** Tarjeta blanca crema de 20px de radio sobre el canvas Sage o Terracotta, borde limpio de 1.5px.
* **Tipografía:** Nombre de la bebida en Serif Display o Mono Bold, notas de sabor en sans-serif legible y precio en etiqueta redonda tipo sello (*Circular Stamp Label*).

### 6.4. Sello Circular de Origen (`CircularOriginStamp`)
* Círculo perfecto de 64px a 80px con texto monospaciado concéntrico (*"100% MATCHA CEREMONIAL"*, *"ESPECIALIDAD HERMOSILLO"*).

### 6.5. Tarjeta de Reseña Color-Block (`ColorBlockReview`)
* Tarjetas monocromáticas de color sólido (Moss Green o Sky Blue), estrellas sólidas en amarillo mantequilla (`#FFF78F`), autor subrayado en Space Mono y cita de cliente.

### 6.6. Marquee Ticker de Filosofía (`BrandMarquee`)
* Franja horizontal continua con texto monospaciado en mayúsculas que se desplaza suavemente: *"UN LUGAR PARA PAUSAR Y SENTIR ✦ TU ESQUINA FAVORITA ✦ TU TERCER LUGAR EN HERMOSILLO ✦ MATCHA AUTÉNTICO ✦"*.

---

## 7. Directrices de Implementación (Do's & Don'ts)

### ✅ Lo que SÍ se debe hacer:
* Emplear la **serifa retro** exclusivamente para grandes titulares H1 y H2; aporta la voz de revista y cafetería de autor.
* Usar **Space Mono** para todos los elementos funcionales (botones, precios, horarios, navegación, etiquetas).
* Aplicar el color mediante **bandas completas de pared a pared** (*wall-painted bands*), dejando que el fondo cree la atmósfera de cada sección.
* Diseñar todos los botones, inputs y píldoras interactivas con `border-radius: 100px`.
* Mantener los bordes en tinta negra sólida de 1.5px para dar una sensación táctil de papel impreso.

### ❌ Lo que NO se debe hacer:
* No usar esquinas cuadradas afiladas (0–4px) en botones ni tarjetas.
* No utilizar sombras proyectadas oscuras y difusas estilo software SaaS; el volumen se logra por contraste de color y líneas definidas.
* No colocar textos en serifa pequeña para párrafos largos; la lectura fluida requiere sans-serif limpia.
* No usar fondos uniformemente blancos en toda la página; cada sección debe habitar su propia banda de color.
