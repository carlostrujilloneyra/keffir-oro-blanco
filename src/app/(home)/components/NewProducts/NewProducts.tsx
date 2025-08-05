'use client';

import Image from 'next/image';
import Link from 'next/link';
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
import clsx from 'clsx';

export const NewProducts = () => {
  return (
    <div className='flex flex-col gap-6 tablet:gap-9 lg:gap-12'>
      {newProducts.map(({ name, isNew, title, imageSrc, imageAlt, hasDifferentOrder, description, linkUrl }, idx) => {
        return (
          <FeatureSection name={name} key={idx}>
            <FeatureSectionContent className='grid-rows-[280px_1fr] gap-6 lg:gap-0'>
              <FeatureSectionImage
                className={clsx(
                  'h-[280px] w-[340px] lg:h-[450px] lg:w-[420px] lg:translate-y-12',
                  hasDifferentOrder && 'lg:order-1',
                )}
              >
                <Image
                  className='object-contain transition-transform duration-300 lg:scale-[1.2]'
                  sizes='(min-width: 600px) 420px, 340px'
                  fill
                  src={imageSrc}
                  alt={imageAlt}
                />
              </FeatureSectionImage>

              <FeatureSectionInformation className='text-center lg:text-start'>
                <FeatureSectionTitle className='text-light-100' isNew={isNew}>
                  {title}
                </FeatureSectionTitle>

                <FeatureSectionDescription className='text-center text-light-200 lg:text-justify'>
                  {description}
                </FeatureSectionDescription>

                <FeatureSectionBottom className='mt-3 lg:mt-2'>
                  <Button className='uppercase' theme='primary'>
                    <Link href={linkUrl}>Más información</Link>
                  </Button>
                </FeatureSectionBottom>
              </FeatureSectionInformation>
            </FeatureSectionContent>
          </FeatureSection>
        );
      })}
    </div>
  );
};
