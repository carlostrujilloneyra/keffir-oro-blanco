import { HeroShowcaseCarousel } from './HeroShowcaseCarousel';
import { heroSlides } from './data/heroSlides';
import { resolveHeroSlides } from './lib/resolveHeroSlides';

/* Server Component: valida productos, oculta borradores y comprueba fotos; el carrusel recibe datos listos. */
export const HeroShowcase = () => <HeroShowcaseCarousel slides={resolveHeroSlides(heroSlides)} />;
