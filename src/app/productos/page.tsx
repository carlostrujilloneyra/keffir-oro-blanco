import type { Metadata } from 'next';
import Link from 'next/link';
import { categoryDetails, getSubcategorySummary, ProductCategory, subcategoryDetails } from '@/features/products';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Reveal, Stagger } from '@/components/ui/Motion/Motion';
import { formatPrice } from '@/lib/formatPrice';
import { buildPageMetadata } from '@/lib/metadata';
import { CATALOG_URL, getCategoryUrl, getSubcategoryUrl } from '@/lib/routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Nuestros productos',
  description:
    'Catálogo completo de TRIALFERI: kéfir de leche, kéfires frutados, kéfir de agua, kombucha, chucrut, manteca de cerdo y mermeladas artesanales. Sin conservantes.',
  path: CATALOG_URL,
});

const MAX_PER_GROUP = 4;

/* Categoría → subcategorías con productos. Las subcategorías vacías no se muestran. */
const catalog = Object.values(ProductCategory).map((category) => {
  const groups = subcategoryDetails
    .filter((sub) => sub.category === category)
    .map((sub) => ({ sub, ...getSubcategorySummary(sub) }))
    .filter(({ count }) => count > 0);

  return {
    category,
    details: categoryDetails[category],
    groups,
    count: groups.reduce((total, group) => total + group.count, 0),
  };
});

export default function CatalogPage() {
  return (
    <div className='flex w-full flex-col gap-12 py-8 lg:gap-16 lg:py-12'>
      <header>
        <Stagger className='flex flex-col gap-4'>
          <Eyebrow>Catálogo</Eyebrow>

          <h1 className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'>
            Nuestros productos
          </h1>

          <nav aria-label='Categorías del catálogo' className='flex flex-wrap gap-2'>
            {catalog.map(({ category, details, count }) => (
              <a
                key={category}
                href={`#${category}`}
                className='rounded-full bg-papel-hueso px-4 py-2 text-sm font-semibold text-tinta-media transition-colors hover:border-tinta/25 hover:text-tinta'
              >
                {details.title} <span className='font-normal'>({count})</span>
              </a>
            ))}
          </nav>
        </Stagger>
      </header>

      {catalog.map(({ category, details, groups }) => (
        <section
          key={category}
          id={category}
          aria-labelledby={`${category}-titulo`}
          className='flex scroll-mt-24 flex-col gap-10'
        >
          <Reveal inView className='flex items-end justify-between gap-4 border-b border-papel-sombra pb-4'>
            <h2
              id={`${category}-titulo`}
              className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-4xl'
            >
              {details.title}
            </h2>

            <Link
              href={getCategoryUrl(category)}
              className='inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-tinta-media transition-colors hover:text-tinta'
            >
              Ver categoría
            </Link>
          </Reveal>

          {groups.map(({ sub, groups: productGroups, count, fromPrice }) => {
            const href = getSubcategoryUrl(sub.category, sub.slug);

            return (
              <div key={sub.slug} className='flex flex-col gap-5'>
                <div className='flex items-baseline justify-between gap-4'>
                  <div className='flex flex-col gap-0.5'>
                    <h3 className='font-display text-xl font-semibold tracking-tight text-tinta'>
                      <Link href={href} className='transition-colors hover:text-verde'>
                        {sub.title}
                      </Link>
                    </h3>
                    <p className='text-sm text-tinta-media'>Desde {formatPrice(fromPrice)}</p>
                  </div>

                  {count > MAX_PER_GROUP && (
                    <Link
                      href={href}
                      className='shrink-0 text-sm font-semibold text-tinta underline decoration-tinta/30 underline-offset-4 transition-colors hover:decoration-tinta'
                    >
                      Ver los {count}
                    </Link>
                  )}
                </div>

                <ProductGrid groups={productGroups.slice(0, MAX_PER_GROUP)} />
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
