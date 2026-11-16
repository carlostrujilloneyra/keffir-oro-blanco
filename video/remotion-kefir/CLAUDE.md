# CLAUDE.md · remotion-kefir

Proyecto **Remotion** (React + TypeScript) de los videos verticales de kéfir TRIALFERI (1080x1920, 30 fps) para TikTok, Reels y estados de WhatsApp. Copy y comentarios en español.

> El `CLAUDE.md` de la carpeta superior (`video/`) es del proyecto **HyperFrames** (videos de VerdeRaíz y promo reels). **No aplica aquí**: no uses sus skills ni comandos `npx hyperframes ...`, salvo `npx hyperframes transcribe` para transcribir voces (ver README).

## Antes de explorar
- La estructura, los comandos y cómo cambiar voz o música están en `README.md`. Léelo en vez de recorrer el proyecto.
- Reglas de marca: `../CONTEXTO-VIDEOS-TRIALFERI.md` (contenido), `../HOOKS-TRIALFERI.md` (ganchos). Guion vigente: `../guion-v2-kefir.md`.
- Lee solo los archivos que vas a tocar.

## Estado
- `KefirNatural` (50.5 s) y `KefirFrutado` (41.3 s): **aprobados y renderizados en 1080**. No cambies su aspecto sin que el usuario lo pida.
- Si tocas algo compartido (`componentes/`, `escenas/comunes.tsx`, `anim.ts`, `tema.ts`), comprueba que natural y frutado sigan igual.

## Cómo agregar una variante nueva (ej. video para una biotienda)
1. Datos: `src/datos/<variante>.ts` con el mismo formato (`VideoKefirProps`, ver `src/datos/tipos.ts`). Tiempos en segundos de la voz.
2. Registro: nueva `<Composition>` en `src/Root.tsx`, pasando los datos por `ajustarAlRitmo()`.
3. Escenas nuevas: agrega el tipo en `TipoEscena` (`tipos.ts`) y su función en `src/escenas/`.
4. Scripts: `render.mjs`, `mezcla.mjs`, `tiempos.mjs` y `storyboard.mjs` hoy aceptan solo `natural|frutado`; amplíalos sin romper esos dos.
5. Assets propios de la variante en `public/img/<variante>/` y `public/audio/`.
Reutiliza componentes; no crees otro sistema de animación.

## Criterios aprobados (aplícalos a todo video nuevo)
- **Texto**: solo dentro de `SEGURA` (`tema.ts`). ≤7 palabras por pantalla. Ningún texto sale antes de 1.5 s de haber aparecido.
- **Subtítulos**: `SUBTITULOS` en `tema.ts` (centro en y ≈ 1525, x ≤ 920, placa oscura). No los subas: si chocan con el producto, mueve o achica el producto.
- **Cámara**: en escenas de producto, acercamiento lento a la tapa y el logo y vuelta a la botella entera, inclinación 3D de 2–3° (`Foto3D`). Zoom máx. 1.6× usando los PNG originales de `../assets/kefir/ia/`. **Las fotos de botella nunca giran** (son planas).
- **Ritmo**: un movimiento principal por escena; que el video respire. Golpes fuertes (flash, whip, impacto) solo en el gancho, el paso a beneficios o entre sabores, y el cierre; el resto con barrido de leche o fundido. Nada estático más de 1.5 s.
- **Cierre**: logo real (`public/img/trialferi-logo.png`) a la izquierda, CTA a su derecha, número grande.
- **Fondo frutado**: limpio (grano casi nulo, manchas de luz suaves).

## Contenido (obligatorio)
- Solo beneficios de la etiqueta aprobada: alto en probióticos vivos, fortalece tu microbiota, contribuye a una digestión equilibrada, bajo en lactosa, sin azúcar añadida (natural), endulzado con stevia (frutados), sin conservantes añadidos, 100 % artesanal, vitamina C de la fresa, fuente de antioxidantes (arándanos), 4 frutos en 1 (frutos del bosque).
- **Nunca** claims de salud (curar, corregir, tratar, gastritis, estreñimiento, colon, sistema inmune, desinflamar) ni cifras inventadas.
- No mencionar el lugar de origen de la leche (Canta) ni la dirección de producción.

## Assets
- Voces: solo las versiones vigentes (`voz-kefir-*-v2.mp3`); las que no llevan `-v2` son viejas.
- Fotos de producto: las de IA (`*-hero`, `*-bowl`). Fotos viejas solo si no tienen reemplazo (splash, vertido, `sp-*`, servido).
- SFX: `../assets/sfx/` (ahí los busca `mezcla.mjs`).

## Flujo (el usuario cuida los tokens)
1. Muestra el plan: `npm run tiempos <variante> -- --cues` + tabla de assets por escena. Espera aprobación.
2. `npm run storyboard <variante>` y entrega **solo la hoja** (`storyboard/_hoja-<variante>.jpg`); no abras las fotos una por una salvo que el usuario lo pida.
3. Commit apenas compile y después de cada etapa (los cortes por límite de uso son frecuentes).
4. Prueba 720p (`node scripts/render.mjs <variante> --prueba`). **No renderices en 1080**: el usuario lo corre él mismo cuando aprueba.
5. Respuestas cortas: qué cambió, qué revisar, qué falta.
