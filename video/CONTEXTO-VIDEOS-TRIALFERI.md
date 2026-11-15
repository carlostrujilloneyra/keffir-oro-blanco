# Contexto · Videos TRIALFERI (para continuar en un chat nuevo)

> Pega este archivo al inicio del nuevo chat. Resume todo lo necesario para seguir haciendo videos de TRIALFERI (kéfir, kombucha y productos relacionados) con HyperFrames, Remotion y ElevenLabs.
> Última actualización: 15 de noviembre de 2026. Complementos: `HOOKS-TRIALFERI.md` (hooks y copy que venden) y `PROMPTS-TRIALFERI.md` (todos los prompts listos para copiar: voces, sonidos, música, imágenes y Claude Code).

---

## 1. Sobre mí y cómo trabajar conmigo
- Carlos, de Perú, desarrollador frontend (Next.js, React, Tailwind). Me dices **"Doc"**.
- Español neutro, sin modismos argentinos.
- Respuestas ordenadas, con buenas prácticas, ejemplos y sugerencias. Actúa como experto en publicidad, motion design y UI senior: nada básico.
- **Cuido los tokens:** prefiero editar lo existente antes que rehacer.
- Cuando pida prompts (Claude Code / ElevenLabs), dámelos **completos y listos para copiar**.
- Flujo de trabajo:
  - **Cowork (este tipo de chat):** guion, textos de ElevenLabs, prompts para Claude Code, revisión de storyboards y renders (puede leer mi Mac por el puente de carpetas).
  - **Claude Code en Warp:** construye y renderiza los videos (los renders tardan más de 3 min).

## 2. El negocio: TRIALFERI
- Marca artesanal de mi mamá (antes "Oro Blanco - SN"). TikTok **@trialferi** · WhatsApp **941 462 492** (otro número de atención: 923 676 457).
- **Kéfir de leche de vaca y de cabra** natural: 1 L, 475 ml y 250 ml.
- **Kéfir frutado** (vaca, 475 ml): fresa con pulpa natural, arándanos con pulpa natural, **frutos del bosque** (4 frutos: fresa, frambuesa, arándano y zarzamora; **el más pedido**), chocolate con **cacao de Quillabamba**. Frutados **endulzados con stevia**. Aguaymanto existe en el catálogo, pero no tiene fotos para video.
- Otros: kéfir de agua, queso cottage de cabra (olivo, ajo, jalapeño), cremas de kéfir, mantequilla, manteca, mermeladas, chucrut, nódulos. **Kombuchas:** flor de guisante, espirulina azul, pitahaya.
- Proceso: pasteurizado en **ollas de acero quirúrgico**, artesanal, sin azúcar añadida (natural), sin conservantes añadidos. **Sin saborizantes ni colorantes** en los frutados (confirmado: solo leche, cultivos, fruta y stevia).
- Fuente de verdad de productos y tamaños: `keffir-oro-blanco/src/features/products/data/products.tsx`.
- Biotiendas: Ecocultivo (cliente #1); VerdeRaíz (C.C. Unicachi, tienda 77, Comas; WhatsApp 942 469 453; @bioverderaiz), que compra vaca y cabra. A la mayoría de biotiendas solo se les vende vaca.

## 3. Reglas de contenido (obligatorias)
- **Beneficios solo con frases de las etiquetas aprobadas:** "Alto en probióticos vivos", "Fortalece tu microbiota", "Contribuye a una digestión equilibrada", "Bajo en lactosa", "Fuente de antioxidantes" (arándanos), "Antioxidantes y vitamina C de la fresa", "4 frutos en 1", "100 % kéfir natural, no es yogurt estilo kéfir".
- **Nunca** decir que cura, corrige o trata enfermedades: gastritis, estreñimiento, colon irritado, desinflamar, sistema inmune. DIGESA lo prohíbe, TikTok lo baja, y puede llevar a alguien a no tratarse. Sin cifras inventadas de probióticos.
- No usar las imágenes `assets/infografia-*` con "beneficios" como texto (sí como referencia de estilo).
- Modo de consumo (de la etiqueta): **shot de 30 ml en la mañana en ayunas y otro en la noche**, aumentar poco a poco. Combinar con **granola, cereales o frutas**.
- Cierre de los videos: **"TRIALFERI" como palabra** (Anton / Alfa Slab One), sin el logo circular. Lema: **"Hecho a mano, lote a lote"**. Sin precios en los videos.
- En TikTok funcionan mejor los videos crudos del proceso (búlgaros/nódulos) que los muy diseñados.

## 4. Identidad visual
- Fuentes: **Anton** y **Alfa Slab One** (titulares; "KÉFIR" va en Alfa Slab One como en el frasco) y **Poppins** (textos). Están en `video/assets/fonts/`.
- Recurso de marca: la **cinta negra con flecha** de la etiqueta ("Alto en probióticos").
- Colores por sabor (como las etiquetas): natural azul grisáceo/azul; fresa rojo frambuesa; arándanos lila; frutos del bosque rosa/magenta; chocolate marrón cacao. Neutros: crema "leche" y **negro tinta** (cierre).
- Paleta VerdeRaíz: verde #183026/#14231B, menta #8FD19E, crema #FBF4EC, miel #F2B705.
- Formato redes: **1080×1920, 30 fps**. **Zona segura SOLO para texto:** sin texto en los 220 px superiores, los 420 inferiores ni los 160 de la derecha. **Los productos sí pueden ocupar esas zonas** (que el producto se vea grande).
- Subtítulos: borde inferior ≈1480 px, ≥46 px, blancos, la palabra activa en el color del sabor, placa oscura semitransparente. Ningún texto menor a 34 px (a 1080 de ancho).

## 5. Repo y proyectos de video
- Repo: `~/Desktop/keffir-oro-blanco` · rama de videos **`feature/videos-with-claude`** · Node 22 (nvm). (La web está en otras ramas, por ejemplo `feature/home-hero-showcase`.)
- **HyperFrames** (`video/`): fuente de verdad `video/scripts/build.mjs` → genera `index.html` (no editarlo a mano). Variantes: `node scripts/build.mjs --store verde-raiz` (degustación) y `--sin-degustacion`. Ya renderizados: `trialferi-promo-reels.mp4`, `trialferi-verde-raiz-degustacion.mp4` (+ sin música).
- **Remotion · sorteo** (`video/remotion-sorteo/`): teaser del sorteo; pruebas 3D (`Prueba3D.tsx`) y parallax (`PruebaParallax.tsx`, `@remotion/three`, renderizar con `--gl=angle`); `scripts/mix-audio.py` (ducking). `public/` tiene las botellas recortadas.
- **Remotion · kéfir** (`video/remotion-kefir/`), **el proyecto actual**:
  - Una composición `VideoKefir` con props (`variante: 'natural' | 'frutado'`) → `KefirNatural` y `KefirFrutado`.
  - `src/datos/` (natural.ts, frutado.ts, ritmo.ts, tipos.ts), `src/escenas/` (natural, frutado, comunes), `src/componentes/` (Subtitulos, Servido, Ola, Fondo, Texto, Sello), `tema.ts`, `transcripts/` (Whisper), `storyboard/`.
  - Scripts: `npm run studio` (vista previa), `npm run prueba` (720p natural), `npm run render:natural`, `npm run render:frutado`, `npm run audio` (mezcla), `npm run storyboard`, `npm run tiempos`.
  - **Renderizar uno mismo desde la terminal no gasta tokens** de Claude Code.
  - Brief completo: `video/prompt-videos-kefir.md`.

## 6. Assets disponibles (rama de videos)
- **Hero en alta resolución (3840×2560, producto a la derecha, fondo oscuro):** `video/assets/kefir/hero-vaca-cabra.png`, `hero-frutos-bosque-vaso.png`.
- Botellas recortadas: `remotion-sorteo/public/vaca-1l.png`, `cabra-1l.png`, `fresa-recta.png`, `arandanos-recta.png`, `frutos.png`; `assets/kefir/sabores/chocolate-botella.webp`; `assets/scenes/kefir-leche-botella.webp`.
- Composiciones: `assets/scenes/kefir-leche-duo.png`, `kefir-trio-frutos.png`, `trio-bebidas.png`, kombuchas (guisante, espirulina, pitahaya), `canasta-trialferi`.
- Vertidos y manos: `assets/kefir/vertido-fresa|arandanos|frutos|chocolate.webp`, `frutos-mano.webp`, `chocolate-mano.webp`, `primera-vez.webp` (mano con vaso + botella natural), `leche-splash.webp`.
- Splashes: `assets/kefir/sabores/*-splash*.png`, `splash-frutos.png`, `remotion-sorteo/public/sp-*.png`.
- Tiendas: `assets/stores/` (logos VerdeRaíz por partes, cottage de cabra).
- Web: `public/assets/images/content/products/<producto>/` (featured y galería por sabor) y `public/assets/images/splashes/`.
- SFX en `assets/sfx/`: pop, woosh, splash, vertido, burbujas, destape, brindis, raices-crecen, campanita-tienda, sello, redoble, ticket, brillo-misterio. Música: `musica.mp3` (30 s, VerdeRaíz), **`musica-kefir.mp3` (60 s)**. Voces: `voz.mp3`, `voz-verde-raiz.mp3`, `voz-sorteo-teaser*.mp3`, **`voz-kefir-natural.mp3` (41.7 s)**, **`voz-kefir-frutado.mp3` (44.4 s)**.

## 7. ElevenLabs
- **Voz:** Renata, Eleven v4, estabilidad 50 %, similitud 75 %, style 0–15 %, speed 0.95–1.0, speaker boost activado. Misma voz y ajustes en todo un video.
- Etiquetas de emoción: `[entusiasmada] [cálida] [sonriendo] [emocionada] [seria]`. Números escritos en palabras; teléfono con pausas: *"nueve cuatro uno... cuatro seis dos... cuatro nueve dos"*. Siglas como suenan (Cms → "ce eme ese").
- Se puede generar la voz en **un solo archivo** con todas las escenas; Claude Code la separa con Whisper por las pausas.
- **Música (ElevenLabs Music):** elegir la **duración** en el selector (1:00). Prompt usado para el kéfir: *"Fresh upbeat acoustic pop instrumental for a premium natural food brand video on social media. Warm, happy and modern, 108 BPM, ukulele and light acoustic guitar, soft claps and finger snaps, gentle bass, playful marimba accents, subtle airy pads… No vocals, no lyrics, no drops… 60 seconds."*
- **SFX (Sound Effects):** prompts cortos en inglés (por ejemplo *"Soft smooth whoosh transition, subtle, modern UI"*).
- Guardar todo en `video/assets/sfx/` con nombres exactos (ElevenLabs descarga con nombres largos: renombrar).

## 8. Skills y herramientas
- En el repo: `.agents/skills/` → `hyperframes`, `hyperframes-animation`, `hyperframes-audio`, `hyperframes-cli`, `hyperframes-core`, `product-launch-video`. `.claude/skills/` → `emil-design-eng`, `frontend-design`, `high-end-visual-design`. Remotion: `remotion-best-practices` (`npx skills add remotion-dev/skills`).
- Opcional: `npx -y skills add dylantarre/animation-principles --skill video-motion-graphics --agent claude-code` (revisar el contenido antes de usarlo).
- `/hyperframes` activa el skill; necesita un pedido concreto después.
- HyperFrames = HTML + GSAP (videos sueltos y rápidos). **Remotion = React** (plantillas con props, videos por sabor, Motion/spring, `@remotion/three` para 3D). Para kéfir y kombucha usamos **Remotion**.
- "Motion graphics" es la disciplina; Remotion y HyperFrames son las herramientas.

## 9. Buenas prácticas para Claude Code (ahorrar tokens)
- Abrir Claude Code en `~/Desktop/keffir-oro-blanco` (la raíz del repo) y confirmar la rama `feature/videos-with-claude`. **No** abrirlo en `acity-col` (el repo del trabajo).
- **Modelo:** Fable o Opus solo para dirección visual y storyboard nuevo; **Sonnet + `/effort medium`** para ajustes. Fable con esfuerzo high consume muchísimo (2 prompts ≈ 50 % de la sesión).
- `/clear` al cambiar de tarea. Para conversaciones largas: pedir un `ESTADO.md` breve, luego `/clear`, y seguir desde ese archivo.
- Prompts autosuficientes que digan qué leer: *"no regeneres el storyboard, no analices imágenes ni frames, no leas logs completos; solo dime la ruta"*. La revisión visual se hace en Cowork.
- Agrupar todos los ajustes en un solo mensaje. Pedir **storyboard antes del render** y **render de prueba en 720p** antes del final.
- Auto mode está bien en esta rama; revisar `git status` al terminar. Si se corta por límite, retoma solo al renovarse; si se cerró la terminal, usar `claude --continue`.
- "Waiting for API response" = red o saturación: esperar el reintento.
- "Now using usage credits" = se acabó el plan y se está pagando extra.

## 10. Estado actual (14 nov 2026)
- `video/remotion-kefir/out/`:
  - `kefir-natural-720p.mp4` (+ `-mudo`): **segunda prueba**, con los 9 ajustes aplicados. **Falta revisarla.**
  - `kefir-frutado.mp4` y `kefir-frutado-sin-musica.mp4`: **render del frutado ya generado. Falta revisarlo.**
- Ajustes pedidos en esa ronda: imágenes hero nuevas en "Diferencia", el cierre y frutos del bosque; productos grandes (la zona segura es solo para texto); subtítulos más bajos, grandes y con color; gancho ≥1.5 s; servido del shot de unos 4 s; textos visibles ≥1.5 s; fallos corregidos (círculo azul en el s 6 y mancha blanca en el s 26); textos ≥34 px; número de WhatsApp en color.
- **Nada está commiteado** (remotion-kefir, audios, hero, prompt). Borrar `video/_rev.jpg` y `video/_hoja-assets.jpg` (revisiones temporales). El storyboard (≈49 MB) y `out/` deben ir al `.gitignore`.

## 11. Pendientes
1. Revisar la prueba del natural (720p) y el frutado; anotar ajustes.
2. Render final del natural: `npm run render:natural` (con y sin música).
3. Commit en `feature/videos-with-claude` (sin storyboard ni out).
4. Voz B de VerdeRaíz sin degustación → `trialferi-verde-raiz.mp4`.
5. Grabar tomas reales con el iPhone 16 Pro (guía en PDF en el Escritorio; **apagar Video HDR**, formato "Más compatible", 4K 30 fps vertical) y sumarlas a la plantilla por props.
6. Ideas: video de lanzamiento de **kombuchas** (estilo "product launch": partículas, 3 sabores como "planetas", logo reveal, efectos sincronizados con beats); videos de cottage de cabra y cremas de kéfir.
7. Agregar precios de kombucha a la lista de precios del live.

## 12. Cómo revisar un render (checklist)
- Producto grande y nítido, sin vacío abajo; nada tapa la etiqueta.
- Textos ≥34 px; subtítulos legibles y sincronizados palabra por palabra con la voz.
- Cada texto visible ≥1.5 s; escenas clave (servido, sabores) sin apuro.
- Transiciones limpias (sin manchas ni máscaras raras).
- Música con ducking al 30 % bajo la voz; efectos sutiles en los cortes.
- Reglas de contenido: solo claims de la etiqueta, sin precios, contacto correcto.


---

## 13. Novedades (15 nov 2026)

### Guion v2 con hooks (pendiente de ejecutar en Claude Code)
- Archivo: `video/guion-v2-kefir.md`. Contiene: voces v2 (natural "Esto no es yogurt", frutado "¿Cuál eliges?"), tablas de escenas, reglas de dinamismo, sección **Motion v2** (cámara viva, push-in a tapa y cuello en Beneficios con los beneficios uno debajo del otro, whip pan, flash, zoom-through, trazos de luz, contador 0→30 ML, cierre con trazo de luz) y lista de recursos IA.
- Referencias de motion: TikToks "Claude code + skills" (cortes cada 0.5–1.5 s, destellos, trazos de luz que dibujan el logo, barridos con blur, números que cuentan, cambio de color en el mismo encuadre). Regla: **nada estático más de 1.5 s**.
- Por generar en ElevenLabs (en `video/assets/sfx/`): `voz-kefir-natural-v2.mp3`, `voz-kefir-frutado-v2.mp3`, `impacto.mp3`, `riser.mp3`, `whip.mp3`, `brillo-luz.mp3` (textos y prompts en el guion v2).
- Prompt para Claude Code (Opus/Fable, effort medium): "Lee video/guion-v2-kefir.md completo y aplícalo… muéstrame 4 fotogramas de Beneficios antes de seguir… render de prueba 720p de los dos".

### Imágenes IA (ElevenLabs · Seedream 5.5)
- Carpeta: `video/assets/kefir/ia/` (nombres esperados: `natural-vaca-hero.png` ✅ ya guardada, `frutos-bosque-hero.png`, `fresa-hero.png`, `arandanos-hero.png`, `chocolate-hero.png`, `natural-bowl.png`, `frutado-bowl.png`, opcional `*-loop.mp4`).
- También en el repo: `assets/kefir/hero-naturales-vertical.png` (vaca+cabra vertical), `hero-vaca-cabra.png` y `hero-frutos-bosque-vaso.png` (horizontales 3840×2560).
- Configuración que funciona: **9:16 · 2K · 2–4 generaciones · fondo Opaco/Automático**. 3K en 9:16 da error "size not valid" (no cobra). 16:9 para heroes de la web.
- Prompt base: "Fotografía publicitaria premium… vertical 9:16… PRODUCTO: usa la botella de la imagen adjunta, etiqueta EXACTAMENTE igual… ESCENA en los dos tercios inferiores… vaso que REBALSA… fruta que choca formando corona… FONDO [color oscuro del sabor], TERCIO SUPERIOR vacío para texto". Colores: natural #0B1626, fresa #2A0D14, arándanos #1A1028, frutos del bosque #22101A, chocolate #1E120C.
- Vaca + cabra juntas: nombrar cada referencia ("@image 2: VACA, TAPA NEGRA; @image 1: CABRA, TAPA DORADA") y pedir no mezclar etiquetas. **Tapa negra = vaca, tapa dorada = cabra** (así los diferencia el cliente).
- Problema conocido: la IA redibuja todo y distorsiona textos chicos (logo o ingredientes). Solución: adjuntar las etiquetas reales como referencia y pedir "calcomanía impresa idéntica", luego "Aumentar escala". Si falla, la vía infalible es **componer la etiqueta real encima con código** (perspectiva, luz y sombras).
- **No pedir a la IA el texto de las piezas** (lo deforma y queda sin estilo): la foto sale limpia y el diseño/texto se hace con código.
- Tamaños: confirmar si sigue vendiéndose el **250 ml** (está en la web y en el cierre del video).

### Historias para WhatsApp / Instagram (plantilla en código)
- Hecha en HTML/CSS → PNG 1080×1920, con fuentes de marca y logo real (`Logo.png`, sin aro extra ni filtros).
- Resultado aprobado: `video/historias/historia-frutos-bosque.png` (v7). Estructura:
  - Logo grande arriba a la izquierda (300 px) + píldora "KÉFIR FRUTADO · 475 ML" a la derecha.
  - Kicker (giro): "Rosado, pero **sin colorantes**."
  - Titular Anton gigante (pregunta): "**¿4 FRUTOS** EN UNA SOLA BOTELLA?" (primera línea en rosa #FF5FB0).
  - Línea de frutas con puntos de color · sello circular rosa "EL MÁS PEDIDO" (prueba social).
  - Foto del producto abajo, sin sombras que tapen la etiqueta.
  - **Barra de vidrio esmerilado** (blur, borde de luz, separadores, íconos lineales rosa) a **48 px** del borde inferior: "Alto en **probióticos** · Dulce con **stevia** · Hecho **a mano**".
  - Sin CTA ni número por ahora (Carlos lo pidió así).
- Siguiente: misma plantilla para fresa, arándanos, chocolate y natural (cada una con su hook), cuando estén las fotos verticales.
- Nota: a 48 px del borde, en historias de Instagram la barra de "Enviar mensaje" puede tapar; para Instagram subir la barra.

### Pendientes actualizados
1. Validar las imágenes IA de cada sabor (etiqueta legible, tapa correcta, tercio superior libre) y guardarlas en `assets/kefir/ia/`.
2. Generar las voces v2 y los 4 SFX nuevos; correr el guion v2 en Claude Code.
3. Revisar renders de prueba (natural y frutado) con el checklist de la sección 12.
4. Historias del resto de sabores con la plantilla.
5. Arreglar la imagen horizontal vaca+cabra para la web (logo e ingredientes nítidos) o componer la etiqueta real con código.
6. Commit de la rama de videos (sin `storyboard/` ni `out/`); borrar `video/_rev.jpg` y `_hoja-assets.jpg`.
