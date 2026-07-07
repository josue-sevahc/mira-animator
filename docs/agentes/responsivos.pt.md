# Agentes responsivos

Versões quadrada, vertical e na regra dos terços de um deck.

## `/mira-squared`
Gera uma versão **quadrada** (1:1) de um deck a partir do original 16:9, ou cria slides quadrados do zero. Cada slide de conteúdo fica só com o título no topo e a animação num canvas quadrado padronizado abaixo; o eixo de cada animação é **reformulado por metáfora para preencher o quadrado** (sem faixa preta), o título encolhe para 2 linhas e o `viewBox` é casado ao quadrado. O lado do quadrado é a altura do 16:9 (`100vh`), centralizado, com **margens laterais em cinza #333**. Escreve um novo `index-1x1.html` ao lado do original. Para feed do Instagram, LinkedIn, etc.

## `/mira-vertical`
Gera uma versão **vertical** (9:16). Cada slide de conteúdo fica só com o título principal no topo e uma animação num canvas alto e padronizado abaixo; o título encolhe sozinho para caber em no máximo 2 linhas, e o eixo de cada animação é reformulado para o retrato (fluxo horizontal vira vertical, comparação lado a lado vira empilhada). Escreve `index-9x16.html`. Para Reels, Shorts, TikTok, Stories.

## `/mira-thirds`
Reenquadra um deck na **regra dos terços** sem mudar a proporção. Empurra o conteúdo de cada slide (título + animação) para as colunas 1 e 2 de um grid 3×3 (os dois terços da esquerda) e pinta a coluna da direita de **cinza #333, 100% limpa**, para você sobrepor texto, lower-third ou a câmera na edição. A animação é **reformulada por metáfora para preencher o box dos 2/3** (sem faixa fina). Funciona por cima do 16:9, 1:1 ou 9:16. Escreve um arquivo `-thirds`. Lado cinza é a direita por padrão; pode ser invertido.
