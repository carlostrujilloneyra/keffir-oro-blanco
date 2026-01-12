import { notFound } from 'next/navigation';
import { allProducts } from '@/features/products/data/products';
import { Metadata } from 'next';
import { ProductCardPrice } from '@/features/products/components/ProductCard';
import { ProductImageGallery } from '@/features/products/components/ProductImageGallery/ProductImageGallery';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';
import { Benefits, Presentations, ProductTags, UsageInstructions, ShelfLife } from './_components';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = allProducts.find((p) => p.slug === params.productId);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.title} | Productos Naturales`,
    description: product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [product.featuredImage || product.thumbnailImage],
    },
  };
}

// Generar rutas estáticas en build time
export async function generateStaticParams() {
  return allProducts.map((product) => ({
    productId: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = allProducts.find((p) => p.slug === params.productId);

  if (!product) {
    notFound();
  }

  // Preparar array de imágenes para la galería
  const galleryImages = [product.featuredImage || product.thumbnailImage, ...(product.galleryImages || [])].filter(
    Boolean,
  );

  return (
    <section className='container mx-auto px-6 py-8 tablet:p-10 lg:p-18'>
      <div className='grid gap-8 lg:grid-cols-2'>
        {/* Columna de imágenes con carrusel */}
        <div>
          <ProductImageGallery images={galleryImages} productTitle={product.title} />
        </div>

        <div className='flex flex-col gap-5'>
          <ProductTags isNew={product.isNew} tags={product.tags} />

          <div className='flex flex-col gap-3 tablet:gap-5'>
            <h1 className='text-[28px] font-bold leading-[1] text-gray-900 lg:text-4xl'>{product.title}</h1>

            <ProductCardPrice
              price={product.price}
              className='inline-block text-xl font-bold text-gray-700 lg:text-3xl'
            />

            <Accordion type='single' collapsible defaultValue='description'>
              {/* Descripción */}
              {product.longDescription && (
                <AccordionItem value='description' className='w-full'>
                  <AccordionTrigger className='text-base font-semibold text-gray-800 hover:no-underline tablet:text-[18px]'>
                    Descripción
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className='flex flex-col gap-3 text-justify text-sm text-gray-600 tablet:gap-4 tablet:text-base'>
                      {product.longDescription}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <Presentations presentations={product.presentations || []} />

              <Benefits benefits={product.benefits || []} />

              <UsageInstructions howToUse={product.howToUse || ''} />

              <ShelfLife shelfLife={product.shelfLife || ''} />
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
