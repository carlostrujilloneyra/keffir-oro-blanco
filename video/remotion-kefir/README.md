# Remotion · Videos informativos de kéfir (natural y frutado)

Dos videos verticales 1080x1920 a 30 fps para TikTok y estados de WhatsApp, con una sola composición (`VideoKefir`) y dos registros en `src/Root.tsx`: `KefirNatural` y `KefirFrutado`. La voz es la pista maestra: todo se sincroniza con `public/audio/voz-kefir-*-v2.mp3` (las voces sin `-v2` son de la versión anterior y no se usan). Guion y escenas: `../guion-v2-kefir.md`.

Estado (v2 con hooks): natural y frutado aprobados y renderizados a 1080 (`out/kefir-natural.mp4`, `out/kefir-frutado.mp4`). Criterios y flujo de trabajo para videos nuevos: `CLAUDE.md`.

## Estructura
- `src/datos/natural.ts`, `src/datos/frutado.ts` – las escenas de cada video con los tiempos **de la voz**: inicio, cues, textos, color y transición. Es lo único que se toca al cambiar la voz o el copy.
- `src/datos/ritmo.ts` – cuadra esos tiempos con los golpes de la música (cortes dentro de los silencios de la voz; entradas solo si quedan a menos de 3 frames).
- `src/datos/golpes.json`, `silencios.json`, `captions-*.json` – datos medidos (los generan los scripts de abajo).
- `src/escenas/` – una función por escena (`natural.tsx`, `frutado.tsx`) y las compartidas (`comunes.tsx`: Combínalo y Cierre).
- `src/componentes/` – piezas reutilizables: `Fondo`, `Producto` (sombra + brillo), `Texto` (titular por palabra, cinta, dato), `Sello`, `Corte` (transición de cada escena: `ola`, `fundido`, `whip`, `flash`, `zoom`), `Ola` (barrido de abajo hacia arriba con franja del color del sabor), `Servido` (shot de 30 ml), `Franjas` (los cuatro sabores), `Parallax3D` (y `Foto3D`: una foto a cuadro completo con cámara e inclinación 3D), `Subtitulos`.
- `src/tema.ts` – paletas por sabor, fuentes y zona segura. `src/anim.ts` – easing, muelles y el reloj en segundos de la voz.
- `public/` – imágenes, fuentes y audios que usa el video. `transcripts/` – salida cruda de Whisper.
- `storyboard/` y `out/` no se versionan.

## Uso (Node 22)
```bash
npm install
npm run studio          # previsualizar con voz y música
npm run storyboard      # un PNG por escena en storyboard/ + hoja de contacto por video
npm run tiempos         # escaleta ajustada al ritmo: qué corte cayó en golpe (-- --cues lista también los cues)
npm run prueba          # KefirNatural a 720x1280 con audio → out/kefir-natural-720p.mp4
npm run render:natural  # 1080x1920 → out/kefir-natural.mp4 y out/kefir-natural-sin-musica.mp4
npm run render:frutado
```
- `node scripts/tira.mjs natural 23:26.5:0.25` saca una tira de frames para revisar el movimiento sin renderizar video.
- `node scripts/mezcla.mjs natural [--sin-musica]` hace solo la mezcla: voz + música al 30 % de su nivel mientras hay voz + efectos en los cortes.
- Las escenas de producto usan `@remotion/three` (`Foto3D`): cualquier render va con `--gl=angle` (los scripts ya lo incluyen).

## Para cambiar la voz
1. Pon el mp3 nuevo en `public/audio/`.
2. Transcribe: `npx hyperframes transcribe <voz>.mp3 -e whisper -m medium -l es -d <carpeta temporal>` (desde `video/`; con `-d` el `transcript.json` no cae en el proyecto HyperFrames) y guarda el JSON en `transcripts/`.
3. Revisa las correcciones de `scripts/captions.mjs` (palabras pegadas a signos, el número de WhatsApp) y ejecútalo.
4. `node scripts/silencios.mjs` para volver a medir las pausas.
5. Ajusta `inicio` y `cues` en `src/datos/*.ts` con los tiempos nuevos.

## Para cambiar la música
`node scripts/golpes.mjs public/audio/<pista>.mp3` vuelve a detectar tempo y golpes; `ritmo.ts` recalcula solo los cortes y cuánto se recorta el inicio de la pista.

## Para usar grabaciones reales
Cada escena acepta `clip: {src, desde}` en `src/datos/*.ts` (archivo dentro de `public/`). El video reemplaza a la foto de producto de esa escena; textos, subtítulos y transiciones no cambian.

## Reglas de composición
- Zona segura: sin texto en los 220 px de arriba, los 420 de abajo ni los 160 de la derecha (`SEGURA` en `tema.ts`). Aplica solo al texto: los productos son grandes y bajan a la zona inferior.
- Ningún texto por debajo de 34 px.
- Ningún texto sale de pantalla antes de 1.5 s de haber terminado de aparecer. Por eso algunos cues van antes que la palabra de la voz; al mover un corte o un cue, compruébalo con `npm run tiempos -- --cues`.
- Texto en pantalla: solo frases de la etiqueta aprobada y máximo 7 palabras a la vez (los textos en dos tiempos salen con `Sale`). Excepción: los tres beneficios se quedan hasta el final de su escena.
- Subtítulos: 48 px, blancos, palabra activa en el color del sabor, placa oscura semitransparente, centrados en el cuadro con el centro al 80 % del alto (y ≈ 1525; `SUBTITULOS` en `tema.ts`). No deben tapar el logo ni el nombre de la etiqueta: si chocan, se mueve o achica el producto, el subtítulo no sube.
- Cámara: un movimiento principal por escena, lento y continuo (`vaiven`: se acerca a la tapa y el logo y vuelve a abrir), con una inclinación 3D de pocos grados. Las fotos no giran. Nada queda estático más de 1.5 s.
- Transiciones (`transicion` en los datos): los golpes fuertes (`whip`, `zoom`, impacto) se reservan para el gancho, el paso a beneficios y el cierre; el resto va con `ola` o `fundido`. No hay manchas que nazcan sobre el producto.

## Fotos
Las fotos IA de cada sabor (`public/img/*-hero.webp`, `*-bowl.webp`, 1536 px) salen de `../assets/kefir/ia/` y reemplazan a los recortes de botella anteriores; la única excepción es `vaca-1l.png` dentro de `Servido`, que necesita un recorte con transparencia para inclinarse.
`hero-vaca-cabra.png` (Origen, segundo tiempo de Lactosa y cierre del natural) es un recorte de `../assets/kefir/hero-vaca-cabra.png`. No llevan alfa: `FotoHeroe` (`escenas/comunes.tsx`) las funde con la escena, que usa de fondo el mismo color oscuro de la foto (tonos `noche` y `mora`).

## Assets derivados
`node scripts/preparar-assets.mjs` recorta el margen transparente de las botellas y genera el grano del fondo. `node scripts/medir.mjs` lista el contenido real de cada imagen de `public/img`.
