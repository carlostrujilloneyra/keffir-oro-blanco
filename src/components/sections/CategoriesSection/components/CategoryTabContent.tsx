import {
  FeatureSection,
  FeatureSectionContent,
  FeatureSectionImage,
  FeatureSectionInformation,
} from '@/components/ui/FeatureSection/FeatureSection';

interface CategoryTabContentProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export const CategoryTabContent = ({ title, description, imageUrl, linkUrl }: CategoryTabContentProps) => {
  return (
    <FeatureSection name='category' asChild>
      <article>
        <FeatureSectionContent>
          <FeatureSectionImage>{/* Aquí irá la imagen */}</FeatureSectionImage>

          <FeatureSectionInformation></FeatureSectionInformation>
        </FeatureSectionContent>
      </article>
    </FeatureSection>
  );
};
