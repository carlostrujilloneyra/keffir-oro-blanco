import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/site';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Button } from '@/components/ui/Button/Button';

/* Solo lo que es cierto para TODOS los productos: esta sección cierra también Tradicionales. */
const labelClaims = ['100% artesanal', 'Sin conservantes añadidos', 'Hecho en lotes pequeños'];

const origins = [
  { ingredient: 'Leche de cabra', place: 'Valle de Canta' },
  { ingredient: 'Quito quito', place: 'Oxapampa' },
  { ingredient: 'Sal rosada', place: 'Maras, Cusco' },
];

/* Glow verde sobre base casi negra, mismo lenguaje que CategoriesSection. */
const ctaBackground =
  'radial-gradient(80% 140% at 100% 0%, rgba(47,125,82,0.5), rgba(47,125,82,0.2) 40%, rgba(22,32,26,0) 75%), #16201A';

export const ValuesBento = () => (
  <section aria-labelledby='valores-titulo' className='flex w-full flex-col gap-5 bg-papel py-8 md:py-12 lg:gap-6'>
    <header className='mb-3 flex flex-col gap-4 lg:mb-8'>
      <Eyebrow>Por qué TRIALFERI</Eyebrow>
      <h2
        id='valores-titulo'
        className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta tablet:text-4xl lg:text-6xl'
      >
        Productos naturales, hechos a mano
      </h2>
      <p className='max-w-xl text-tinta-media md:text-lg'>
        Elegimos cada ingrediente en su origen y lo preparamos a mano, sin atajos.
      </p>
    </header>

    <div className='grid overflow-hidden rounded-[28px] border border-papel-sombra/70 bg-papel-hueso lg:grid-cols-2'>
      <div className='flex flex-col gap-6 p-6 tablet:p-8 lg:p-12'>
        <div className='flex flex-col gap-2'>
          <h3 className='font-display text-2xl font-semibold tracking-tight text-tinta lg:text-3xl'>
            Lo que dice cada etiqueta
          </h3>
          <p className='text-tinta-media'>Está impreso en el frasco. Sin letra chica.</p>
        </div>

        {/* Sellos con la forma de flecha de la etiqueta física ("30 - 40 Probióticos"). */}
        <ul className='flex flex-col items-start gap-3'>
          {labelClaims.map((claim) => (
            <li
              key={claim}
              className='bg-tinta py-2.5 pl-4 pr-9 font-display text-sm font-semibold uppercase tracking-[0.06em] text-papel [clip-path:polygon(0_0,calc(100%-16px)_0,100%_50%,calc(100%-16px)_100%,0_100%)] lg:text-base'
            >
              {claim}
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col gap-6 border-t border-papel-sombra/70 p-6 tablet:p-8 lg:border-l lg:border-t-0 lg:p-12'>
        <h3 className='font-display text-2xl font-semibold tracking-tight text-tinta lg:text-3xl'>De dónde viene</h3>

        <dl className='flex flex-col gap-5 lg:gap-8'>
          {origins.map(({ ingredient, place }) => (
            <div key={ingredient} className='flex items-baseline gap-3'>
              <dt className='whitespace-nowrap font-display text-base font-semibold text-tinta tablet:text-lg lg:text-xl'>
                {ingredient}
              </dt>
              <span aria-hidden className='min-w-6 flex-1 border-b-2 border-dotted border-tinta/25' />
              <dd className='whitespace-nowrap text-right text-xs font-semibold uppercase tracking-[0.08em] text-tinta-media tablet:text-sm'>
                {place}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

    <div
      style={{ background: ctaBackground }}
      className='flex flex-col items-start justify-between gap-6 rounded-[28px] p-6 tablet:p-8 lg:flex-row lg:items-center lg:p-12'
    >
      <div className='flex flex-col gap-2'>
        <p className='font-display text-2xl font-semibold tracking-tight text-papel lg:text-3xl'>
          ¿No sabes por cuál empezar?
        </p>
        <p className='text-papel/75 md:text-lg'>Escríbenos y te recomendamos según lo que buscas.</p>
      </div>

      <Button asChild variant='light' className='shrink-0'>
        <Link href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer'>
          Escribir por WhatsApp
          <ArrowUpRight className='h-4 w-4' />
        </Link>
      </Button>
    </div>
  </section>
);
