import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProducts, categoryDetails, isProductCategory, ProductCategory } from '@/features/products';
import { ValuesBento } from '@/components/sections/ValuesBento/ValuesBento';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/jsonLd';
import { stripInlineMarkdown } from '@/lib/inlineMarkdown';
import { CategoryHero } from './_components/CategoryHero';
import { ProductGrid } from './_components/ProductGrid';

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
    alternates: { canonical: `/categorias/${details.slug}` },
  };
}

export default function CategoriaPage({ params }: { params: Params }) {
  const { categoria } = params;
  if (!isProductCategory(categoria)) notFound();

  const details = categoryDetails[categoria];
  const products = allProducts.filter((product) => product.category === categoria);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Inicio', path: '/' },
    { name: details.title, path: `/categorias/${details.slug}` },
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
      />

      <section aria-label={`Productos de ${details.title}`} className='w-full bg-papel py-8 md:py-12'>
        <div>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className='rounded-[22px] border border-papel-sombra/60 bg-papel-hueso p-10 text-center'>
              <p className='text-tinta-media'>Pronto tendremos productos en esta categoría.</p>
            </div>
          )}
        </div>
      </section>

      <ValuesBento />
    </>
  );
}
