import { HeroCarousel } from '@/app/(home)/components/HeroCarousel/HeroCarousel';
import { Categories } from '@/components/sections/Categories/Categories';
import { MainContent } from './components/MainContent/MainContent';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Categories />
      <MainContent />
    </>
  );
}
