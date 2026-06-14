# Visuals & data

Static visuals, charts, QR codes, true 3D and image-driven templates.

## `/mira-visuals`
Static images for slides: panels, diagrams, charts and infographics — when a concept is better shown as a fixed, dense visual than as motion.

## `/mira-chart`
Turns data into charts with impact: from a CSV/JSON, from an image of a chart, or from a hand-drawn sketch — and recommends the best chart type from a gallery.

## `/mira-qrcode`
Inserts a large, centered, scannable **QR code** into a slide, generated from a link or text you provide. The QR is generated **locally** at build time (the `qrcode` npm package) and embedded as an inline SVG, with no runtime dependency, no external API and no CDN, so the slide works even from `file://`. Clean card, same pattern as `mira-3d`: just the slide title and the big QR, with no link caption underneath. Scannability drives the style: dark modules on a white card, quiet zone preserved, orange only on the frame and title. The QR stays static: the internal loop lives in the frame (glow pulse, breathing corners), never over the modules.

## `/mira-3d`
Adds a **true 3D element** to a slide's canvas (real depth, continuous auto-rotation and drag-to-rotate / zoom interaction) in a clean card where the element is maximized. It picks one of three layers from your request: pure CSS 3D (simple shapes), procedural Three.js (abstract forms like particle spheres and node networks, or low-poly objects built from primitives), or glTF (when you provide a `.glb`, or accept a search for a free, licensed model on the web). It inherits the mother-rule: the 3D never enters static, so auto-rotate pauses on drag and resumes.

!!! warning "The glTF layer needs a server"
    A slide that loads a local `.glb` does **not** open from `file://` (the browser blocks the model fetch), only over HTTP. In that case the agent starts a local server, hands you the `http://localhost` link, and writes a double-click launcher (`abrir-slide.cmd`) so you can present later. This layer needs **Node.js** installed. The CSS 3D and procedural layers use no local asset and open straight from `file://`, with no server.

## `/mira-image-template`
Creates a **new deck template from image(s)**. You send screenshots of screens/slides and/or the logo, and the agent recognizes the whole design system (colors, background, typography, corners, shadows, glassmorphism, glows) and, when a screenshot is given, the **arrangement of the elements**, then builds a complete template: the skeleton `mira-templates/decks/<name>/index.html` with the identity embedded, plus the theme `mira-templates/themes/<name>.css`. At the end it asks for a **name** and saves. The template is then offered by `/mira-new` alongside the existing ones, and its same-name theme becomes the natural default. The screenshot drives the layout; the logo drives the palette.
