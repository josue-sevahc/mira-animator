# Mira — bibliotecas vendoradas (modo offline)

Cópias locais e pinadas das libs que um deck do Mira normalmente carrega por CDN.
Existem para o modo offline (`/mira-offline`): empresas com firewall costumam liberar
o registry do npm (por isso `npx mira-animator install` funciona) mas bloquear CDNs
avulsas (`cdn.tailwindcss.com`, `unpkg.com`, `fonts.googleapis.com`). Com estas cópias
o deck abre 100% local, por `file://`, sem bater em nenhuma origem externa.

Estas libs viajam dentro do pacote npm (`templates/` é publicado) e o instalador as
copia para `mira-templates/vendor/` no projeto. A skill `/mira-offline` copia daqui
para `<deck>/assets/vendor/` e reescreve os HTMLs do deck para caminhos relativos.

## Conteúdo e versões

| Arquivo | Versão | Origem |
|---|---|---|
| `tailwind.js` | Play CDN (runtime) | `https://cdn.tailwindcss.com` |
| `aos.css` / `aos.js` | 2.3.1 | `https://unpkg.com/aos@2.3.1/dist/` |
| `lucide.js` | 1.21.0 (UMD) | `https://unpkg.com/lucide@1.21.0/dist/umd/lucide.min.js` |
| `d3.v7.min.js` | 7.9.0 | `https://d3js.org/d3.v7.min.js` |
| `inter.css` + `fonts/*.woff2` | Inter v20 (variável) | `https://fonts.googleapis.com/css2?family=Inter` |
| `three/` (core + OrbitControls + GLTFLoader + BufferGeometryUtils) | three 0.160.0 | `https://unpkg.com/three@0.160.0` |

Notas:
- **Tailwind** é o Play CDN (compila no navegador em runtime). Funciona por `file://`;
  imprime no console um aviso "not for production" — inofensivo para um deck.
- **Inter** é fonte variável: um único woff2 por subset cobre todo o eixo 100–900.
  Guardamos só os subsets `latin` e `latin-ext` (acentos PT-BR vivem no `latin`,
  U+00C0–00FF). `inter.css` referencia os woff2 por caminho relativo.
- **Three.js** (`three/`): só é copiado para o deck quando ele usa 3D (mira-3d).
  Cobre o scaffold canônico (OrbitControls + GLTFLoader). Um addon fora desse par
  precisa ser adicionado aqui (rode o fecho transitivo a partir do novo entry point).
- **GSAP** NÃO fica aqui: já é vendorado por-deck pelas skills de morph (`assets/gsap/`).

## Como regenerar (com internet aberta)

```bash
cd templates/vendor
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0"
curl -sL -A "$UA" https://cdn.tailwindcss.com -o tailwind.js
curl -sL https://unpkg.com/aos@2.3.1/dist/aos.css -o aos.css
curl -sL https://unpkg.com/aos@2.3.1/dist/aos.js  -o aos.js
curl -sL https://unpkg.com/lucide@1.21.0/dist/umd/lucide.min.js -o lucide.js
curl -sL https://d3js.org/d3.v7.min.js -o d3.v7.min.js
# Inter: baixar o css2 com UA de Chrome (sem isso vem TTF), manter latin/latin-ext,
# baixar os woff2 e reescrever os src para fonts/inter-<subset>.woff2 (uma woff2 por
# subset, font-weight: 100 900, por ser fonte variável).
```
