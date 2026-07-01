import { join, resolve, dirname, basename } from 'path';
import { existsSync, statSync, readFileSync, writeFileSync, cpSync } from 'fs';
import { MIRA_ROOT, PROJECT_ROOT } from '../utils/paths.js';

/*
  npx mira-animator edit <deck>

  Aplica o modo edição (reordenar slides) num deck que já existe, sem
  regerá-lo. Copia mira-edit.js pra pasta do deck e injeta o
  <script src="mira-edit.js"> antes de </body> caso ainda não exista.

  <deck> pode ser:
    - o nome do deck   (procura em decks/<nome>/index.html)
    - a pasta do deck  (usa <pasta>/index.html)
    - o próprio .html
*/
export default async function editDeck(args) {
  const positional = args.filter(a => !a.startsWith('--'));
  const target = positional[0];

  if (!target) {
    console.error('\n  Uso: npx mira-animator edit <deck>');
    console.error('  <deck> = nome do deck, pasta do deck ou caminho do index.html\n');
    process.exit(1);
  }

  // resolve o index.html do deck
  const abs = resolve(PROJECT_ROOT, target);
  let indexPath;
  if (existsSync(abs) && statSync(abs).isFile() && /\.html?$/i.test(abs)) {
    indexPath = abs;
  } else if (existsSync(abs) && statSync(abs).isDirectory()) {
    indexPath = join(abs, 'index.html');
  } else {
    indexPath = join(PROJECT_ROOT, 'decks', target, 'index.html');
  }

  if (!existsSync(indexPath)) {
    console.error(`\n  Não encontrei o deck: ${indexPath}`);
    console.error('  Passe o nome do deck (decks/<nome>) ou o caminho do index.html.\n');
    process.exit(1);
  }

  const deckDir = dirname(indexPath);

  // 1. copia o editor pra pasta do deck (sempre por cima, pra atualizar)
  const editorSrc = join(MIRA_ROOT, 'templates', 'authoring', 'mira-edit.js');
  if (!existsSync(editorSrc)) {
    console.error('\n  Editor não encontrado em templates/authoring/mira-edit.js.');
    console.error('  Rode "npx mira-animator update" e tente de novo.\n');
    process.exit(1);
  }
  cpSync(editorSrc, join(deckDir, 'mira-edit.js'));

  // 2. injeta o <script> antes de </body>, se ainda não estiver referenciado
  let html = readFileSync(indexPath, 'utf8');
  let injected = false;
  if (!/mira-edit\.js/.test(html)) {
    const tag =
      '    <!-- Modo edição (reordenar slides): tecla E ou ?edit=1 -->\n' +
      '    <script src="mira-edit.js" defer></script>\n';
    if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, tag + '</body>');
    } else {
      html += '\n' + tag;
    }
    writeFileSync(indexPath, html, 'utf8');
    injected = true;
  }

  const rel = 'decks/' + basename(deckDir);
  console.log(`\n  Modo edição aplicado em ${indexPath.startsWith(join(PROJECT_ROOT, 'decks')) ? rel : deckDir}`);
  console.log(`  Editor:  mira-edit.js copiado para a pasta do deck`);
  console.log(`  Script:  ${injected ? 'injetado antes de </body>' : 'já estava referenciado (só atualizei o editor)'}`);
  console.log('\n  Abra o deck e aperte "E" para reordenar. Para salvar sem diálogo, sirva com:');
  console.log(`    node mira-serve.js ${deckDir}\n`);
}
