'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Carousel } from '@/components/ui/AppleCardsCarousel/apple-cards-carousel';
import {
  FeatureSection,
  FeatureSectionBottom,
  FeatureSectionContent,
  FeatureSectionDescription,
  FeatureSectionImage,
  FeatureSectionInformation,
  FeatureSectionTitle,
} from '@/components/ui/FeatureSection/FeatureSection';
import { Button } from '@/components/ui/Button/Button';
import { MoveRight } from 'lucide-react';

import { allProducts, type Product } from '@/features/products';
import { cn } from '@/lib/utils';

// --- COMPONENTE PRINCIPAL ---
export const NewProducts = () => {
  // --- 👇 CAMBIO #2: Filtramos la data para obtener solo los productos que queremos mostrar 👇 ---
  // Ahora esta sección es dinámica. Si quitas el tag 'new' de un producto, desaparecerá de aquí.
  const newProductsToShow = allProducts.filter((p) => p.tags?.includes('new'));

  // --- 👇 CAMBIO #3: Mapeamos sobre la lista filtrada y usamos los nuevos nombres de props 👇 ---
  const cardData = newProductsToShow.map((product: Product) => {
    const cardContent = (
      <FeatureSection name={product.name}>
        <FeatureSectionContent className='grid-rows-none items-center gap-6 p-6 tablet:py-10 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-5'>
          <FeatureSectionImage
            className={cn('h-[280px] w-full lg:h-[480px]', product.hasDifferentOrder && 'lg:order-1')}
          >
            {product.featuredImage && (
              <Image
                className='object-contain lg:translate-y-12 lg:scale-125'
                sizes='(min-width: 600px) 460px, 400px'
                fill
                src={product.featuredImage}
                alt={product.title}
              />
            )}
          </FeatureSectionImage>

          <FeatureSectionInformation
            className={cn(
              'rounded-3xl bg-gray-800/30 px-6 py-8 text-center backdrop-blur-md tablet:px-8 tablet:py-6 lg:text-left',
            )}
          >
            <FeatureSectionTitle className='uppercase text-light-100' isNew={product.isNew}>
              {product.title}
            </FeatureSectionTitle>

            <FeatureSectionDescription className='text-center text-light-400 lg:text-justify'>
              {product.longDescription} {/* Antes: description, AHORA: longDescription */}
            </FeatureSectionDescription>

            <FeatureSectionBottom className='mt-4 lg:justify-start'>
              <Button asChild className='flex items-center gap-2 px-5 py-4 uppercase lg:px-6' theme='primary'>
                <Link href={product.linkUrl}>
                  Descubrir el producto
                  <MoveRight className='h-5 w-5' />
                </Link>
              </Button>
            </FeatureSectionBottom>
          </FeatureSectionInformation>
        </FeatureSectionContent>
      </FeatureSection>
    );

    // Los datos para la tarjeta cerrada (vista del carrusel)
    return {
      category: product.isNew ? 'Nuevo Producto' : product.category,
      title: product.title,
      src: product.bgImageSrc ?? '/assets/images/placeholder.webp', // Imagen para el fondo de la tarjeta CERRADA
      content: cardContent, // Tu FeatureSection para la tarjeta ABIERTA
    };
  });

  // Renderizamos el carrusel pasándole la data ya preparada
  return (
    <section>
      <Carousel data={cardData} />
    </section>
  );
};
