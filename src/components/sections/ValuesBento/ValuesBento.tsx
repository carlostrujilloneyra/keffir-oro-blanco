'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowRight, ArrowUpRight, Leaf, MapPin, ShieldCheck } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/site';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

const EASE = [0.32, 0.72, 0, 1] as const;

/*
  Bento grid de valores: cards de distinto ancho (rompecabezas) que comunican
  jerarquía — mensaje de marca (grande), datos (bloque oscuro), tres
  diferenciadores y un cierre con CTA. Sección de cierre reutilizable (hoy vive
  al final de las páginas de categoría). No repite categorías: de eso ya se
  encarga EssenceSection.
*/

interface Differentiator {
  icon: typeof Leaf;
  title: string;
  description: string;
}

const differentiators: Differentiator[] = [
  {
    icon: Leaf,
    title: 'Artesanal',
    description: 'Hecho a mano y en lotes pequeños, como manda la tradición del valle.',
  },
  {
    icon: MapPin,
    title: 'Ingredientes con origen',
    description: 'Leche de cabra del valle de Canta, quito quito de Oxapampa, sal de Maras. Cada insumo, de su tierra.',
  },
  {
    icon: ShieldCheck,
    title: 'Sin conservantes',
    description: 'Solo ingredientes reales. Cero aditivos, cero artificial. Nada que no reconozcas.',
  },
];

export const ValuesBento = () => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };

  return (
    <section aria-labelledby='valores-titulo' className='w-full bg-papel py-8 md:py-12'>
      <header className='mb-8 flex flex-col gap-4 lg:mb-14'>
        <Eyebrow>Por qué TRIALFERI</Eyebrow>
        <h2
          id='valores-titulo'
          className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta tablet:text-4xl lg:text-6xl'
        >
          Productos naturales, hechos a mano
        </h2>
        <p className='max-w-xl text-tinta-media'>
          Elegimos el ingrediente en origen —como la leche de cabra del valle de Canta— y lo fermentamos a mano. Sin
          atajos, sin conservantes.
        </p>
      </header>

      <motion.div
        variants={container}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        className='grid grid-cols-1 gap-4 tablet:grid-cols-2 lg:grid-cols-6 lg:gap-5'
      >
        {/* ── A · Mensaje de marca (grande, claro) ─────────────────── */}
        <motion.div
          variants={item}
          className='relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[22px] border border-papel-sombra/60 bg-papel-hueso p-6 tablet:col-span-2 lg:col-span-4 lg:min-h-[280px] lg:p-8'
        >
          <div className='relative z-10 max-w-md'>
            <Eyebrow>Del valle a tu mesa</Eyebrow>
            <h3 className='mt-4 font-display text-2xl font-semibold leading-[1.05] tracking-tight text-tinta tablet:text-3xl lg:text-[42px]'>
              Alimentos que cuidan tu vida
            </h3>
            <p className='mt-3 max-w-sm text-sm leading-relaxed text-tinta-media lg:text-base'>
              Kéfir, quesos, mantecas, mermeladas y más. Productos naturales elaborados con paciencia y buena mano.
            </p>
          </div>

          <Link
            href='/products'
            className='relative z-10 mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-verde px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-papel transition-all duration-200 hover:brightness-110 active:scale-[0.98]'
          >
            Ver productos
            <ArrowUpRight className='h-4 w-4' />
          </Link>

          {/* Producto asomando por la derecha (como la planta de la referencia). */}
          <Image
            src='/assets/images/content/products/kefir-de-leche/featured.webp'
            alt=''
            aria-hidden
            width={280}
            height={280}
            className='pointer-events-none absolute -bottom-4 -right-6 hidden w-56 select-none object-contain opacity-90 lg:block'
          />
        </motion.div>

        {/* ── B · Datos (bloque oscuro) ────────────────────────────── */}
        <motion.div
          variants={item}
          className='flex flex-col justify-between gap-6 rounded-[22px] bg-bosque p-6 text-papel tablet:col-span-2 lg:col-span-2 lg:p-8'
        >
          <span className='inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-papel/60'>
            <span className='h-1.5 w-1.5 rounded-full bg-miel' />
            Nuestra promesa
          </span>

          <div className='flex gap-8 tablet:gap-10 lg:flex-col lg:gap-6'>
            <div>
              <p className='font-display text-5xl font-bold leading-none tracking-tight text-miel lg:text-6xl'>100%</p>
              <p className='mt-2 text-sm text-papel/70'>Artesanal y natural</p>
            </div>
            <div>
              <p className='font-display text-5xl font-bold leading-none tracking-tight text-miel lg:text-6xl'>0</p>
              <p className='mt-2 text-sm text-papel/70'>Conservantes y aditivos</p>
            </div>
          </div>
        </motion.div>

        {/* ── C·D·E · Tres diferenciadores ─────────────────────────────
              En mobile van en fila compacta (3 columnas, sin descripción) para
              no crear una torre; en desktop se expanden con su texto. */}
        <motion.div variants={item} className='grid grid-cols-3 gap-3 lg:col-span-6 lg:gap-5'>
          {differentiators.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className='flex flex-col items-center gap-3 rounded-[18px] border border-papel-sombra/60 bg-papel-hueso p-4 text-center tablet:items-start tablet:text-left lg:min-h-[180px] lg:justify-between lg:rounded-[22px] lg:p-7'
            >
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-verde/10 text-verde lg:h-11 lg:w-11'>
                <Icon className='h-5 w-5' />
              </span>
              <div className='lg:mt-6'>
                <h3 className='font-display text-sm font-semibold leading-tight tracking-tight text-tinta tablet:text-lg lg:text-xl'>
                  {title}
                </h3>
                <p className='mt-2 hidden text-sm leading-relaxed text-tinta-media tablet:block'>{description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── F · Historia de marca (oscuro + foto) ────────────────── */}
        <motion.div
          variants={item}
          className='group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[22px] bg-bosque p-6 text-papel tablet:col-span-2 lg:col-span-4 lg:min-h-[260px] lg:p-8'
        >
          <Image
            src='/assets/images/content/products/kefir-de-leche/background.webp'
            alt='Fermentos artesanales TRIALFERI'
            fill
            sizes='(max-width: 1024px) 100vw, 66vw'
            className='object-cover opacity-40 transition-transform duration-700 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-bosque via-bosque/70 to-bosque/20' />

          <div className='relative z-10 max-w-md'>
            <span className='inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-papel/60'>
              <span className='h-1.5 w-1.5 rounded-full bg-fucsia' />
              Nuestra historia
            </span>
            <h3 className='mt-4 font-display text-2xl font-semibold leading-[1.05] tracking-tight text-papel tablet:text-3xl lg:text-4xl'>
              Ingredientes con origen, fermentos con paciencia
            </h3>
            <Link
              href='/products'
              className='mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-papel transition-colors hover:text-miel'
            >
              Conócenos
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </motion.div>

        {/* ── G · Lo más pedido ────────────────────────────────────── */}
        <motion.div
          variants={item}
          className='flex flex-col justify-between gap-6 rounded-[22px] border border-papel-sombra/60 bg-gradient-to-b from-papel-hueso to-miel/15 p-6 tablet:col-span-2 lg:col-span-2 lg:min-h-[260px] lg:p-7'
        >
          <Eyebrow tone='miel'>Favoritos</Eyebrow>
          <div>
            <h3 className='font-display text-2xl font-semibold tracking-tight text-tinta'>Lo más pedido</h3>
            <p className='mt-2 text-sm leading-relaxed text-tinta-media'>
              Descubre los productos que más disfrutan nuestras familias.
            </p>
            <Link
              href='/products'
              className='mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-bosque px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-papel transition-all duration-200 hover:bg-tinta'
            >
              Ver productos
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </div>
        </motion.div>

        {/* ── H · Barra CTA final ──────────────────────────────────── */}
        <motion.div
          variants={item}
          className='flex flex-col items-start justify-between gap-5 rounded-[22px] border border-papel-sombra/60 bg-papel-hueso p-6 tablet:col-span-2 lg:col-span-6 lg:flex-row lg:items-center lg:p-8'
        >
          <p className='font-display text-2xl font-semibold tracking-tight text-tinta lg:text-3xl'>
            ¿List@ para probar nuestros productos?
          </p>
          <Link
            href={WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-gradient-verde px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-papel transition-all duration-200 hover:brightness-110 active:scale-[0.98]'
          >
            Escríbenos por WhatsApp
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
