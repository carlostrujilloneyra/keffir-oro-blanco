import { Categories } from '@/components/sections/Categories/Categories';
import { BestSellingProducts, HeroCarousel, MainSection, NewProductsSection } from './components';
import { TestimonialsSection } from '@/features/testimonials';
import { FaqSection } from '@/features/faqs';
import { CategoriesSection } from '@/components/sections/CategoriesSection/CategoriesSection';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <MainSection />
      {/* <Categories /> */}
      <CategoriesSection />
      <BestSellingProducts />
      <NewProductsSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
