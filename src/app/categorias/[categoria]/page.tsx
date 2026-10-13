import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  allProducts,
  bestSellersCollection,
  categoryDetails,
  getProductGroups,
  getSubcategorySummary,
  isProductCategory,
  ProductCategory,
  subcategoryDetails,
} from '@/features/products';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Reveal, Stagger } from '@/components/ui/Motion/Motion';
import { ValuesBento } from '@/components/sections/ValuesBento/ValuesBento';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/jsonLd';
import { buildPageMetadata } from '@/lib/metadata';
import { CategoryHero } from './_components/CategoryHero';
import { SubcategoryCard } from './_components/SubcategoryCard';
import { getCategoryUrl, getSubcategoryUrl } from '@/lib/routes';
import { cn } from '@/lib/utils';

type Params = { categoria: string };

const LG_COLS: Record<number, string> = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

export function generateStaticParams(): Params[] {
  return Object.values(ProductCategory).map((categoria) => ({ categoria }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const { categoria } = params;
  if (!isProductCategory(categoria)) return {};

  const details = categoryDetails[categoria];

  return buildPageMetadata({
    title: details.title,
    description: details.description,
    path: getCategoryUrl(details.slug),
  });
}

export default function CategoriaPage({ params }: { params: Params }) {
  const { categoria } = params;
  if (!isProductCategory(categoria)) notFound();

  const details = categoryDetails[categoria];
  const subcategories = subcategoryDetails
    .filter((sub) => sub.category === categoria)
    .map((sub) => ({ sub, ...getSubcategorySummary(sub) }))
    .filter(({ count }) => count > 0);

  const count = subcategories.reduce((total, sub) => total + sub.count, 0);

  const shortcuts = subcategories.map(({ sub, fromPrice }) => ({
    label: sub.title,
    href: getSubcategoryUrl(sub.category, sub.slug),
    fromPrice,
  }));

  /* Agrupa con todas las tallas del producto, no solo las marcadas best-seller. */
  const bestSellerNames = new Set(bestSellersCollection.filter((p) => p.category === categoria).map((p) => p.name));
  const bestSellers = getProductGroups(allProducts.filter((p) => bestSellerNames.has(p.name))).slice(0, 4);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Inicio', path: '/' },
    { name: details.title, path: getCategoryUrl(details.slug) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <CategoryHero
        title={details.title}
        eyebrow={details.eyebrow}
        description={details.description}
        imageUrl={details.imageUrl}
        imageAlt={details.imageAlt}
        count={count}
        tone={details.tone}
        shortcuts={shortcuts}
      />

      <section aria-label={`Tipos de ${details.title}`} className='w-full py-8 md:py-12'>
        {subcategories.length > 0 ? (
          <Reveal inView y={24}>
            <ul className={cn('grid gap-4 tablet:grid-cols-2 tablet:gap-5', LG_COLS[subcategories.length])}>
              {subcategories.map(({ sub, fromPrice, count }) => (
                <li key={sub.slug}>
                  <SubcategoryCard subcategory={sub} fromPrice={fromPrice} count={count} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <div className='rounded-card bg-papel-hueso p-10 text-center'>
            <p className='text-tinta-media'>Pronto tendremos productos en esta categoría.</p>
          </div>
        )}
      </section>

      {bestSellers.length > 0 && (
        <section aria-labelledby='mas-pedidos-titulo' className='flex w-full flex-col gap-8 pb-8 md:pb-12'>
          <Stagger inView className='flex flex-col gap-3'>
            <Eyebrow>Favoritos de la casa</Eyebrow>
            <h2
              id='mas-pedidos-titulo'
              className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-4xl'
            >
              Los más pedidos
            </h2>
          </Stagger>

          <ProductGrid groups={bestSellers} />
        </section>
      )}

      <ValuesBento />
    </>
  );
}
