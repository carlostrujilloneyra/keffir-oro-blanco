import fs from 'node:fs';
import path from 'node:path';
import {
  getAvailableFromPrice,
  getProductBaseTitle,
  getProductById,
  getProductGroups,
  getProductImage,
  getProductShortName,
  getProductUrlById,
  getSizeVariants,
  subcategoryDetails,
  type Product,
} from '@/features/products';
import { formatPrice } from '@/lib/formatPrice';
import { getSubcategoryUrl } from '@/lib/routes';
import type { HeroImage as HeroPhotoSource, HeroSlide, HeroVideo } from '../data/heroSlides';

/* Solo servidor: usa fs para saber qué fotos existen en public/. */

export type HeroImage = { src: string; alt: string };

type SlideCopy = Pick<HeroSlide, 'tone' | 'eyebrow' | 'headline' | 'description' | 'ctaLabel'>;

export type ResolvedHeroSlide = SlideCopy & {
  id: string;
  flavor: string;
  url: string;
  cardLinkLabel: string;
  priceLabel: string;
  /* Fallback sin foto: las botellas, en el orden de los productos. */
  bottles: HeroImage[];
  photo?: HeroImage & Pick<HeroPhotoSource, 'backdrop' | 'glow' | 'focus'>;
  video?: HeroVideo;
  /* Mini-card: recorte de la foto del slide o, sin foto, la botella. */
  thumbnail: HeroImage & { fit: 'cover' | 'contain'; position?: string };
};

/* Lo que aporta el producto o la colección; el resto del slide es copy. */
type SlideTarget = Pick<ResolvedHeroSlide, 'id' | 'flavor' | 'url' | 'cardLinkLabel' | 'priceLabel'> & {
  title: string;
  products: Product[];
};

/* Un cuadrado de una foto 3:2 no llega a centrar un producto que está al 75%: se pega a la derecha. */
const THUMBNAIL_POSITION = 'right center';

const isVisible = (slide: HeroSlide) => !slide.draft || process.env.NODE_ENV !== 'production';

/* Se evalúa en build: dejar la foto en public/ basta para que aparezca en el siguiente. */
const existsInPublic = (src: string) => fs.existsSync(path.join(process.cwd(), 'public', src));

const toImage = (product: Product): HeroImage => ({ src: getProductImage(product), alt: getProductBaseTitle(product) });

/* getProductById lanza si el id no existe: un slide roto rompe el build, no la web. */
const productTarget = (productId: string): SlideTarget => {
  const product = getProductById(productId);
  const [{ fromPrice, sizes }] = getProductGroups(getSizeVariants(product));

  return {
    id: productId,
    flavor: getProductShortName(product),
    title: getProductBaseTitle(product),
    url: getProductUrlById(productId),
    cardLinkLabel: 'Ver producto',
    priceLabel: sizes > 1 ? `Desde ${formatPrice(fromPrice)}` : formatPrice(product.price),
    products: [product],
  };
};

const collectionTarget = (productIds: string[], slug: string, flavor: string): SlideTarget => {
  const products = productIds.map(getProductById);
  const subcategory = subcategoryDetails.find((s) => s.slug === slug);
  if (!subcategory) throw new Error(`Hero: subcategoría no encontrada: "${slug}"`);
  const fromPrice = getAvailableFromPrice(products);

  return {
    id: slug,
    flavor,
    title: subcategory.title,
    url: getSubcategoryUrl(subcategory.category, subcategory.slug),
    cardLinkLabel: 'Ver opciones',
    priceLabel: fromPrice !== undefined ? `Desde ${formatPrice(fromPrice)}` : 'Próximamente',
    products,
  };
};

const resolveSlide = (slide: HeroSlide): ResolvedHeroSlide => {
  const { title, products, ...target } =
    slide.kind === 'product'
      ? productTarget(slide.productId)
      : collectionTarget(slide.productIds, slide.subcategory, slide.flavor);
  const { tone, eyebrow, headline, description, ctaLabel, image, video } = slide;

  const bottles = products.map(toImage);
  const photo = image && existsInPublic(image.src) ? { ...image, alt: title } : undefined;

  return {
    ...target,
    tone,
    eyebrow,
    headline,
    description,
    ctaLabel,
    bottles,
    photo,
    video: video && [video.mp4, video.webm, video.poster].every(existsInPublic) ? video : undefined,
    thumbnail: photo ? { ...photo, fit: 'cover', position: THUMBNAIL_POSITION } : { ...bottles[0], fit: 'contain' },
  };
};

export const resolveHeroSlides = (slides: HeroSlide[]): ResolvedHeroSlide[] =>
  slides.filter(isVisible).map(resolveSlide);
