---
format: 1080x1920
fps: 30
duration: 65.27
music: voz.mp3 (maestra) + musica.mp3 con ducking al 30 % + sfx
---

# TRIALFERI — promo Reels/TikTok (65.27 s)

Mensaje: el kéfir está disponible hoy; las kombuchas son el próximo lanzamiento (teaser, sin precio).
Sin precios de producto (el video se comparte con biotiendas). Solo queda "Por compras mayores a S/20", la condición del sorteo.

Fuente de verdad: `scripts/build.mjs` → `index.html` (`node scripts/build.mjs`; `--sin-musica` para la versión reels).
Cada escena empieza en la palabra de la voz que la nombra (`voz.transcript.json`, whisper; las palabras pegadas a signos se miden por energía).
Zona segura de texto: fuera de los 220 px superiores, 420 px inferiores y 160 px del borde derecho.

| # | Escena | Inicio | Dur. | Voz | Visual / texto |
|---|--------|--------|------|-----|----------------|
| 1 | h1 · gancho | 0.00 | 3.07 | "¿Ya probaste el kéfir de frutos del bosque?" | Vertido de frutos del bosque · KÉFIR · cinta "Endulzado con stevia" |
| 2 | h2 · 4 frutos | 3.07 | 5.60 | "¡Cuatro frutos en una sola botella!…" | Botella + splash; las frutas llegan volando al nombrarlas (portada ≈ 8.05 s) |
| 3 | kN · kéfir natural | 8.67 | 10.87 | "Y el clásico, kéfir de leche de vaca o de cabra…" | Dos botellas con splash · cinta que cambia de texto · chips "Libre pastoreo" / "Leche de establo" |
| 4 | pv · primera vez | 19.53 | 5.73 | "¿Es tu primera vez?…" | 3 pasos + shot de 30 ml |
| 5 | fr · frutados | 25.27 | 10.40 | "¿Lo prefieres con fruta?…" | Fresa 25.27 (vertido → botella en "fresa") · Arándanos 28.95 · Chocolate 31.51 · cinta stevia en "Todos" |
| 6 | kt-intriga | 35.67 | 1.70 | "Y se viene algo nuevo…" | Fondo #120A1A, 3 siluetas a contraluz · "Se viene algo nuevo…" · música más baja · burbujas lejanas |
| 7 | kt-reveal | 37.37 | 2.10 | "¡Llegan las kombuchas Trialféri!" | Destello 0.18 s → color · KOM/BU/CHA + sticker "Nuevo" · destape |
| 8 | kt-desfile | 39.47 | 3.30 | "Flor de guisante… espirulina azul… y pitahaya." | Corte seco por nombre: guisante 39.47 · espirulina 40.67 · pitahaya 41.97 (entra en diagonal y gira) · tapa que salta + burbujas |
| 9 | kt-pronto | 42.77 | 5.80 | "Burbujeantes, artesanales y hechas con té verde. ¡Muy pronto!…" | Las 3 a escala real (355 ml) · "Burbujeantes · Artesanales · Con té verde" · cinta "MUY PRONTO" (+ `LAUNCH_DATE` si tiene valor) |
| 10 | s9 · sorteo | 48.57 | 6.70 | "Este octubre, por compras mayores a 20 soles…" | Ticket que se arranca + confeti · canasta TRIALFERI centrada abajo |
| 11 | s10 · cierre | 55.27 | 10.00 | "…artesanales, sin conservantes… Pide el tuyo por WhatsApp al 941 462 492" | Logo + estante solo con kéfir (1 L y 475 ml a escala real) · número por grupos 61.30 / 62.50 / 63.63 |

Transiciones: ola de líquido (franja que cruza la pantalla) en los cortes de color; whoosh en h2 y pv; cortes secos dentro del desfile.
Portada: frame de "4 frutos en 1 botella" con las cuatro frutas en pantalla (≈ 8.05 s), sin precio.
