# Spec: mira-draw (desenho ao vivo sobre o slide)

> Ferramenta de manipulação do apresentador. Referência visual:
> [`ferramentas.png`](./ferramentas.png). Primeira frente implementada do
> `BRAINSTORM_MIRA_MANIPULACAO.md` (frente 6).

## Objetivo

Permitir que o apresentador **desenhe e escreva por cima do slide ao vivo**,
como o rabisco do replay esportivo na TV. Caneta, marca-texto,
setas, formas e texto sobre qualquer conteúdo, sem alterar o slide embaixo.

Deve ser **nativo de qualquer apresentação do Mira**, exatamente como o modo
edição (`mira-edit.js`): um atalho de teclado disponível em todo deck, sem
configuração por slide.

## Princípios (herdados do padrão Mira)

- **Vanilla, zero dependência.** Sem Fabric.js/React/build. Canvas 2D puro.
- **Funciona em `file://` e offline.** Nada de CDN em runtime.
- **Camada por cima, não invasiva.** Um `<canvas>` fixo no viewport; o conteúdo
  e o loop de animação do slide seguem rodando embaixo (preserva a Regra Zero).
- **Não aparece na apresentação normal.** Só surge quando o apresentador ativa.

## Ativação

| Gatilho | Efeito |
|---------|--------|
| Tecla **`P`** (de pintura) | Liga/desliga o modo desenho |
| **`Esc`** | Sai do modo desenho |
| **`Ctrl+Z`** / `Cmd+Z` | Desfaz a última ação |
| `?draw=1` na URL | Abre já no modo desenho |

`P` foi escolhido por paralelo com o `E` do modo edição. A tecla é ignorada
quando o foco está num campo de texto (não dispara ao digitar).

## Ferramentas (barra à esquerda)

Espelham a `ferramentas.png`:

| Ferramenta | Comportamento |
|------------|---------------|
| **Caneta** | Traço livre (freehand) |
| **Marca-texto** | Traço livre grosso e semitransparente |
| **Linha** | Reta de A a B |
| **Seta** | Reta com ponta (o "mira-draw" clássico) |
| **Retângulo** | Retângulo vazado (só contorno) |
| **Círculo** | Elipse vazada (só contorno) |
| **Texto** | Clica e digita; Enter confirma, Esc cancela |
| **Borracha** | Apaga por objeto (remove a forma tocada inteira) |

Controles auxiliares:

- **Cores**: paleta (laranja Mira, branco, vermelho, azul, amarelo, verde, roxo)
  + seletor de cor personalizada.
- **Espessura**: fina / média / grossa (3, 6, 12 px).
- **Desfazer** e **Limpar tudo**.

## Modelo de desenho

- Cada forma é um objeto (`{type, color, width, points|geometria}`) num array.
- A cada mudança o canvas é **redesenhado inteiro** a partir do array — garante
  redraw correto no resize e no desfazer.
- **Desfazer** usa uma pilha de snapshots do array (cobre também a borracha).
- **Borracha por objeto**: hit-test por distância ponto→segmento; remove a forma
  inteira tocada (não apaga pixel a pixel). Simples e previsível no palco.
- Coordenadas em px do viewport; canvas escala por `devicePixelRatio`.
- `touch-action: none` no canvas → funciona com caneta/toque (telas de palco).

## Arquitetura e distribuição (como fica nativo)

Segue o mesmo caminho do `mira-edit.js`:

1. **Fonte-verdade**: `templates/authoring/mira-draw.js`.
2. **Deck novo** (`mira new`): `lib/commands/new.js` copia `mira-draw.js` para a
   pasta do deck; os templates de deck já referenciam
   `<script src="mira-draw.js" defer></script>` antes de `</body>`.
3. **Deck existente** (`mira edit <deck>`): `lib/commands/edit.js` copia o
   `mira-draw.js` e injeta o `<script>` se ainda não houver (retrofit).
4. **Install/update**: `lib/installer/writer.js` já distribui a pasta
   `authoring/` inteira, então o `mira-draw.js` chega ao usuário junto.

Resultado: todo deck gerado ou atualizado passa a ter o mira-draw, sem passo
manual — igual ao modo edição.

## Limitações conhecidas (v1)

- **Anotações presas ao viewport**, não ao slide: ao rolar a página, o desenho
  não acompanha. Fluxo esperado: anotar a tela atual, limpar antes de avançar.
- **Sem seleção/mover objeto** depois de desenhado (a borracha remove; não move).
- **Sem persistência**: o desenho vive só na sessão; não é salvo no arquivo.

## Evoluções futuras (fora do escopo v1)

- Ancorar o desenho ao slide (acompanha o scroll; um "layer" por slide).
- Ferramenta de seleção/mover objeto (aproxima do quadro tático, frente 1).
- Salvar/restaurar anotações (padrão do `mira-serve.js`).
- Reta/forma com "snap" e cores por time (ponte com o `/mira-board`).

## Arquivos

| Arquivo | Papel |
|---------|-------|
| `templates/authoring/mira-draw.js` | Fonte-verdade do mira-draw |
| `lib/commands/new.js` | Copia o script em deck novo |
| `lib/commands/edit.js` | Retrofit em deck existente |
| `templates/decks/*/index.html` | Referenciam o `<script>` |
| `decks/apresentacao-mira-gsap/mira-draw-demo.html` | Página de teste isolada |

## Status

v1 implementada em 2026-07-04. Ativação por `P`, nativa em todo deck.
