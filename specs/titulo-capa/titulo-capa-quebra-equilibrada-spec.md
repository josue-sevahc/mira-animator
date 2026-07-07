# Spec: Diretiva de título da capa — quebra equilibrada

**Versão:** 1.0
**Status:** Aprovada
**Autor:** sandeco (via sessão Claude Code)
**Data:** 2026-07-07
**Reviewers:** sandeco

---

## 1. Resumo

Tornar diretiva do Mira que o **título do primeiro slide (a capa, o "header" do
deck)** sempre quebre de forma equilibrada, nunca deixando uma palavra, artigo
ou preposição solta numa linha muito menor que a outra. A regra vale
**exclusivamente para o título da capa**, não para os títulos dos slides de
conteúdo. Implementada com `text-wrap: balance` escopado ao primeiro slide.

---

## 2. Contexto e Motivação

**Problema:**
O título da capa quebrava de forma feia, com uma linha longa e a outra com uma
palavra ou preposição solta. Exemplo real observado: "Responsividade em quatro"
na linha 1 e "formatos" sozinho na linha 2, com a preposição "em" pendurada no
fim da primeira linha.

**Evidências:**
Deck de exemplo `decks/exemplo-responsivo/`: no formato 1:1, o título da capa
"Responsividade em quatro formatos" quebrava desbalanceado. Com `text-wrap:
balance` escopado à capa, passou a quebrar "Responsividade em" / "quatro
formatos", validado visualmente com o usuário em 2026-07-07.

**Por que agora:**
A capa é o primeiro impacto do deck e vira thumbnail/abertura de vídeo. Uma
quebra amadora na capa compromete a primeira impressão. O usuário pediu que isso
vire diretiva do Mira.

---

## 3. Goals (Objetivos)

- [ ] G-01: O título da capa (primeiro slide) quebra de forma equilibrada, sem linha muito maior que a outra.
- [ ] G-02: Nenhum artigo (o, os, a, as, um, uma) ou preposição (em, de, do, da, para, com) fica solto no fim de uma linha do título da capa.
- [ ] G-03: A regra vale só para a capa; os títulos dos slides de conteúdo não são afetados.
- [ ] G-04: A diretiva está registrada em local compartilhado (`agents/_shared/titulo-capa.md`) e no `CLAUDE.md`, e é seguida por todo agente que gera ou reenquadra um deck.

**Métricas de sucesso:**

| Métrica | Baseline atual | Target | Prazo |
|---|---|---|---|
| Títulos de capa com artigo/preposição solto | ocorria | 0 | imediato |
| Títulos de capa com linhas equilibradas | não garantido | 100% | imediato |
| Títulos de slide de conteúdo afetados pela regra | 0 | 0 (inalterado) | imediato |

---

## 4. Non-Goals (Fora do Escopo)

- NG-01: Não aplicar a regra aos títulos dos slides de conteúdo (`h2` dos demais slides). A diretiva é só da capa.
- NG-02: Não alterar o número de linhas do título: em coluna muito estreita (ex.: 9:16), uma palavra longa pode ainda ocupar uma linha inteira; o balance só equilibra o que é equilibrável, sem forçar 2 linhas.
- NG-03: Não substituir o auto-ajuste de fonte (`fitTitles`) das versões responsivas. Balance decide a quebra, o auto-ajuste decide o tamanho; coexistem.
- NG-04: Não reescrever o texto do título nem impor contagem de palavras (isso é outra regra, "máximo 6 palavras", no `mira-animator`).

---

## 5. Usuários e Personas

**Usuário primário:** sandeco e operadores do Mira que geram decks e capas.
**Usuário secundário:** os agentes do Mira que criam ou reenquadram decks (`mira-animator`, skills responsivas), que devem embutir a regra no CSS base.

**Jornada atual (sem a diretiva):**
1. Gera o deck; a capa quebra o título de forma desbalanceada, com preposição solta.
2. Ajusta manualmente o texto ou aceita a quebra feia.

**Jornada futura (com a diretiva):**
1. Gera o deck; o CSS base já traz `text-wrap: balance` escopado à capa.
2. A capa quebra equilibrada automaticamente, sem preposição pendurada, sem ajuste manual.

---

## 6. Requisitos Funcionais

### 6.1 Requisitos Principais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|-----------|-------------------|
| RF-01 | O CSS base de todo deck deve conter `text-wrap: balance` aplicado ao título do primeiro slide, via seletor `body > section:first-of-type h1, body > section:first-of-type h2`. | Must | Inspeção do CSS mostra a regra escopada ao primeiro slide; a capa renderiza com linhas equilibradas. |
| RF-02 | A regra deve afetar SOMENTE o primeiro slide (capa). Títulos de slides de conteúdo não podem receber `text-wrap: balance` por esta diretiva. | Must | Os `h2` dos slides 2..N não têm `text-wrap: balance` proveniente desta regra. |
| RF-03 | Com um título de capa que antes quebrava com preposição solta (ex.: "Responsividade em quatro formatos"), o resultado deve manter a preposição junto do bloco seguinte ("Responsividade em" / "quatro formatos"), sem palavra isolada. | Must | Render da capa não mostra artigo/preposição sozinho no fim de linha. |
| RF-04 | A diretiva deve estar documentada em `agents/_shared/titulo-capa.md` e referenciada como regra do projeto no `CLAUDE.md`. | Must | Ambos os arquivos existem e descrevem a regra e o seletor. |
| RF-05 | Os agentes que geram ou reenquadram decks (a começar por `mira-animator`) devem apontar para a diretiva, garantindo que a capa nasça com a regra. | Should | `mira-animator/SKILL.md` cita `agents/_shared/titulo-capa.md` na regra de título. |
| RF-06 | A regra deve coexistir com o auto-ajuste de fonte (`fitTitles`) das versões responsivas, sem conflito. | Must | Numa versão responsiva, o título da capa continua equilibrado e o auto-ajuste ainda reduz a fonte quando necessário. |

### 6.2 Fluxo Principal (Happy Path)

1. Um agente gera (ou reenquadra) um deck.
2. O CSS base do deck inclui `body > section:first-of-type h1, body > section:first-of-type h2 { text-wrap: balance }` (RF-01).
3. Ao abrir o deck, o navegador quebra o título da capa de forma equilibrada (RF-03).
4. Os títulos dos slides de conteúdo permanecem inalterados (RF-02).

### 6.3 Fluxos Alternativos

**Fluxo A — Coluna muito estreita (9:16):** uma palavra longa da capa pode ocupar
uma linha inteira; o balance equilibra as demais linhas sem forçar 2 linhas e sem
deixar preposição solta (NG-02).

---

## 7. Requisitos Não-Funcionais

| ID | Requisito | Valor alvo | Observação |
|----|-----------|-----------|------------|
| RNF-01 | Compatibilidade | Chromium moderno (Edge/Chrome atual) | `text-wrap: balance` é suportado; alinhado ao resto da composição do Mira. |
| RNF-02 | Não interferência | Zero efeito nos slides de conteúdo | Seletor `:first-of-type` isola a capa. |
| RNF-03 | Idioma e estilo | pt-br correto, sem travessão | Segue `agents/_shared/idioma.md`. |

---

## 8. Design e Interface

**Componentes afetados:** CSS base do deck (`<style>` no `<head>`); documentação
compartilhada (`agents/_shared/titulo-capa.md`); `CLAUDE.md`; regra de título do
`mira-animator`.

**Comportamento esperado:** ao renderizar a capa, o título aparece com linhas de
comprimento parecido e sem artigo/preposição solto. Nos slides de conteúdo, nada muda.

**Trecho canônico (gerar exatamente isto no CSS base):**

```css
/* DIRETIVA: título da capa (primeiro slide/header) com quebra equilibrada. Só a capa. */
body > section:first-of-type h1,
body > section:first-of-type h2 { text-wrap: balance; }
```

**Estados da UI:**
- Título curto de capa (cabe em 1 linha): sem efeito visível.
- Título longo de capa: quebra equilibrada, sem palavra/preposição isolada.
- Coluna estreita (9:16): equilibra o possível; palavra longa pode ocupar linha inteira.

---

## 9. Modelo de Dados

> Não aplicável. Regra puramente de apresentação (CSS).

---

## 10. Integrações e Dependências

| Dependência | Tipo | Impacto se indisponível |
|-------------|------|------------------------|
| `text-wrap: balance` no navegador (Chromium moderno) | Obrigatória | Sem suporte, o título quebra pelo padrão do navegador (degradação graciosa, sem erro). |
| Estrutura `body > section` como slide (padrão do Mira) | Obrigatória | O seletor `:first-of-type` assume que o primeiro `section` é a capa. |

---

## 11. Edge Cases e Tratamento de Erros

| Cenário | Trigger | Comportamento esperado |
|---------|---------|----------------------|
| EC-01: Título da capa curto (1 linha) | Poucos caracteres | `text-wrap: balance` não muda nada; render normal. |
| EC-02: Palavra única mais larga que a coluna (9:16) | Palavra longa em coluna estreita | O balance equilibra as outras linhas; a palavra longa ocupa a linha dela (NG-02). |
| EC-03: Primeiro slide não é a capa (deck fora do padrão) | `body > section:first-of-type` não é a capa | O autor deve garantir que o primeiro `section` é a capa; caso contrário, ajustar o seletor ao markup real. |
| EC-04: Navegador sem `text-wrap: balance` | Engine antiga | Degrada para a quebra padrão do navegador, sem erro; recomenda-se Chromium moderno. |
| EC-05: Título da capa é `h1` em um deck e `h2` em outro | Variação de markup | O seletor cobre `h1` e `h2` do primeiro slide. |

---

## 12. Segurança e Privacidade

> Não aplicável. Regra de apresentação, sem dados.

---

## 13. Plano de Rollout

- **Estratégia:** documentar a diretiva em `agents/_shared/titulo-capa.md` e `CLAUDE.md`; embutir o CSS na base de novos decks (via `mira-animator` e templates). Decks já gerados podem receber a regra ao serem reeditados.
- **Rollback:** remover a regra do CSS base; nenhum efeito colateral nos slides de conteúdo.
- **Monitoramento:** ao gerar uma capa nova, conferir a quebra do título (sem preposição solta, linhas equilibradas).

---

## 14. Open Questions

| # | Pergunta | Impacto | Dono | Prazo |
|---|---------|---------|------|-------|
| OQ-01 | Vale também para o slide de encerramento (que às vezes tem um título grande como a capa), ou só para a capa? Hoje: só a capa. | Baixo | sandeco | versão futura |

---

## 15. Decisões Tomadas (Decision Log)

| Decisão | Alternativas consideradas | Racional |
|---------|--------------------------|---------|
| Regra só para a capa (primeiro slide) | Aplicar a todos os títulos | O usuário definiu o escopo: só o título do primeiro slide (header). Slides de conteúdo têm títulos curtos e não precisam. |
| `text-wrap: balance` | Inserir `&nbsp;` entre preposição e palavra seguinte; quebrar manualmente | `balance` é geral, robusto e não exige editar o texto; resolve o desbalanceamento e o artigo/preposição solto de uma vez. |
| Seletor `body > section:first-of-type h1, h2` | Classe dedicada na capa | Funciona sobre o markup padrão do Mira sem exigir classe nova; cobre `h1` e `h2`. |

---

## Apêndice

### Referências
- Diretiva compartilhada: `agents/_shared/titulo-capa.md`.
- Regra no projeto: `CLAUDE.md`, seção "Diretriz de título da capa".
- Regra de título do autor: `agents/mira-animator/SKILL.md`, seção "REGRA DE TÍTULO".
- Deck de validação: `decks/exemplo-responsivo/` (capa em 1:1).
- Idioma: `agents/_shared/idioma.md`.

### Histórico de Revisões
| Versão | Data | Autor | Mudanças |
|--------|------|-------|---------|
| 1.0 | 2026-07-07 | sandeco (via sessão Claude Code) | Criação da diretiva e da spec. |
