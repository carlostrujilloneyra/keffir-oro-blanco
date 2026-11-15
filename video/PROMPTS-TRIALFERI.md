# Prompts listos para copiar · TRIALFERI

> Complemento de `CONTEXTO-VIDEOS-TRIALFERI.md` y `HOOKS-TRIALFERI.md`. Aquí están TODOS los prompts vigentes (15 nov 2026): voces, sonidos, música, imágenes y Claude Code. El guion completo v2 también está en el repo: `video/guion-v2-kefir.md`.

---

## 1. ElevenLabs · Voces v2 (con hooks)
Voz **Renata**, Eleven v4, estabilidad 50 %, similitud 75 %, style 0–15 %, speed 0.95–1.0, speaker boost activado. Guardar en `video/assets/sfx/`.

### `voz-kefir-natural-v2.mp3`
```
[seria] Mucha gente cree que el kéfir es yogurt... y no lo es.

[cálida] El nuestro es cien por ciento kéfir natural: vivo, hecho a mano, lote a lote.

[cálida] ¿Buscas algo natural para tu día a día? Sin azúcar añadida y sin conservantes añadidos.

[entusiasmada] Es alto en probióticos vivos, bajo en lactosa... fortalece tu microbiota y contribuye a una digestión equilibrada.

[cálida] Lo hacemos con leche de vaca o de cabra, pasteurizada en ollas de acero quirúrgico.

[sonriendo] ¿Primera vez? Un shot de treinta mililitros en ayunas, y otro en la noche.

[entusiasmada] Con granola, cereales o frutas... se vuelve tu desayuno favorito.

[cálida] Como lo hacemos por lotes, separa el tuyo hoy. [sonriendo] Escríbenos al nueve cuatro uno... cuatro seis dos... cuatro nueve dos.
```

### `voz-kefir-frutado-v2.mp3`
```
[entusiasmada] Fresa, arándanos, frutos del bosque o chocolate... ¿cuál eliges?

[cálida] Es kéfir de verdad, con fruta de verdad. Sin colorantes ni saborizantes: el color es de la fruta.

[cálida] Fresa, con pulpa natural... y la vitamina C de la fresa.

[cálida] Arándanos, con pulpa natural... fuente de antioxidantes.

[emocionada] Y el más pedido: frutos del bosque. Cuatro frutos en una sola botella.

[sonriendo] ¿Antojo de chocolate? Lo hacemos con cacao de Quillabamba.

[cálida] Dulce, pero endulzado con stevia... y sin conservantes añadidos.

[entusiasmada] Solo, con granola o en tu bowl de frutas.

[sonriendo] Comenta cuál elegirías... y pídelo por WhatsApp al nueve cuatro uno... cuatro seis dos... cuatro nueve dos.
```

---

## 2. ElevenLabs · Efectos de sonido (Sound Effects)
Guardar en `video/assets/sfx/` con estos nombres.

**Nuevos para Motion v2**
- `impacto.mp3` (≈1 s): `Deep cinematic impact hit, short punchy boom with subtle reverb tail, modern trailer style`
- `riser.mp3` (≈2 s): `Short cinematic riser building tension, airy whoosh rising in pitch, ends abruptly, modern and clean`
- `whip.mp3` (≈0.5 s): `Very fast whip pan swoosh transition, sharp air movement, clean, no reverb`
- `brillo-luz.mp3` (≈1.5 s): `Light sweep shimmer, bright magical sparkle swish, like a light beam drawing across the screen`

**Ya generados (por si hay que rehacerlos)**
- `teclado.mp3` (≈4 s): `Fast soft laptop keyboard typing, clean and close, quiet office, no music`
- `whoosh.mp3` (1 s): `Soft smooth whoosh transition, subtle and modern, clean UI sound`
- `shimmer.mp3` (≈2 s): `Bright golden magical shimmer sparkle, short and elegant, celebratory`
- `click.mp3` (<1 s): `Single soft mouse click, clean UI, no echo`

---

## 3. ElevenLabs Music
`musica-kefir.mp3` (ya existe, 60 s). Elegir **duración 1:00** en el selector.
```
Fresh upbeat acoustic pop instrumental for a premium natural food brand video on social media. Warm, happy and modern, 108 BPM, ukulele and light acoustic guitar, soft claps and finger snaps, gentle bass, playful marimba accents, subtle airy pads. Bright, organic, homemade feeling with a polished commercial sound. Clear rhythmic pulse with light accents every 4 bars for edit points. No vocals, no lyrics, no drops, steady energy that sits low under a voice-over. Smooth intro and clean ending. 60 seconds.
```
Si suena muy movida: agregar `calm,` al inicio. Para tutoriales corporativos (Novedades): ver prompt en el contexto.

---

## 4. ElevenLabs Imagen (Seedream 5.5)
**Configuración:** 9:16 · **2K** (3K da error) · 2 generaciones (4 para las difíciles) · fondo Opaco o Automático. Adjuntar SIEMPRE la foto de la botella de ese sabor (y el logo si hace falta). Guardar en `video/assets/kefir/ia/` con el nombre indicado. Revisar: etiqueta legible, tapa correcta, tercio superior vacío.

### 4.1 `natural-vaca-hero.png` ✅ ya hecha (vaca + cabra) — adjuntar @image 1 = cabra, @image 2 = vaca
```
Fotografía publicitaria premium para un video vertical de TikTok. Formato vertical 9:16, alta resolución.
PRODUCTO: Usa DOS botellas de 1 litro, cada una idéntica a su referencia:
- @image 2: kéfir de leche de VACA, con TAPA NEGRA.
- @image 1: kéfir de leche de CABRA, con TAPA DORADA.
Mantén cada botella, su tapa y su etiqueta EXACTAMENTE iguales a su referencia: mismos textos, colores, logo, ícono del animal y proporciones. No mezcles las etiquetas ni cambies los colores de las tapas. No rediseñes, no reescribas ni deformes las etiquetas. Conserva la forma de la botella de 1 litro.
ESCENA: Las dos botellas GRANDES, de pie y juntas en los dos tercios inferiores: la de vaca (tapa negra) a la izquierda y ligeramente adelante, la de cabra (tapa dorada) a la derecha y ligeramente atrás. Ambas con la etiqueta mirando a la cámara, nítida y legible; tapas y cuellos bien definidos. Alrededor de la base, una ola de kéfir blanco cremoso que gira con gotas congeladas en el aire. Gotas de condensación en el vidrio. Luz de estudio lateral que hace brillar el vidrio y resalta el brillo de la tapa dorada.
FONDO: Azul noche muy oscuro (#0B1626), liso, con un halo de luz suave detrás de las botellas. El TERCIO SUPERIOR completamente vacío y oscuro, sin objetos ni salpicaduras, para poner texto encima.
```

### 4.2 `fresa-hero.png` (adjuntar botella de fresa)
```
Fotografía publicitaria premium para un video vertical de TikTok. Formato vertical 9:16, alta resolución.
PRODUCTO: Usa la botella de la imagen adjunta. Mantén la botella, la tapa negra y la etiqueta EXACTAMENTE iguales a la referencia: mismos textos, colores, logo y proporciones. No rediseñes, no reescribas ni deformes la etiqueta. Conserva la forma de la botella de 475 ml.
ESCENA: En los DOS TERCIOS INFERIORES, la botella de pie a la derecha con la etiqueta mirando a la cámara y legible. A su izquierda, un vaso de vidrio transparente lleno de kéfir rosado cremoso de fresa que REBALSA: el kéfir se desborda por el borde y cae en gruesas gotas cremosas. Desde arriba caen tres fresas frescas, una de ellas partida a la mitad, y una choca con la superficie del kéfir formando una salpicadura en forma de corona, congelada en el aire. Gotas de condensación en el vidrio.
FONDO: Rojo frambuesa muy oscuro, casi negro (#2A0D14), liso, sin textura. El TERCIO SUPERIOR completamente vacío y oscuro, sin objetos ni salpicaduras, para poner texto encima.
```

### 4.3 `arandanos-hero.png` (adjuntar botella de arándanos)
```
Fotografía publicitaria premium para un video vertical de TikTok. Formato vertical 9:16, alta resolución.
PRODUCTO: Usa la botella de la imagen adjunta. Mantén la botella, la tapa negra y la etiqueta EXACTAMENTE iguales a la referencia: mismos textos, colores, logo y proporciones. No rediseñes, no reescribas ni deformes la etiqueta. Conserva la forma de la botella de 475 ml.
ESCENA: En los DOS TERCIOS INFERIORES, la botella de pie a la derecha con la etiqueta mirando a la cámara y legible. A su izquierda, un vaso de vidrio transparente lleno de kéfir lila cremoso de arándanos que REBALSA: el kéfir se desborda por el borde y cae en gruesas gotas cremosas. Desde arriba caen varios arándanos frescos, y uno choca con la superficie del kéfir formando una salpicadura en forma de corona, congelada en el aire. Gotas de condensación en el vidrio.
FONDO: Lila muy oscuro, casi negro (#1A1028), liso, sin textura. El TERCIO SUPERIOR completamente vacío y oscuro, sin objetos ni salpicaduras, para poner texto encima.
```

### 4.4 `frutos-bosque-hero.png` (adjuntar botella de frutos del bosque)
```
Fotografía publicitaria premium para un video vertical de TikTok. Formato vertical 9:16, alta resolución.
PRODUCTO: Usa la botella de la imagen adjunta. Mantén la botella, la tapa negra y la etiqueta EXACTAMENTE iguales a la referencia: mismos textos, colores, logo y proporciones. No rediseñes, no reescribas ni deformes la etiqueta. Conserva la forma de la botella de 475 ml.
ESCENA: En los DOS TERCIOS INFERIORES, la botella de pie a la derecha con la etiqueta mirando a la cámara y legible. A su izquierda, un vaso de vidrio transparente lleno de kéfir rosado cremoso de frutos del bosque que REBALSA: el kéfir se desborda por el borde y cae en gruesas gotas cremosas. Desde arriba caen exactamente cuatro frutas frescas, una fresa, una frambuesa, un arándano y una zarzamora, y una choca con la superficie del kéfir formando una salpicadura en forma de corona, congelada en el aire. Gotas de condensación en el vidrio.
FONDO: Vino muy oscuro, casi negro (#22101A), liso, sin textura. El TERCIO SUPERIOR completamente vacío y oscuro, sin objetos ni salpicaduras, para poner texto encima.
```

### 4.5 `chocolate-hero.png` (adjuntar botella de chocolate)
```
Fotografía publicitaria premium para un video vertical de TikTok. Formato vertical 9:16, alta resolución.
PRODUCTO: Usa la botella de la imagen adjunta. Mantén la botella, la tapa negra y la etiqueta EXACTAMENTE iguales a la referencia: mismos textos, colores, logo y proporciones. No rediseñes, no reescribas ni deformes la etiqueta. Conserva la forma de la botella de 475 ml.
ESCENA: En los DOS TERCIOS INFERIORES, la botella de pie a la derecha con la etiqueta mirando a la cámara y legible. A su izquierda, un vaso de vidrio transparente lleno de kéfir cremoso color cacao con leche que REBALSA: el kéfir se desborda por el borde y cae en gruesas gotas cremosas. Desde arriba caen trozos de chocolate oscuro y granos de cacao, y uno choca con la superficie del kéfir formando una salpicadura en forma de corona, congelada en el aire. Gotas de condensación en el vidrio.
FONDO: Marrón cacao muy oscuro, casi negro (#1E120C), liso, sin textura. El TERCIO SUPERIOR completamente vacío y oscuro, sin objetos ni salpicaduras, para poner texto encima.
```

### 4.6 `natural-bowl.png` (adjuntar botella de vaca 1 L)
```
Fotografía publicitaria premium para un video vertical de TikTok. Formato vertical 9:16, alta resolución.
PRODUCTO: Usa la botella de la imagen adjunta. Mantén la botella, la tapa negra y la etiqueta EXACTAMENTE iguales a la referencia. No rediseñes ni deformes la etiqueta. Conserva la forma de la botella de 1 litro.
ESCENA: En los DOS TERCIOS INFERIORES, un bowl de cerámica crema con kéfir blanco cremoso, cubierto con granola dorada, cereales y frutas frescas (fresas en rodajas, arándanos y plátano), visto en un ángulo de 45 grados. A su derecha, la botella de pie con la etiqueta legible. Algunas hojuelas de granola y arándanos caen en el aire sobre el bowl. Luz cálida de mañana.
FONDO: Azul noche muy oscuro (#0B1626), liso. El TERCIO SUPERIOR vacío y oscuro para poner texto encima.
```

### 4.7 `frutado-bowl.png` (adjuntar botella de frutos del bosque)
```
Fotografía publicitaria premium para un video vertical de TikTok. Formato vertical 9:16, alta resolución.
PRODUCTO: Usa la botella de la imagen adjunta. Mantén la botella, la tapa negra y la etiqueta EXACTAMENTE iguales a la referencia. No rediseñes ni deformes la etiqueta. Conserva la forma de la botella de 475 ml.
ESCENA: En los DOS TERCIOS INFERIORES, un bowl de cerámica crema con kéfir rosado cremoso de frutos del bosque, cubierto con granola dorada, cereales y frutas frescas (fresas, frambuesas, arándanos y zarzamoras), visto en un ángulo de 45 grados. A su derecha, la botella de pie con la etiqueta legible. Algunas frutas y hojuelas de granola caen en el aire sobre el bowl.
FONDO: Vino muy oscuro, casi negro (#22101A), liso. El TERCIO SUPERIOR vacío y oscuro para poner texto encima.
```

### 4.8 Opcional · `natural-familia.png` (4 presentaciones: vaca y cabra, 1 L y 475 ml) — 4 generaciones
```
Fotografía publicitaria premium para un video vertical de TikTok. Formato vertical 9:16, alta resolución.
PRODUCTO: Usa las cuatro botellas de las imágenes adjuntas: kéfir de vaca 1 litro y 475 ml, y kéfir de cabra 1 litro y 475 ml. Mantén cada botella, su tapa y su etiqueta EXACTAMENTE iguales a su referencia: mismos textos, colores, logo y proporciones. No rediseñes, no mezcles ni deformes las etiquetas.
ESCENA: En los DOS TERCIOS INFERIORES, las cuatro botellas de pie en fila: a la izquierda las dos de vaca (1 litro y 475 ml), a la derecha las dos de cabra (1 litro y 475 ml), las de 1 litro detrás y las de 475 ml delante, todas con la etiqueta mirando a la cámara y legible. Una ola de kéfir blanco cremoso las rodea por la base con gotas congeladas en el aire.
FONDO: Azul noche muy oscuro (#0B1626), liso. El TERCIO SUPERIOR vacío y oscuro para poner texto encima.
```

### 4.9 Corregir etiquetas distorsionadas (logo o ingredientes) sobre una imagen ya generada
Referencias: @image 1 = imagen a arreglar · @image 2 = botella vaca nítida · @image 3 = botella cabra nítida · @image 4 = logo. 16:9 (web) o 9:16 (redes), 2K, 4 generaciones; luego "Aumentar escala".
```
Edita @image 1. Mantén EXACTAMENTE la composición, el encuadre, el fondo, el splash de kéfir, la iluminación, las gotas, la forma de las botellas y las tapas (negra = vaca, dorada = cabra). No muevas ni cambies nada más.

ÚNICO CAMBIO: reemplaza las etiquetas de las botellas por copias EXACTAS y nítidas de las etiquetas reales:
- Botella con tapa negra: etiqueta idéntica a @image 2 (kéfir de leche de VACA).
- Botella con tapa dorada: etiqueta idéntica a @image 3 (kéfir de leche de CABRA).
Copia cada etiqueta como una calcomanía impresa pegada sobre el vidrio, adaptada a la curvatura de la botella, con la misma luz y reflejos de la escena.

El logo circular debe ser idéntico a @image 4: arriba "TRIALFERI", abajo "CUIDA TU SALUD CON NOSOTROS", con los dos personajes al centro.

Textos que deben leerse perfectos, letra por letra:
"KÉFIR" · "de leche de vaca" / "de leche de cabra" · "Alto en probióticos" · "(100% kéfir natural, no es yogurt estilo kéfir)" · "100% ARTESANAL" · "SIN CONSERVANTES AÑADIDOS"
Vaca: "Ingredientes: Leche de vaca de establo pasteurizada en ollas de acero quirúrgico 0% azúcar añadida"
Cabra: "Ingredientes: Leche de cabra de libre pastoreo tratada en ollas de acero quirúrgico 0% azúcar añadida"
"Conservar refrigerado en todo momento" · "| Cont. 1 Litro |"

No inventes letras, no cambies palabras, no deformes el logo. Tipografía nítida, alta definición, como una fotografía de producto real.
```
Si sigue fallando: componer la etiqueta real encima con código (vía infalible).

### 4.10 Videos cortos (opcional, "Crear vídeo" sobre una imagen)
Clips de 3–5 s, cámara fija: `Las frutas caen en cámara lenta y salpican el kéfir; cámara fija, la botella no se mueve.` Guardar como `<sabor>-loop.mp4` en `ia/`. Revisar que la etiqueta no se deforme (si se deforma, usar recortado mostrando solo vaso y frutas).

> Regla: **no pedir a la IA los textos de las piezas** (salen deformes y sin estilo). La foto se genera limpia; el texto y el diseño se hacen con código (plantilla de historias).

---

## 5. Claude Code (Warp)
Abrir en `~/Desktop/keffir-oro-blanco` (rama `feature/videos-with-claude`). Antes: `/clear`. Modelo: **Opus o Fable** para animaciones nuevas, **Sonnet** para ajustes; `/effort medium`.

### 5.1 Aplicar guion v2 + Motion v2 (siguiente paso)
```
Proyecto: video/remotion-kefir/ (Remotion). Lee video/guion-v2-kefir.md completo y aplícalo: guiones y voces v2 (voz-kefir-natural-v2.mp3, voz-kefir-frutado-v2.mp3), nuevas escenas y textos, y TODA la sección "Motion v2" (cámara, transiciones, escenas a rehacer, sonidos nuevos impacto/riser/whip/brillo-luz, recurso hero-naturales-vertical.png) y los recursos IA de video/assets/kefir/ia/ si existen. Transcribe las voces con Whisper y alinea golpes y cortes a los beats de musica-kefir.mp3. Mantén lo ya aprobado (subtítulos, tamaños, zona segura solo para texto, textos ≥34 px, reglas de contenido).
Usa los skills de Remotion y de diseño del repo. No regeneres el storyboard completo: muéstrame solo 4 fotogramas de la escena de Beneficios del natural para validar el push-in antes de seguir.
Al terminar: render de prueba en 720p de KefirNatural y KefirFrutado. Solo dime las rutas y duraciones.
```

### 5.2 Ajustes después de revisar (plantilla barata)
```
Proyecto: video/remotion-kefir/. Contexto en video/CONTEXTO-VIDEOS-TRIALFERI.md. Lee solo lo necesario de src/ para aplicar estos ajustes; no regeneres el storyboard, no analices imágenes ni frames, no leas logs completos.
AJUSTES:
1. ...
2. ...
Al terminar, render de prueba en 720p de [KefirNatural/KefirFrutado]. Solo dime la ruta y la duración.
```

### 5.3 Relevo cuando la sesión está muy larga
```
Escribe video/remotion-kefir/ESTADO.md con lo hecho, la estructura de componentes, las decisiones y lo pendiente. Breve. No hagas nada más.
```
Luego `/clear` y: `Lee video/remotion-kefir/ESTADO.md y continúa con lo pendiente.`

### 5.4 Renders sin gastar tokens (terminal)
```bash
cd ~/Desktop/keffir-oro-blanco/video/remotion-kefir
npm run prueba          # 720p natural
npm run render:natural  # final natural (con y sin música)
npm run render:frutado  # final frutado
npm run studio          # vista previa
```
