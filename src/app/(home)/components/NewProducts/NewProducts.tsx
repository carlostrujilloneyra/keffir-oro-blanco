'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Carousel, Card } from '@/components/ui/AppleCardsCarousel/apple-cards-carousel';
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
import { newProducts } from '@/common/data/newProducts';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';

export const NewProducts = () => {
  const cards = newProducts.map(
    ({ name, isNew, title, imageSrc, imageAlt, description, hasDifferentOrder, linkUrl, bgImageSrc }, index) => {
      const cardContent = (
        <FeatureSection name={name}>
          <FeatureSectionContent className='grid-rows-none items-center gap-6 p-6 tablet:py-10 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-5'>
            <FeatureSectionImage className={cn('h-[280px] w-full lg:h-[480px]', hasDifferentOrder && 'lg:order-1')}>
              <Image
                className='object-contain lg:translate-y-12 lg:scale-125'
                sizes='(min-width: 1024px) 460px, 100vw'
                fill
                src={imageSrc}
                alt={imageAlt}
              />
            </FeatureSectionImage>

            <FeatureSectionInformation
              className={cn(
                'talbet:px-8 rounded-3xl bg-gray-800/30 px-6 py-8 text-center backdrop-blur-md tablet:py-6 lg:text-left',
              )}
            >
              <FeatureSectionTitle className='uppercase text-light-100' isNew={isNew}>
                {title}
              </FeatureSectionTitle>

              <FeatureSectionDescription className='text-center text-light-400 lg:text-justify'>
                {description}
              </FeatureSectionDescription>

              <FeatureSectionBottom className='mt-4 flex justify-center lg:justify-start'>
                <Button className='flex items-center gap-2 px-5 py-4 uppercase lg:px-6' theme='primary'>
                  {' '}
                  <Link href={linkUrl}>Descubrir el producto</Link>
                  <MoveRight className='h-5 w-5' />
                </Button>
              </FeatureSectionBottom>
            </FeatureSectionInformation>
          </FeatureSectionContent>
        </FeatureSection>
      );

      return (
        <Card
          key={name}
          card={{
            category: isNew ? 'Nuevo Producto' : 'Recomendado',
            title: title,
            src: bgImageSrc, // Imagen para la tarjeta CERRADA
            content: cardContent, // Tu FeatureSection para la tarjeta ABIERTA
          }}
          index={index}
        />
      );
    },
  );

  return <Carousel items={cards} />;
};
