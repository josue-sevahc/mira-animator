# Brainstorm: interatividade no Mira

> Lista salva a partir de conversa em 2026-06-30 sobre como expandir o Mira de
> slides animados para slides interativos. Contexto: o `mira-survey` jÃ¡ adiciona
> enquete ao vivo via QR code, Google Forms e Google Sheets.

## Ideia central

O Mira pode deixar de ser apenas "slide bonito que se move" e passar a ser um
slide com estado: o conteÃºdo muda conforme voto, clique, arrasto, dado ao vivo
ou escolha da plateia.

## Frentes de interatividade

### 1. Quiz ao vivo

Tipo Kahoot/Mentimeter: QR para responder, ranking, resposta correta e animaÃ§Ã£o
de revelaÃ§Ã£o.

Boa skill candidata: `/mira-quiz`.

### 2. Nuvem de palavras ao vivo

A plateia envia palavras ou frases curtas pelo celular, e o slide monta uma word
cloud animada em tempo real.

Bom para abertura de aula, diagnÃ³stico, retrospectiva e brainstorming.

Boa skill candidata: `/mira-wordcloud`.

### 3. Q&A ao vivo

QR para enviar perguntas. O slide mostra cards de perguntas entrando, com modo
para destacar a pergunta atual. Pode evoluir para votaÃ§Ã£o nas perguntas.

Boa skill candidata: `/mira-qna`.

### 4. DecisÃ£o ramificada

A plateia escolhe o prÃ³ximo caminho da apresentaÃ§Ã£o, por exemplo: exemplo
tÃ©cnico, caso real ou demo. O deck navega para blocos diferentes.

Isso transforma a apresentaÃ§Ã£o em roteiro adaptativo.

Boa skill candidata: `/mira-branch`.

### 5. Simuladores e calculadoras

Sliders, knobs, inputs e toggles dentro do slide. Exemplos:

- Mudar preÃ§o, conversÃ£o e churn para ver receita.
- Ajustar parÃ¢metros de IA para comparar custo, latÃªncia e qualidade.
- Alterar premissas de projeto para ver impacto em prazo, risco ou orÃ§amento.

Boa skill candidata: `/mira-simulator`.

### 6. ExploraÃ§Ã£o de dados

GrÃ¡ficos D3 com hover, zoom, filtros, brush, drill-down, antes/depois e timeline
arrastÃ¡vel.

Aqui o slide deixa de ser sÃ³ visual e vira mini-dashboard.

Boa direÃ§Ã£o: expandir `/mira-chart` ou criar `/mira-dataviz`.

### 7. 3D manipulÃ¡vel

O `/mira-3d` jÃ¡ aponta nessa direÃ§Ã£o: OrbitControls, zoom, arrastar, pausar
auto-rotaÃ§Ã£o durante interaÃ§Ã£o e retomar depois.

DÃ¡ para criar slides onde o pÃºblico ou apresentador explora um modelo, objeto,
mapa ou sistema.

### 8. Controle pelo celular

QR abre uma pÃ¡gina simples que vira controle remoto: avanÃ§ar slides, votar,
escolher opÃ§Ãµes, acionar revelaÃ§Ãµes e controlar sliders.

Esse seria um salto grande: o celular vira interface secundÃ¡ria do Mira.

Boa skill ou infraestrutura candidata: `/mira-remote`.

### 9. Drag and drop no slide

Ordenar prioridades, montar fluxos, classificar itens em colunas, encaixar peÃ§as
ou fazer exercÃ­cios de categorizaÃ§Ã£o.

Excelente para workshops, aulas prÃ¡ticas e dinÃ¢micas em grupo.

### 10. RevelaÃ§Ãµes sob comando

Em vez de uma animaÃ§Ã£o linear, o apresentador clica para revelar camadas,
comparar cenÃ¡rios, ligar/desligar hipÃ³teses, destacar partes do SVG ou abrir
detalhes de um grÃ¡fico.

### 11. Mural de fotos ao vivo

A plateia escaneia um QR code e envia uma foto, por exemplo uma selfie, imagem
do grupo, print de exercício, foto de um objeto ou registro de uma atividade. As
imagens começam a aparecer no telão em tempo real, formando um mural animado.

Possíveis visuais:

- Grade viva com fotos entrando em cards.
- Mosaico que vai preenchendo o slide.
- Carrossel com destaque para a última foto recebida.
- Parede de fotos com zoom suave e rearranjo automático.
- Chuva de imagens pequenas que se organizam em um grid.

Casos de uso:

- Abertura de evento ou aula com fotos dos participantes.
- Dinâmica de workshop.
- Registro visual de exercícios práticos.
- Campanha interna ou apresentação com participação da plateia.

Atenção técnica: upload de arquivo pelo Google Forms normalmente exige login no
Google e salva os arquivos no Drive, o que pode atrapalhar uso anônimo com
plateia grande. Para v1, vale avaliar duas rotas:

- Simples: formulário pedindo um link de imagem pública.
- Mais robusta: formulário/upload próprio com backend leve ou serviço de storage.

Boa skill candidata: `/mira-photo-wall`.
## Roadmap sugerido

1. `/mira-quiz`: par natural do `mira-survey`, reaproveitando QR, Forms e Sheets.
2. `/mira-wordcloud`: visualmente forte e muito alinhado com o estilo do Mira.
3. `/mira-simulator`: diferencia o Mira de slides animados comuns.
4. `/mira-remote`: infraestrutura para interatividade mais avanÃ§ada.

## ObservaÃ§Ãµes de produto

- O `mira-survey` prova o padrÃ£o QR + fonte viva de dados.
- O prÃ³ximo passo natural Ã© transformar esse padrÃ£o em famÃ­lias: votaÃ§Ã£o,
  resposta correta, texto livre, perguntas abertas e controle remoto.
- Interatividade local deve funcionar bem por `file://` quando possÃ­vel.
- Interatividade com dados ao vivo precisa explicitar dependÃªncia de internet e
  fonte pÃºblica ou endpoint prÃ³prio.
- Cada skill nova deve preservar a Regra Zero do Mira: o slide continua tendo
  loop interno contÃ­nuo, mesmo quando existe interaÃ§Ã£o manual.

## Status

Salvo para evoluÃ§Ã£o futura. Ãšltima atualizaÃ§Ã£o: 2026-06-30.

