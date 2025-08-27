import { Categories } from '@/components/sections/Categories/Categories';
import { BestSellingProducts, HeroCarousel, MainSection, NewProductsSection } from './components';
import { TestimonialsSection } from '@/features/testimonials';
import { FaqSection } from '@/features/faqs';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <MainSection />
      <Categories />
      <BestSellingProducts />
      <NewProductsSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
