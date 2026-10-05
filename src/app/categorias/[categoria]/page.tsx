import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  allProducts,
  categoryDetails,
  getSubcategoryProducts,
  isProductCategory,
  ProductCategory,
  subcategoryDetails,
} from '@/features/products';
import { ValuesBento } from '@/components/sections/ValuesBento/ValuesBento';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/jsonLd';
import { stripInlineMarkdown } from '@/lib/inlineMarkdown';
import { CategoryHero } from './_components/CategoryHero';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { getCategoryUrl, getSubcategoryUrl } from '@/lib/routes';

type Params = { categoria: string };

export function generateStaticParams(): Params[] {
  return Object.values(ProductCategory).map((categoria) => ({ categoria }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const { categoria } = params;
  if (!isProductCategory(categoria)) return {};

  const details = categoryDetails[categoria];

  return {
    title: details.title,
    description: stripInlineMarkdown(details.description),
    alternates: { canonical: getCategoryUrl(details.slug) },
  };
}

export default function CategoriaPage({ params }: { params: Params }) {
  const { categoria } = params;
  if (!isProductCategory(categoria)) notFound();

  const details = categoryDetails[categoria];
  const products = allProducts.filter((product) => product.category === categoria);

  /* Accesos del hero: cada subcategoría con su precio más bajo ("desde"). */
  const shortcuts = subcategoryDetails
    .filter((sub) => sub.category === categoria)
    .map((sub) => ({ sub, prices: getSubcategoryProducts(sub).map((product) => product.price) }))
    .filter(({ prices }) => prices.length > 0)
    .map(({ sub, prices }) => ({
      label: sub.title,
      href: getSubcategoryUrl(sub.category, sub.slug),
      fromPrice: Math.min(...prices),
    }));

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
        count={products.length}
        tone={details.tone}
        shortcuts={shortcuts}
      />

      <section aria-label={`Productos de ${details.title}`} className='w-full bg-papel py-8 md:py-12'>
        <div>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className='rounded-card bg-papel-hueso p-10 text-center'>
              <p className='text-tinta-media'>Pronto tendremos productos en esta categoría.</p>
            </div>
          )}
        </div>
      </section>

      <ValuesBento />
    </>
  );
}
