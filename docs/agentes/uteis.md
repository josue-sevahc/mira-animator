# Utility agents

The content chain that feeds the build. See how they connect in the [Agent pipeline](../pipeline.md).

## `/mira-extract`
The context extractor. Reads a linked source from `mira.config.json` (project folder, PDF, LaTeX or text) and produces a structured briefing that feeds the planner. First link in the chain.

## `/mira-planner`
Content planner. Analyzes a chapter's content (LaTeX, PDF or text) and produces a detailed slide plan **before** any visual assembly — how many slides, what each one covers, the structure — and waits for approval.

## `/mira-copywriter`
Refines slide copy and specifies images, bringing the text down to slide altitude (short, punchy, presentable) rather than paragraph altitude.

## `/mira-validator`
Analyzes the generated HTML and validates visual, structural and asset conformance — a final quality report. Run it after a build, or to diagnose an existing deck.
