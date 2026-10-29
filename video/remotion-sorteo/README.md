# Remotion · Teaser del sorteo TRIALFERI

Video vertical 1080x1920 a 30 fps, sincronizado con `../assets/sfx/voz-sorteo-teaser-v3.mp3`.

## Estructura
- `src/Root.tsx` – composición y carga de fuentes (Inter Tight + Instrument Serif).
- `src/Teaser.tsx` – todas las escenas, la Gotita y las partículas.
- `src/timing.ts` – sincronización con la voz: `map` lleva cada momento de la voz a la línea de tiempo del diseño.
- `public/` – botellas recortadas, logo, fuentes.
- `scripts/mix-audio.py` – mezcla voz + música (ducking) + efectos.

## Uso (Node 22)
```bash
npm install
npm run studio   # previsualizar y ajustar en el navegador
npm run render   # video sin audio
npm run audio    # mezcla de audio (requiere ffmpeg)
npm run final    # une video + audio → out/sorteo-teaser.mp4
```

## Pruebas 3D (@remotion/three)
- `src/Prueba3D.tsx` – botella de vidrio girando (3 s).
- `src/PruebaParallax.tsx` – botellas como planos en 3D con la cámara pasando de una a otra (6 s); imágenes en `public/parallax/`.
- Renderiza con `--gl=angle` (WebGL en Chrome headless):
  `npx remotion render src/index.ts PruebaParallax out/prueba-parallax.mp4 --gl=angle`

## Para cambiar la voz
1. Pon el mp3 nuevo en `../assets/sfx/`.
2. Ajusta los tiempos en `src/timing.ts` y en las constantes `P` de `Teaser.tsx`.
