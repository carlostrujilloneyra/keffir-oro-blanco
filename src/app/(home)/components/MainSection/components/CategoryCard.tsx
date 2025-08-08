import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/Button/Button';
import {
  FeatureSection,
  FeatureSectionBottom,
  FeatureSectionContent,
  FeatureSectionImage,
  FeatureSectionInformation,
  FeatureSectionTitle,
} from '@/components/ui/FeatureSection/FeatureSection';

interface CategoryCardProps {
  imageAlt: string;
  imageSrc: string;
  linkUrl: string;
  name: string;
  title: string;
}

export const CategoryCard = ({ imageAlt, imageSrc, linkUrl, name, title }: CategoryCardProps) => {
  return (
    <FeatureSection
      className='rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-3 hover:translate-x-5'
      name={name}
    >
      <FeatureSectionContent className='hover:shadow-strong gap-8 px-8 py-10 transition-all duration-300 ease-in-out hover:rounded-xl tablet:grid-cols-[300px_1fr] lg:gap-2 lg:py-6 xl:grid-cols-[320px_1fr]'>
        <FeatureSectionInformation className='gap-5 transition-all duration-300 ease-in-out group-hover:translate-x-3 lg:gap-6'>
          <FeatureSectionTitle className='text-center font-semibold text-light-300 tablet:text-start lg:text-[32px] xl:text-[34px]'>
            {title}
          </FeatureSectionTitle>

          <FeatureSectionBottom className='flex justify-center tablet:justify-start'>
            <Button className='flex items-center gap-2 px-5 py-4 uppercase tablet:px-6' theme='primary'>
              <Link href={linkUrl}>Ver productos</Link>
              <ExternalLink className='h-5 w-5' />
            </Button>
          </FeatureSectionBottom>
        </FeatureSectionInformation>

        <FeatureSectionImage className='h-80 w-full lg:h-[240px]'>
          <Image
            className='object-contain lg:translate-x-12 lg:translate-y-6 lg:scale-[1.3]'
            sizes='(min-width:600px) 400px, 100vw'
            fill
            src={imageSrc}
            alt={imageAlt}
          />
        </FeatureSectionImage>
      </FeatureSectionContent>
    </FeatureSection>
  );
};
