# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/catalog site for **TRIALFERI**, a Peruvian artisanal natural-foods brand (kéfir, kombucha, and traditional products). Next.js 14 App Router, TypeScript, Tailwind. Content is in Spanish; product/UI copy and code comments are written in Spanish — match that when adding user-facing text.

The site is a static catalog: there is **no backend or database**. All product data lives in TypeScript files and pages are statically generated (`generateStaticParams`). `src/services/` exists but is empty.

## Commands

```bash
npm run dev     # local dev server (next dev)
npm run build   # production build — also the only way to verify generateStaticParams / static routes
npm run start   # serve the production build
npm run lint    # next lint (ESLint, config in .eslintrc.js)
```

There is no test runner configured. "Verifying a change" means `npm run build` + manually checking the affected page.

## Architecture

### Feature-based organization
Domain code lives in `src/features/<domain>/` (products, faqs, testimonials), each with its own `components/`, `data/`, `types/`, and a barrel `index.ts`. **Import from the feature barrel** (`@/features/products`), not from deep internal paths — the barrel is the public API for data, helpers and types. Components are the exception: import them by path (`@/features/products/components/ProductGrid`) — re-exporting them from the barrel pulled every product component into the header's client bundle (+32 kB). Inside the feature, use relative imports, never the barrel (avoids import cycles). `@/*` maps to `src/*` (see `tsconfig.json`).

Layers:
- `src/features/*` — domain logic + data (the product catalog is the core domain).
- `src/components/sections/*` — page-level composite sections (Header, Categories, etc.).
- `src/components/ui/*` — shadcn/ui-style primitives (new-york style, base color stone; see `components.json`) plus custom Aceternity-style animated components and hand-drawn SVG `icons/`.
- `src/app/*` — App Router routes. Route-local components use a `_components/` (or `components/`) folder co-located with the route.

### Product catalog (the important part)
- **Source of truth:** `src/features/products/data/products.tsx` — a single `allProducts` array of `Product` objects. The `Product` type is in `types/product.type.ts`; note fields hold JSX (`React.ReactNode`) for rich descriptions, which is why the file is `.tsx`.
- **Slugs are the routing key.** Never write a product `slug` by hand: `make()` in `data/products.tsx` derives it from `name` + compact `size` (`manteca-de-cerdo` + `1 L` → `manteca-de-cerdo-1lt`). Routes live in `src/lib/routes.ts` (`getProductUrl(slug)` → `/productos/<slug>`, `getCategoryUrl`, `getSubcategoryUrl`, `CATALOG_URL`); never hand-build these paths. The dynamic route `src/app/productos/[productId]/page.tsx` matches on `slug` (the `productId` param is really the slug) and pre-renders every product via `generateStaticParams`. To link a specific product from code, use `getProductById(id)` (throws at build time if the id doesn't exist) — never a hardcoded URL.
- **Collections** (`data/collections.ts`) are derived views over `allProducts` filtered by tag (`best-seller`, `discover`). Don't hand-maintain product lists — add the right tag instead. Link a specific product with `getProductUrlById(id)`; look one up by URL with `getProductBySlug(slug)`. Display helpers live in `lib/productDisplay.ts` (`getProductBaseTitle` — title without the size, `getProductImage`).
- **Subcategories** (`data/subcategories.ts`) group products by `Product.name` (so every size comes along) under `/categorias/<categoria>/<subcategoria>`. Every product group must belong to one subcategory, or it won't appear in the catalog.
- **Catalog** `/productos` (`src/app/productos/page.tsx`) is generated from categories → subcategories; empty subcategories are hidden. Permanent redirects in `next.config.mjs`: `/products/*` → `/productos/*` and `/categorias` → `/productos`.
- **Badges/tags** (`data/badgeConfig.ts`): `BadgeType` and its labels/variants are the single config for product badges; variant types are inferred from the `Badge` component's `badgeVariants` so they stay in sync. "Nuevo" comes only from the `'new'` tag (product page, cards and home hero carousel alike).
- **Categories** (`data/categories.ts`): `ProductCategory` enum. Each enum value **is** the URL slug (`/categorias/<value>`); validate URL params with `isProductCategory()` and index `categoryDetails` directly — keep value and slug identical when adding a category.

### Adding a product
Append a `make({...})` entry to `allProducts` in `data/products.tsx` (sizes of the same product share `name`; each size is its own entry), set `tags` to place it in the right collections, and add its images under `public/`. The route and SEO metadata are generated automatically on next build. `/sitemap.xml` lists every generated route.

### Styling
Tailwind (config in `tailwind.config.ts`). Custom breakpoint: `tablet:` (600px), used alongside default `sm/md/lg`; content width is capped by `.container-max` (1400px). Brand color tokens: `papel` (backgrounds), `tinta` (text), `bosque`/`verde`, `miel`, `fucsia` (from the jar labels). Fonts are loaded in `app/layout.tsx` via `next/font/google` as CSS variables: DM Sans (`--font-heading` → `font-display`, headings) and Inter (`--font-inter` → `font-sans`, body/UI). Only the shadcn CSS variables actually used are kept (`--background`, `--foreground`, `--muted`, `--border`, `--ring` in `src/app/globals.css`); add more only when a new shadcn component needs them.

### UI language ("etiqueta de frasco")
The look comes from the physical jar labels. Reuse these pieces instead of hand-rolling styles:
- **Section labels:** `<Eyebrow>` (`components/ui/Eyebrow`) — black ribbon with an arrow tip, sentence case; `variant='light'` on dark backgrounds. No dot + uppercase eyebrows.
- **Buttons:** `<Button asChild variant=…><Link/></Button>` (`components/ui/Button`) — `primary` (green gradient) | `miel` | `dark` | `light` | `link`. Sentence case, 10px radius. Never hand-roll CTA classes.
- **Badges:** `<Badge>` stickers (`neutral` / `category` / `alert` for "Nuevo"); labels in `features/products/data/badgeConfig.ts`, sentence case.
- **Arrows:** `ArrowUpRight` only on links that leave the site (WhatsApp, social) — not as decoration.
- **Surfaces:** cards are flat `bg-papel-hueso`, no grey outline, `rounded-card` (12px); large dark blocks use `rounded-panel` (28px) with the dark radial-gradient backgrounds. No icons inside circles.
- **Product card:** `ProductShowcaseCard` adapts to its own width with the custom container query: the root has `cq`, children use `cq-sm:` (≥ 13rem). Narrow = compact version.
- **Sizes in listings:** subcategory pages show one card per size (SKU); `/productos` and the category's "Los más pedidos" show one card per `Product.name` with a "Desde" price (`ProductGrid groups`). The size that represents a group — the product page's canonical URL, the sitemap entry and the `AggregateOffer` JSON-LD — is `getDefaultVariant()`: the `'best-seller'` size (the largest if several), else the cheapest. Moving the `'best-seller'` tag changes all of these.
- **Horizontal scroll rows:** add `scrollbar-none` (custom utility). Prefer wrapping over scrolling when items are few.
- **Easing:** `ease-suave` token instead of arbitrary `ease-[cubic-bezier(...)]`; in CSS `theme('transitionTimingFunction.suave')`, in motion `EASE_SUAVE`.
- **Animations:** `Reveal` / `Stagger` / `useStaggerVariants` from `components/ui/Motion` (they handle reduced motion). Don't redefine variants per component.
- **Tones:** `Tone` / `SectionTone` and `toneStyles` (`features/products/lib/productAccent.ts`) are the single source for accent colors; `<ToneHalo>` is the blurred halo behind product photos.
- **Prices:** `formatPrice()` already returns `S/ 12.50` — never prepend `S/` by hand.
- **SEO:** every page builds its metadata with `buildPageMetadata()` (`src/lib/metadata.ts`); Next replaces `openGraph` instead of merging it, so don't hand-write `openGraph`/`twitter` per page.
- **Copy:** only verifiable claims (no invented stats, shipping promises or health claims). Testimonials quote customers verbatim (`highlight` is a literal fragment of `quote`).

### Content flags
- `Product.containsDairy` drives the "Con lácteos / Sin lácteos" split of the header mega menu (`components/sections/Header/data/navItems.tsx`, built from category/subcategory data).
- Packs live in `features/products/data/packs.ts`; `draft: true` shows them only in development (hidden in production builds).
- `CONTACT_EMAIL` in `lib/site.ts` is `undefined` until a real address exists (then it appears in the footer and JSON-LD).

## Conventions
- Prettier + `prettier-plugin-tailwindcss` (auto-sorts classes); single quotes, config in `.prettierrc`.
- Server Components by default (RSC enabled); add `'use client'` only for interactive components (carousels, accordions, hamburger menu).
- Several domains ship a co-located `*.md` (e.g. `BADGE-EXAMPLES.md`) documenting how to use them — check these before changing product data, badges, or slug logic.
