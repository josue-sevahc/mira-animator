# Notas da mesa tática (brasil-noruega)

Registro do que foi feito nesta mesa, para não se perder.

## 1. Correção da animação que travava no remote control

**Problema:** a reprodução da jogada (▶ Play) era fluida em `file://` (sem remote), mas engasgava no modo remote control. O que importa é o PC, pois é o que vai no telão.

**Causa:** durante o Play, as posições mudavam a cada frame do `requestAnimationFrame` (~60fps). O poll de sync (a cada ~120ms) serializava o estado inteiro e disparava POST ~8x/s na mesma thread; esse trabalho por frame competia com o rAF e travava a animação no PC. Em `file://` nada disso roda (por isso lá era fluido).

**Correção (sync por COMANDO, não por stream de posições):**

1. Durante o Play, o payload de sync CONGELA tudo que muda por frame (posições e `rec.next`). O payload fica estável, então o poll dispara só uma vez no início e uma no fim, em vez de ~8x/s. É isso que devolve a fluidez ao telão.
2. Em vez de transmitir posições, o slide emite UM comando `play: { token, playing, from }`. O celular detecta o token novo e roda a PRÓPRIA cópia da animação (`playRec` local) a partir de `play.from`, fluido de verdade, sem amostrar a ~8fps.
3. Sem eco/bounce: o Play do usuário (`startPlay`) incrementa o token; o espelho ADOTA o token recebido em vez de gerar outro. Enquanto está tocando, `setRemoteState` retorna cedo para o sync não cortar a animação local.

**Arquivos alterados:**

- `decks/brasil-noruega/tatico-brasil-noruega.html` (este deck)
- `templates/decks/mesa-tatica/index.html` (motor oficial, para toda mesa futura)
- `agents/mira-tactics/SKILL.md` (decisão de produto nº 22, não regride)
- `agents/mira-remote-control/SKILL.md` (modelo mental)

A shell e o servidor (`mira/mira-remote.html`, `mira/mira-remote-server.cjs`) não mudaram: a correção é toda no motor da mesa.

**Limitação aceita:** se o usuário pausar no meio do Play, um aparelho que já começou toca até o fim (cada instância é dona da própria reprodução). Raro numa apresentação; o telão fica perfeito, que é a prioridade.

## 2. Diretiva: a base começa sempre com times completos em formação

Regra fixada para as mesas táticas FUTURAS geradas pela skill `/mira-tactics`:

- O `TACTICS` inicial traz os dois times COMPLETOS (11 x 11, com goleiro), cada um na formação real, posicionados pelo motor, SEM `u,v` absolutos no config.
- Um gol, jogada ou lance é sempre um quadro gravado (`data/*.json`) por cima dessa formação cheia, nunca um elenco reduzido com posições fixas como estado inicial.
- Para congelar um momento, navega-se até o quadro gravado; não se corta o elenco nem se cola `u,v` no `TACTICS`.

Registrado como decisão de produto nº 23 em `agents/mira-tactics/SKILL.md` (mais diretiva no schema, passos e checklist) e no comentário do `TACTICS` em `templates/decks/mesa-tatica/index.html`.

**Exceção legada:** este deck `brasil-noruega` é uma CENA do gol do Haaland (times incompletos: 8 x 6, com `u,v` absolutos). Foi decidido mantê-lo assim; a animação já funciona. A regra dos 11 x 11 vale só para as mesas novas. Não reconstruir este deck para formação cheia.
