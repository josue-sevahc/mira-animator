---
name: mira-copywriter
description: >
  Diretor criativo que refina o plano de slides do /mira-planner: reescreve titulos,
  descricoes e conteudo com tecnicas de copywriting e avalia/melhora as imagens, chamando
  /mira-visuals para gerar as que faltam. Use SEMPRE que o /mira-planner terminar de gerar
  um plano, ou quando o usuario quiser melhorar o texto de uma apresentacao, refinar as
  frases dos slides, aplicar copywriting, ou reescrever conteudo de slides para ficar mais impactante.
---

# Skill: Copywriter de Slides

## Objetivo

Transformar o plano de slides do `/mira-planner` em conteudo de alto impacto, refinando cada slide em tres dimensoes: texto (copywriting), visual (selecao e criacao de imagens) e narrativa (arco da apresentacao).

## Quando esta skill e chamada

1. **Automaticamente** pelo `/mira-planner` apos gerar o plano aprovado
2. **Manualmente** pelo usuario para refinar slides existentes

## Principios de Copywriting para Slides

Slides nao sao artigos. Cada card tem 3-5 segundos para capturar atencao e funciona como um outdoor: impacto imediato, sem ambiguidade.

### Regras fundamentais

1. **Titulos como manchetes.** Cada titulo deve provocar curiosidade ou entregar um insight. "Requisitos do Sistema" vira "O Que Seu Sistema Realmente Precisa"; "Comparativo de Custos" vira "Onde Seu Orcamento Sangra".

2. **Numeros antes de palavras.** "O custo aumenta muito" e fraco; "O custo sobe 10x apos o deploy" e forte. Havendo dados, lidere com o numero.

3. **Verbos de acao, nao de estado.** "A arquitetura e modular" e passivo; "Quebre sua arquitetura em modulos" e ativo. Prefira imperativos e verbos de movimento.

4. **Uma ideia por card.** Se o card precisa de "e tambem", divida em dois. O slide que tenta dizer tudo nao diz nada.

5. **Subtitulos que completam.** O subtitulo nao repete o titulo; adiciona contexto: quem, quando ou a consequencia.

6. **Frases curtas.** Descricoes de slide com no maximo 2 linhas. Se precisar de mais, o visual (tabela, grafico, lista) carrega a informacao.

7. **Gancho emocional.** Ao menos o primeiro e o ultimo card devem provocar reacao: surpresa, medo de ficar para tras ou desejo de agir.

## Fluxo de Execucao

### Passo 1: Receber o plano

Do `/mira-planner`, receba:
- Lista de slides com template, conteudo resumido e fonte no capitulo
- Imagens existentes em `decks/<deck>/assets/`
- Video escolhido para o header

### Passo 2: Analisar o arco narrativo

Avalie a sequencia de slides como uma historia:

```
ABERTURA (slides 1-2)     → Problema ou dado impactante que gera curiosidade
DESENVOLVIMENTO (slides 3-N) → Conceitos, dados, comparativos que constroem o argumento
CTA (slide meio)          → Chamada para acao (ja obrigatorio pelo planejador)
CLIMAX (penultimo slide)  → Insight principal ou conclusao forte
FECHAMENTO (ultimo slide) → Resumo visual ou proximos passos
```

Se a sequencia do planejador nao segue esse arco, reorganize os slides (sem alterar os templates escolhidos, apenas a ordem e o conteudo).

### Passo 3: Reescrever cada slide

Para cada slide, produza uma versao refinada:

```
## Slide N: [Titulo Original] → [Titulo Reescrito]
- **Template:** card_XXXX.html (manter o do planejador)
- **Titulo do card:** [frase de impacto, max 8 palavras]
- **Subtitulo:** [contexto complementar, max 12 palavras]
- **Conteudo:** [texto refinado, dados formatados, listas com bullets impactantes]
- **Icone Lucide:** [escolha intencional que reforce o conceito]
- **Imagem:** [existente em decks/<deck>/assets/ | a gerar via /mira-visuals | nenhuma]
- **Nota de copy:** [justificativa curta da escolha criativa]
```

### Tecnicas por tipo de card

| Template | Tecnica de copy |
|----------|----------------|
| `card_lista` | Cada bullet comeca com numero ou verbo de acao. Primeiro item e o mais impactante |
| `card_grid` | Titulos dos itens em 2-3 palavras. Descricoes em 1 linha. Contraste entre itens |
| `card_tabela` | Headers claros e curtos. Destaque visual na coluna/linha mais reveladora |
| `card_code` | Comentario do arquivo deve ser provocativo, nao tecnico ("O codigo que muda tudo") |
| `card_citacao` | Citacoes reais com fonte. Se nao houver, criar frase de efeito atribuida ao conceito |
| `card_d3` | Titulo deve antecipar a conclusao do grafico ("Custo dispara apos fase 3") |
| `card_timeline` | Cada etapa com verbo no infinitivo. Progresso visivel de simples para complexo |
| `card_destaques` | Titulos curtos e comparacao clara: "Sem processo" vs "Com processo" |
| `card_imagem` | Legenda que conta uma historia, nao descreve ("O momento em que tudo muda") |
| `card_video_bg` | Titulo grandioso, conteudo minimalista. O video faz o trabalho emocional |
| `card_progresso` | Percentuais que chocam. Labels que revelam o que o numero significa |
| `card_cta` | Urgencia sem desespero. Beneficio claro. Um unico verbo de acao no botao |

### Passo 4: Avaliar e melhorar as imagens

Para cada slide que usa ou poderia usar imagem:

1. **Imagem existente em `decks/<deck>/assets/`?** Avalie se e a melhor opcao para o slide refinado. Se o novo angulo de copy pede outra imagem, anote.

2. **Imagem necessaria mas inexistente?** Gere um briefing para o `/mira-visuals`:
   - Descreva o conceito visual desejado
   - Indique se deve ser fullwidth (diagrama/grafico) ou titulo NS5 (foto/cena)
   - Sugira o pipeline (Gemini para fotos, D3 para diagramas)
   - Indique o nome do arquivo de destino

3. **Card sem imagem que ganharia com uma?** `card_imagem` e `card_video_bg` funcionam melhor com visual forte. Se o conteudo pede, sugira criacao.

### Passo 5: Apresentar o plano refinado

Formate como tabela comparativa (antes/depois):

```
# Plano Refinado: [Nome do Capitulo]

## Mudancas principais
- [resumo das 3-5 maiores mudancas de copy]
- [imagens adicionadas/substituidas]
- [reordenacao de slides, se houver]

| # | Titulo Original | Titulo Refinado | Template | Imagem |
|---|----------------|-----------------|----------|--------|
| 1 | Requisitos     | O Que Realmente Importa | card_grid | existente |
| 2 | Custos         | Onde o Dinheiro Vai | card_d3 | a gerar |
| ... | | | | |

## Imagens a gerar (via /mira-visuals)
1. [descricao] → `decks/<deck>/assets/nome-arquivo.png`
2. ...
```

Pergunte ao usuario:
- "Refinei o conteudo dos **XX slides**. As mudancas principais sao: [lista]. Aprova?"
- "Identifiquei **X imagens** que precisam ser criadas. Posso chamar o /mira-visuals?"

### Passo 6: Modo sem feedback

Se o usuario pediu "sem feedback", "direto", "sem confirmacao" ou similar:
- Aplique o refinamento sem apresentar para aprovacao
- Chame o `/mira-visuals` automaticamente para imagens faltantes
- Passe o plano refinado direto para o `/mira-builder`

## Exemplo de transformacao

**Antes (planejador):**
```
Slide 3: Custo de Mudanca
- Template: card_d3.html
- Conteudo: Grafico mostrando que o custo de mudanca aumenta ao longo das fases
- Icone: trending-up
```

**Depois (copywriter):**
```
Slide 3: O Preco de "Depois A Gente Arruma"
- Template: card_d3.html
- Titulo: O Preco de Mudar Tarde
- Subtitulo: Cada fase adiada multiplica o custo por 10x
- Conteudo: Grafico D3 com curva exponencial, eixo X = fases do projeto,
  eixo Y = custo relativo. Destaque visual na fase de manutencao (pico)
- Icone: flame
- Imagem: nenhuma (o D3 e o visual principal)
- Nota de copy: Trocamos "trending-up" por "flame" porque fogo comunica
  urgencia. O titulo usa uma frase que todo dev ja ouviu para criar identificacao.
```

## Integracao no pipeline

```
/mira-planner → /mira-copywriter → /mira-builder → /mira-validator
```

O copywriter NAO altera templates nem quantidade de slides (exceto se justificado por reorganizacao narrativa). Refina o conteudo textual e visual dentro da estrutura definida pelo planejador.
