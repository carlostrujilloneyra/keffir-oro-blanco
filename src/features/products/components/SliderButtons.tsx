'use client';

import { useSwiper } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface SliderButtonProps {
  className?: string;
  isBeginning?: boolean;
  isEnd?: boolean; // Nueva prop para saber si está al final
}

export const SliderPrevButton = ({ className, isBeginning }: SliderButtonProps) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      disabled={isBeginning}
      className={cn(
        // Estilos base
        'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary p-2 shadow-lg transition-colors duration-300',
        // 3. ¡TU NUEVO HOVER! Usamos el color 'hover' de tu paleta 'primary'
        'hover:bg-primary-hover',
        // 4. Estilos para el estado 'disabled'
        'disabled:cursor-not-allowed disabled:bg-gray-300',
        // Posicionamiento
        'left-2 lg:-left-4',
        // Oculto en móvil, visible en desktop
        'hidden items-center justify-center lg:flex',
        className,
      )}
    >
      <ChevronLeft className='h-6 w-6 text-gray-100' />
    </button>
  );
};

export const SliderNextButton = ({ className, isEnd }: SliderButtonProps) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      disabled={isEnd}
      className={cn(
        'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary p-2 shadow-lg transition-colors duration-300',
        'hover:bg-primary-hover',
        'disabled:cursor-not-allowed disabled:bg-gray-300',
        'right-2 lg:-right-4',
        'hidden items-center justify-center lg:flex',
        className,
      )}
    >
      <ChevronRight className='h-6 w-6 text-gray-100' />
    </button>
  );
};

// --- (Opcional) Hook para controlar el estado de los botones ---
export const useSwiperNavButtons = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiper = useSwiper();

  useEffect(() => {
    const updateButtons = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };
    swiper.on('slideChange', updateButtons);
    swiper.on('resize', updateButtons);

    updateButtons();

    return () => {
      swiper.off('slideChange', updateButtons);
      swiper.off('resize', updateButtons);
    };
  }, [swiper]);

  return { isBeginning, isEnd };
};
