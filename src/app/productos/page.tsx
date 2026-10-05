import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categoryDetails, getSubcategoryProducts, ProductCategory, subcategoryDetails } from '@/features/products';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { CATALOG_URL, getCategoryUrl, getSubcategoryUrl } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Nuestros productos',
  description:
    'Catálogo completo de TRIALFERI: kéfir de leche, kéfires frutados, kéfir de agua, kombucha, chucrut, manteca de cerdo y mermeladas artesanales. Sin conservantes.',
  alternates: { canonical: CATALOG_URL },
};

/* Categoría → subcategorías con productos. Las subcategorías vacías no se muestran. */
const catalog = Object.values(ProductCategory).map((category) => {
  const groups = subcategoryDetails
    .filter((sub) => sub.category === category)
    .map((sub) => ({ sub, products: getSubcategoryProducts(sub) }))
    .filter(({ products }) => products.length > 0);

  return {
    category,
    details: categoryDetails[category],
    groups,
    count: groups.reduce((total, { products }) => total + products.length, 0),
  };
});

export default function CatalogPage() {
  return (
    <div className='flex w-full flex-col gap-12 py-8 lg:gap-16 lg:py-12'>
      <header className='flex flex-col gap-4'>
        <Eyebrow>Catálogo</Eyebrow>

        <h1 className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'>
          Nuestros productos
        </h1>

        <nav aria-label='Categorías del catálogo' className='flex flex-wrap gap-2'>
          {catalog.map(({ category, details, count }) => (
            <a
              key={category}
              href={`#${category}`}
              className='rounded-full border border-papel-sombra bg-papel-hueso px-4 py-2 text-sm font-semibold text-tinta-media transition-colors hover:border-tinta/25 hover:text-tinta'
            >
              {details.title} <span className='font-normal'>({count})</span>
            </a>
          ))}
        </nav>
      </header>

      {catalog.map(({ category, details, groups }) => (
        <section
          key={category}
          id={category}
          aria-labelledby={`${category}-titulo`}
          className='flex scroll-mt-24 flex-col gap-10'
        >
          <div className='flex items-end justify-between gap-4 border-b border-papel-sombra pb-4'>
            <h2
              id={`${category}-titulo`}
              className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-4xl'
            >
              {details.title}
            </h2>

            <Link
              href={getCategoryUrl(category)}
              className='inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-tinta-media transition-colors hover:text-tinta'
            >
              Ver categoría
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>

          {groups.map(({ sub, products }) => (
            <div key={sub.slug} className='flex flex-col gap-5'>
              <h3 className='font-display text-xl font-semibold tracking-tight text-tinta'>
                <Link
                  href={getSubcategoryUrl(sub.category, sub.slug)}
                  className='group inline-flex items-center gap-1.5'
                >
                  {sub.title}
                  <ArrowUpRight className='h-4 w-4 text-tinta-suave transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                </Link>
              </h3>

              <ProductGrid products={products} />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
