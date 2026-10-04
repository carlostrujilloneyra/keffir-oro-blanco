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
- **Slugs are the routing key.** Each product's `slug` is generated with `generateSlug(title)` (`src/lib/generateSlug.ts`) — lowercases, strips accents, kebab-cases. `getProductUrl(slug)` builds `/products/<slug>`. The dynamic route `src/app/products/[productId]/page.tsx` matches on `slug` (the `productId` param is really the slug) and pre-renders every product via `generateStaticParams`.
- **Collections** (`data/collections.ts`) are derived views over `allProducts` filtered by tag (`new`, `best-seller`, `recommended`, `discover`). Don't hand-maintain product lists — add the right tag instead.
- **Badges/tags** (`data/badgeConfig.ts`): `BadgeType` and its labels/variants are the single config for product badges; variant types are inferred from the `Badge` component's `badgeVariants` so they stay in sync.
- **Categories** (`data/categories.ts`): `ProductCategory` enum. Note the value mismatch — `TRADICIONALES = 'otros'` while its display slug is `'tradicionales'`; don't assume enum value == slug.

### Adding a product
Append to `allProducts` in `data/products.tsx` with `slug: generateSlug(title)`, set `tags` to place it in the right collections, and add its images under `public/`. The route and SEO metadata are generated automatically on next build. Keep `src/app/products/ROUTES.md` in mind — it's a manually written listing of generated routes.

### Styling
Tailwind (config in `tailwind.config.ts`). Custom breakpoints: `tablet:` (600px) and `super_desktop:` (1400px) — used alongside default `sm/md/lg`. Custom color scales `light-*` and `gray-*` carry inline usage guidance in the config; brand colors are `primary`/`secondary`. Fonts `league_spartan` and `inter` are loaded in `app/layout.tsx` as CSS variables and exposed as font-family utilities. shadcn tokens use CSS variables (`--background`, etc.) defined in `src/app/globals.css`. Component-scoped styles use CSS/SCSS modules (`*.module.css` / `*.module.scss`).

## Conventions
- Prettier + `prettier-plugin-tailwindcss` (auto-sorts classes); single quotes, config in `.prettierrc`.
- Server Components by default (RSC enabled); add `'use client'` only for interactive components (carousels, accordions, hamburger menu).
- Several domains ship a co-located `*.md` (`USAGE-EXAMPLES.md`, `BADGE-EXAMPLES.md`, `README-SLUGS.md`) documenting how to use them — check these before changing product data, badges, or slug logic.
