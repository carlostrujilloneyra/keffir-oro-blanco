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
Domain code lives in `src/features/<domain>/` (products, faqs, testimonials), each with its own `components/`, `data/`, `types/`, and a barrel `index.ts`. **Import from the feature barrel** (`@/features/products`), not from deep internal paths — the barrel is the public API. `@/*` maps to `src/*` (see `tsconfig.json`).

Layers:
- `src/features/*` — domain logic + data (the product catalog is the core domain).
- `src/components/sections/*` — page-level composite sections (Header, Categories, etc.).
- `src/components/ui/*` — shadcn/ui-style primitives (new-york style, base color stone; see `components.json`) plus custom Aceternity-style animated components and hand-drawn SVG `icons/`.
- `src/app/*` — App Router routes. Route-local components use a `_components/` (or `components/`) folder co-located with the route.

### Product catalog (the important part)
- **Source of truth:** `src/features/products/data/products.tsx` — a single `allProducts` array of `Product` objects. The `Product` type is in `types/product.type.ts`; note fields hold JSX (`React.ReactNode`) for rich descriptions, which is why the file is `.tsx`.
- **Slugs are the routing key.** Never write a product `slug` by hand: `make()` in `data/products.tsx` derives it from `name` + compact `size` (`manteca-de-cerdo` + `1 L` → `manteca-de-cerdo-1lt`). Routes live in `src/lib/routes.ts` (`getProductUrl(slug)` → `/productos/<slug>`, `getCategoryUrl`, `getSubcategoryUrl`, `CATALOG_URL`); never hand-build these paths. The dynamic route `src/app/productos/[productId]/page.tsx` matches on `slug` (the `productId` param is really the slug) and pre-renders every product via `generateStaticParams`. To link a specific product from code, use `getProductById(id)` (throws at build time if the id doesn't exist) — never a hardcoded URL.
- **Collections** (`data/collections.ts`) are derived views over `allProducts` filtered by tag (`best-seller`, `discover`). Don't hand-maintain product lists — add the right tag instead. Link a specific product with `getProductUrlById(id)`.
- **Subcategories** (`data/subcategories.ts`) group products by `Product.name` (so every size comes along) under `/categorias/<categoria>/<subcategoria>`. Every product group must belong to one subcategory, or it won't appear in the catalog.
- **Catalog** `/productos` (`src/app/productos/page.tsx`) is generated from categories → subcategories; empty subcategories are hidden. Permanent redirects in `next.config.mjs`: `/products/*` → `/productos/*` and `/categorias` → `/productos`.
- **Badges/tags** (`data/badgeConfig.ts`): `BadgeType` and its labels/variants are the single config for product badges; variant types are inferred from the `Badge` component's `badgeVariants` so they stay in sync.
- **Categories** (`data/categories.ts`): `ProductCategory` enum. Each enum value **is** the URL slug (`/categorias/<value>`); validate URL params with `isProductCategory()` and index `categoryDetails` directly — keep value and slug identical when adding a category.

### Adding a product
Append a `make({...})` entry to `allProducts` in `data/products.tsx` (sizes of the same product share `name`; each size is its own entry), set `tags` to place it in the right collections, and add its images under `public/`. The route and SEO metadata are generated automatically on next build. `/sitemap.xml` lists every generated route.

### Styling
Tailwind (config in `tailwind.config.ts`). Custom breakpoints: `tablet:` (600px) and `super_desktop:` (1400px) — used alongside default `sm/md/lg`. Custom color scales `light-*` and `gray-*` carry inline usage guidance in the config; brand colors are `primary`/`secondary`. Fonts are loaded in `app/layout.tsx` via `next/font/google` as CSS variables: DM Sans (`--font-heading` → `font-display`, headings) and Inter (`--font-inter` → `font-sans`, body/UI). shadcn tokens use CSS variables (`--background`, etc.) defined in `src/app/globals.css`. Component-scoped styles use CSS/SCSS modules (`*.module.css` / `*.module.scss`).

## Conventions
- Prettier + `prettier-plugin-tailwindcss` (auto-sorts classes); single quotes, config in `.prettierrc`.
- Server Components by default (RSC enabled); add `'use client'` only for interactive components (carousels, accordions, hamburger menu).
- Several domains ship a co-located `*.md` (e.g. `BADGE-EXAMPLES.md`) documenting how to use them — check these before changing product data, badges, or slug logic.
