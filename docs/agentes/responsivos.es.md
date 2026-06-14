# Agentes responsivos

Versiones cuadrada, vertical y en la regla de los tercios de un deck.

## `/mira-squared`
Genera una versión **cuadrada** (1:1, 1080×1080) de un deck a partir del original 16:9, o crea slides cuadrados desde cero. Escribe un nuevo `index-1x1.html` al lado del original (centrado por defecto, opcionalmente alineado a la izquierda/derecha). Para feed de Instagram, LinkedIn, etc.

## `/mira-vertical`
Genera una versión **vertical** (9:16). Cada slide de contenido queda solo con el título principal arriba y una animación en un canvas alto y estandarizado debajo; el título se encoge solo para caber en máximo 2 líneas, y el eje de cada animación se reformula para el retrato (flujo horizontal pasa a vertical, comparación lado a lado pasa a apilada). Escribe `index-9x16.html`. Para Reels, Shorts, TikTok, Stories.

## `/mira-thirds`
Reencuadra un deck en la **regla de los tercios** sin cambiar la proporción. Empuja el contenido de cada slide a las columnas 1 y 2 de una grilla 3×3 (los dos tercios de la izquierda) y deja la columna de la derecha libre — para que superpongas texto, lower-third o el video del presentador en la edición. Funciona sobre 16:9, 1:1 o 9:16. Escribe un archivo `-thirds`. El lado libre es la derecha por defecto; puede invertirse.
