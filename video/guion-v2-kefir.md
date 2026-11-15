# Guion v2 · Kéfir natural y frutado (con hooks)

Objetivo: que el video **venda**: gancho en el segundo 0, crear la necesidad, beneficios de la etiqueta, cómo consumir y llamada a la acción. Base: `video/HOOKS.md`. Reglas de contenido: las de `video/CONTEXTO-VIDEOS-TRIALFERI.md` (sin claims de salud, sin precios).

## Voces nuevas (ElevenLabs, Renata, mismos ajustes)
- `assets/sfx/voz-kefir-natural-v2.mp3`
- `assets/sfx/voz-kefir-frutado-v2.mp3`

### Natural
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

### Frutado
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

## Cambios de escenas
### Natural
| # | Escena | Texto en pantalla (≤7 palabras) | Visual / ritmo |
|---|---|---|---|
| 1 | Hook | ESTO NO ES **YOGURT** | Frame 0 ya en movimiento: splash de leche + botella entrando con punch-in; golpe de sonido en "no lo es" |
| 2 | Qué es | 100 % KÉFIR **VIVO** · Hecho a mano, lote a lote | Botella 3D (lo actual de "Qué es") |
| 3 | Necesidad | ¿ALGO **NATURAL** PARA TU DÍA? · Sin azúcar añadida · Sin conservantes añadidos | Fondo crema, cintas que entran rápido |
| 4 | Beneficios | (lo actual, cintas) | Una cinta por frase de la voz, con punch-in leve en cada una |
| 5 | Diferencia | VACA O CABRA · Ollas de acero quirúrgico | `hero-vaca-cabra.png` |
| 6 | Servido | ¿PRIMERA VEZ? · 1 SHOT DE **30 ML** | Servido actual (≈4 s) |
| 7 | Combínalo | TU DESAYUNO **FAVORITO** | Bowl actual |
| 8 | Cierre/CTA | SEPARA EL TUYO HOY · WhatsApp 941 462 492 | Cierre actual |

### Frutado
| # | Escena | Texto en pantalla | Visual / ritmo |
|---|---|---|---|
| 1 | Hook | ¿CUÁL **ELIGES**? | Las 4 botellas; cada una se ilumina y hace punch-in al nombrarla (≈0.5 s c/u), fondo cambia al color de cada sabor; termina con las 4 juntas |
| 2 | Fruta de verdad | FRUTA DE **VERDAD** · Sin colorantes · Sin saborizantes | Lo actual |
| 3–6 | Fresa, Arándanos, Frutos del bosque, Chocolate | Igual que ahora, títulos ≤7 palabras ("¿ANTOJO DE **CHOCOLATE**?") | Lo actual; frutos del bosque con `hero-frutos-bosque-vaso.png` |
| 7 | Stevia | DULCE, CON **STEVIA** · Sin conservantes añadidos | Las 4 botellas en franjas |
| 8 | Combínalo | Solo, con granola o en tu bowl | Bowl actual |
| 9 | Cierre/CTA | COMENTA CUÁL **ELEGIRÍAS** 👇 · WhatsApp 941 462 492 | Cierre actual con las 4 botellas |

## Reglas de dinamismo (aplicar en los dos)
- Hook en los primeros 2–3 s: la voz arranca en el s 0, sin intro; el frame 0 ya tiene producto en movimiento (nunca logo ni fondo vacío).
- Dentro del hook, un cambio visual cada 1–2 s (punch-in, giro, cambio de color).
- Títulos ≤7 palabras, una palabra clave resaltada en el color del sabor.
- Golpe de sonido (`pop`/`woosh`) en la palabra clave del hook y en cada cambio de sabor.
- Mantener lo ya aprobado: subtítulos, tamaños, zona segura solo para texto, textos ≥34 px.

## Motion v2: cámara viva, transiciones con golpe (referencia: TikToks "Claude code + skills")
Lo que se toma de las referencias: cortes cada 0.5–1.5 s, destellos y trazos de luz que dibujan formas, barridos con desenfoque de movimiento, números que cuentan, el producto cambia de color/sabor en el mismo encuadre, y cierre con reveal de marca. **Nada estático más de 1.5 s**: si el producto queda quieto, la cámara se mueve (push-in lento, paralaje, deriva).

### Cámara (sobre las fotos, con escala/posición/rotación 3D y paralaje entre capas)
- **Push-in a detalle:** acercamiento continuo hacia la tapa y el cuello de la botella (escala 1 → 1.6 en 3–4 s, ease-in-out), con desenfoque leve del fondo (rack focus).
- **Pull-back revelador:** de un detalle (tapa, etiqueta "Alto en probióticos") a la botella completa.
- **Órbita/tilt 3D:** rotateY ±12° y rotateX ±6° con perspectiva, en "Qué es" y "Todos".
- **Deriva constante:** en planos "quietos", movimiento lento (2–4 % de escala o 20–40 px) para que nunca se vea congelado.
- **Speed ramp:** entradas rápidas que frenan suave (spring con damping alto o easing expo.out).

### Transiciones (variar, no repetir la misma dos veces seguidas)
- **Whip pan:** barrido lateral rápido (≈8 frames) con motion blur direccional + `woosh`.
- **Flash blanco/de color:** 2–3 frames de destello al cambiar de sabor + `impacto`.
- **Zoom-through:** entrar en la tapa o en un splash hasta llenar la pantalla y salir a la escena siguiente.
- **Trazo de luz:** una línea de luz dorada/celeste dibuja la forma de la botella o el título antes de que aparezca (como el logo de la referencia) + `brillo-luz`.
- **Cambio de sabor en el mismo encuadre:** la botella se queda y el líquido/etiqueta/fondo cambian de color (frutado: fresa → arándanos → frutos del bosque → chocolate).

### Escenas a rehacer con esto
- **Natural · Beneficios (escena clave):** la botella empieza a la derecha y hace **push-in hacia la tapa y el cuello** (que se vea grande, parte de la botella sale del cuadro). A la izquierda, los beneficios entran **uno debajo del otro**, cada uno con su cinta, un `pop` y un leve "punch" de cámara al aparecer: 1) Alto en probióticos vivos 2) Bajo en lactosa 3) Fortalece tu microbiota 4) Digestión equilibrada. Al terminar, **pull-back** a la botella completa.
- **Natural · Hook:** trazo de luz que dibuja la botella → flash → aparece la botella real con splash → "ESTO NO ES **YOGURT**" con golpe.
- **Natural · Servido:** contador "0 → **30 ML**" que sube mientras se llena el shot (como el "4,0 s" de la referencia).
- **Natural · Diferencia:** usar `hero-naturales-vertical.png` (vertical, vaca + cabra con splash): pull-back desde las tapas (dorada y negra) hasta ver las dos botellas.
- **Frutado · Hook:** las 4 botellas; en cada nombre, flash del color del sabor + punch-in de 0.5 s sobre esa botella; termina con las 4 y "¿CUÁL **ELIGES**?".
- **Frutado · Sabores:** whip pan entre sabores; dentro de cada uno, push-in hacia la fruta/vertido.
- **Cierres:** trazo de luz que escribe/subraya "TRIALFERI" + brillo; el número de WhatsApp aparece con un golpe, no por partes.

### Sonido (nuevos en assets/sfx/)
- `impacto.mp3` en flashes y en la palabra clave del hook; `riser.mp3` antes del cierre; `whip.mp3` en los barridos; `brillo-luz.mp3` en trazos de luz. Mantener `pop` en cada beneficio, `vertido` en el servido.
- Todos los cortes y golpes alineados a los beats de `musica-kefir.mp3`.

### Recurso nuevo
- `assets/kefir/hero-naturales-vertical.png`: vaca + cabra con splash, **vertical**, fondo azul oscuro. Ideal para "Diferencia" y el cierre del natural (mejor que la horizontal).
