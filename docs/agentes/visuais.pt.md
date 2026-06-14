# Visuais e dados

Visuais estáticos, gráficos, QR codes, 3D de verdade e templates a partir de imagem.

## `/mira-visuals`
Imagens estáticas para slides: painéis, diagramas, gráficos e infográficos — quando um conceito fica melhor como um visual fixo e denso do que como movimento.

## `/mira-chart`
Transforma dados em gráficos com impacto: a partir de um CSV/JSON, de uma imagem de gráfico, ou de um rascunho à mão — e recomenda o melhor tipo de gráfico a partir de uma galeria.

## `/mira-qrcode`
Insere num slide um **QR code** grande, central e escaneável, gerado a partir de um link ou texto que você fornece. O QR é gerado **localmente** na hora de criar o slide (pacote npm `qrcode`) e embutido como SVG inline, sem dependência de runtime, sem API externa e sem CDN, então o slide funciona até por `file://`. Card limpo, mesmo padrão do `mira-3d`: só o título do slide e o QR grande, sem legenda com o link embaixo. A escaneabilidade manda no estilo: módulos escuros sobre cartão branco, zona de silêncio preservada, laranja só na moldura e no título. O QR fica estático: o loop interno vive na moldura (pulso de brilho, cantos respirando), nunca sobre os módulos.

## `/mira-3d`
Adiciona um **elemento 3D de verdade** ao canvas de um slide (profundidade real, rotação automática contínua e interação de arrastar para girar / dar zoom) num card limpo onde o elemento fica maximizado. Escolhe uma de três camadas a partir do seu pedido: CSS 3D puro (formas simples), Three.js procedural (formas abstratas como esfera de partículas e rede de nós, ou objetos low-poly montados de primitivas), ou glTF (quando você fornece um `.glb`, ou aceita buscar um modelo gratuito e licenciado na web). Herda a regra-mãe: o 3D nunca entra estático, então a rotação automática pausa no arrasto e retoma.

!!! warning "A camada glTF precisa de servidor"
    Um slide que carrega um `.glb` local **não** abre por `file://` (o navegador bloqueia o fetch do modelo), só por HTTP. Nesse caso o agente sobe um servidor local, te entrega o link `http://localhost` e gera um launcher de duplo-clique (`abrir-slide.cmd`) para você apresentar depois. Essa camada precisa do **Node.js** instalado. As camadas CSS 3D e procedural não usam asset local e abrem direto de `file://`, sem servidor.

## `/mira-image-template`
Cria um **novo template de deck a partir de imagem(ns)**. Você manda prints de telas/slides e/ou a logomarca, e o agente reconhece todo o design system (cores, fundo, tipografia, cantos, sombras, glassmorphism, glows) e, quando há print, a **disposição dos elementos**, e monta um template completo: o esqueleto `mira-templates/decks/<nome>/index.html` com a identidade embutida, mais o tema `mira-templates/themes/<nome>.css`. Ao final pede um **nome** e salva. O template passa a ser oferecido pelo `/mira-new` junto com os existentes, e seu tema de mesmo nome vira o padrão natural. Print manda no layout; logo manda na paleta.
