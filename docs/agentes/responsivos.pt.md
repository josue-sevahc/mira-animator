# Agentes responsivos

Versões quadrada, vertical e na regra dos terços de um deck.

## `/mira-squared`
Gera uma versão **quadrada** (1:1, 1080×1080) de um deck a partir do original 16:9, ou cria slides quadrados do zero. Escreve um novo `index-1x1.html` ao lado do original (centralizado por padrão, opcionalmente alinhado à esquerda/direita). Para feed do Instagram, LinkedIn, etc.

## `/mira-vertical`
Gera uma versão **vertical** (9:16). Cada slide de conteúdo fica só com o título principal no topo e uma animação num canvas alto e padronizado abaixo; o título encolhe sozinho para caber em no máximo 2 linhas, e o eixo de cada animação é reformulado para o retrato (fluxo horizontal vira vertical, comparação lado a lado vira empilhada). Escreve `index-9x16.html`. Para Reels, Shorts, TikTok, Stories.

## `/mira-thirds`
Reenquadra um deck na **regra dos terços** sem mudar a proporção. Empurra o conteúdo de cada slide para as colunas 1 e 2 de um grid 3×3 (os dois terços da esquerda) e deixa a coluna da direita livre — para você sobrepor texto, lower-third ou o vídeo do apresentador na edição. Funciona por cima do 16:9, 1:1 ou 9:16. Escreve um arquivo `-thirds`. Lado livre é a direita por padrão; pode ser invertido.
