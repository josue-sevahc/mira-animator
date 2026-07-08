---
name: mira-img-animator
description: >
  Transforma imagens (fotos, logos, diagramas) em animações D3.js interativas e self-contained.
  Use sempre que o usuário pedir para animar uma imagem, criar efeitos visuais a partir de uma
  imagem, transformar imagem em partículas, gerar visualizações interativas de uma imagem, ou
  combinar "imagem + animação + D3". Também quando mencionar "partículas", "dissolve", "explode",
  "morph", "wave", "pixel art animado", "imagem animada com D3", "efeito visual em imagem",
  "animação interativa de imagem", ou transformar uma imagem estática em algo dinâmico.
  Funciona com JPG, PNG, SVG, GIF e WebP.
---

# D3 Image Animator

Transforma imagens em animações D3.js interativas. Foco em **fotos e imagens reais (JPG, PNG)**,
gerando sempre um **HTML standalone** (arquivo único, com D3 via CDN e imagem embutida em base64).

## Fluxo de Trabalho

### 1. Receber a Imagem

Origem possível:

- **Upload direto** → arquivo em `/mnt/user-data/uploads/`
- **URL da web** → baixar via `web_fetch`
- **Imagem no contexto** → Claude já a vê e pode analisar seus elementos

**Formatos:** JPG e PNG são primários. WebP, GIF, SVG e BMP também funcionam, mas podem precisar de
conversão via `scripts/image_to_base64.py --convert-to png`.

**Otimização para fotos:** fotos reais são grandes e densas. Redimensione para max 800px de largura
antes de processar partículas — use `scripts/resize_image.py` antes de `scripts/extract_pixels.py`.

### 2. Analisar a Imagem

Antes de gerar código, analise a imagem para decidir a abordagem:

- **Tipo de conteúdo**: foto, logo, diagrama, ilustração, ícone, gráfico, texto
- **Complexidade**: simples (poucas formas), média, complexa (foto detalhada)
- **Cores dominantes**: extrair paleta para usar na animação
- **Elementos identificáveis**: formas geométricas, texto, contornos, regiões

### 3. Escolher o Tipo de Animação

Catálogo completo de efeitos em `references/ANIMATION_CATALOG.md`. A escolha depende do tipo de imagem
e do efeito desejado.

**Regra geral de decisão:**

| Tipo de imagem | Animação recomendada |
|----------------|---------------------|
| Logo/ícone simples | Partículas, morph, draw-on |
| Foto/imagem complexa | Partículas (sampled), wave, dissolve, pixelate |
| Diagrama/fluxograma | Force-directed, draw-on, highlight |
| Texto/tipografia | Partículas de texto, scramble, typewriter |
| Gráfico/chart | Transições de dados, staggered bars |

Se o usuário não especificou o tipo, pergunte mostrando 2-3 opções que fazem sentido para a imagem,
com breve descrição visual de cada.

### 4. Gerar o Código

Padrões D3.js testados em `references/D3_PATTERNS.md`.

**Regras fundamentais do código gerado:**

1. **HTML standalone** — arquivo único `.html` com tudo embutido (CSS, JS, D3 via CDN)
2. **D3.js v7** — sempre via CDN: `https://d3js.org/d3.v7.min.js`
3. **Canvas para performance** — use Canvas (não SVG) com mais de 5.000 elementos
4. **SVG para interatividade** — use SVG para hover/click em elementos individuais
5. **Imagem como base64** — converter e embutir no HTML para ser self-contained
6. **Responsivo** — a animação se adapta ao tamanho da tela
7. **Controles** — botões play/pause/reset quando relevante
8. **Performance** — `requestAnimationFrame` para loops, limitar partículas a ~50.000

Converter imagem em base64:

```bash
python scripts/image_to_base64.py <caminho_da_imagem>
```

Extrair paleta de cores dominantes:

```bash
python scripts/extract_palette.py <caminho_da_imagem> --colors 6
```

Extrair dados de pixels (posição + cor) para partículas:

```bash
python scripts/extract_pixels.py <caminho_da_imagem> --sample-rate 4 --min-alpha 128
```

### 5. Estrutura do HTML Gerado

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Nome da Animação]</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        /* Reset + estilos da animação */
        /* Controles de UI quando aplicável */
    </style>
</head>
<body>
    <div id="container"></div>
    <script>
        // 1. Configuração (dimensões, dados da imagem)
        // 2. Setup do Canvas ou SVG
        // 3. Extração/processamento de pixels
        // 4. Lógica da animação
        // 5. Controles e interatividade
        // 6. Função de resize responsiva
    </script>
</body>
</html>
```

### 6. Salvar e Entregar

Output **sempre HTML standalone**. Salve e use `present_files` para entregar:

```python
output_path = "/mnt/user-data/outputs/animacao_d3_[nome].html"
```

**Nota:** se o usuário pedir React (.jsx), consulte `references/REACT_PATTERNS.md`; o padrão é HTML standalone.

## Diretrizes de Qualidade

- **Estética**: seguir o skill `frontend-design` — cores coesas, tipografia elegante, backgrounds atmosféricos
- **Animação fluida**: mínimo 30fps, idealmente 60fps; testar com imagens grandes
- **Interatividade significativa**: hover, click, drag devem fazer algo visualmente satisfatório
- **Código limpo**: comentários em português, variáveis com nomes descritivos
- **Fallback gracioso**: se a imagem não carregar, mostrar mensagem amigável

## Tratamento de Erros

Cenários de erro e tratamento em `references/ERRORS.md`.
