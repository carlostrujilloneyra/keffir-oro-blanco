import { HeroCarousel } from '@/app/(home)/components/HeroCarousel/HeroCarousel';
import { Categories } from '@/components/sections/Categories/Categories';
import { MainContent } from './components/MainContent/MainContent';
import { MainSection } from './components/MainSection/MainSection';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <MainSection />
      <Categories />
      <MainContent />
    </>
  );
}
