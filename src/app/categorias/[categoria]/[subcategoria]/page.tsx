import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  categoryDetails,
  getSubcategoryImage,
  getSubcategoryProducts,
  getSubcategoryUrl,
  resolveSubcategory,
  subcategoryDetails,
} from '@/features/products';
import { ValuesBento } from '@/components/sections/ValuesBento/ValuesBento';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/jsonLd';
import { CategoryHero } from '../_components/CategoryHero';
import { ProductGrid } from '../_components/ProductGrid';

type Params = { categoria: string; subcategoria: string };

export function generateStaticParams(): Params[] {
  return subcategoryDetails.map((sub) => ({
    categoria: categoryDetails[sub.category].slug,
    subcategoria: sub.slug,
  }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const sub = resolveSubcategory(params.categoria, params.subcategoria);
  if (!sub) return {};

  return {
    title: sub.title,
    description: sub.description,
    alternates: { canonical: getSubcategoryUrl(sub) },
  };
}

export default function SubcategoriaPage({ params }: { params: Params }) {
  const sub = resolveSubcategory(params.categoria, params.subcategoria);
  if (!sub) notFound();

  const parent = categoryDetails[sub.category];
  const products = getSubcategoryProducts(sub);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Inicio', path: '/' },
    { name: parent.title, path: `/categorias/${parent.slug}` },
    { name: sub.title, path: getSubcategoryUrl(sub) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <CategoryHero
        title={sub.title}
        eyebrow={sub.eyebrow}
        description={sub.description}
        imageUrl={getSubcategoryImage(sub)}
        count={products.length}
        tone={sub.tone}
        parent={{ title: parent.title, href: `/categorias/${parent.slug}` }}
      />

      <section aria-label={`Productos de ${sub.title}`} className='w-full bg-papel py-8 md:py-12'>
        <div>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className='rounded-[22px] border border-papel-sombra/60 bg-papel-hueso p-10 text-center'>
              <p className='text-tinta-media'>Pronto tendremos productos en esta subcategoría.</p>
            </div>
          )}
        </div>
      </section>

      <ValuesBento />
    </>
  );
}
