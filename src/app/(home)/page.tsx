import { Categories } from '@/components/sections/Categories/Categories';
import { BestSellingProducts, HeroCarousel, MainSection, NewProductsSection } from './components';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <MainSection />
      <Categories />
      <BestSellingProducts />
      <NewProductsSection />
    </>
  );
}
