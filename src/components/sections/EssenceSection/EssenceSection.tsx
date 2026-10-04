'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

type Tone = 'verde' | 'fucsia' | 'miel' | 'bosque';

interface EssencePanel {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
  href: string;
  tone: Tone;
}

const toneStyles: Record<Tone, { text: string; dot: string; pill: string; closedBg: string }> = {
  verde: {
    text: 'text-verde',
    dot: 'bg-verde',
    pill: 'border-verde/25 text-verde',
    closedBg: 'bg-gradient-to-b from-papel-hueso to-verde/10',
  },
  fucsia: {
    text: 'text-fucsia',
    dot: 'bg-fucsia',
    pill: 'border-fucsia/25 text-fucsia',
    closedBg: 'bg-gradient-to-b from-papel-hueso to-fucsia/10',
  },
  miel: {
    text: 'text-miel-oscuro',
    dot: 'bg-miel',
    pill: 'border-miel/40 text-miel-oscuro',
    closedBg: 'bg-gradient-to-b from-papel-hueso to-miel/15',
  },
  bosque: {
    text: 'text-bosque',
    dot: 'bg-bosque',
    pill: 'border-bosque/25 text-bosque',
    closedBg: 'bg-gradient-to-b from-papel-hueso to-bosque/10',
  },
};

const panels: EssencePanel[] = [
  {
    id: 'kefir-de-leche',
    eyebrow: 'Probióticos',
    title: 'Kéfir de leche',
    description: 'Fermentado vivo de leche de vaca y cabra: cremoso, ácido justo y lleno de cultivos activos.',
    tags: ['Vaca', 'Cabra', 'Probióticos'],
    image: '/assets/images/content/products/kefir-de-leche/featured.webp',
    alt: 'Kéfir de leche artesanal TRIALFERI',
    href: '/categorias/probioticos',
    tone: 'verde',
  },
  {
    id: 'kefires-frutados',
    eyebrow: 'Sabores',
    title: 'Kéfires frutados',
    description: 'Kéfir combinado con fruta real: fresa, arándano y aguaymanto. Dulzor natural, cero artificial.',
    tags: ['Fresa', 'Arándano', 'Aguaymanto'],
    image: '/assets/images/content/products/kefir-con-fresa/featured.webp',
    alt: 'Kéfir frutado con fresa',
    href: '/categorias/probioticos',
    tone: 'fucsia',
  },
  {
    id: 'quesos-de-cabra',
    eyebrow: 'Artesanales',
    title: 'Quesos de cabra',
    description: 'Quesos frescos de cabra elaborados a mano: cottage suave y una versión al ajo con carácter.',
    tags: ['Cottage', 'Al ajo', 'Fresco'],
    image: '/assets/images/content/products/queso-natural/gallery-01.webp',
    alt: 'Queso fresco de cabra artesanal',
    href: '/categorias/probioticos',
    tone: 'miel',
  },
  {
    id: 'tradicionales',
    eyebrow: 'Saberes',
    title: 'Tradicionales',
    description: 'Manteca de cerdo, mermeladas y preparaciones caseras hechas como manda la tradición.',
    tags: ['Manteca', 'Mermelada', 'Casero'],
    image: '/assets/images/content/products/manteca-de-cerdo/gallery-01.webp',
    alt: 'Productos tradicionales TRIALFERI',
    href: '/categorias/tradicionales',
    tone: 'bosque',
  },
  {
    id: 'kefir-de-agua-kombucha',
    eyebrow: 'Burbujas',
    title: 'Kéfir de agua & Kombucha',
    description: 'Bebidas fermentadas efervescentes, ligeras y naturalmente probióticas. Sin lácteos.',
    tags: ['Sin lácteos', 'Efervescente', 'Probióticos'],
    image: '/assets/images/content/products/kefir-de-agua/background.webp',
    alt: 'Kéfir de agua y kombucha artesanal',
    href: '/categorias/probioticos',
    tone: 'verde',
  },
];

const formatIndex = (i: number) => `(${String(i + 1).padStart(2, '0')})`;

/* Contenido común del panel abierto (imagen, texto, tags y CTA). */
const OpenBody = ({ panel, tone }: { panel: EssencePanel; tone: (typeof toneStyles)[Tone] }) => (
  <>
    <div className='flex items-center justify-between'>
      <span className='inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-tinta-suave'>
        <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
        {panel.eyebrow}
      </span>
    </div>

    <div className='relative min-h-0 flex-1 overflow-hidden rounded-[16px]'>
      <Image src={panel.image} alt={panel.alt} fill sizes='(max-width: 1024px) 90vw, 40vw' className='object-cover' />
    </div>

    <div className='flex flex-col gap-3'>
      <h3 className='font-display text-3xl leading-[1.05] tracking-tight text-tinta lg:text-[42px]'>{panel.title}</h3>
      <p className='text-justify text-sm leading-relaxed text-tinta-media lg:text-base'>{panel.description}</p>

      <ul className='flex flex-wrap gap-2'>
        {panel.tags.map((tag) => (
          <li key={tag} className={cn('rounded-full border bg-papel/60 px-3 py-1 text-xs font-medium', tone.pill)}>
            {tag}
          </li>
        ))}
      </ul>

      <Link
        href={panel.href}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-bosque px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-papel transition-all duration-200 hover:bg-tinta',
        )}
      >
        Descubrir
        <ArrowUpRight className='h-4 w-4' />
      </Link>
    </div>
  </>
);

export const EssenceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-labelledby='esencia-titulo' className='container-max bg-papel py-6 tablet:py-8 lg:py-10'>
      <div className='mb-10 flex flex-col gap-4 lg:mb-14'>
        <Eyebrow className='w-fit text-xs tracking-[0.18em]' dotClassName='h-2 w-2'>
          Nuestras familias
        </Eyebrow>
        <h2
          id='esencia-titulo'
          className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-6xl'
        >
          Fermentos que cuidan tu vida
        </h2>
        <p className='max-w-xl text-tinta-media'>
          Cada familia nace de un proceso vivo y artesanal. Explóralas una a una.
        </p>
      </div>

      {/* ── Desktop: acordeón horizontal (hover o clic) ────────────── */}
      <div className='hidden h-[600px] gap-3 lg:flex'>
        {panels.map((panel, i) => {
          const isActive = i === activeIndex;
          const tone = toneStyles[panel.tone];

          return (
            <div
              key={panel.id}
              role='button'
              tabIndex={0}
              aria-expanded={isActive}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(i);
                }
              }}
              className={cn(
                'relative cursor-pointer overflow-hidden rounded-[22px] border border-papel-sombra/60 transition-[flex-grow] duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde',
                isActive ? 'grow-[6] bg-papel' : 'grow basis-0 hover:brightness-[0.98]',
                !isActive && tone.closedBg,
              )}
            >
              {/* Etiqueta del panel cerrado: número arriba + título en vertical */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-between py-8 transition-opacity duration-300',
                  isActive ? 'pointer-events-none opacity-0' : 'opacity-100',
                )}
              >
                <span className='text-xs font-medium text-tinta-suave'>{formatIndex(i)}</span>
                <span className='rotate-180 whitespace-nowrap font-display text-3xl font-semibold leading-none tracking-tight text-tinta [writing-mode:vertical-rl]'>
                  {panel.title}
                </span>
                <span className={cn('h-2 w-2 rounded-full', tone.dot)} />
              </div>

              {/* Contenido del panel abierto */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col gap-4 p-6 transition-opacity duration-500 lg:p-8',
                  isActive ? 'opacity-100 delay-100' : 'pointer-events-none opacity-0',
                )}
              >
                <div className='flex items-start justify-between'>
                  <span className='sr-only'>{panel.title}</span>
                  <span className='ml-auto text-xs font-medium text-tinta-suave'>{formatIndex(i)}</span>
                </div>
                <OpenBody panel={panel} tone={tone} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: acordeón vertical (tap) ────────────────────────── */}
      <div className='flex flex-col gap-3 lg:hidden'>
        {panels.map((panel, i) => {
          const isActive = i === activeIndex;
          const tone = toneStyles[panel.tone];

          return (
            <div
              key={panel.id}
              className={cn(
                'overflow-hidden rounded-[18px] border border-papel-sombra/60 transition-colors duration-300',
                isActive ? 'bg-papel' : tone.closedBg,
              )}
            >
              <button
                type='button'
                aria-expanded={isActive}
                onClick={() => setActiveIndex(isActive ? -1 : i)}
                className='flex w-full items-center justify-between gap-4 p-5 text-left'
              >
                <span className='flex items-center gap-3'>
                  <span className='text-xs font-medium text-tinta-suave'>{formatIndex(i)}</span>
                  <span className='font-display text-lg font-semibold tracking-tight text-tinta'>{panel.title}</span>
                </span>
                <Plus
                  className={cn(
                    'h-5 w-5 shrink-0 text-tinta transition-transform duration-300',
                    isActive && 'rotate-45',
                  )}
                />
              </button>

              {/* Despliegue suave con el truco grid-rows 0fr → 1fr (CSS puro). */}
              <div
                className={cn(
                  'grid transition-[grid-template-rows] duration-500 ease-in-out',
                  isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className='overflow-hidden'>
                  <div
                    className={cn(
                      'flex flex-col gap-4 px-5 pb-6 transition-opacity duration-300',
                      isActive ? 'opacity-100 delay-150' : 'opacity-0',
                    )}
                  >
                    <div className='relative h-52 overflow-hidden rounded-[16px]'>
                      <Image src={panel.image} alt={panel.alt} fill sizes='90vw' className='object-cover' />
                    </div>
                    <p className='text-justify text-sm leading-relaxed text-tinta-media lg:text-base'>
                      {panel.description}
                    </p>
                    <ul className='flex flex-wrap gap-2'>
                      {panel.tags.map((tag) => (
                        <li
                          key={tag}
                          className={cn('rounded-full border bg-papel/60 px-3 py-1 text-xs font-medium', tone.pill)}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={panel.href}
                      className='inline-flex w-fit items-center gap-1.5 rounded-full bg-bosque px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-papel transition-all duration-200 hover:bg-tinta'
                    >
                      Descubrir
                      <ArrowUpRight className='h-4 w-4' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
