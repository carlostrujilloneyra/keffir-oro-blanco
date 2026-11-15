# Videos informativos TRIALFERI: Kéfir natural y Kéfir frutado

Vamos a hacer DOS videos verticales para TikTok y estados/grupos de WhatsApp con **Remotion** (React + TypeScript), reutilizando lo que ya existe en `video/remotion-sorteo/` (configuración, fuentes, scripts de audio) y los assets del proyecto. Todavía no hay grabaciones reales: estos videos son motion graphics con las fotos de producto. Deja la plantilla lista para recibir clips reales por props más adelante.

## Cómo vamos a trabajar
1. Lee este documento, `video/remotion-sorteo/README.md`, `src/Teaser.tsx`, `src/timing.ts` y `scripts/mix-audio.py`. Reutiliza su organización y su forma de sincronizar con la voz.
2. Crea el proyecto en `video/remotion-kefir/` (Node 22, mismas versiones de Remotion que `remotion-sorteo`). Instala los skills oficiales: `npx skills add remotion-dev/skills`.
3. Antes de animar, muéstrame un **storyboard** (un PNG por escena en `video/remotion-kefir/storyboard/`). No hagas el render final hasta que lo apruebe.
4. Cuando te avise que están las voces, sincroniza con Whisper, haz un render de prueba en 720p y luego el final.

## Formato
- 1080×1920, 30 fps, MP4 H.264 + AAC. Duración: la define la voz (natural ≈ 42 s, frutado ≈ 45 s).
- Zona segura: sin texto en los 220 px superiores, los 420 inferiores ni los 160 de la derecha.
- Una sola composición `VideoKefir` con props (`variante: 'natural' | 'frutado'`, escenas, colores y textos por escena) y dos `<Composition>` en `Root.tsx`: `KefirNatural` y `KefirFrutado`.
- Salidas: `out/kefir-natural.mp4`, `out/kefir-frutado.mp4` y sus versiones sin música.

## Reglas de contenido (obligatorias)
- Los beneficios se dicen **solo con las frases que ya están en las etiquetas aprobadas**: "Alto en probióticos vivos", "Fortalece tu microbiota", "Contribuye a una digestión equilibrada", "Bajo en lactosa", "Fuente de antioxidantes" (arándanos), "Antioxidantes y vitamina C de la fresa", "4 frutos en 1".
- **Nunca** digas que cura, corrige o trata enfermedades (gastritis, estreñimiento, colon irritado, inflamación, sistema inmune). No inventes cifras de probióticos.
- Además: artesanal, sin azúcar añadida (natural), endulzado con stevia (frutados), sin conservantes añadidos, pasteurizado en ollas de acero quirúrgico, "100 % kéfir natural, no es yogurt estilo kéfir".
- Puedes tomar el estilo visual de `assets/infografia-*-sin-precio.png` como referencia, pero escribe los textos según estas reglas.
- Cierre con **TRIALFERI como palabra** (Anton o Alfa Slab One), sin el logo circular. WhatsApp **941 462 492** y TikTok **@trialferi**. Sin precios.
- Tamaños: según `src/features/products/data/products.tsx` (vaca y cabra: 1 L, 475 ml y 250 ml; frutados: 475 ml).
- Tipografías: Anton / Alfa Slab One (titulares), Poppins (textos). Fondo con el color de cada sabor, como en las etiquetas: natural azul grisáceo, fresa rojo frambuesa, arándanos lila, frutos del bosque rosa/magenta, chocolate marrón cacao.

## Assets (ya están en el repo)
- Botellas recortadas: `remotion-sorteo/public/vaca-1l.png`, `cabra-1l.png`, `fresa-recta.png`, `arandanos-recta.png`, `frutos.png`; `assets/scenes/kefir-leche-botella.webp`.
- Composiciones: `assets/scenes/kefir-leche-duo.png` (vaca + cabra con splash), `assets/scenes/kefir-trio-frutos.png`, `assets/kefir/leche-splash.webp`.
- Vertidos y manos: `assets/kefir/vertido-fresa.webp`, `vertido-arandanos.webp`, `vertido-frutos.webp`, `vertido-chocolate.webp`, `chocolate-mano.webp`, `frutos-mano.webp`, `primera-vez.webp` (mano con vaso junto a la botella natural).
- Splashes: `assets/kefir/sabores/fresa-splash-*.png`, `arandanos-splash-*.png`, `assets/kefir/splash-frutos.png`, `remotion-sorteo/public/sp-*.png`.
- Parallax 3D: reutiliza la técnica de `src/PruebaParallax.tsx` (`@remotion/three`).
- Sonido: `assets/sfx/musica-kefir.mp3` (≈60 s, la misma para los dos videos; córtala con fade out al final) con ducking al 30 % bajo la voz; efectos `vertido`, `splash`, `pop`, `woosh`, `burbujas`, `destape`, `brindis`, sutiles y en los cortes.
- Granola, cereales y frutas para las escenas de combinación: no hay fotos; resuélvelo con ilustración/íconos animados simples y las frutas de los splashes. No inventes fotos de productos.

## Video 1 · Kéfir natural (`KefirNatural`)
| # | Escena | Visual | Texto en pantalla |
|---|---|---|---|
| 1 | Gancho | `leche-splash.webp` entra con splash y zoom | ¿Ya probaste kéfir de verdad? |
| 2 | Qué es | Botella vaca 1 L, giro leve con parallax | 100 % kéfir natural · No es yogurt estilo kéfir |
| 3 | Beneficios | Íconos que entran escalonados alrededor de la botella | Alto en probióticos vivos · Fortalece tu microbiota · Digestión equilibrada · Bajo en lactosa |
| 4 | Lo que nos diferencia | `kefir-leche-duo.png` (vaca y cabra) + checklist | Artesanal · Leche de vaca o de cabra · Ollas de acero quirúrgico · Sin azúcar añadida · Sin conservantes añadidos |
| 5 | Cómo consumir | **Animación de servido**: la botella natural se inclina y un chorro de kéfir llena un vaso hasta la marca "30 ml" (chorro y llenado dibujados en SVG/CSS, con el sfx `vertido`); luego `primera-vez.webp` | ¿Primera vez? 1 shot de 30 ml en ayunas · otro en la noche · aumenta poco a poco |
| 6 | Combínalo | Bowl ilustrado con kéfir, granola, cereales y frutas que caen | Combínalo con granola, cereales o frutas |
| 7 | Cierre | Fondo de marca, TRIALFERI grande | Artesanal, lote a lote · WhatsApp 941 462 492 · @trialferi |

## Video 2 · Kéfir frutado (`KefirFrutado`)
| # | Escena | Visual | Texto en pantalla |
|---|---|---|---|
| 1 | Gancho | `kefir-trio-frutos.png` con frutas que caen | ¿Algo más rico? También tenemos kéfir con pulpa de fruta |
| 2 | Fruta de verdad | Splashes de fruta que "tiñen" el fondo con su color | Fruta de verdad · Sin colorantes ni saborizantes · El color es de la fruta |
| 3 | Fresa | `vertido-fresa.webp` + splash de fresa, fondo rojo frambuesa | Fresa · con pulpa natural · Antioxidantes y vitamina C de la fresa |
| 4 | Arándanos | `vertido-arandanos.webp` + splash, fondo lila | Arándanos · con pulpa natural · Fuente de antioxidantes |
| 5 | Frutos del bosque | `frutos.png` + `splash-frutos.png`, sello "El más pedido" y sello "4 frutos en 1" | Fresa, frambuesa, arándano y zarzamora |
| 6 | Chocolate | `vertido-chocolate.webp` o `chocolate-mano.webp` + `sabores/chocolate-splash.png`, fondo cacao | Chocolate · con cacao de Quillabamba |
| 7 | Todos | Las 4 botellas en fila (fresa, arándanos, frutos del bosque y `sabores/chocolate-botella.webp`) | Endulzados con stevia · Alto en probióticos · Sin conservantes añadidos |
| 8 | Combínalo | Bowl ilustrado con granola, cereales y frutas | Solos o con granola, cereales o tus frutas favoritas |
| 9 | Cierre | Igual que el video 1 | Pídelos por WhatsApp 941 462 492 · @trialferi |

## Nivel de diseño: esto tiene que verse PREMIUM
Estos videos compiten en TikTok con marcas grandes. Apunta a un comercial de bebida de alta gama, no a una plantilla. Antes de animar, usa los skills `frontend-design`, `high-end-visual-design` y `emil-design-eng` de este repo (y los de Remotion) para definir la dirección visual, y explícamela en 5 líneas junto con el storyboard.
- **Profundidad:** cada escena con al menos 3 capas (fondo con textura o gradiente sutil del color del sabor, producto, frutas/splashes en primer plano desenfocados) y parallax entre capas.
- **Producto héroe:** la botella siempre nítida, con sombra de contacto y un brillo especular que la recorre; leve rotación 3D (`@remotion/three` o CSS 3D) en los momentos clave.
- **Líquido creíble:** el servido de 30 ml con chorro que se curva, ondas en el vaso al llenarse y gotas; los splashes explotan con escala + rotación + motion blur.
- **Tipografía cinética con jerarquía:** titulares grandes en Anton que entran por palabra con máscara; datos en Poppins; sellos circulares ("El más pedido", "4 frutos en 1") que giran al aparecer.
- **Transiciones con intención:** el color del siguiente sabor barre la pantalla desde una fruta o un splash (match cut), nunca un fade genérico.
- **Ritmo:** cada corte cae en un golpe de la música; micro-pausas para que se lea; nada se mueve sin razón.
- **Control de calidad:** antes del render final, revisa cada escena en el frame más cargado y elimina lo que se vea genérico o amontonado.

## Estilo de motion
- Entradas con `spring()` sin rebote exagerado, splashes que explotan detrás de la botella, texto por palabras, transiciones con barrido del color del siguiente sabor.
- Ritmo para redes: escenas de 3–6 s, cortes sobre los golpes de la música.
- Subtítulos de la voz siempre visibles, abajo, en zona segura, palabra por palabra.

## Audio
- Voces (ya están): `assets/sfx/voz-kefir-natural.mp3` (41.7 s) y `assets/sfx/voz-kefir-frutado.mp3` (44.4 s). La voz es la pista maestra: transcribe con Whisper y ajusta las escenas a la voz real. Las etiquetas entre corchetes no se dicen.
- Transcríbelas con Whisper desde el inicio para que el storyboard ya use los tiempos reales.

Empieza leyendo los archivos y muéstrame el storyboard de los dos videos.
