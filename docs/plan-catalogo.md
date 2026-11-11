# Plan: reestructura del catálogo + actualización TRIALFERI (Fases 0–6)

## Contexto
Hay cambios de catálogo: productos retirados, nuevas tallas y precios, kombuchas "Próximamente", títulos nuevos y redirecciones. También hay ajustes en WhatsApp, menú, hero, categorías y cards.

Antes de todo eso, el catálogo pasa a **familias con variantes**, para dejar de duplicar datos por talla. Rama `feature/home-hero-showcase`, sobre los cambios actuales. Sin commit ni stash.

## Estado

| Fase | Estado |
|---|---|
| 0 · Familias con variantes | hecha |
| 1 · Datos del catálogo | hecha |
| 2 · Textos | hecha |
| 3 · WhatsApp y header | hecha |
| 4 · Hero del inicio | hecha |
| 5 · Categorías, subcategorías y cards | hecha |
| 6 · Verificación y documentación | hecha (imágenes borradas con respaldo en ~/Desktop/trialferi-imagenes-retiradas.zip; JSON-LD de manteca: Offer simple por ficha) |

## Forma de trabajo
- **Coordinación:** yo coordino. Cada fase la hace **un** subagente `general-purpose`, en orden y nunca en paralelo, con solo los archivos y la tarea de esa fase.
- **Entrega del subagente:** archivos modificados, resumen de máximo 15 líneas y dudas. Sin volcar código.
- **Entre fases:** te muestro el resumen y **espero tu OK** antes de lanzar la siguiente.
- **Prompt de cada subagente:** CLAUDE.md, sin commit ni stash, no revertir cambios ajenos, no instalar dependencias, `npm run build` solo en la copia aislada del scratchpad (el dev está vivo), comentarios mínimos en `/* */`, copy sin claims de salud y testimonios intocables.

## Paso previo
- Este documento se actualiza al terminar cada fase. Cada fase se detiene y espera el OK antes de la siguiente.

## Decisiones ya tomadas
- **Disponibilidad:** un solo campo, `availability: 'available' | 'coming-soon' | 'sold-out'`, que **reemplaza** a `available?: boolean`. Lo leen la ficha, el badge y el JSON-LD: `coming-soon` → `PreOrder` y `sold-out` → `OutOfStock`.
- **Línea secundaria de la card:** dentro de una categoría o subcategoría es **solo la talla** ("475 ml"), o las tallas si la card agrupa varias. No se agrega `lineName`.

---

## FASE 0 · Familias con variantes (sin cambios visibles)
**Archivos:**
- `src/features/products/data/products.tsx`
- `src/features/products/types/product.type.ts` (nuevo tipo `ProductFamily`)
- `src/features/products/data/subcategories.ts`
- Un módulo liviano nuevo con la identidad de las subcategorías (slug → categoría), por ejemplo `data/subcategoryIndex.ts`. Evita el import circular entre productos y subcategorías.
- `src/features/products/index.ts`

**Qué hace:**
- **Una familia por cada `name` actual**, con: `name`, `subcategory` (slug; la categoría se deriva), `shortName`, título base, imágenes, textos, `containsDairy` y `variants[]`.
- **Cada variante** lleva solo lo que cambia por talla: `id`, `size`, `price`, `tags`, `availability` y overrides puntuales de imagen o texto.
- **Reemplazo de `make()`:** `allProducts` sigue siendo una **lista plana de `Product`** generada desde las familias, con el mismo orden, el mismo slug y los mismos campos. Fichas, URLs, sitemap, collections y JSON-LD no se tocan.
- **`productNames` deja de escribirse a mano:** se deriva de las familias, en el mismo orden que hoy, para no reordenar las grillas.
- **`available` → `availability`:** se migra aquí, porque es parte de la estructura. Hoy ningún producto lo usa en `false`, así que el resultado no cambia.

**Verificación obligatoria:**
1. Build aislado **antes** de la Fase 0, que queda como referencia.
2. Build **después**.
3. Comparación: lista de rutas generadas (`prerender-manifest`), `sitemap.xml`, y JSON-LD y `<title>` de 3 fichas: `kefir-leche-vaca-1lt`, `kefir-pulpa-fresa-475ml` y `manteca-de-cerdo-500ml`. Todo debe quedar **idéntico**.
4. Si algo cambia, te lo explico antes de seguir.

## FASE 1 · Datos del catálogo
**Archivos:**
- `products.tsx` (familias)
- `subcategories.ts`
- `categories.ts`
- `badgeConfig.ts`
- `collections.ts`
- `src/app/productos/[productId]/page.tsx` (botón "Avísame")
- `src/lib/jsonLd.ts`
- `next.config.mjs`
- `HeroShowcase/data/heroSlides.ts` (solo referencias a productos retirados)

**Retiros, tallas y precios:**
- **Retirar:** aguaymanto, kombucha de frambuesa, vinagre, manteca 100 ml y manteca 300 ml. Se quitan también de cualquier referencia (hero, menú y chips se derivan solos).
- **Manteca:**
  - 370 ml a S/ 25.00 (`manteca-370`);
  - 580 ml a S/ 33.90 (`manteca-580`, `best-seller`), que reemplaza a la de 500 ml;
  - 1 L a S/ 62.00.
- **Kombuchas de sabor:** 275 ml y 355 ml con estos precios. Las de 355 ml **conservan su slug** (`…-355ml`), así que no necesitan redirect; las de 275 ml son nuevas.

  | Sabor | 275 ml | 355 ml |
  |---|---|---|
  | Espirulina azul con hierba luisa | S/ 10.50 | S/ 12.00 (antes 13.00) |
  | Flor de guisante con limón | S/ 10.50 | S/ 13.00 |
  | Pitahaya (edición especial) | S/ 11.50 | S/ 14.00 (antes 13.90) |
  | Arándanos con menta | S/ 9.90 | S/ 12.00 |

  Las 4, en sus dos tallas, van como `coming-soon`. La kombucha natural (1 L y 475 ml) sigue `available`.

**"Próximamente":**
- **Badge:** "Próximamente", con prioridad sobre "Nuevo".
- **Precio:** visible.
- **Botón de la ficha:** "Avísame por WhatsApp", con el mensaje "Hola, quiero que me avisen cuando salga la kombucha de <shortName>", armado con `buildWhatsAppUrl`.
- **Colecciones:** excluidas de `bestSellersCollection` por filtro, no solo por tag.

**Otros datos:**
- `probiotic` en `kefir-agua-1l`.
- Vida útil de 24 días en las 3 mermeladas.
- `shortName` en todos los productos; ya está en los 31, solo se verifican los nuevos.
- Títulos visibles: Probióticos → "Kéfir y fermentados"; kefir-frutado → "Kéfir con fruta y chocolate"; fermentados → "Para untar y acompañar"; para-cocinar → "Para cocinar y sazonar". Los slugs no cambian.

**Redirecciones 308:**

| URL vieja | Destino |
|---|---|
| `/productos/kefir-aguaymanto-475ml` | `/categorias/probioticos/kefir-frutado` |
| `/productos/kombucha-frambuesa-355ml` | `/categorias/probioticos/kombucha-y-kefir-de-agua` |
| `/productos/vinagre-de-manzana` | `/categorias/tradicionales/para-cocinar` |
| `/productos/manteca-de-cerdo-100ml` y `…-500ml` | `/productos/manteca-de-cerdo-580ml` |
| `/productos/manteca-de-cerdo-300ml` | `/productos/manteca-de-cerdo-370ml` |

- **Choques y bucles:** se revisa contra los redirects que ya existen (`/products/*` → `/productos/*`, etc.). Las URLs viejas en `/products/…` quedan con 2 saltos, sin bucle.

**Imágenes y testimonios:**
- **Imágenes:** el subagente **no borra nada**. Solo lista los archivos de `kefir-con-aguaymanto`, `mantequilla-artesanal`, `queso-natural`, `vinagre-de-manzana` y `splashes/aguaymanto`, y confirma con grep que ningún archivo del código los usa. Yo te muestro la lista y borro **solo con tu OK**.
- **Testimonios:** el subagente solo avisa si alguno menciona un producto retirado. En `testimonials.data.ts` aparece "mantequilla" o "crema de chocolate".

## FASE 2 · Textos
**Archivos:** `categories.ts`, `subcategories.ts`, `products.tsx` y `heroSlides.ts`, más los que aparezcan en la búsqueda.
- Quitar la mermelada de durazno de Tradicionales, y "aguaymanto" y "fermentados en frío" de todas las descripciones.
- Nueva descripción de kombucha y kéfir de agua: natural en 1 L y 475 ml, 4 sabores en 275 y 355 ml que llegan pronto, y kéfir de agua. Sin claims de salud.
- Buscar en todo el repo conteos o listas que ya no cuadren ("cinco sabores", etc.) y corregirlos.
- Hero, manteca: queda el eyebrow "Dura 1 año", sale "Duración: 1 año" de la descripción y pasa a `productId: 'manteca-580'`.
- Hero, kombuchas: deja de ser borrador y su eyebrow pasa a "Próximamente".

## FASE 3 · WhatsApp y header
**Archivos:**
- `src/lib/site.ts`
- `Header.tsx`, `MobileMenu.tsx` y `NavBar/SubMenu/SubMenu.tsx`
- `Header/data/navItems.tsx`
- Más los que tengan números de WhatsApp escritos a mano (búsqueda en todo el repo).

**Cambios:**
- **Números:** `WHATSAPP_NUMBER = '51941462492'` y `WHATSAPP_DISPLAY = '941 462 492'`, y se unifican los números escritos a mano.
- **CTA del header:** "Pedir por WhatsApp" con ícono de WhatsApp, en desktop y mobile. `ArrowUpRight` se queda, porque el CLAUDE.md lo pide en enlaces externos.
- **Menú:** título y descripción salen de `subcategories.ts`, y los chips de `getProductShortName`. Se borran las listas escritas a mano en `navItems.tsx`.
- **Enlaces de producto:** apuntan a `getDefaultVariant()`, así que la manteca va a 580 ml.
- **Menú mobile:** `aria-label` en los dos botones de acordeón ("Ver Kéfir y fermentados", "Ver Tradicionales"). Sin otros cambios de estructura ni estilo.

## FASE 4 · Hero del inicio
**Archivos:**
- `HeroShowcase/HeroShowcaseCarousel.tsx`
- `HeroShowcase/hooks/useHeroCarousel.ts`
- `HeroShowcase/components/SlideBackground.tsx`

**Cambios:**
- **Foto en mobile:** como máximo ~45svh, con el `imagePosition` medido, para que título y CTA se vean sin scroll en 390×844.
- **Autoplay en mobile:** se pausa al tocar el carrusel o al hacer scroll horizontal en las mini-cards, y queda pausado hasta que el usuario toque play (se apoya en `userPaused`).
- **Kombuchas:** el slide se ve en producción con "Próximamente".
- **Nota:** el campo `position` de los slides del hero (`heroSlides.ts`) se renombró a `focus`. Se documenta en CLAUDE.md en la Fase 6.

## FASE 5 · Categorías, subcategorías y cards
**Archivos:**
- `CategoryHero.tsx` y `CategoryHero.module.scss`
- `categorias/[categoria]/page.tsx`
- `[subcategoria]/page.tsx`
- `ProductShowcaseCard.tsx` y `ProductGrid.tsx`
- `categories.ts` (`panel` por categoría)

**Cambios:**
- **Páginas de categoría:** reciben el estilo de las subcategorías (fondo del tono, resplandor, grano y accesos). Desaparece el panel de vidrio verde y cada categoría tiene su propio `panel`.
- **"Desde S/ X"** con D mayúscula en todas las chips y cards.
- **Chips:** ninguna sola en la última fila a 1440 y 1180 px. Se ajusta con padding, separación o ancho, y se verifica midiendo.
- **Card dentro de su categoría o subcategoría:** el título es el `shortName`; la línea secundaria, la talla o las tallas; y sin la etiqueta de categoría. En el home y en productos relacionados queda el título completo. Lo controla una prop del contexto.
- **Kombuchas de sabor:** las cards muestran el badge "Próximamente".

## FASE 6 · Verificación y documentación
- `npm run lint` y build aislado.
- En Chrome, a 1440 y 390 px:
  - `/`, `/productos`, las 2 categorías y las 5 subcategorías;
  - una ficha de kombucha de sabor ("Próximamente");
  - la ficha de manteca 580 ml.
- Las URLs viejas (aguaymanto, frambuesa, vinagre y manteca 100/300/500) devuelven 308 al destino correcto y el sitemap ya no las lista.
- Actualizar `CLAUDE.md`: familias y variantes, `shortName` como fuente única, `availability`, el menú derivado de las subcategorías y el campo `focus` (antes `position`) de los slides del hero.
- Lista final de archivos modificados, creados y borrados. Sin commit.

**Hecho (respaldo en `~/Desktop/trialferi-imagenes-retiradas.zip`, 21 archivos; todos estaban versionados en git). JSON-LD: cada ficha publica el `Offer` de su talla.**
- Borrar las carpetas de imágenes de productos retirados, tras confirmar con grep que el código no las usa:
  - `public/assets/images/content/products/kefir-con-aguaymanto/`
  - `public/assets/images/content/products/mantequilla-artesanal/`
  - `public/assets/images/content/products/queso-natural/`
  - `public/assets/images/content/products/vinagre-de-manzana/`
  - `public/assets/images/splashes/aguaymanto/`
- Actualizar `BADGE-EXAMPLES.md` para que no referencie esas imágenes.
- Opcional: revisar el precio que muestra Google para manteca 580 ml (hoy sale como rango S/ 25–62).
