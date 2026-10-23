---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "El kéfir artesanal TRIALFERI ya está disponible; las kombuchas llegan muy pronto"
destination: instagram-reels, tiktok, biotiendas
aspect: "9:16"
format: 1080x1920
fps: 30
length: 65.27s (manda la voz: 64.1 s + 0.5 s al inicio + 0.65 s al final; cierre 10 s)
language: es
audience: clientes de la biotienda en Lima y biotiendas aliadas (celular)
angle: el kéfir como protagonista (disponible hoy); kombuchas como teaser de próximo lanzamiento; cierre con sorteo y WhatsApp
capture: none
music: voz.mp3 (maestra) + musica.mp3 con ducking al 30 % (más bajo en la intriga de kombuchas) + sfx
---

## Intent

Video promocional vertical para Reels/TikTok y para compartir con biotiendas. Fuente de verdad: scripts/build.mjs → index.html (ver STORYBOARD.md).
El kéfir es el protagonista y está a la venta; las kombuchas aún no: se presentan como lanzamiento ("Muy pronto").

## Customizations

- Sin precios de producto (no competir con los precios de las biotiendas). Solo queda la condición del sorteo: "Por compras mayores a S/20".
- Lenguaje de etiqueta: KÉFIR slab, KOM/BU/CHA apilado, cintas con flecha, sellos, grano.
- Sin claims de salud: solo ingredientes, proceso, origen y modo de consumo.
- Zona segura: texto fuera de los 220 px superiores, 420 px inferiores y 160 px del borde derecho.
- Fecha de lanzamiento de las kombuchas: constante `LAUNCH_DATE` en scripts/build.mjs (vacía = no se muestra).

## Assets

- Imágenes con fondo transparente en `assets/`, `assets/kefir/` y `assets/scenes/` (las nuevas en WebP, lado largo máx. 1600 px).
- Excluida: "Kombucha Morada Artesanal con Flores.png" (fondo negro).
- Logo: `assets/trialferi-logo.png`.

## Notes

- Entregables: `trialferi-promo-completo.mp4` (voz + música + sfx), `trialferi-promo-reels.mp4` (voz + sfx) y `portada.png` (frame de "4 frutos en 1 botella", sin precio).
- Primero preview; render solo con aprobación del usuario.
