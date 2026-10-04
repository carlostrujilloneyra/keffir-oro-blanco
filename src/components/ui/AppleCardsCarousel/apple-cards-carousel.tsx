'use client';
import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import Image, { ImageProps } from 'next/image';
import { useOutsideClick } from '@/hooks/use-outside-click';

type CardData = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};
interface CarouselProps {
  data: CardData[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ data, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className='relative w-screen lg:w-full'>
        <div
          className='flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none]'
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn('absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l')}></div>

          {/* --- ¡CAMBIO IMPORTANTE EN EL RENDERIZADO! --- */}
          <div
            className={cn(
              'flex flex-row items-center justify-start gap-4 tablet:gap-6', // Añadido p-4 para padding
            )}
          >
            {data.map((cardData, index) => (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2 * index, ease: 'easeOut' },
                }}
                key={'card-' + cardData.title + index} // Usamos una key más robusta
                className='rounded-3xl' // El padding extra al final ya no es necesario
              >
                {/* Y renderizamos el componente Card aquí mismo */}
                <Card card={cardData} index={index} />
              </motion.article>
            ))}
          </div>
        </div>

        <div className='flex justify-center gap-2 py-8 lg:pb-6 lg:pt-8'>
          <div className='flex gap-3'>
            <button
              className='relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-light-50 disabled:opacity-50 tablet:h-12 tablet:w-12'
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <IconArrowNarrowLeft className='h-6 w-6 text-gray-600' />
            </button>

            <button
              className='relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-light-50 disabled:opacity-50 tablet:h-12 tablet:w-12'
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <IconArrowNarrowRight className='h-6 w-6 text-gray-600' />
            </button>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }: { card: Card; index: number; layout?: boolean }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const imageVariants = {
    rest: {
      scale: 1.0, // Estado normal: escala 100%
    },
    hover: {
      scale: 1.2, // Estado hover: escala 110%
    },
  };

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className='fixed inset-0 z-50 h-screen overflow-auto'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg'
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className='relative z-[60] mx-auto my-10 h-fit max-w-[1200px] rounded-3xl bg-white p-4 font-sans dark:bg-neutral-900 md:p-6'
            >
              <button
                className='sticky right-0 top-4 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white'
                onClick={handleClose}
              >
                <IconX className='h-6 w-6 text-neutral-100 dark:text-neutral-900' />
              </button>

              <div className='py-6 lg:py-8'>{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className='group relative z-10 flex h-80 w-56 flex-col items-start justify-end overflow-hidden rounded-[20px] text-left tablet:h-[32rem] tablet:w-[340px]'
        initial='rest'
        whileHover='hover'
        animate='rest'
      >
        {/* Imagen (hace zoom en hover) */}
        <motion.div
          className='absolute inset-0 z-10'
          variants={imageVariants}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <BlurImage src={card.src} alt={card.title} fill className='absolute inset-0 z-10 object-cover' />
        </motion.div>

        {/* Scrim de abajo hacia arriba: el título siempre legible */}
        <div className='pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-tinta via-tinta/40 to-transparent' />

        {/* Afización de "expandir" */}
        <span className='absolute right-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-papel backdrop-blur-md transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5'>
          <IconArrowNarrowRight className='h-5 w-5 -rotate-45' />
        </span>

        {/* Texto (abajo) */}
        <div className='relative z-40 p-5 tablet:px-7 tablet:py-7'>
          <motion.h4
            layoutId={layout ? `category-${card.category}` : undefined}
            className='inline-flex max-w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-papel backdrop-blur-md tablet:text-xs'
          >
            <span className='h-1.5 w-1.5 rounded-full bg-miel' />
            {card.category}
          </motion.h4>

          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className='mt-3 max-w-xs font-display text-2xl font-semibold leading-[1.1] tracking-tight text-papel [text-wrap:balance] md:text-3xl'
          >
            {card.title}
          </motion.p>
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn('h-full w-full transition duration-300', isLoading ? 'blur-sm' : 'blur-0', className)}
      onLoad={() => setLoading(false)}
      src={src as string}
      sizes='(min-width:600px) 500px, 320px'
      width={width}
      height={height}
      priority
      decoding='async'
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt ? alt : 'Background of a beautiful view'}
      {...rest}
    />
  );
};
