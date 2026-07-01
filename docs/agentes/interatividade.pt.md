# Agentes de Interatividade

Slides com que a plateia interage. Hoje isso significa enquetes e quizzes ao vivo: a sala escaneia um QR-code, responde num Google Forms, e o slide se atualiza em **tempo real** lendo a planilha de respostas pelo endpoint `gviz` por JSONP, então funciona até por `file://`, desde que haja internet e a planilha esteja pública.

## `/mira-survey`
Cria um slide de **enquete ao vivo**: a plateia escaneia um QR-code, vota num Google Forms, e o resultado se atualiza em **tempo real** no slide (donut 3D girando, padrão, ou gráfico de barras). Recebe dois links, o de **votação** (`forms.gle/...`, que vira o QR gerado localmente como SVG inline) e o da **planilha de respostas** (`docs.google.com/spreadsheets/...`, de onde o slide lê a contagem). A leitura é pelo endpoint `gviz` por JSONP a cada poucos segundos, então funciona até por `file://` sem erro de CORS; nunca usa o "Publicar na web → CSV" (cacheado por ~5 min). A planilha precisa estar pública (qualquer pessoa com o link → Leitor). Se faltar um dos links, o agente pede antes de gerar. Para um QR sem votação use `/mira-qrcode`; para um gráfico de dados estáticos use `/mira-chart`.

## `/mira-quiz`
Cria um slide de **quiz ao vivo**: a plateia escaneia um QR-code, responde uma pergunta de múltipla escolha num Google Forms, e o slide lê a planilha de respostas em tempo real via `gviz` + JSONP. A resposta correta fica oculta até o apresentador acionar **Revelar** ou a tecla `R`; só então o card correto aparece em verde suave, as porcentagens e contagens por alternativa entram com barras animadas, e um ranking básico de acertos pode ser alternado com `K`. Recebe link de votação, link da planilha, pergunta, alternativas e resposta correta. Para enquete sem resposta correta use `/mira-survey`.
