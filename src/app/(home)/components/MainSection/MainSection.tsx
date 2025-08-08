/* import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid/bento-grid'; */
import { Button } from '@/components/ui/Button/Button';
import {
  FeatureSection,
  FeatureSectionBottom,
  FeatureSectionContent,
  FeatureSectionImage,
  FeatureSectionInformation,
  FeatureSectionTitle,
} from '@/components/ui/FeatureSection/FeatureSection';
import Image from 'next/image';
import Link from 'next/link';

export const MainSection = () => {
  return (
    <section className='grid gap-4 p-6 tablet:px-10 lg:grid-cols-[1fr_0.8fr] lg:gap-3 lg:px-18'>
      {/* <BentoGrid className='mx-auto max-w-7xl md:grid-cols-3'>
        <BentoGridItem className='tablet:col-span-2'></BentoGridItem>
      </BentoGrid> */}

      <div className='grid gap-6 lg:grid-rows-[360px_360px]'>
        <FeatureSection name='lacteos-section'>
          <FeatureSectionContent className='lg:grid-cols-[320px_1fr]'>
            <FeatureSectionInformation>
              <FeatureSectionTitle className='lg:text-4xl'>
                Del campo a tu mesa: lácteos frescos y artesanales
              </FeatureSectionTitle>

              <FeatureSectionBottom>
                <Button theme='primary'>
                  <Link href={'aua'}>Ver productos</Link>
                </Button>
              </FeatureSectionBottom>
            </FeatureSectionInformation>

            <FeatureSectionImage className='h-[280px] w-full lg:h-[320px]'>
              <Image className='object-contain' sizes='(min-width:600px) 400px, 100vw' fill src={''} alt='aua' />
            </FeatureSectionImage>
          </FeatureSectionContent>
        </FeatureSection>

        <FeatureSection name='kefir-section'>
          <FeatureSectionContent>
            <FeatureSectionInformation>
              <FeatureSectionTitle className='lg:text-4xl'>Descubre si el Kéfir es para ti</FeatureSectionTitle>

              <FeatureSectionBottom>
                <Button theme='primary'>
                  <Link href={'aua'}>Ver productos</Link>
                </Button>
              </FeatureSectionBottom>
            </FeatureSectionInformation>

            <FeatureSectionImage className='h-[280px] w-full lg:h-[320px]'>
              <Image className='object-contain' sizes='(min-width:600px) 400px, 100vw' fill src={''} alt='aua' />
            </FeatureSectionImage>
          </FeatureSectionContent>
        </FeatureSection>
      </div>

      {/* Contenedor para dos cards: Mantequilla, Chucrut */}
      <div className='grid grid-rows-2 gap-3 tablet:grid-cols-2'></div>
    </section>
  );
};
