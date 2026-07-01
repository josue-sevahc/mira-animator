# Brainstorm: skill /mira-quiz

> Especificação inicial salva em 2026-06-30. Objetivo: criar um quiz ao vivo no
> Mira, com QR code para resposta da plateia, leitura por Google Forms + Google
> Sheets e revelação animada da resposta correta.

## Ideia central

O `/mira-quiz` é o par natural do `mira-survey`: a plateia responde pelo celular
e o slide mostra o resultado ao vivo. A diferença é que o quiz tem resposta
correta, estado de revelação e possível ranking.

## Decisões tomadas

### 1. V1 usa Google Forms + Google Sheets

A primeira versão deve reaproveitar a arquitetura validada no `mira-survey`:

- O QR code aponta para o Google Forms.
- As respostas caem numa planilha vinculada ao formulário.
- O slide lê a planilha pelo endpoint `gviz` com JSONP.
- O slide funciona aberto por `file://`, desde que tenha internet e a planilha
  esteja pública para leitura.

### 2. Perguntas sempre são de múltipla escolha

O `/mira-quiz` sempre trabalha com alternativas fechadas. Não há resposta aberta
na v1.

Configuração mínima do slide:

```js
QUESTION = "Qual destes é um modelo multimodal?";
OPTIONS = ["GPT-4o", "Excel", "Photoshop", "PowerPoint"];
CORRECT = "GPT-4o";
```

O formulário deve ter, no mínimo:

- Um campo de identificação, como nome ou apelido.
- Uma pergunta de múltipla escolha com as mesmas opções do slide.

### 3. Revelação controlada pelo apresentador

A resposta correta não aparece automaticamente. A revelação deve acontecer
somente quando o apresentador acionar um comando.

Comandos aceitos na v1:

- Clique em um botão discreto no slide, por exemplo "Revelar".
- Tecla de atalho, por exemplo `R`.

Antes da revelação, o slide mostra a pergunta, o QR code e as opções em estado
neutro. Depois da revelação, o slide destaca a resposta correta e exibe as
porcentagens da plateia por opção.

### 4. Correta em verde, suave, flat e bonita

Na revelação, a alternativa correta deve ser marcada em verde. O visual deve ser
flat, limpo e suave, sem efeito pesado.

Direção visual:

- Verde principal sugerido: `#35D07F`.
- Fundo da opção correta: verde translúcido suave.
- Borda ou halo leve em verde.
- Ícone de check discreto.
- Texto da opção correta com contraste alto.
- Opções incorretas ficam presentes, mas com menor destaque.

O verde não deve brigar com o laranja da marca `#FF904D`; o laranja pode
continuar em elementos de identidade, título, QR ou ação.

### 5. Porcentagens por opção na revelação

Na revelação, cada alternativa deve mostrar:

- Quantidade de respostas.
- Percentual da plateia.
- Barra horizontal proporcional ou preenchimento suave dentro do card.

Exemplo de leitura visual:

```text
GPT-4o          18 votos   72%
Excel            3 votos   12%
Photoshop        2 votos    8%
PowerPoint       2 votos    8%
```

As porcentagens só aparecem depois da revelação, para não contaminar a votação
enquanto a plateia ainda responde.

### 6. Animação de revelação

A revelação precisa ser um momento visual forte, não só uma troca seca de CSS.

Animação desejada:

1. Pequena pausa dramática após o clique ou tecla.
2. Cards das alternativas respiram ou tremem levemente, como suspense.
3. Opções incorretas reduzem brilho e escala de forma suave.
4. Opção correta ganha destaque verde com crescimento leve.
5. Barra de porcentagem da correta preenche com easing.
6. Demais barras aparecem com preenchimento proporcional.
7. Check da correta entra com desenho ou pop suave.

Tudo deve ser elegante e legível em projeção, sem excesso de partículas ou
efeitos que atrapalhem leitura.

### 7. Estados do slide

O slide deve ter três estados principais:

```text
1. Votando
2. Revelando
3. Revelado
```

Estado `Votando`:

- Mostra pergunta, opções neutras e QR code.
- Mostra status ao vivo.
- Não mostra porcentagens.
- Pode mostrar total de respostas, se isso não entregar a distribuição.

Estado `Revelando`:

- Estado transitório acionado pelo apresentador.
- Executa a animação de suspense e destaque.

Estado `Revelado`:

- Correta marcada em verde.
- Percentuais e contagens visíveis por alternativa.
- Ranking pode aparecer como painel secundário ou próximo slide.

### 8. Ranking

Ranking é desejado, mas pode entrar depois do núcleo de revelação.

V1 mínima:

- Calcular quem acertou lendo `nome/apelido` + resposta.
- Mostrar lista dos acertos ou top participantes.

V1 visual ideal:

- Após revelar a resposta, um comando adicional alterna para ranking.
- Ranking entra com animação de cards subindo.

### 9. Limitações aceitas na V1

Com Google Forms + Sheets, a v1 não deve prometer:

- Bloqueio perfeito de respostas depois do tempo.
- Pontuação precisa por velocidade.
- Tela individual para cada jogador.
- Latência de websocket.

Esses pontos ficam para uma possível v2 com backend próprio, Supabase, Firebase
ou servidor local.

## Forma candidata da skill

```text
/mira-quiz
- link de votação do Google Forms
- link da planilha de respostas
- pergunta
- alternativas
- resposta correta
- visual: cards, barras ou ranking
```

Padrão visual recomendado para a v1: cards de alternativas com barras internas,
porque favorece a revelação, a marcação verde da correta e a leitura das
porcentagens.

## Checklist da v1

- [ ] Usa QR code gerado localmente como SVG inline.
- [ ] Usa Google Forms como interface de resposta.
- [ ] Usa Google Sheets como fonte viva de dados.
- [ ] Lê a planilha via `gviz` + JSONP.
- [ ] Pergunta sempre de múltipla escolha.
- [ ] Resposta correta configurada explicitamente.
- [ ] Porcentagens só aparecem depois da revelação.
- [ ] Revelação acionada por clique ou tecla.
- [ ] Correta marcada em verde suave, flat e legível.
- [ ] Animação de revelação tem suspense, destaque e barras animadas.
- [ ] Preserva a Regra Zero do Mira: existe loop interno contínuo no slide.

## Status

Convergido como direção inicial. Última atualização: 2026-06-30.
