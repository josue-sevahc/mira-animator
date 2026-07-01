# Formatos de vídeo

Un deck 16:9 es la fuente de verdad. A partir de él, Mira genera archivos extra para otras proporciones, transiciones y video — **sin nunca tocar el original**. Cada agente de formato escribe un nuevo archivo al lado del `index.html`.

```
decks/mi-clase/
├── index.html              # el deck 16:9 original
├── index-1x1.html          # mira-squared
├── index-9x16.html         # mira-vertical
├── index-thirds.html       # mira-thirds
├── index-dissolve.html     # mira-transition-dissolve
└── clase.mp4               # mira-slide-to-video
```

## Cuadrado — `/mira-squared`

Una versión **1:1 (1080×1080)**, para el feed de Instagram, LinkedIn y otros espacios cuadrados. Fija cada slide en el marco cuadrado y reduce los espacios laterales, con marco fijo y ajuste ligero. Centrado por defecto, con opción de alinear a la izquierda o a la derecha. También puede crear slides cuadrados desde cero en la geometría nativa cuando no hay deck de origen.

→ `index-1x1.html`

## Vertical — `/mira-vertical`

Una versión **9:16 (1080×1920)**, para Reels, Shorts, TikTok y Stories. Cada slide de contenido se reduce a solo el título principal arriba y un canvas de animación alto y estandarizado debajo — subtítulo, header del card y píldoras de la base salen, y el título se encoge solo hasta caber en máximo 2 líneas. El movimiento clave: el **eje de cada animación se reformula para el retrato** (un flujo horizontal pasa a vertical, una elipse ancha pasa a alta, una comparación lado a lado pasa a apilada). Texto, colores, timings y el bucle quedan intactos — solo cambian posición, eje y altura del viewBox. Fuera de la columna, el fondo queda `#333333`.

→ `index-9x16.html`

!!! tip "Aumentar elementos en vertical"
    En 9:16, cuando le pides a `mira-size-animator` que aumente los elementos, también reduce las distancias entre ellos para que la composición quede compacta. En 16:9, solo aumentan los elementos.

## Regla de los tercios — `/mira-thirds`

Una variante de **composición** que **no** cambia la proporción. Empuja el contenido de cada slide (título, animación y píldoras) a las columnas 1 y 2 de una grilla 3×3 — los dos tercios de la izquierda — y deja la columna de la derecha entera libre. Esa columna libre queda reservada para que superpongas texto, lower-third o el video del presentador durante la edición.

Compone sobre cualquier base: 16:9, el cuadrado 1:1 o el vertical 9:16. El lado libre es la derecha por defecto y puede invertirse a la izquierda.

→ `index-thirds.html`

## Transición disolvencia — `/mira-transition-dissolve`

Una variante de **transición**. Cambia el scroll suave entre cards por un **crossfade** real (disolvencia, estilo Canva/Keynote) usando la View Transitions API (same-document). Un slide se deshace en el otro.

Por ser same-document, funciona directo desde `file://` sin servidor (Chrome/Edge). Los navegadores sin la API simplemente navegan normalmente.

→ `index-dissolve.html`

## Slide a video: `/mira-slide-to-video`

Renderiza uno o más slides en un único **`.mp4`**, la animación real y no una captura. Abre el deck en **Chrome headless**, graba cada slide en tiempo real (la animación empieza desde cero, sin filtrar el slide anterior, encuadrada llenando el frame) y une los clips con **ffmpeg**. Eliges qué slides entran y la resolución (16:9, 9:16 o 1:1); con más de un slide, los encadena con un crossfade, 4 segundos por slide por defecto. Los slides con animación **finita**, como `mira-chart-race`, se reproducen por completo. El deck original nunca se toca.

Para un video vertical o cuadrado que llene el frame de verdad, graba el deck ya adaptado al formato: el `index-9x16.html` de `mira-vertical` o el `index-1x1.html` de `mira-squared`. Necesita **ffmpeg** en el PATH más `puppeteer` y `puppeteer-screen-recorder`, instalados a demanda.

→ `deck.mp4`

## Consejo de grabación

La forma automática de convertir cualquiera de estos en video es `/mira-slide-to-video` (arriba). Para hacerlo a mano, abre el archivo y graba la pantalla con el viewport del navegador ajustado a la resolución del formato (1920×1080, 1080×1080 o 1080×1920). Los bucles internos mantienen cada slide vivo mientras grabas.
