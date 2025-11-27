import { notFound } from 'next/navigation';
import { allProducts } from '@/features/products/data/products';
import { Metadata } from 'next';
import { formatPrice } from '@/lib/formatPrice';
import { ProductCardPrice } from '@/features/products/components/ProductCard';
import { Badge } from '@/components/ui/Badge/badge';
import { ProductImageGallery } from '@/features/products/components/ProductImageGallery';
import { badgeConfig } from '@/features/products/data/badgeConfig';

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
    <div className='container mx-auto px-4 py-8'>
      <div className='grid gap-8 lg:grid-cols-2'>
        {/* Columna de imágenes con carrusel */}
        <div>
          <ProductImageGallery images={galleryImages} productTitle={product.title} />
        </div>

        {/* Columna de información */}
        <div className='space-y-6'>
          {/* Tags */}
          <div className='flex flex-wrap gap-2'>
            {product.isNew && <Badge variant='default'>Nuevo</Badge>}
            {product.tags?.map((tag) => {
              const config = badgeConfig[tag];
              if (!config) return null;

              return (
                <Badge key={tag} variant={config.variant} title={config.description}>
                  {config.label}
                </Badge>
              );
            })}
          </div>

          {/* Título */}
          <h1 className='text-3xl font-bold leading-[1] text-gray-900 lg:text-4xl'>{product.title}</h1>

          {/* Precio */}
          <div className='border-y border-gray-200 py-4'>
            <ProductCardPrice price={product.price} className='text-3xl font-bold text-gray-900 lg:text-4xl' />
          </div>

          {/* Presentaciones */}
          {product.presentations && product.presentations.length > 0 && (
            <div className='space-y-3'>
              <h3 className='text-xl font-semibold text-gray-900'>Presentaciones disponibles</h3>
              <div className='space-y-3'>
                {product.presentations.map((presentation) => (
                  <div
                    key={presentation.id}
                    className='flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:border-gray-300'
                  >
                    <span className='font-medium text-gray-700'>{presentation.name}</span>
                    {presentation.price && (
                      <span className='font-semibold text-gray-900'>S/ {formatPrice(presentation.price)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Descripción larga */}
          {product.longDescription && (
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold text-gray-900'>Descripción</h3>
              <div className='prose prose-sm max-w-none text-justify text-gray-600'>
                <p>{product.longDescription}</p>
              </div>
            </div>
          )}

          {/* Beneficios */}
          {product.benefits && product.benefits.length > 0 && (
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold text-gray-900'>Beneficios</h3>
              <ul className='space-y-2'>
                {product.benefits.map((benefit, index) => (
                  <li key={index} className='flex items-start gap-2 text-gray-600'>
                    <span className='mt-1 text-green-600'>✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
