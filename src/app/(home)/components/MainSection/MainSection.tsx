import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid/bento-grid';
import { Button } from '@/components/ui/Button/Button';
import {
  FeatureSection,
  FeatureSectionBottom,
  FeatureSectionContent,
  FeatureSectionInformation,
  FeatureSectionTitle,
} from '@/components/ui/FeatureSection/FeatureSection';
import Link from 'next/link';

export const MainSection = () => {
  return (
    <section className='grid gap-4 lg:grid-cols-2'>
      {/* <BentoGrid className='mx-auto max-w-7xl md:grid-cols-3'>
        <BentoGridItem className='tablet:col-span-2'></BentoGridItem>
      </BentoGrid> */}

      <div className='grid gap-6 lg:grid-rows-2'>
        <FeatureSection name='kefi-section'>
          <FeatureSectionContent>
            <FeatureSectionInformation>
              <FeatureSectionTitle>Descubre si el kéfir es para ti</FeatureSectionTitle>

              <FeatureSectionBottom>
                <Button theme='primary'>
                  <Link href={'aua'}>Ver productos</Link>
                </Button>
              </FeatureSectionBottom>
            </FeatureSectionInformation>
          </FeatureSectionContent>
        </FeatureSection>
      </div>

      <div></div>
    </section>
  );
};
