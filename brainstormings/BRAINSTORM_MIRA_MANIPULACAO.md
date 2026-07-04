# Brainstorm: manipulação do apresentador no Mira

> Lista salva a partir de conversa em 2026-07-04 sobre uma frente diferente de
> interatividade: não a plateia interagindo (isso está em
> `BRAINSTORM_MIRA_INTERATIVIDADE.md`), e sim **o apresentador manipulando o
> slide ao vivo** durante a fala.

## Ideia central

Hoje o slide do Mira é uma **animação que toca**: começa, roda seu loop e segue.

Esta frente adiciona um segundo estado: o slide vira um **objeto que o
apresentador pilota**. Ele arrasta peças, segura uma animação num ponto, ajusta
um parâmetro, foca uma região, monta uma jogada — tudo ao vivo, contando a
história com as mãos.

A referência é a TV: o **rabisco no replay** esportivo, o **quadro tático**
de futebol com jogadores como círculos nas cores do time, o **Magic Wall** de
mapa que o âncora toca, arrasta e amplia. O apresentador não assiste ao slide,
ele **rege** o slide.

Diferença-chave em relação ao outro brainstorm:

- **Interatividade da plateia**: muitos celulares, QR, dados ao vivo, votação.
  O controle é distribuído.
- **Manipulação do apresentador**: um operador, teclado/mouse/toque, local,
  funciona em `file://`. O controle é do palco.

## Frentes de manipulação

### 1. Quadro tático / peças arrastáveis  ✅ PRONTO (v1)

O caso que inspirou esta lista. Um "tabuleiro" onde o apresentador arrasta peças
para posicioná-las e montar cenários ao vivo:

- Campo de futebol com jogadores como círculos nas cores do time; arrastar para
  montar formação, marcação, jogada ensaiada.
- Setas e linhas de movimento desenhadas por cima (para onde a peça vai).
- Generaliza para muito além de esporte: organograma, fluxo de processo,
  posições numa mesa/reunião, peças de xadrez, movimentação de tropas, layout de
  loja, disposição de móveis, casos de uso num diagrama.

**Implementado em 2026-07-04**, nativo em qualquer deck (tecla `T`, no mesmo
padrão do `mira-draw`/`mira-edit`). **Canvas vanilla, zero dependência** (não
interact.js/Konva), rodando em `file://`. Peças arrastáveis numeradas por time,
setas de movimento com snap na peça, e três superfícies (campo de futebol, grade
tática, nenhuma — para organograma/fluxo por cima do slide).

Duas faces da frente:

1. **Overlay de autoria** (telestrator de peças por cima de qualquer slide,
   tecla `T`):
   - Código: `templates/authoring/mira-tactics.js` (fonte-verdade, distribuído no
     install/update; copiado em deck novo por `new.js`, retrofit por `edit.js`).
   - Spec: `specs/manipulação/mira-tactics.md`.
   - Demo: `decks/apresentacao-mira-gsap/mira-tactics-demo.html`.

2. **Skill geradora de slide** `/mira-tactics` (2026-07-04): monta um slide
   dedicado com o campo/quadra do esporte e os **times já na formação**. Cada
   jogador é um círculo com o **número**; clicar revela o **nome**; goleiro com
   cor de uniforme própria. Quando os times são reais, a skill **pergunta se
   deve buscar a escalação oficial** (nome, número e cor de goleiro via
   WebSearch) e monta na formação real. Ferramentas de edição à mostra
   (mover/adicionar/apagar/seta). Multi-esporte (futebol, futsal, vôlei,
   basquete, handebol). `/mira-vertical` só inverte o campo (gira 90°).
   - Skill: `agents/mira-tactics/SKILL.md`.
   - Motor/fonte-verdade (slide de referência): `decks/apresentacao-mira-gsap/tatico-brasil-noruega.html`.

Evoluções futuras (v2): presets de formação extras, salvar/restaurar cenário,
ancorar as peças ao slide, setas curvas, escudo/foto no lugar do círculo.

### 2. Controlar a animação ao vivo (scrub)

Em vez da animação só tocar, o apresentador **segura, volta e avança** no ritmo
da fala:

- Barra/knob de scrub para arrastar a timeline para frente e para trás.
- Pausar num frame exato para explicar ("olha esse momento").
- Passo a passo: cada clique avança um beat da animação.
- Controle de velocidade (câmera lenta para detalhar).

O Mira já vendora GSAP com timeline — isso encaixa direto num controle de
`timeline.progress()`.

Boa skill candidata: `/mira-scrub`.

### 3. Manipular objeto 3D ao vivo

Expande o `/mira-3d`: o apresentador orbita, dá zoom, gira e **explode a vista**
de um modelo enquanto fala (motor, molécula, prédio, produto, órgão do corpo).

- Vista explodida controlável (afastar/juntar as peças).
- Destacar/isolar uma peça ao clicar.
- Cortes de seção para ver por dentro.

### 4. Sliders e knobs de narrativa

Diferente do simulador da plateia: aqui o **apresentador** ajusta o parâmetro
para contar uma história ("e se o preço subir?"), e o gráfico/cena reage na hora.

- "Puxa" um slider e a receita, a curva ou o cenário se movem ao vivo.
- Ligar/desligar hipóteses com toggles durante a fala.
- Comparar dois estados alternando um controle.

### 5. Antes/depois e cortina de revelação

O apresentador arrasta um divisor para revelar o antes/depois, ou uma "cortina"
que descobre parte do slide no tempo da fala.

- Slider de comparação (imagem A vs imagem B).
- Camadas que ligam/desligam (mostrar a solução por cima do problema).
- Lupa/spotlight que ele move para focar uma região.

### 6. mira-draw: desenhar sobre o slide  ✅ PRONTO (v1)

Anotação ao vivo por cima de qualquer slide (o pedido que originou esta
conversa): caneta livre, cor, marca-texto, círculo e retângulo vazados, seta,
texto, borracha. Tudo por cima, sem alterar o conteúdo embaixo.

**Implementado em 2026-07-04**, nativo em qualquer deck (tecla `P`, no padrão do
`mira-edit.js`). Optou-se por **canvas vanilla, zero dependência** (não Fabric.js)
para manter o deck self-contained e rodando em `file://`.

- Código: `templates/authoring/mira-draw.js` (fonte-verdade, distribuído no
  install/update; copiado em deck novo por `new.js` e retrofit por `edit.js`).
- Spec: `specs/manipulação/mira-draw.md`.
- Demo: `decks/apresentacao-mira-gsap/mira-draw-demo.html`.

Evoluções futuras (v2): ancorar o desenho ao slide (acompanhar scroll),
selecionar/mover objeto e persistir anotações.

### 7. Câmera guiada: pan e zoom pela infografia

Um slide grande (infográfico, mapa, diagrama) onde o apresentador **navega**:
dá zoom numa parte, corre para outra, afasta para o todo. Estilo Prezi, mas sob
comando manual, no ritmo da explicação.

- Pontos de interesse pré-definidos que ele salta com uma tecla.
- Zoom livre com a roda/pinça para improvisar.

### 8. Encenação passo a passo (build manual)

Em vez de revelação automática, o apresentador **constrói o slide ao vivo**:
cada clique adiciona um elemento, monta o diagrama peça por peça, escreve a
próxima linha, acende o próximo nó do fluxo.

Dá ritmo de aula: o conteúdo aparece exatamente quando ele fala dele.

### 9. Simulação física manipulável

O apresentador joga, solta ou colide objetos para ilustrar uma ideia (motor
tipo Matter.js): dominós que caem, gravidade, forças, colisões, efeito cascata.

Ótimo para metáfora física ("olha o efeito dominó"), que combina muito com a
linguagem de metáforas do Mira.

### 10. Mapa interativo (estilo Magic Wall)

O apresentador arrasta pinos, desenha rotas, amplia regiões, liga camadas de
dados sobre um mapa — a estética de âncora de telejornal tocando o mapão.

- Pinos e rótulos posicionáveis ao vivo.
- Rota/fluxo desenhado entre pontos.
- Zoom por região com dados aparecendo.

### 11. Palco com atores (personagens manipuláveis)

Aproveita os "atores" flat/ícone que o Mira já usa: o apresentador **move
personagens numa cena** para encenar uma narrativa — quem fala com quem, quem se
move para onde, montando a história como um teatro de bonecos.

### 12. Controle por gestos e corpo (Kinect / câmera)

E se o Mira **enxergasse** o apresentador? Em vez de mouse e teclado, ele
controla o slide com o corpo: acena para avançar, "pega" uma peça do quadro
tático fechando a mão e a arrasta no ar, abre os braços para dar zoom, aponta
para acender um nó, desenha por cima com o dedo no ar.

É a evolução natural desta frente inteira: se o apresentador **rege** o slide,
o gesto é a batuta mais natural. Casa direto com o quadro tático (frente 1), o
scrub (frente 2), a câmera guiada (frente 7) e o mira-draw (frente 6).

#### Alvo: a tela vira um touchscreen virtual (air-touch)

O objetivo final não é só "detectar um gesto e disparar um comando". É que a
câmera reconheça **duas coisas ao mesmo tempo — o apresentador e a própria
apresentação/tela** — e ligue as duas: a mão do apresentador no espaço mapeia
para um ponto exato do slide, como se ele estivesse **tocando uma touchscreen
gigante no ar**. Ele "encosta" num objeto e arrasta; encosta em outro e move.
Nada de mouse; a projeção inteira vira superfície de toque.

O pulo do gato técnico é a **calibração espacial**: descobrir a transformação
(uma homografia / mapeamento de plano) entre o que a câmera vê e as coordenadas
do slide. Rotas possíveis:

- **Calibrar a tela**: a câmera enxerga os quatro cantos da projeção/monitor
  (marcadores nos cantos ou uma etapa de setup onde o apresentador toca os
  cantos). A partir daí, qualquer ponto da mão no ar converte para `(x, y)` do
  slide. É o que dá o efeito touchscreen de verdade.
- **Só apontar (mais simples)**: sem casar com a tela física — a posição
  relativa da mão vira um cursor na tela (estilo Wiimote/laser). Menos "toque
  real", mas muito mais fácil de calibrar.

Sinais de interação a definir: o que conta como "tocar" (pinça? mão parada sobre
o objeto por X ms? profundidade da mão chegando ao plano da tela, aí o Kinect
brilha), o que é "arrastar" e o que é "soltar".

Requisito prático: profundidade ajuda muito a distinguir "encostar" de só
"passar a mão na frente" — por isso o Kinect tem vantagem aqui, embora dê para
aproximar com webcam usando pinça como gesto de toque.

#### Viabilidade (nota, não é para implementar agora)

O ponto crítico: **o navegador não acessa o Kinect diretamente**. O Kinect
precisa do SDK nativo (Kinect SDK no Windows, `libfreenect` ou Azure Kinect SDK).
Então o desenho seria uma **ponte local**:

```
Kinect → app nativo (lê esqueleto/mãos) → WebSocket → slide no browser
```

Isso encaixa no padrão que o Mira já tem: o `mira-serve.js` já roda um servidor
local; bastaria ele (ou um processo irmão) ler o Kinect e empurrar as
coordenadas das mãos/esqueleto por WebSocket para o slide. Nada de nuvem, tudo
na máquina do apresentador.

Duas rotas, com trade-offs claros:

- **Kinect (profundidade real)**: melhor esqueleto 3D, funciona no escuro, pega
  o corpo todo à distância de palco. Custo: hardware específico, drivers (Kinect
  antigo é chato de instalar em 2026), ponte nativa obrigatória, provavelmente
  preso a Windows. É a rota "premium".
- **Webcam + MediaPipe (sem Kinect)**: `MediaPipe Hands`/`Pose` roda **dentro do
  browser** em JS/WASM, só com a webcam comum. Sem hardware extra, sem ponte
  nativa, multiplataforma. Entrega ~80% da experiência (mãos e pose 2D+). Custo:
  precisa de contexto seguro para a câmera (`localhost` via `mira-serve`, não
  `file://` puro) e não tem a profundidade fina do Kinect.

**Recomendação para o futuro**: prototipar primeiro com **MediaPipe + webcam**
(barreira de entrada quase zero, portátil) e tratar o **Kinect como upgrade de
profundidade** para quem tem o hardware e quer palco grande. A camada de "onde
estão as mãos" pode ser a mesma; só troca a fonte dos dados.

Boa skill/infra candidata: `/mira-gesture` (ou `mira-vision` como camada de
entrada compartilhada).

#### Reconhecimento via webcam comum (rota principal, sem hardware)

Vale registrar a webcam não como plano B do Kinect, e sim como a **rota
principal** — porque quase todo apresentador já tem uma câmera no notebook, e
tudo roda no próprio browser, sem drivers nem ponte nativa.

O que dá para reconhecer, tudo em JS/WASM no cliente:

- **Mãos** (`MediaPipe Hands`): 21 pontos por mão, detecta pinça (juntar polegar
  e indicador para "pegar" uma peça), mão aberta/fechada, apontar, duas mãos
  para zoom. É o gesto mais rico para manipular o slide.
- **Corpo/pose** (`MediaPipe Pose` / `MoveNet`): esqueleto para acenar, apontar
  com o braço, dar passo — bom para palco à distância, onde a mão fica pequena.
- **Rosto/cabeça** (`FaceMesh`): direção do olhar/cabeça para mover foco ou
  spotlight; expressões como gatilho leve.
- **Marcadores/objetos** (AR markers, ex.: `js-aruco`, ou um cartão colorido):
  o apresentador segura um objeto físico que vira "controle" rastreado — barato
  e muito estável para arrastar peças.

Mapeamento natural para as frentes desta lista: pinça = pegar e arrastar peça do
quadro tático (frente 1); mão movendo no eixo X = scrub da timeline (frente 2);
duas mãos afastando = zoom da câmera guiada (frente 7); dedo no ar = traço do
mira-draw (frente 6).

Requisitos e limites a lembrar: `getUserMedia` exige **contexto seguro**
(`localhost` via `mira-serve` ou `https`, não `file://` puro); precisa de luz
decente; sem profundidade fina como o Kinect; e convém um **modo calibração** e
um gesto/tecla de "pausar o rastreio" para o apresentador não disparar ações sem
querer ao gesticular naturalmente.

Boa skill candidata específica: `/mira-webcam` (ou entra como o back-end padrão
do `/mira-gesture`).

## Fios técnicos comuns

- **Arrastar peças**: Pointer Events nativos, ou libs como interact.js, Konva.js
  ou Fabric.js (formas + arrasto + serialização).
- **Scrub de animação**: `gsap.timeline()` + controle de `progress()` — GSAP já
  está vendorado nos decks.
- **3D**: Three.js + OrbitControls, base que o `/mira-3d` já usa.
- **Física**: Matter.js (motor 2D leve, sem build).
- **mira-draw**: Fabric.js (ou perfect-freehand só para o traço da caneta).
- **Persistência opcional**: salvar o estado montado pelo apresentador (posição
  das peças) para recuperar depois, no padrão do `mira-serve.js`.
- **Gestos/visão**: MediaPipe Hands/Pose (no browser, só webcam) para a rota
  leve; Kinect via SDK nativo + ponte WebSocket para a rota de profundidade.
  Ver frente 12 para a nota de viabilidade.

## Princípios de produto

- **Padrão de ativação por tecla**, no estilo do `mira-edit.js` (tecla liga um
  modo de manipulação sobre o slide atual). Um "modo pilotar".
- **Sempre reversível**: um botão/tecla de reset devolve o slide ao estado
  inicial — o apresentador experimenta sem medo.
- **Preserva a Regra Zero**: mesmo parado ou sendo manipulado, o slide mantém um
  loop de vida sutil embaixo; a manipulação é uma camada por cima, não substitui
  a animação.
- **Local e offline primeiro**: esta frente inteira deve funcionar em `file://`,
  sem internet nem QR. É ferramenta de palco, não de plateia.
- **Um operador**: teclado, mouse e toque (telas grandes/touch de palco), sem
  sincronização com celulares.

## Roadmap sugerido

1. ~~`/mira-draw`~~ ✅ **PRONTO (2026-07-04)** — implementado em
   canvas vanilla (zero dependência, não Fabric.js), nativo em qualquer deck
   pela tecla `P`. Ver frente 6 e `specs/manipulação/mira-draw.md`.
2. ~~`/mira-tactics`~~ ✅ **PRONTO (2026-07-04)** — quadro tático: peças
   arrastáveis com setas, três superfícies (campo/grade/nenhuma), tecla `T`.
   Canvas vanilla. Ver frente 1 e `specs/manipulação/mira-tactics.md`.
3. `/mira-scrub`: controle manual da timeline GSAP, reaproveita o que já existe.
4. `/mira-3d` manipulável: evoluir vista explodida e isolamento de peças.

## Observações

- Esta frente é irmã, não filha, do `BRAINSTORM_MIRA_INTERATIVIDADE.md`: lá a
  plateia age; aqui o apresentador rege. Vale manter os dois documentos
  separados e cruzados.
- A estética de referência (mira-draw, quadro tático, Magic Wall) é forte e
  reconhecível — bom argumento de produto para diferenciar o Mira de slides
  animados comuns.

## Status

Salvo para evolução futura. Última atualização: 2026-07-04.
