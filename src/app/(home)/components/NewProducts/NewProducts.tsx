'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from '@/components/ui/AppleCardsCarousel/apple-cards-carousel'; // Solo necesitamos el Carousel aquí
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

import { newProducts } from '@/common/data/newProducts';
import { cn } from '@/lib/utils';

export const NewProducts = () => {
  const cardData = newProducts.map((product) => {
    const cardContent = (
      <FeatureSection name={product.name}>
        <FeatureSectionContent className='grid-rows-none items-center gap-6 p-6 tablet:py-10 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-5'>
          <FeatureSectionImage
            className={cn('h-[280px] w-full lg:h-[480px]', product.hasDifferentOrder && 'lg:order-1')}
          >
            <Image
              className='object-contain lg:translate-y-12 lg:scale-125'
              sizes='(min-width: 1024px) 460px, 100vw'
              fill
              src={product.imageSrc}
              alt={product.imageAlt}
            />
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
              {product.description}
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

    return {
      category: product.isNew ? 'Nuevo Producto' : 'Recomendado',
      title: product.title,
      src: product.bgImageSrc, // Imagen para la tarjeta CERRADA
      content: cardContent, // Tu FeatureSection para la tarjeta ABIERTA
    };
  });

  // 2. RENDERIZAMOS EL CAROUSEL
  //    Le pasamos la DATA cruda, no los componentes ya renderizados.
  return (
    <section>
      <Carousel data={cardData} />
    </section>
  );
};
