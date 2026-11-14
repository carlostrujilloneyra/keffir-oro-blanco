# Plan UI · efectos visuales

Regla de diseño: zonas **oscuras** (heroes, paneles por tono) = cristal, gradientes y brillo; zonas **crema** = limpio y plano. Máximo **2 animaciones infinitas** visibles a la vez por pantalla. Sin dependencias nuevas, sin campos nuevos en los datos, sin commits. Lint y build solo en una copia aislada.

## Estado

| Fase | Tema | Estado |
|---|---|---|
| 0 | Base de efectos | ✅ Hecha (espera OK) |
| 1 | Botones fucsia | ✅ Hecha · ✅ Ajuste notorio aplicado (espera OK para seguir con 1b) |
| 1b | Verdes restantes y gradientes | ✅ Aplicada (espera OK) |
| 2 | Badges con shimmer | ✅ Hecha (espera OK) |
| 3 | Vidrio sobre fondos oscuros | ✅ Hecha (espera OK) |
| 4 | Borde giratorio | ✅ Hecha (espera OK; decisión sobre `halo` pendiente) |
| 5 | Verificación | ⬜ Pendiente |

## Decisiones aprobadas

- "Tarjeta del producto destacado" = card central del coverflow de "Productos más vendidos" (`ProductShowcaseCard`, home). `MainSection` no.
- Páginas de categoría: **sin** borde giratorio. `CategoryHero` ya tiene 3 infinitas (float, shadow, halo); no se tocan sin OK. En la Fase 4 se informa si conviene reducir una.
- Header: sin vidrio, fuera del plan.
- Precio sobre la imagen de la ficha: revisar `ProductImageGallery` antes; vidrio solo si el chip queda sobre la foto o un fondo oscuro. Productos "Próximamente" sin foto: se resuelve dentro de `ComingSoonArt`.
- Borde giratorio con fallback estático (borde fucsia sólido) donde `@property` no exista (Safari < 16.4).
- "Próximamente" no es fucsia sólido: contorno tinta + shimmer.

- Botones (decidido tras comparar variantes): `primary` (gradiente de marca) es el botón de acción en toda la web, también sobre paneles oscuros; lleva un borde claro interior (`inset 1.5px white/40`) para sostener la silueta (el gradiente solo da 2.2–2.8:1 contra los paneles; el texto sí pasa 4.98–6.37:1). "Ver categoría" de la home pasó de `light`/`miel` a `primary`. `light` y `miel` quedan como secundarios.

## Checklist

### Fase 0 · Base de efectos
- [x] `src/styles/_effects.scss` con mixin `spin-border` (`@property`; #d11e82, #f2b705, #7040cc)
- [x] mixin `glass` (`backdrop-filter` + `saturate`, `-webkit-` y fallback)
- [x] mixin `shimmer` (franja de luz que cruza el badge)
- [x] Todo apagado con `prefers-reduced-motion`
- [x] Confirmar que `@property` funciona en CSS Modules

### Fase 1 · Botones
- [x] `Button` `primary` en gradiente fucsia (#d11e82 → #a3145f), texto blanco
- [x] Contraste ≥ 4.5:1 comprobado: 4.98 (inicio) · 6.06 (medio) · 7.44 (final). Hover pasó de `brightness-110` (4.22, no cumplía) a `brightness-95`
- [x] Verde solo para estados; ningún botón de WhatsApp queda verde (anillo de foco ahora fucsia)
- [x] Ícono de WhatsApp legible sobre fucsia (`currentColor` → blanco, sin cambios)
- [x] `Button` sigue siendo el único componente de botón, con `ArrowUpRight`

### Fase 1 (ajuste) · Botón principal notorio
- [x] Token Tailwind `bg-gradient-marca`: `linear-gradient(135deg, #d11e82 0%, #7040cc 100%)` (`gradient-fucsia` queda para otros usos)
- [x] Texto blanco; contraste ≥ 4.5:1 en todo el recorrido: 4.98 · 5.55 · 6.03 · 6.32 · 6.37
- [x] Hover: `background-size` 150% (ajustado desde 200%) + `background-position` desplazan el gradiente
- [x] Hover: una pasada del mixin `shimmer` (`$on-hover`, 1 iteración, no infinito)
- [x] Sin `brightness-95`; apagado con `prefers-reduced-motion` (sin desplazamiento ni franja)
- [x] `Button` sigue siendo el único componente de botón, con `ArrowUpRight`

### Fase 1b · Verdes restantes y gradientes
- [x] Inventario (solo lectura) de usos de verde/bosque con propuesta
- [x] OK del usuario al inventario
- [x] Aplicado: talla seleccionada (gradiente marca), menú activo (tinta), enlaces "Ver los N" y hovers (fucsia oscuro), miniatura activa, panel de galería por tono (prop `panelBackground`), anillo de foco global, íconos pequeños, Coverflow (flechas tinta, punto activo gradiente, outlines fucsia)
- [x] Footer: `bg-tinta` + resplandor de marca abajo a la derecha; `papel/50` → `papel/60` (4.80 sobre tinta, 4.01 bajo el pico del resplandor → 5.11 con `/60`)
- [x] Contraste del texto sobre gradiente: talla seleccionada en blanco pleno (el precio con `papel/80` caía a ~3.5:1)
- [x] Regla de marca: fucsia → guisante = acciones y seleccionado; tinta = superficies oscuras y activo neutro; verde solo disponibilidad/éxito. Aplicada a: chevron de `FaqSection` (fucsia oscuro), `PackCard` (fucsia → guisante suave), `Button` `dark` (hover `tinta-media`) y `light` (`text-tinta`), badge `category` (tinta)

### Fase 2 · Badges
- [x] "Próximamente": contorno (`soon` tinta para fondos claros; `soon-inverse` papel para paneles oscuros, el que usa `badgeConfig`) + shimmer
- [x] "Más vendido": `category` en tinta + shimmer
- [x] Shimmer al entrar en pantalla (`ShimmerBadge`, `useInView`, 2 pasadas, no infinito); flag `shimmer` en `badgeConfig`
- [x] Sin fechas fijas; reduced-motion lo apaga
- [x] Contraste: `category` 15.34:1; `soon-inverse` ≥ 9.73:1 sobre el pico del glow de cada tono; `soon` 15.34:1 sobre papel

### Fase 3 · Vidrio
- [x] Mini-cards del hero (`FlavorCard`): inactiva en vidrio oscuro (mixin `glass`); la activa sigue en papel
- [x] Chips "Elige tu sabor" (`CategoryHero`): vidrio claro (`.chip`)
- [x] Revisado `ProductImageGallery`: no tiene chip de precio (solo flechas y contador, que ya llevan desenfoque sobre la foto; sin cambios)
- [x] Precio de "Próximamente" sin foto resuelto en `ComingSoonArt` (`COMING_SOON_PRICE_CLASS`, vidrio): papel sobre el chip ≥ 5.31:1 sobre el pico de glow de cada tono
- [x] Nada de vidrio en secciones crema; Header fuera del plan

### Fase 4 · Borde giratorio
- [x] CTA principal del hero (`<Button spin>` en `SlideText`; solo el CTA principal, no "Ver todos los productos")
- [x] Card central del coverflow (`ProductShowcaseCard`, cuando `highlighted`; solo se usa en "Productos más vendidos" de la home)
- [x] Fallback estático: anillo fucsia sólido sin `@property` (Safari < 17.4) y con reduced-motion
- [x] Mixin `spin-border` reescrito como anillo superpuesto en `::before` con máscara (el de la Fase 0 pisaba el fondo del botón y de la card); se detiene en copias `aria-hidden` (textos invisibles del hero)
- [x] Conteo de infinitas por pantalla: home = 2 como máximo (anillo del CTA + anillo de la card central; en 1440 px el coverflow queda bajo el hero); categorías = 3 de `CategoryHero` (ya existentes, sin anillo nuevo)
- [ ] Pendiente de OK del usuario: recortar `halo` de `CategoryHero` para quedar en 2 (float + shadow)

### Fase 5 · Verificación
- [ ] Lint
- [ ] Build en copia aislada
- [ ] `prefers-reduced-motion`
- [ ] Rendimiento en móvil
- [ ] Contraste
- [ ] `CLAUDE.md` con las convenciones de efectos
- [ ] Lista de archivos modificados y creados

## Riesgos

- `backdrop-filter` es costoso en móvil: limitar el número de superficies con vidrio por pantalla.
- Safari: prefijo `-webkit-`; `@property` desde 16.4.
- 390 px: CTA fucsia a ancho completo, mini-cards de vidrio con scroll horizontal, efectos más discretos. 1440 px: mini-cards en grilla, CTA con borde cónico, barrido de luz en badges.
