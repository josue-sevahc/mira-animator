# Brainstorm: usos educacionais do Mira

> Lista salva a partir de conversa em 2026-07-04 sobre o que **professores e
> alunos** poderiam fazer no Mira além do que já existe. Complementa os
> brainstorms de `INTERATIVIDADE` (plateia interage) e `MANIPULACAO` (apresentador
> pilota o slide): aqui o recorte é **pedagógico** — ensinar, praticar, avaliar,
> conduzir a aula e dar voz ao aluno como autor.

## Ideia central

O Mira já transforma conteúdo (repo, livro, PDF, capítulo) em slide animado que
se explica sozinho. Isso já é uma ferramenta de aula poderosa. A pergunta deste
brainstorm é: **que peças faltam para o Mira virar um "estúdio de aula"** — não
só apresentar um conceito, mas fazer o aluno **praticar, testar hipótese, ser
avaliado e apresentar o próprio aprendizado**?

O norte é sempre a Regra Zero: mesmo um exercício ou simulador continua tendo
loop interno vivo, e continua abrindo por `file://` sem servidor sempre que
possível.

## Como o que já existe se encaixa

- Explicar conceito → metáfora animada, `/mira-3d`, `/mira-chart`, timelines.
- Plateia responde → `/mira-quiz`, `/mira-survey`, wordcloud (candidata).
- Aula em vídeo → `/mira-slide-to-video`.
- Manipular ao vivo → `/mira-tactics` (quadro tático).

O que falta são as frentes abaixo.

## A. Explicar e visualizar (o professor mostra)

### 1. Simulador de fenômeno (o "Mira-lab")

Sliders/knobs que mudam um sistema e o aluno vê a consequência ao vivo:

- Física: projétil (ângulo, força), ondas (frequência, amplitude), circuito,
  pêndulo, plano inclinado.
- Química: pH, concentração, equilíbrio, velocidade de reação.
- Matemática: função com parâmetros (estilo Desmos/GeoGebra), a, b, c mexendo a
  parábola; derivada como reta tangente que corre pela curva.
- Economia/negócio: preço × demanda, juros compostos.

Isto é o "and-if" que uma aula parada não dá. Skill candidata: `/mira-lab` ou
`/mira-simulator` (já citada no brainstorm de interatividade, mas aqui com viés
de currículo escolar).

### 2. Ciclos e processos em loop

Perfeitos para a Regra Zero, porque **são** loops na natureza: ciclo da água,
do carbono, do nitrogênio, ciclo de Krebs, mitose/meiose, fotossíntese, ciclo
menstrual, fluxo de caixa, ciclo PDCA, o loop de um algoritmo. O slide roda o
ciclo continuamente e o apresentador pode pausar em cada etapa.

Skill candidata: `/mira-cycle`.

### 3. Diagrama rotulado e explorável

Uma figura (célula, coração, motor, mapa, arquitetura de software) onde cada
parte tem um rótulo que aparece no hover/clique, com micro-explicação. Vira base
tanto de aula ("clique para conhecer") quanto de exercício ("arraste o rótulo
certo" — ver B4).

Skill candidata: `/mira-labeled` ou `/mira-anatomy`.

### 4. Worked example: resolução passo a passo animada

O caso clássico de matemática/física: a resolução aparece **linha a linha**, com
a passagem sendo destacada, o termo que "voa" de um lado para o outro da equação,
a substituição acendendo. É o quadro-negro do professor, mas coreografado.
Serve para prova comentada, gabarito animado, demonstração de teorema.

Skill candidata: `/mira-solve` ou `/mira-stepbystep`.

### 5. Linha do tempo interativa

Timeline scrubbable: história, evolução de uma teoria, etapas de um projeto,
biografia, eras geológicas. Arrastar no tempo e ver os eventos entrarem.
(Parcialmente coberto pelo scrub do brainstorm de manipulação — aqui com
estrutura de "evento + data + mídia".)

Skill candidata: `/mira-timeline`.

### 6. Mapa mental / mapa conceitual animado

Nós e conexões que crescem enquanto o conceito é explicado. Bom para abertura de
tema (mostrar o todo) e para fechamento (síntese). Diferente do wordcloud: aqui
há **relação** entre os nós, não só frequência.

Skill candidata: `/mira-mindmap`.

### 7. Magic Wall educacional (mapa geográfico)

Geografia e história: mapa que dá zoom em regiões, destaca rotas, migrações,
fronteiras mudando no tempo, dados por região. Herda do `/mira-tactics` a ideia
de manipulação ao vivo, mas com camada de mapa.

Skill candidata: `/mira-map`.

## B. Praticar e fixar (o aluno faz)

### 8. Flashcards / cartões de revisão

Cartão que vira (pergunta → resposta) com animação de flip. Baralho navegável,
opção de "acertei/errei", e — se quiser evoluir — espaçamento estilo Anki.
Excelente para vocabulário, fórmulas, datas, definições. Muito alinhado ao
visual do Mira.

Skill candidata: `/mira-flashcards`.

### 9. Arrastar para classificar / ordenar

Categorização e sequenciamento: separar itens em colunas (certo/errado,
reino animal/vegetal, tipos de palavra), ordenar etapas de um processo, montar
uma linha do tempo, encaixar rótulo na parte certa do diagrama (liga com A3).
Já apontado no brainstorm de interatividade; aqui vira **exercício avaliável**.

Skill candidata: `/mira-sort` ou `/mira-dragdrop`.

### 10. Preencher lacunas (cloze) e completar

Texto com espaços a preencher, revelação animada da resposta, ou banco de
palavras arrastáveis. Bom para língua, interpretação, definição de conceito.

Skill candidata: `/mira-cloze`.

### 11. Relacionar colunas (matching)

Ligar item da esquerda ao par da direita com linha animada; acerto acende verde
(reusa a linguagem visual de acerto do `/mira-quiz`). Termo↔definição,
autor↔obra, causa↔efeito, país↔capital.

Skill candidata: `/mira-match`.

### 12. Mnemônico e glossário animado

Cartão de termo com definição + micro-metáfora animada; e mnemônicos visuais
(a imagem que ajuda a lembrar). Pequeno, reutilizável, encaixável em qualquer
deck.

## C. Avaliar e dar feedback

### 13. Ficha de saída (exit ticket)

Slide final que pergunta "o que ficou claro / o que ficou confuso / uma dúvida",
via QR (reusa a arquitetura Forms+Sheets do `mira-survey`). Fecha o ciclo da
aula com dado real.

Skill candidata: `/mira-exit-ticket`.

### 14. Semáforo de compreensão

Sinal ao vivo da turma: verde (entendi), amarelo (mais ou menos), vermelho
(perdi). Barra que se move conforme os votos chegam. É um survey especializado,
pensado para o professor calibrar o ritmo na hora.

### 15. Autoavaliação e rubrica animada

Rubrica visual (critérios × níveis) que o aluno ou o professor preenche, com o
nível selecionado acendendo. Bom para projeto, seminário, redação.

Skill candidata: `/mira-rubric`.

## D. Conduzir a aula (dinâmica de sala)

### 16. Sorteador / roda de nomes

Roleta ou embaralhamento animado para chamar um aluno aleatório, formar grupos,
definir ordem de apresentação. Simples, muito usado, alto impacto de sala.

Skill candidata: `/mira-picker`.

### 17. Cronômetro e temporizador de atividade

Timer grande e bonito na projeção: "2 minutos para resolver", contagem regressiva
de prova, pomodoro de aula, tempo de debate. Com estados visuais (calmo →
urgente) e alerta no fim.

Skill candidata: `/mira-timer`.

### 18. Placar de equipes / gamificação

Pontos por grupo, badges, barra de nível, "sobe no ranking" animado. Amarra quiz,
exit ticket e atividades numa camada de jogo ao longo da aula. Reusa a animação
de ranking já pensada no `/mira-quiz`.

Skill candidata: `/mira-scoreboard`.

## E. O aluno como autor

O Mira nasce da ideia de virar conteúdo em slide — isso já serve ao aluno, mas
falta empacotar para o contexto escolar:

### 19. Seminário a partir do material

O aluno aponta o Mira para o capítulo/PDF/artigo e monta o próprio deck de
apresentação. É o core do Mira com **roteiro pedagógico** (objetivo, contexto,
desenvolvimento, síntese). Um template de deck `seminario-aluno`.

### 20. Pôster de feira de ciências animado

Um "deck de um slide" denso e vivo, formato pôster, para feira/mostra. Junta
método, resultado, gráfico (reusa `/mira-chart`) e conclusão.

### 21. Resumo visual de estudo

O aluno gera um mapa mental / one-pager animado do que estudou, para fixar e
compartilhar. Liga com A6 (mindmap) e B (flashcards gerados do resumo).

## F. Acessibilidade e aula assíncrona

### 22. Narração por slide (aula que se explica)

Cada slide com uma narração (TTS ou áudio gravado) sincronizada com a animação —
transforma o deck em videoaula assíncrona sem alguém falar ao vivo. Casa direto
com o `/mira-slide-to-video`.

### 23. Legendas e modos de acessibilidade

Legenda opcional, alto contraste, fonte para dislexia, redução de movimento
(respeitar `prefers-reduced-motion`) sem matar a Regra Zero. Importante para
uso escolar de verdade.

### 24. Objetivos de aprendizagem e trilha

Slide de abertura com os objetivos da aula (e opção de marcar com competências,
ex.: BNCC), e uma barra de trilha mostrando onde a turma está no percurso do
tema. Estrutura pedagógica explícita, não só conteúdo bonito.

## Roadmap sugerido (o que puxar primeiro)

Ordenado por **impacto na sala × reaproveitamento do que já existe**:

1. `/mira-timer` — pequeno, universal, todo professor usa, alto efeito visual.
2. `/mira-flashcards` — pratica/fixa, casa perfeitamente com o estilo do Mira.
3. `/mira-lab` (simulador) — é o grande diferencial "aula que responde a hipótese".
4. `/mira-exit-ticket` — reusa 100% da arquitetura Forms+Sheets do `mira-survey`.
5. `/mira-cycle` — a Regra Zero vira conteúdo (ciclos são loops de verdade).
6. `/mira-sort` / `/mira-match` — família de exercícios arrastáveis avaliáveis.

## Observações de produto

- Muitas destas são **exercícios**, então nasce uma pergunta de plataforma:
  guardar resposta/nota (Forms+Sheets? backend leve? só local?). Para v1, seguir
  o padrão já validado: local por `file://` quando não precisa coletar, e
  Forms+Sheets quando precisa juntar respostas da turma.
- Vale um **template de deck "aula"** que já venha com abertura (objetivos),
  desenvolvimento e fechamento (exit ticket) — encadeando várias skills acima.
- Reaproveitar a **linguagem visual de acerto** do `/mira-quiz` (verde suave,
  flat, check) em todos os exercícios (match, sort, cloze) para dar coerência.
- Separar claramente **"o professor mostra" (A)** de **"o aluno faz" (B/E)** —
  são modos diferentes do mesmo deck.
- Toda skill nova preserva a Regra Zero: loop interno contínuo mesmo em
  exercício ou simulador.

## Status

Salvo para evolução futura. Cada frente pode virar um brainstorm próprio (como o
`/mira-quiz` virou), com decisões e checklist de v1. Última atualização:
2026-07-04.
