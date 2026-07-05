---
name: mira-tactics
description: >-
  Cria um slide de QUADRO TÁTICO no Mira: um campo/quadra de esporte com os
  times posicionados na formação, cada jogador como um círculo na cor do time
  com o NÚMERO no centro; clicar no jogador revela o NOME. O goleiro tem cor de
  uniforme própria. As ferramentas de edição ficam à mostra: mover, adicionar,
  apagar jogadores e desenhar setas de jogada, tudo ao vivo. Suporta futebol,
  futsal, vôlei, basquete, handebol e quadra genérica. Quando o usuário pede
  times reais, PERGUNTE se quer que eu busque a escalação oficial (nome, número
  e cor de goleiro) e preencha a formação. Se o usuário chamar /mira-vertical, o
  mesmo quadro é invertido para a vertical (o campo gira 90 graus). Use SEMPRE
  que o usuário disser /mira-tactics, quadro tático, prancheta tática, escalação,
  formação de time, campo de futebol com jogadores, quadra com jogadores, montar
  a jogada, posicionar os jogadores, tabuleiro tático, Magic Wall, ou pedir um
  slide com um campo/quadra e peças/jogadores posicionados. Para desenhar por
  cima de qualquer slide (telestrator) use o overlay nativo pela tecla T; para
  esta skill, o resultado é um slide dedicado.
---

# Skill: Quadro tático (campo/quadra com jogadores posicionados)

Gera um slide dedicado onde um **campo ou quadra** aparece com os **times já posicionados na formação**. Cada jogador é um círculo na cor do time, com o **número** no centro; **clicar no jogador mostra o nome**. O apresentador manipula tudo ao vivo: arrasta jogadores, adiciona, apaga e desenha setas de jogada. As **ferramentas ficam sempre à mostra**.

> **Fonte da verdade:** o motor de cenário validado é EMBARCADO no pacote e chega ao projeto junto com a instalação. Procure-o nesta ordem e use o primeiro que existir:
>
> 1. `mira-templates/decks/mesa-tatica/index.html` (projeto com Mira instalado)
> 2. `templates/decks/mesa-tatica/index.html` (repositório fonte do Mira)
> 3. `node_modules/mira-animator/templates/decks/mesa-tatica/index.html`
>
> Se nenhum existir, a instalação está desatualizada: rode `npx mira-animator update` (ou `install`) e ele aparece. **NUNCA reconstrua o motor do zero.** Gere sempre a partir dele: copie o arquivo e reescreva apenas o bloco `var TACTICS = { ... }`. Todo o desenho de campo, o clique→nome, a edição e o virar-na-vertical já vivem no motor; você só troca os dados.

> Esta skill é a **frente 1** do `brainstormings/BRAINSTORM_MIRA_MANIPULACAO.md` (quadro tático / peças arrastáveis). É irmã do overlay `mira-tactics.js` (telestrator de peças por cima de qualquer slide, tecla T) e do `mira-draw` (desenho por cima, tecla P). Aqui o resultado é um **slide próprio**, com formação e nomes reais.

## Modelo mental

O Mira não simula a partida. Ele monta um slide declarativo: uma **CONFIG** (`TACTICS`) descreve o esporte, a orientação, os times (cor, cor de goleiro, formação) e os jogadores (número + nome). O motor desenha o campo do esporte e posiciona tudo.

- **Coordenadas de campo, não de tela.** Cada jogador guarda a posição na formação; a orientação (horizontal/vertical) decide o mapeamento. Por isso **virar na vertical é só girar 90 graus** — a mesma formação serve para os dois formatos.
- **Número sempre visível, nome sob clique.** O círculo mostra o número; o nome aparece num balão ao clicar (e some ao clicar de novo ou fora).
- **Goleiro com uniforme próprio.** Cor diferente da linha, o mais fiel possível ao uniforme real.
- **Ferramentas à mostra.** Barra de edição sempre visível (mover, adicionar, seta, apagar, virar, desfazer). A tecla `T` só oculta/mostra a barra.

## Fluxo conversacional (o ponto desta skill)

> ### REGRA IMPERATIVA — sempre o ÚLTIMO JOGO, validando 3 coisas (inegociável)
> Quando o usuário cita times reais, o Mira **SEMPRE pesquisa o último jogo
> disputado de CADA time citado** (cada um pode ter jogado por último contra um
> adversário diferente) e **valida SEMPRE as 3 coisas** do XI que COMEÇOU esse
> jogo:
>
> 1. **Formação** (ex.: 4-3-3, 4-2-3-1) do time no início daquele jogo.
> 2. **Jogadores titulares** — o onze que começou (com número), não "escalação
>    provável", "time-base" nem memória. Se um titular habitual não começou
>    (lesão, rodízio, suspensão), quem entra é **quem começou de fato**.
> 3. **Posição de cada jogador** — onde cada um jogou (ponta esquerda x direita,
>    lateral, volante, centroavante). Não deduza o lado: confirme na fonte.
>    (Ex. real: Vinícius Jr. é ponta ESQUERDA, nunca direita.)
>
> **Fonte preferencial: os sites locais/oficiais de cada time** (federação ou
> imprensa local do país do time — ex.: ge.globo/CBF para o Brasil), e cruze com
> uma segunda fonte. Sempre cite as fontes e marque o que ficou como aproximação
> (número sem fonte, cor de goleiro). Vale para futebol e qualquer esporte.

Quando o usuário pedir um quadro tático com **times reais** (ex.: "campo de futebol com 11 amarelos do Brasil e 11 vermelhos da Noruega"):

1. **Entenda o pedido:** esporte, os dois times, as cores pedidas e o número de jogadores.
2. **Pesquise o último jogo de cada time** (via `WebSearch` + `WebFetch`, dando preferência aos **sites locais/oficiais de cada time**) e valide as **3 coisas**:
   - Descubra **qual foi o último jogo disputado** por cada time e **contra quem**.
   - **(1) Formação** que começou o jogo (ex.: 4-3-3).
   - **(2) Titulares** que começaram: **número + nome** de cada um (não escalação provável).
   - **(3) Posição de cada jogador**: o lado/função real (ponta esquerda x direita, lateral, volante, centroavante). Ordene os `players` conforme a formação para o lado sair certo no campo.
   - Cruze pelo menos duas fontes; se um número não aparecer em fonte confiável, aproxime e **marque como não confirmado**.
   - Busque também a **cor do uniforme de goleiro** usada (o mais fiel possível; se não achar, contraste com a camisa e avise).
   - Nº de jogadores por esporte: 11 (futebol), 5 (futsal/basquete), 6 (vôlei), 7 (handebol).
3. **Confirme cores dos times.** Use a cor pedida; se o usuário só disse "Brasil", use a cor real da camisa (amarelo do Brasil, vermelho da Noruega, etc.).
4. **Reporte** as fontes e deixe claro que é o XI do último jogo (data e adversário), e o que ficou como aproximação (número sem fonte, cor de goleiro).

Se o pedido **não** tiver times reais ("um time azul e um vermelho, 11 contra 11"), pule a pesquisa: gere direto com as cores e números sequenciais (`name` vazio; o clique não mostra balão até nomear, e o usuário renomeia no slide com duplo-clique em modo edição).

## Esportes suportados

Defina `sport` na CONFIG. O motor desenha o campo e assume o número de jogadores:

| `sport` | Jogadores | Superfície |
|---|---|---|
| `futebol` | 11 | gramado, com grandes áreas e círculo central |
| `futsal` | 5 | quadra, áreas e círculo |
| `handebol` | 7 | quadra, áreas de gol (arco) |
| `basquete` | 5 | quadra de madeira, garrafão e arco de 3 |
| `volei` | 6 | quadra com rede no meio e linhas de ataque |
| `generico` | livre | quadra neutra com meio e círculo |

Não é só futebol: **basta o usuário pedir** o esporte. Se pedir um número de jogadores diferente do padrão, respeite o pedido (adicione/remova na formação).

## Vertical (/mira-vertical)

Se o usuário chamar `/mira-vertical` sobre um quadro tático, **não** aplique o reflow genérico da skill `mira-vertical`. Aqui é mais simples: o campo apenas **gira 90 graus**. Duas formas:

- Deixe `orientation: 'vertical'` na CONFIG, **ou**
- Abra o mesmo arquivo com `?vertical=1` na URL, **ou**
- No slide, tecla `V` inverte na hora.

Gols que ficavam à esquerda/direita passam para cima/baixo; a formação é preservada. Não crie arquivo novo só para virar, a menos que o usuário queira manter as duas versões.

## Edição (sempre disponível no slide)

A barra fica à mostra por padrão. Ferramentas:

- **Selecionar e mover** (padrão, ferramenta única — sem trocar de ferramenta): arrastar **no vazio** desenha uma caixa e seleciona vários jogadores; arrastar **em cima de um jogador** move (e, se ele está na seleção, move o **grupo inteiro junto**, mantendo as posições relativas); clique num jogador (des)seleciona (fica com a cor mais escura e mostra o nome); clique/caixa no **vazio** limpa a seleção (Esc também).
- **Adicionar**: escolhe o time na barra e clica no campo para incluir um jogador (numerado em sequência).
- **Seta de jogada**: arrasta uma seta; encaixa no jogador de início/fim.
- **Zona retângulo / Zona círculo**: arrasta para marcar uma área do campo ("algo acontecendo aqui").
- **Cor**: a paleta na barra define a cor da **seta e das zonas**.
- **Apagar**: remove jogador, seta ou zona.
- **Virar** (tecla `V`), **Desfazer** (`Ctrl+Z`), **Limpar setas e zonas**.
- Duplo-clique num jogador (edição) abre o campo de **nome**.
- Tecla `T` oculta/mostra a barra (para uma foto limpa do campo).

O **título** aparece em CAIXA ALTA na **ponta esquerda** do quadro (nunca em cima dos jogadores). A linha de cima (`eyebrow`, ex.: "Copa 2026 · Oitavas") fica **oculta por padrão**: só preencha `eyebrow` se o usuário pedir.

## Schema da CONFIG (`TACTICS`)

Reescreva apenas este objeto no topo do `<script>`:

```js
var TACTICS = {
  sport: 'futebol',                 // futebol|futsal|handebol|basquete|volei|generico
  orientation: 'horizontal',        // 'horizontal' | 'vertical'
  eyebrow: '',                      // '' = oculto (padrão); preencha só se o usuário pedir
  title: 'Brasil x Noruega',        // exibido em CAIXA ALTA na ponta esquerda
  teams: [
    {
      name: 'Brasil',
      color: '#FFDF00',             // cor da camisa (linha)
      goalie: '#5B5F63',            // cor do uniforme do goleiro (o mais real possível)
      formation: '4-3-3',           // 4-3-3 | 4-4-2 | 3-5-2 | 4-2-3-1 (futebol); fora do futebol usa grade
      side: 'left',                 // 'left' | 'right' (metade do campo que o time ocupa)
      players: [
        { num: '1',  name: 'Alisson', gk: true },   // gk: true = goleiro (usa a cor goalie)
        { num: '2',  name: 'Danilo' }
        // ... um objeto por jogador; a ordem casa com as posições da formação
      ]
    },
    {
      name: 'Noruega', color: '#C8102E', goalie: '#8FBF3F',
      formation: '4-3-3', side: 'right',
      players: [ /* ... */ ]
    }
  ],
  arrows: [],                       // setas iniciais opcionais (coords de campo 0..1)
  shapes: []                        // zonas iniciais opcionais { type:'rect'|'ellipse', x0,y0,x1,y1, color }
};
```

Regras do schema:

- **O primeiro jogador com `gk: true`** vira o goleiro e usa `goalie`. Ponha-o primeiro na lista (posição do goleiro na formação).
- A **ordem dos `players`** casa com as posições da formação (goleiro, defesa, meio, ataque). São 11 posições para as formações de futebol.
- `side` separa os dois times nas metades do campo (`left` ocupa a metade de um lado, `right` espelha).
- Cores em hex. Se as camisas dos dois times forem parecidas, escolha um tom distinto para um deles e avise.

## Passos

1. **Interpretar o pedido:** esporte, times, cores, nº de jogadores, orientação.
2. **Perguntar sobre a formação oficial** (só quando há times reais). Se sim, buscar via `WebSearch` número, nome e cor de goleiro; citar fontes.
3. **Copiar o motor de referência** (ver "Fonte da verdade" acima: `mira-templates/decks/mesa-tatica/index.html` ou equivalente) para `decks/<nome>/index.html`.
4. **Reescrever o `var TACTICS = { ... }`** com os dados. Não toque no motor abaixo.
5. **Conferir:** número em todos, goleiro com cor própria, formação coerente, cores dos times distintas, título/eyebrow preenchidos.
6. **Se for vertical:** `orientation: 'vertical'` (ou instruir `?vertical=1` / tecla `V`).
7. **Reportar:** caminho do arquivo, atalhos (`T` oculta ferramentas, `V` vira o campo, `Ctrl+Z` desfaz, clique mostra o nome), e — se buscou escalação — as fontes e o aviso de que a escalação é a provável.

## Checklist

- [ ] Slide gerado a partir do motor de referência (só o `TACTICS` mudou).
- [ ] **Pesquisou o ÚLTIMO JOGO de cada time e validou as 3 coisas: (1) formação, (2) titulares que começaram, (3) posição/lado de cada jogador** — de preferência em sites locais/oficiais.
- [ ] Cruzou fontes e citou; marcou o que ficou como aproximação (número sem fonte, cor de goleiro).
- [ ] Cor do uniforme do goleiro distinta da camisa, o mais real possível.
- [ ] Cada jogador mostra o número; clicar seleciona (escurece) e revela o nome; dá para selecionar vários; clique no vazio limpa.
- [ ] Setas e zonas (retângulo/círculo) com cor escolhível na paleta.
- [ ] Cores dos dois times distintas e fiéis ao pedido.
- [ ] Título em CAIXA ALTA na ponta esquerda; `eyebrow` oculto salvo se o usuário pedir; nada em cima dos jogadores.
- [ ] Ferramentas de edição visíveis por padrão.
- [ ] Esporte correto (não só futebol quando o usuário pediu outro).
- [ ] Vertical inverte o campo (orientation/`?vertical=1`/tecla `V`) sem quebrar a formação.
- [ ] Preserva a Regra Zero do Mira (loop interno contínuo).
- [ ] Texto em português correto, sem travessão (—).
