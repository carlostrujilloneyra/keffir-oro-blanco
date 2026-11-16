# Contexto · Videos TRIALFERI para Bio Tienda EcoCultivo

Documento de traspaso para continuar en un chat nuevo (o para que Claude Code lo lea).
Proyecto: `video/remotion-kefir/` (Remotion). Criterios aprobados y flujo: `video/remotion-kefir/CLAUDE.md`.

## 1. La tienda (datos verificados)
- **Bio Tienda EcoCultivo** — Ca. El Carmen 1159, Mercado San Felipe, tienda 577, Surquillo (Lima).
  Su ficha de Google confirma 1159 (el 1173 es del mercado). Abre 7 a. m.
- WhatsApp/teléfono: **950 172 732**. Web: ecocultivo.pe · TikTok: @ecocultivo.
- Producen en el **Fundo San Isidro** (San Isidro Agro Exp.). También venden en la Feria Ecológica de Carabayllo y en la Bio Tienda "Solana" (Mercado Otuna).
- Tono de su marca: cálido, cercano, consumo consciente ("Un espacio para consumir consciente", "Cada compra es una decisión", "Cuidamos tu salud y la tierra", "Productos ecológicos y locales").
- Venden kéfir TRIALFERI natural de vaca y de cabra (a veces se vende más el de cabra) y frutados de vaca y de cabra.
- Ubicación: Surquillo, entre Av. República de Panamá (oeste) y Av. San Felipe (este), al sur de Av. Angamos Este. Distritos vecinos para el mapa general: Miraflores, San Isidro, San Borja.

## 2. Decisiones tomadas
- Se reutiliza la base de KefirNatural y KefirFrutado (ya aprobados). Nada desde cero.
- **No** usar clips ni fotos de EcoCultivo: todos muestran etiquetas antiguas (Oro Blanco / "30–40 Probióticos").
- **No** usar la foto de cabra de la web (`public/assets/images/content/products/kefir-de-leche-de-cabra/featured.webp`): etiqueta antigua. Pendiente actualizarla en la web.
- Frutados de cabra: solo se mencionan en voz y con un sello; no se generan imágenes de cabra frutado.
- Las fresas del frutado vienen del Fundo San Isidro (verificado por Carlos). Los frutados no llevan colorantes (verificado).
- Logo EcoCultivo: `video/referencias/ecocultivo/ecocultivo-logo.jpg` (círculo sobre fondo blanco) → se muestra con máscara circular, sin quitar fondo.
- Mapa: ilustrado con SVG propio (estilo mapa claro tipo navegación, inclinado en 3D), no tiles de Google ni Mapbox.
- Efectos de sonido: no hay nuevos (pop para el pin, whoosh para ruta/acercamiento).

## 3. Ganchos (estrategia)
| Momento | Natural | Frutado |
|---|---|---|
| Segundo 0 | "Esto no es yogurt." | "Cuatro sabores… cero conservantes añadidos. ¿Cuál eliges?" |
| Mitad | "Y el de cabra… no se encuentra en cualquier lado." | Fresas del Fundo San Isidro ("las mismas que encuentras en EcoCultivo") + "¿Sabías que también los hay de leche de cabra?" |
| Cierre | "Aquí mismo, en EcoCultivo… pregunta hoy por el tuyo" | "Comenta cuál elegirías… y pídelo" |

## 4. Guiones de voz (ElevenLabs · voz Renata, Eleven v4, estabilidad 50 %, similitud 75 %, style 0–15 %, speed 0.95–1.0, speaker boost)
Guardar en `video/remotion-kefir/public/audio/`.

### voz-kefir-natural-ecocultivo.mp3
```
[seria] Esto no es yogurt.

[cálida] Mucha gente los confunde... pero el kéfir es otra cosa: cien por ciento natural, vivo, hecho a mano, lote a lote.

[entusiasmada] Fortalece tu microbiota, es alto en probióticos vivos... y contribuye a una digestión equilibrada.

[cálida] Sin azúcar añadida, sin conservantes añadidos... cien por ciento artesanal.

[cálida] Lo hacemos de leche de vaca y de cabra. Ambos son bajos en lactosa por la fermentación.

[entusiasmada] Y el de cabra... no se encuentra en cualquier lado. Se digiere mucho más fácil.

[sonriendo] ¿Dónde lo encuentras? Aquí mismo, en la Bio Tienda EcoCultivo.

[cálida] Mercado San Felipe, en Surquillo. Calle El Carmen, cuadra once, tienda quinientos setenta y siete.

[entusiasmada] Como lo hacemos por lotes... pregunta hoy por el tuyo. Escríbeles al nueve cinco cero... uno siete dos... siete tres dos.
```

### voz-kefir-frutado-ecocultivo.mp3
```
[entusiasmada] Cuatro sabores... cero conservantes añadidos. ¿Cuál eliges?

[cálida] Fresa, arándanos, frutos del bosque o chocolate. Kéfir de verdad, con fruta de verdad: sin colorantes ni saborizantes.

[cálida] Nuestra fresa viene del Fundo San Isidro... las mismas fresas que encuentras en EcoCultivo. Con la vitamina C de la fresa.

[cálida] Arándanos, fuente de antioxidantes.

[emocionada] Frutos del bosque: cuatro frutos en una sola botella. Y chocolate, con cacao de Quillabamba.

[cálida] Dulces... pero endulzados con stevia.

[sonriendo] ¿Y sabías que también los hay de leche de cabra?

[sonriendo] Encuéntralos aquí, en la Bio Tienda EcoCultivo: Mercado San Felipe, en Surquillo. Calle El Carmen, cuadra once, tienda quinientos setenta y siete.

[entusiasmada] Comenta cuál elegirías... y pídelo al nueve cinco cero... uno siete dos... siete tres dos.
```
Al escuchar: revisar que se entienda el número, "quinientos setenta y siete" y "Quillabamba". Duración ideal 40–50 s.

## 5. Imagen nueva: natural-cabra-hero.png (Seedream 5.5, modo Edición)
Destino: `video/assets/kefir/ia/natural-cabra-hero.png`. Referencias: @image1 etiqueta cabra 1 L (nítida), @image2 etiqueta cabra 475 ml, @image3 logo TRIALFERI.
Pendiente confirmar: color de la tapa de la botella de cabra de 475 ml (se asumió dorada).
```
Fotografía publicitaria vertical 9:16 de dos botellas de vidrio transparente de
kéfir de leche de cabra TRIALFERI, lado a lado sobre una superficie oscura brillante:
a la izquierda una botella de 1 litro, alta, de hombros redondeados; a la derecha,
un poco más adelante, una botella de 475 ml del mismo estilo pero más pequeña.
Las dos llenas de kéfir blanco cremoso y con tapa metálica dorada.

Etiquetas: la botella de 1 litro lleva exactamente la etiqueta de @image1 y la de
475 ml lleva exactamente la etiqueta de @image2. Etiqueta azul con splash de leche
blanco, adaptada a la curva de cada botella. El logo circular es idéntico a @image3,
sin deformar.

Copia estos textos letra por letra, sin cambiar ni inventar nada:
- Título grande: "KÉFIR"
- Debajo: "de leche de cabra"
- Logo circular: "TRIALFERI" y "CUIDA TU SALUD CON NOSOTROS"
- Cinta negra: "Alto en probióticos"
- Línea azul: "(100% kéfir natural, no es yogurt estilo kéfir)"
- Etiqueta pequeña: "SABOR" y "Natural"
- Sellos: "100% ARTESANAL" y "SIN CONSERVANTES AÑADIDOS"
- Recuadro negro: "Ingredientes:" / "Leche de cabra de libre pastoreo" /
  "tratada en ollas de acero quirúrgico" / "0% azúcar añadida"
- "Conservar refrigerado en todo momento"
- Contenido: "Cont. 1 Litro" en la botella grande y "Cont. 475 ml" en la pequeña

Detrás de las botellas, una corona de splash de leche blanca que sube entre las
dos, con gotas suspendidas en el aire. Fondo azul marino oscuro con degradado suave
y una luz cálida desde arriba a la izquierda que hace brillar el vidrio y las tapas.

El tercio superior de la imagen queda limpio, solo fondo azul oscuro, sin splash ni
objetos, para poner texto encima.

No agregues frutas, vasos ni otros productos. No inventes texto. Si un texto pequeño
no se puede leer bien, déjalo simple y legible antes que deformado.
```
Checklist al revisar: textos de etiqueta, tapas, logo sin deformar, tercio superior limpio.

## 6. Prompt para Claude Code (pegar con /clear antes, cuando estén las 2 voces y la imagen de cabra)
```
Lee video/remotion-kefir/CLAUDE.md, README.md y
video/referencias/ecocultivo/CONTEXTO-ECOCULTIVO.md. Vamos a crear dos variantes
nuevas reutilizando natural y frutado (ya aprobados): videos para la Bio Tienda
EcoCultivo. Trabaja en una rama nueva: feature/videos-ecocultivo. No toques el
aspecto de KefirNatural ni KefirFrutado.

## Variantes
- KefirNaturalEcocultivo: copia las escenas de natural. Quita "¿Primera vez?" y
  "Combínalo". Después de "Sin añadidos", agrega una escena "cabra" (~4–5 s) con la
  voz "el de cabra no se encuentra en cualquier lado...": usa natural-cabra-hero.png
  (copia de ../assets/kefir/ia/) con push-in lento a la botella de 1 L y paneo a la
  de 475 ml. Titular "NO SE ENCUENTRA EN CUALQUIER LADO" y cinta "Se digiere más
  fácil". Luego "mapa" y "cierreTienda".
- KefirFrutadoEcocultivo: copia las escenas de frutado. Quita "Combínalo". En la
  escena de fresa agrega la cinta "Fresas del Fundo San Isidro". Con la línea
  "también los hay de leche de cabra", sobre la toma de las cuatro botellas entra
  un sello "También de leche de cabra" (no generes imágenes de cabra frutado).
  Luego "mapa" y "cierreTienda".
- Voces: public/audio/voz-kefir-natural-ecocultivo.mp3 y
  voz-kefir-frutado-ecocultivo.mp3. Transcríbelas como dice el README y recalcula
  todos los tiempos. Misma música y SFX (pop para el pin, whoosh para la ruta y el
  acercamiento). No hay efectos nuevos.
- Amplía render.mjs, mezcla.mjs, tiempos.mjs y storyboard.mjs para aceptar las
  variantes nuevas, sin romper natural y frutado.

## Ganchos en pantalla (desde el frame 0, con la botella ya en movimiento)
- Natural-ecocultivo: "ESTO NO ES YOGURT" con golpe (impacto) en "yogurt".
- Frutado-ecocultivo: "4 SABORES · 0 CONSERVANTES AÑADIDOS" y luego "¿CUÁL ELIGES?"
  con los cortes rápidos por sabor que ya tiene el frutado.
- Cierre frutado: cinta "Comenta cuál eliges 👇".

## Escena "mapa" (~5 s, entra con "¿Dónde lo encuentras?" / "Encuéntralos aquí")
Mapa claro ilustrado con SVG propio (no tiles ni el estilo exacto de Google),
inclinado en 3D (~40°), calles simplificadas. Dos tiempos:
1. Vista general (~1.5 s): zona de Lima con Miraflores, San Isidro, San Borja y
   Surquillo (Surquillo resaltado). Un brillo marca dónde está la tienda.
2. Acercamiento (~3.5 s): la cámara baja a Surquillo. Calles con nombre: Av. Angamos
   Este (horizontal, arriba), Av. República de Panamá (vertical, izquierda),
   Av. San Felipe (vertical, a la derecha del destino) y Ca. El Carmen (horizontal,
   bajo el destino). La ruta azul se dibuja desde Av. Angamos Este, baja por
   Av. San Felipe y dobla en Ca. El Carmen hasta el pin; un punto azul avanza y la
   cámara lo acompaña con zoom lento.
- El pin cae con rebote (pop) y entra una tarjeta: "Bio Tienda EcoCultivo" /
  "Mercado San Felipe · Surquillo". Texto: "Ca. El Carmen 1159 · Tienda 577".

## Escena "cierreTienda"
- El logo de TRIALFERI se transforma (morph: escala + fundido cruzado) en el logo
  de EcoCultivo: copia ../referencias/ecocultivo/ecocultivo-logo.jpg a
  public/img/ecocultivo/logo.jpg y muéstralo con máscara circular.
- Texto: "ENCUÉNTRALO EN ECOCULTIVO" (frutado: "ENCUÉNTRALOS…"),
  "Ca. El Carmen 1159 · Surquillo" y "WhatsApp 950 172 732" en grande.

## Contenido
Mismas reglas del CLAUDE.md. Verificado: fresas del Fundo San Isidro; frutados sin
colorantes. No uses clips ni fotos de la tienda (etiquetas antiguas).

## Flujo
1. Plan de escenas con tiempos y tabla de assets de natural-ecocultivo. Espera mi
   aprobación.
2. Storyboard: solo la hoja (incluye 3 fotos del mapa: vista general, ruta a la
   mitad y pin con tarjeta). Commit.
3. Prueba 720p. Luego lo mismo con frutado-ecocultivo. El 1080 lo corro yo.
```

## 7. Pendientes
- [x] Confirmar color de tapa de la botella de cabra 475 ml (dorada, confirmado).
- [x] Generar y validar `natural-cabra-hero.png` (aprobada: la etiqueta de 475 ml dice "pasteurizada", es correcto).
- [ ] Generar las 2 voces y guardarlas con los nombres exactos.
- [ ] Pegar el prompt de la sección 6 en Claude Code (con /clear).
- [ ] Revisar plan de escenas, hoja del storyboard y pruebas 720p.
- [ ] Render 1080 (lo corre Carlos: `node scripts/render.mjs <variante>`).
- [ ] Actualizar la foto de cabra de la web (tiene etiqueta antigua).
- [ ] (Opcional) Textos con ganchos para que EcoCultivo publique el video.

## 8. Cómo trabajamos (para el chat nuevo)
Carlos le dice "Doc" a Claude. Español neutro, respuestas ordenadas y prompts completos listos para copiar. Cuida mucho los tokens/créditos: preferir editar lo existente, una sola ronda de correcciones con todo junto.

### Documentos base (leer según haga falta, no todos de entrada)
- `video/remotion-kefir/CLAUDE.md` y `README.md`: arquitectura del proyecto Remotion, criterios visuales aprobados y flujo.
- `video/CONTEXTO-VIDEOS-TRIALFERI.md`: catálogo, reglas de contenido (sección 3: nunca claims de salud), beneficios aprobados, inventario de assets.
- `video/HOOKS-TRIALFERI.md`: fórmula hook → necesidad → beneficio → cómo usarlo → CTA, y patrones de ganchos.
- `video/PROMPTS-TRIALFERI.md`: prompts de imágenes, voces y efectos de la v2, con nombres de archivo.
- `video/guion-v2-kefir.md`: guiones y escenas de los videos natural y frutado ya aprobados.
- Ojo: `video/CLAUDE.md` es del proyecto HyperFrames (videos de VerdeRaíz y promo reels); no aplica a Remotion.

### Lo que ya existe y se reutiliza
- Videos aprobados y renderizados a 1080: `out/kefir-natural.mp4` (50.5 s) y `out/kefir-frutado.mp4` (41.3 s).
- Imágenes IA aprobadas en `video/assets/kefir/ia/`: natural-vaca-hero, natural-475-hero, natural-bowl, fresa-hero, arandanos-hero, frutos-bosque-hero, chocolate-hero, frutado-bowl (copias webp en `remotion-kefir/public/img/`).
- Otras útiles: `hero-vaca-cabra.png`, `cabra-1l.png` (recorte real, etiqueta nueva), splash/vertido/servido, `trialferi-logo.png`.
- Audio: `musica-kefir.mp3`; SFX en `video/assets/sfx/` (impacto, riser, whip, brillo-luz, woosh, splash, pop, burbujas, destape, vertido…). Voces vigentes con sufijo `-v2`.

### Generación de imágenes (Seedream 5.5 en ElevenLabs)
- Siempre adjuntar como referencia la etiqueta/foto real y el logo, y escribir en el prompt los textos de la etiqueta letra por letra (la IA deforma los textos chicos).
- Checklist de revisión: texto de la etiqueta, color de tapa, logo sin deformar, cantidad de fruta, fondo según sabor, tercio superior vacío para texto.
- Estándar para video: priorizar forma de botella, tapa, logo, título grande, fondo y tercio superior; los ingredientes chicos importan menos (nada queda quieto el tiempo suficiente para leerlos).
- Si sale con errores: una sola corrección por zonas (Edición) con la imagen buena + etiqueta limpia + logo, no regenerar desde cero.
- Claude guarda la imagen elegida en `video/assets/kefir/ia/<nombre>.png` en la Mac de Carlos.

### Voces (ElevenLabs)
Voz Renata, Eleven v4, estabilidad 50 %, similitud 75 %, style 0–15 %, speed 0.95–1.0, speaker boost activado. Etiquetas de emoción entre corchetes. Números de teléfono escritos en palabras y con pausas.

### Claude Code (terminal Warp en la Mac)
- Modelo: Opus 5.5 (Fable cuando hay créditos). Effort medium para ahorrar.
- `/clear` al cambiar de tarea; `/compact` si la misma tarea se alarga.
- Flujo: plan de escenas → hoja del storyboard → commit → prueba 720p → Carlos aprueba → Carlos corre el 1080 él mismo (`npm run render:<variante>` o `node scripts/render.mjs <variante>`), sin gastar tokens.
- Commits frecuentes: los cortes por límite de uso son comunes. Si se corta, no hacer /clear; volver a la sesión y pedir que continúe.
- Revisión de pruebas: Claude (en el chat) puede extraer cuadros del video con ffmpeg en la Mac para revisar sin gastar créditos de Claude Code. Carlos revisa en el celular (subtítulos, ritmo, audio).

### Revisiones ya aprendidas
- Subtítulos al 80 % de alto; no taparlos con la interfaz de TikTok.
- Zoom profundo a tapa y logo (máx. 1.6×), las fotos de botella no giran, el video "respira".
- Fondo frutado limpio (sin grano ni manchas fuertes).
- En el gancho, cada toma al menos ~0.7 s y la toma clave ≥ 1.2 s.
- Cierre con logo real, no el nombre escrito.

### Herramientas y límites
- Claude puede ver TikTok/Instagram en el Chrome de Carlos (capturas, textos, descripciones, métricas), pero no escuchar audio. Para el audio: Carlos pasa el video y se extrae y transcribe.
- La transcripción con Whisper desde el chat está bloqueada por red; usar en la terminal de Carlos: `npx hyperframes transcribe <archivo>.mp3 -e whisper -m medium -l es -d <carpeta>` (desde `video/`).
- Pendiente aparte: análisis de cuentas de la competencia en TikTok/Instagram.
