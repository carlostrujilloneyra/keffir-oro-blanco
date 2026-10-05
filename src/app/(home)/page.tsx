import type { Metadata } from 'next';
import { BestSellingProducts, HeroCarousel, MainSection } from './components';
import { TestimonialsSection } from '@/features/testimonials';
import { FaqSection } from '@/features/faqs';
import { CategoriesSection } from '@/components/sections/CategoriesSection/CategoriesSection';
import { JsonLd } from '@/components/JsonLd';
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonLd';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  /**
   *? Remover la sección de NewProductSection?
   */
  return (
    <>
      {/* Identidad de marca para Google (logo y nombre en los resultados). */}
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      <h1 className='sr-only'>TRIALFERI — Kéfir artesanal y fermentos vivos del Perú</h1>

      <HeroCarousel />
      <CategoriesSection />
      <MainSection />
      <BestSellingProducts />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
