import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inlineMarkdown } from '@/lib/inlineMarkdown';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { categoryDetails, ProductCategory } from '@/features/products';
import { getCategoryUrl } from '@/lib/routes';
import { Button, type ButtonVariant } from '@/components/ui/Button/Button';

type Tone = (typeof categoryDetails)[ProductCategory]['tone'];

interface CategoryThemeStyle {
  gradient: string;
  halo: string;
  button: ButtonVariant;
}

const toneStyles: Record<Tone, CategoryThemeStyle> = {
  verde: {
    // base tinta + glows verdes en esquinas opuestas + veladura negra.
    gradient:
      'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),' +
      'radial-gradient(80% 130% at 100% 0%, rgba(47,125,82,0.55), rgba(47,125,82,0.28) 34%, rgba(22,32,26,0) 76%),' +
      'radial-gradient(85% 150% at 0% 100%, rgba(47,125,82,0.40), rgba(30,58,47,0.22) 42%, rgba(22,32,26,0) 82%),' +
      '#16201A',
    halo: 'bg-verde/40',
    button: 'light',
  },
  miel: {
    // base tinta + glows miel en esquinas opuestas + veladura negra.
    gradient:
      'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),' +
      'radial-gradient(80% 130% at 100% 0%, rgba(242,183,5,0.45), rgba(242,183,5,0.24) 34%, rgba(22,32,26,0) 76%),' +
      'radial-gradient(85% 150% at 0% 100%, rgba(201,134,14,0.38), rgba(201,134,14,0.20) 42%, rgba(22,32,26,0) 82%),' +
      '#16201A',
    halo: 'bg-miel/30',
    button: 'miel',
  },
};

/* Solo lo propio de la home (sello). Texto, imagen y tono vienen de categoryDetails. */
const homeExtras: Record<ProductCategory, { tag: string; tagIcon: LucideIcon }> = {
  [ProductCategory.PROBIOTICOS]: { tag: 'Alto en probióticos', tagIcon: Sparkles },
  [ProductCategory.TRADICIONALES]: { tag: '100% artesanal', tagIcon: Leaf },
};

const categories = Object.values(ProductCategory).map((category) => ({
  ...categoryDetails[category],
  ...homeExtras[category],
}));

export const CategoriesSection = () => {
  return (
    <section aria-labelledby='categorias-titulo' className='w-full py-8 lg:py-10'>
      <div className='mb-10 flex flex-col gap-2 lg:mb-12'>
        <Eyebrow>Explora por categoría</Eyebrow>

        <h2
          id='categorias-titulo'
          className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'
        >
          Dos mundos, un mismo cuidado
        </h2>
      </div>

      {/* Las categorías son un conjunto de hermanas equivalentes → lista. */}
      <ul className='grid gap-5 tablet:gap-6 lg:grid-cols-2'>
        {categories.map((cat) => {
          const t = toneStyles[cat.tone];
          const TagIcon = cat.tagIcon;

          return (
            <li
              key={cat.slug}
              style={{ background: t.gradient }}
              className='group relative flex flex-col overflow-hidden rounded-panel'
            >
              {/* Imagen con halo de fermento (más grande en desktop) */}
              <div className='relative h-80 overflow-hidden tablet:h-[360px] lg:h-[480px]'>
                <div
                  className={cn(
                    'absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-transform duration-500 ease-out group-hover:scale-110',
                    t.halo,
                  )}
                />
                <Image
                  src={cat.imageUrl}
                  alt={cat.imageAlt}
                  fill
                  sizes='(min-width: 1024px) 45vw, 92vw'
                  className='object-contain p-6 pt-20 transition-transform duration-500 ease-out group-hover:scale-105'
                />

                {/* Sello glass */}
                <span className='absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-papel shadow-sm backdrop-blur-md'>
                  <TagIcon className='h-3.5 w-3.5' />
                  {cat.tag}
                </span>
              </div>

              {/* Contenido */}
              <div className='flex flex-1 flex-col gap-4 px-6 py-8 lg:p-10'>
                <Eyebrow variant='light'>{cat.eyebrow}</Eyebrow>

                <h3 className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-papel lg:text-[40px]'>
                  {cat.title}
                </h3>

                <p className='mb-2 max-w-prose text-sm leading-relaxed text-papel/85 md:text-justify md:text-[17px]'>
                  {inlineMarkdown(cat.description)}
                </p>

                {/* mt-auto: el botón va al fondo, así queda alineado entre cards aunque el texto mida distinto. */}
                <Button asChild variant={t.button} className='mt-auto'>
                  <Link href={getCategoryUrl(cat.slug)}>Ver categoría</Link>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
