---
name: mira-animated-metaphor
description: >-
  Transforma a animação de um slide (ou de todos) numa METÁFORA visual animada: uma analogia concreta do cotidiano animada no padrão do mira-animator, substituída no lugar (mantém título, subtítulo e pílulas). Use SEMPRE que o usuário disser "/mira-animated-metaphor", "metáfora animada", "transforma em metáfora", "cria uma analogia", "anima como analogia", "transforma os slides em metáforas", "vira metáfora", "quero uma metáfora pra esse conceito", "anima essa ideia como analogia", "metáfora visual", ou pedir para reexpressar um conceito como comparação animada, no deck inteiro ou num slide específico.
---

# Skill: Metáfora Animada

Reexpressa o conceito de um slide como uma **analogia concreta do cotidiano**, animada. Não é a animação literal do conceito, é a metáfora dele em movimento. Ex.: "débito técnico" vira "juros que crescem sozinhos numa torre"; "orquestração de agentes" vira "maestro regendo os naipes em uníssono".

## Relação com o mira-animator

Esta skill é o `mira-animator` com uma etapa a mais na frente: **gerar a metáfora**. Toda a parte técnica é a mesma; leia `agents/mira-animator/SKILL.md` antes de animar e siga à risca:

- Estrutura do card, título sem ícone com no máximo 6 palavras, margem do título ao topo, cores do tema.
- **Loop interno obrigatório**: nenhuma animação é estática; entra com coreografia e segue em movimento perpétuo.
- Anti-vazamento de loop (`window.__slugGen`), trigger em `setupAnimationTriggers()`, botão Replay.
- `viewBox="0 0 1280 720"`, canvas `.anim-stage`.
- Diretrizes D3 em `agents/mira-animator/references/`.

## Idioma

Siga `agents/_shared/idioma.md`. Português correto. Proibido travessão (—): use vírgula ou dois-pontos.

## O que faz e o que NÃO faz

- **Substitui a animação no lugar**: mesma posição, mesmo título, subtítulo e pílulas. Só o desenho do palco muda. No máximo um ajuste leve no subtítulo para amarrar a analogia (opcional).
- **Não reescreve** título, pílulas nem cores, e não reordena o deck.
- **Não cria slide novo**: transforma o existente.
- Por ser animação nova, **reinicie o marcador para `<!-- @MIRA:SIZE 3/10 -->`** naquele palco.

## Método para criar a metáfora

1. **Destile o conceito a uma dinâmica.** O que muda, qual a relação, a tensão, o movimento central? Em uma frase. Ex.: débito técnico = custo que cresce sozinho com o tempo se você não paga.
2. **Ache um sistema do cotidiano com a MESMA dinâmica.** Concreto, físico, familiar. Ex.: juros compostos, bola de neve na ladeira, goteira que vira inundação.
3. **Mapeie 1 para 1.** Cada parte do conceito com seu correspondente visual. Se sobrar parte sem correspondente (ou vice-versa), a metáfora está fraca ou misturada: troque.
4. **Garanta o loop.** Descreva o movimento perpétuo em uma frase ANTES de codar ("a torre de juros ganha um anel novo a cada batida e fica mais alta"). Se não der para descrever o loop, a metáfora não serve.
5. **Teste a obviedade.** Tem que ser entendida sem legenda. Se precisar explicar, está fraca.
6. **Anime seguindo o mira-animator.**

## Exemplos de mapeamento (conceito → metáfora → loop)

- **Orquestração de agentes** → maestro e naipes da orquestra. Loop: a batuta marca o tempo no centro e as seções pulsam em uníssono a cada compasso.
- **Débito técnico** → torre de juros. Loop: a cada ciclo a torre ganha um bloco sozinha e inclina mais, até alguém "pagar" e ela baixar, e recomeça.
- **Janela de contexto do LLM** → mesa de trabalho lotada. Loop: um papel novo entra de um lado e empurra o mais antigo para fora do outro, sem parar.
- **Cache** → despensa ao lado vs mercado longe. Loop: idas curtas e rápidas à despensa, e de vez em quando uma viagem longa ao mercado.

## Workflow de Execução

1. **Resolver o escopo.**
   - Slide específico (número do card, título ou id do stage) → só aquele.
   - Sem slide indicado → todos os slides animados do deck.
   - Conceito passado no comando → use esse texto; senão, leia o conceito do próprio slide.
2. **Entender o conceito** de cada slide alvo: título, subtítulo, texto, pílulas e a intenção da animação atual. Se útil, consulte `slides/<tema>/references/`.
3. **Gerar a metáfora** pelo método acima. Em uma frase, fixe: conceito, metáfora, loop.
4. **Substituir a animação no lugar.** Localize o palco (`#st-XXXX` / `#sv-XXXX`) e sua função de animação no `<script>`. Reescreva-a para desenhar a metáfora, mantendo o mesmo id do stage, o registro no trigger e o Replay. Mantenha título, subtítulo e pílulas.
5. **Aplicar o padrão mira-animator**: entrada coreografada, loop interno perpétuo, anti-vazamento (`window.__slugGen`), `viewBox 1280 720`, reset do marcador para `@MIRA:SIZE 3/10`.
6. **Reportar** slide a slide: `conceito → metáfora (loop em uma frase)`.

## Anti-padrões (NÃO FAÇA)

- ❌ Metáfora clichê que não acrescenta entendimento (ex.: "engrenagens girando" para qualquer coisa).
- ❌ Metáfora que precisa de legenda.
- ❌ Misturar duas metáforas no mesmo slide.
- ❌ Animação literal do conceito (um diagrama do próprio conceito não é metáfora).
- ❌ Metáfora sem loop interno.
- ❌ Reescrever o título ou trocar as cores do tema.

## Checklist

- [ ] Escopo certo (slide indicado ou todos os animados do deck).
- [ ] Para cada slide: conceito destilado, metáfora mapeada 1 para 1, loop descrito em uma frase.
- [ ] Animação substituída no lugar; título, subtítulo e pílulas mantidos.
- [ ] Loop interno perpétuo rodando depois da entrada.
- [ ] Anti-vazamento (`window.__slugGen`), trigger e Replay intactos.
- [ ] `viewBox="0 0 1280 720"` e marcador reiniciado para `@MIRA:SIZE 3/10`.
- [ ] Metáfora óbvia sem legenda; nada de clichê ou metáfora misturada.
- [ ] Nenhum travessão (—); acentuação correta.
