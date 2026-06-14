# Agentes úteis

A cadeia de conteúdo que alimenta a montagem. Veja como eles se conectam no [Pipeline de agentes](../pipeline.md).

## `/mira-extract`
O extrator de contexto. Lê uma fonte vinculada no `mira.config.json` (pasta de projeto, PDF, LaTeX ou texto) e produz um briefing estruturado que alimenta o planner. Primeiro elo da cadeia.

## `/mira-planner`
Planejador de conteúdo. Analisa o conteúdo de um capítulo (LaTeX, PDF ou texto) e produz um plano de slides detalhado **antes** de qualquer montagem visual — quantos slides, o que cada um cobre, a estrutura — e espera aprovação.

## `/mira-copywriter`
Refina o texto dos slides e especifica imagens, trazendo o texto para a altura de slide (curto, direto, apresentável) em vez da altura de parágrafo.

## `/mira-validator`
Analisa o HTML gerado e valida conformidade visual, estrutural e de assets — um relatório final de qualidade. Rode após uma montagem, ou para diagnosticar um deck existente.
