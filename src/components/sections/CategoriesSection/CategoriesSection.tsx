import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Leaf, Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inlineMarkdown } from '@/lib/inlineMarkdown';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { categoryDetails, ProductCategory } from '@/features/products';

type Tone = (typeof categoryDetails)[ProductCategory]['tone'];

interface CategoryThemeStyle {
  gradient: string;
  dot: string;
  halo: string;
  button: string;
}

const toneStyles: Record<Tone, CategoryThemeStyle> = {
  verde: {
    // base tinta + glows verdes en esquinas opuestas + veladura negra.
    gradient:
      'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),' +
      'radial-gradient(80% 130% at 100% 0%, rgba(47,125,82,0.55), rgba(47,125,82,0.28) 34%, rgba(22,32,26,0) 76%),' +
      'radial-gradient(85% 150% at 0% 100%, rgba(47,125,82,0.40), rgba(30,58,47,0.22) 42%, rgba(22,32,26,0) 82%),' +
      '#16201A',
    dot: 'bg-miel',
    halo: 'bg-verde/40',
    button: 'bg-papel text-bosque hover:bg-papel/90',
  },
  miel: {
    // base tinta + glows miel en esquinas opuestas + veladura negra.
    gradient:
      'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),' +
      'radial-gradient(80% 130% at 100% 0%, rgba(242,183,5,0.45), rgba(242,183,5,0.24) 34%, rgba(22,32,26,0) 76%),' +
      'radial-gradient(85% 150% at 0% 100%, rgba(201,134,14,0.38), rgba(201,134,14,0.20) 42%, rgba(22,32,26,0) 82%),' +
      '#16201A',
    dot: 'bg-miel',
    halo: 'bg-miel/30',
    button: 'bg-gradient-miel text-tinta hover:brightness-110',
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
        <Eyebrow className='text-xs tracking-[0.18em]' dotClassName='h-2 w-2'>
          Explora por categoría
        </Eyebrow>

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
              className='group relative flex flex-col overflow-hidden rounded-[28px] transition-transform duration-300 ease-out hover:-translate-y-1'
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
                <span className='absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-papel shadow-sm backdrop-blur-md'>
                  <TagIcon className='h-3.5 w-3.5' />
                  {cat.tag}
                </span>
              </div>

              {/* Contenido */}
              <div className='flex flex-1 flex-col gap-4 px-6 py-8 lg:p-10'>
                <span className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-papel'>
                  <span className={cn('h-2 w-2 rounded-full', t.dot)} />
                  {cat.eyebrow}
                </span>

                <h3 className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-papel lg:text-[40px]'>
                  {cat.title}
                </h3>

                <p className='max-w-prose text-sm leading-relaxed text-papel/85 md:text-justify md:text-[17px]'>
                  {inlineMarkdown(cat.description)}
                </p>

                <Link
                  href={`/categorias/${cat.slug}`}
                  className={cn(
                    'mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-200 ease-out active:scale-[0.98]',
                    t.button,
                  )}
                >
                  Ver categoría
                  <ArrowUpRight className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
