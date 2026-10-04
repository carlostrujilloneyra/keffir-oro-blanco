import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProducts, categoryDetails, ProductCategory } from '@/features/products';
import { ValuesBento } from '@/components/sections/ValuesBento/ValuesBento';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/jsonLd';
import { CategoryHero } from './_components/CategoryHero';
import { ProductGrid } from './_components/ProductGrid';

type Params = { categoria: string };

type CategoryDetail = (typeof categoryDetails)[ProductCategory];

/*
  Resuelve el slug de la URL (probioticos | tradicionales) a la categoría del
  catálogo. Ojo: el value del enum no siempre coincide con el slug
  (ProductCategory.TRADICIONALES = 'otros'), por eso se busca por `.slug`.
*/
const resolveCategory = (slug: string): { category: ProductCategory; details: CategoryDetail } | null => {
  const entry = Object.entries(categoryDetails).find(([, detail]) => detail.slug === slug);
  if (!entry) return null;

  const [category, details] = entry;
  return { category: category as ProductCategory, details };
};

export function generateStaticParams(): Params[] {
  return Object.values(categoryDetails).map((detail) => ({ categoria: detail.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const resolved = resolveCategory(params.categoria);
  if (!resolved) return {};

  const { details } = resolved;
  return {
    title: details.title,
    description: details.description,
    /*
      Obligatorio: sin esto se hereda el canonical '/' del layout raíz. Se usa
      details.slug (no params.categoria) para fijar la forma canónica de la URL.
    */
    alternates: { canonical: `/categorias/${details.slug}` },
  };
}

export default function CategoriaPage({ params }: { params: Params }) {
  const resolved = resolveCategory(params.categoria);
  if (!resolved) notFound();

  const { category, details } = resolved;
  const products = allProducts.filter((product) => product.category === category);

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
