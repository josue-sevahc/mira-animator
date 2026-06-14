# Agentes útiles

La cadena de contenido que alimenta el montaje. Mira cómo se conectan en el [Pipeline de agentes](../pipeline.md).

## `/mira-extract`
El extractor de contexto. Lee una fuente vinculada en `mira.config.json` (carpeta de proyecto, PDF, LaTeX o texto) y produce un briefing estructurado que alimenta al planner. Primer eslabón de la cadena.

## `/mira-planner`
Planificador de contenido. Analiza el contenido de un capítulo (LaTeX, PDF o texto) y produce un plan de slides detallado **antes** de cualquier montaje visual — cuántos slides, qué cubre cada uno, la estructura — y espera aprobación.

## `/mira-copywriter`
Refina el texto de los slides y especifica imágenes, bajando el texto a la altura de slide (corto, directo, presentable) en vez de la altura de párrafo.

## `/mira-validator`
Analiza el HTML generado y valida conformidad visual, estructural y de assets — un reporte final de calidad. Ejecútalo después de un montaje, o para diagnosticar un deck existente.
