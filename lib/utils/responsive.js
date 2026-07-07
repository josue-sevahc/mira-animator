import { readFileSync } from 'fs';
import { join } from 'path';
import { MIRA_ROOT } from './paths.js';

/*
  Camada de responsividade do Mira (reflow mobile-first).

  Fonte da verdade: templates/themes/responsive.css, delimitado por
  /* @MIRA:RESPONSIVE:START *\/ ... /* @MIRA:RESPONSIVE:END *\/.

  ensureResponsive(html) devolve o HTML garantindo:
    1. o bloco RESPONSIVE presente dentro do primeiro <style> (idempotente:
       se o marcador já existe, atualiza-o no lugar; senão injeta);
    2. o <meta viewport> com width=device-width + viewport-fit=cover.

  Serve tanto para decks novos (new.js) quanto para retrofit de legados
  (edit.js). Nunca duplica o bloco.
*/

const START = '/* @MIRA:RESPONSIVE:START */';
const END = '/* @MIRA:RESPONSIVE:END */';
const BLOCK_RE = /\/\* @MIRA:RESPONSIVE:START \*\/[\s\S]*?\/\* @MIRA:RESPONSIVE:END \*\//;

/** Lê o CSS responsivo (já com os marcadores) da fonte da verdade. */
export function loadResponsiveCss() {
  return readFileSync(join(MIRA_ROOT, 'templates', 'themes', 'responsive.css'), 'utf8').trim();
}

/**
 * Garante o bloco responsivo + meta viewport no HTML de um deck.
 * @returns {{ html: string, changed: boolean, action: 'inserted'|'updated'|'noop', viewportFixed: boolean }}
 */
export function ensureResponsive(html, css = loadResponsiveCss()) {
  let changed = false;
  let action = 'noop';

  // 1. bloco responsivo
  if (BLOCK_RE.test(html)) {
    const current = html.match(BLOCK_RE)[0];
    if (current.trim() !== css.trim()) {
      html = html.replace(BLOCK_RE, css);
      changed = true;
      action = 'updated';
    }
  } else if (/<\/style>/i.test(html)) {
    // injeta no fim do primeiro <style> (depois do tema/base, para vencer na cascata)
    html = html.replace(/<\/style>/i, `\n${css}\n</style>`);
    changed = true;
    action = 'inserted';
  } else if (/<\/head>/i.test(html)) {
    // deck sem <style> próprio: cria um antes de </head>
    html = html.replace(/<\/head>/i, `<style>\n${css}\n</style>\n</head>`);
    changed = true;
    action = 'inserted';
  }

  // 2. meta viewport (retrofit de decks antigos sem viewport-fit)
  let viewportFixed = false;
  const viewportTag = '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">';
  if (/<meta[^>]+name=["']viewport["'][^>]*>/i.test(html)) {
    const tag = html.match(/<meta[^>]+name=["']viewport["'][^>]*>/i)[0];
    if (!/viewport-fit\s*=\s*cover/i.test(tag) || !/width\s*=\s*device-width/i.test(tag)) {
      html = html.replace(tag, viewportTag);
      changed = true;
      viewportFixed = true;
    }
  } else if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/(<head[^>]*>)/i, `$1\n    ${viewportTag}`);
    changed = true;
    viewportFixed = true;
  }

  return { html, changed, action, viewportFixed };
}

export { START, END, BLOCK_RE };
