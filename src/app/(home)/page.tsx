import { Categories } from '@/components/sections/Categories/Categories';
import { HeroCarousel, MainSection, NewProductsSection } from './components';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <MainSection />
      <Categories />
      <NewProductsSection />
    </>
  );
}
