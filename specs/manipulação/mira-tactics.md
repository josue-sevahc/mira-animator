# Spec: mira-tactics (quadro tático — peças arrastáveis ao vivo)

> Ferramenta de manipulação do apresentador. Segunda frente implementada do
> `brainstormings/BRAINSTORM_MIRA_MANIPULACAO.md` (frente 1). Irmã do
> [`mira-draw`](./mira-draw.md): lá o apresentador rabisca por cima; aqui ele
> **move peças** e monta cenários ao vivo.

## Objetivo

Dar ao apresentador um **tabuleiro** onde ele arrasta peças ao vivo para montar
formações, jogadas, organogramas, fluxos, posições de xadrez, layout de loja —
como o **quadro tático** de futebol da TV ou o **Magic Wall** do telejornal. Ele
não assiste ao slide, ele **rege** o slide com as mãos.

Deve ser **nativo de qualquer apresentação do Mira**, exatamente como o modo
edição (`mira-edit.js`) e o telestrator (`mira-draw.js`): um atalho de teclado
disponível em todo deck, sem configuração por slide.

## Princípios (herdados do padrão Mira)

- **Vanilla, zero dependência.** Sem interact.js/Konva/Fabric/build. Canvas 2D puro.
- **Funciona em `file://` e offline.** Nada de CDN em runtime.
- **Camada por cima, não invasiva.** Um `<canvas>` fixo no viewport. Com a
  superfície "nenhuma", as peças ficam por cima do conteúdo e o loop de animação
  do slide segue rodando embaixo (preserva a Regra Zero).
- **Sempre reversível.** Desfazer (Ctrl+Z) e "Limpar quadro" devolvem o estado —
  o apresentador experimenta sem medo.
- **Não aparece na apresentação normal.** Só surge quando o apresentador ativa.

## Ativação

| Gatilho | Efeito |
|---------|--------|
| Tecla **`T`** (de tático) | Liga/desliga o modo quadro tático |
| **`Esc`** | Sai do modo quadro |
| **`Ctrl+Z`** / `Cmd+Z` | Desfaz a última ação |
| `?tactics=1` na URL | Abre já no modo quadro |

`T` foi escolhido em paralelo ao `E` do modo edição e ao `P` do desenho. A tecla
é ignorada quando o foco está num campo de texto (não dispara ao digitar).

## Ferramentas (barra à esquerda)

Mesma estética da barra do `mira-draw`:

| Ferramenta | Comportamento |
|------------|---------------|
| **Mover** | Arrasta a peça sob o cursor (padrão). A peça arrastada vem para o topo. |
| **Adicionar** | Clica no quadro e cria uma peça na cor do time atual, numerada automaticamente. |
| **Seta** | Arrasta uma seta de movimento; encaixa (snap) no centro da peça de início/fim. |
| **Apagar** | Remove a peça ou a seta tocada. |

Controles auxiliares:

- **Times (cores)**: paleta (azul, vermelho, amarelo, verde, branco, laranja
  Mira) + seletor de cor personalizada. A cor selecionada é o time da próxima
  peça adicionada.
- **Tamanho da peça**: pequena / média / grande.
- **Superfície**: **campo** de futebol · **grade** tática · **nenhuma** (peças
  por cima do slide, para organograma/fluxo/mapa).
- **Desfazer** e **Limpar quadro**.

Interações diretas:

- **Duplo-clique** numa peça → renomear o rótulo (número ou texto curto).
- **Arrastar** uma peça → reposicionar ao vivo.

## Modelo de dados

- **Peça**: `{ x, y, color, label }`. **Seta**: `{ x0, y0, x1, y1, color }`.
- **Coordenadas normalizadas (0..1 do viewport)**: peças e setas mantêm a posição
  **proporcional ao redimensionar** a janela. (Diferença deliberada em relação ao
  `mira-draw` v1, que é preso a px do viewport.)
- Raio da peça = fração de `min(W, H)` → escala junto com a tela.
- A cada mudança o canvas é **redesenhado inteiro** (superfície → setas → peças).
- **Desfazer** usa uma pilha de snapshots (deep clone via JSON) do estado
  `{pieces, arrows}` — cobre mover, adicionar, apagar, renomear e limpar.
- Rótulo com **contraste automático**: texto escuro sobre cor clara, branco sobre
  cor escura (luminância).
- Numeração automática por time: próxima peça = maior número existente daquela
  cor + 1.
- `touch-action: none` no canvas → funciona com caneta/toque (telas de palco).

## Superfícies

| Superfície | Uso |
|------------|-----|
| **Campo** | Gramado com faixas, linha de meio, círculo central e grandes áreas. Futebol, esporte. |
| **Grade** | Painel escuro com grade tática. Xadrez, formação abstrata, posições. |
| **Nenhuma** | Transparente: peças por cima do slide. Organograma, fluxo, mapa, mesa de reunião. |

## Arquitetura e distribuição (como fica nativo)

Segue exatamente o caminho do `mira-draw.js` / `mira-edit.js`:

1. **Fonte-verdade**: `templates/authoring/mira-tactics.js`.
2. **Deck novo** (`mira new`): `lib/commands/new.js` copia `mira-tactics.js` para a
   pasta do deck; os templates de deck já referenciam
   `<script src="mira-tactics.js" defer></script>` antes de `</body>`.
3. **Deck existente** (`mira edit <deck>`): `lib/commands/edit.js` copia o
   `mira-tactics.js` e injeta o `<script>` se ainda não houver (retrofit).
4. **Install/update**: `lib/installer/writer.js` já distribui a pasta
   `authoring/` inteira, então o `mira-tactics.js` chega ao usuário junto.

Resultado: todo deck gerado ou atualizado passa a ter o quadro tático, sem passo
manual — igual ao modo edição e ao desenho.

## Limitações conhecidas (v1)

- **Peças presas ao viewport**, não ao slide: ao rolar a página, o quadro não
  acompanha. Fluxo esperado: montar o cenário na tela atual.
- **Sem persistência**: o cenário vive só na sessão; não é salvo no arquivo.
- **Superfície não editável por slide**: escolhida ao vivo pela barra, não fica
  gravada no HTML.
- **Setas retas** (sem curvas) e **sem rótulo na seta**.

## Evoluções futuras (fora do escopo v1)

- **Presets de formação** (4-4-2, 4-3-3) e "espalhar peças" com um clique.
- **Salvar/restaurar** o cenário montado (padrão do `mira-serve.js`).
- **Ancorar as peças ao slide** (acompanha o scroll; um "layer" por slide).
- **Setas curvas** e rótulo na seta ("passe", "corta").
- **Peça com foto/escudo** (avatar) além de círculo colorido.
- Ponte com gestos (frente 12): pinça = pegar e arrastar peça.

## Arquivos

| Arquivo | Papel |
|---------|-------|
| `templates/authoring/mira-tactics.js` | Fonte-verdade do mira-tactics |
| `lib/commands/new.js` | Copia o script em deck novo |
| `lib/commands/edit.js` | Retrofit em deck existente |
| `templates/decks/*/index.html` | Referenciam o `<script>` |
| `decks/apresentacao-mira-gsap/mira-tactics-demo.html` | Página de teste isolada |

## Status

v1 implementada em 2026-07-04. Ativação por `T`, nativa em todo deck.
