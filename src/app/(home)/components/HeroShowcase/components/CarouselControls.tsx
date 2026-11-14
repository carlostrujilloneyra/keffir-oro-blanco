import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  activeIndex: number;
  total: number;
  paused: boolean;
  userPaused: boolean;
  onTogglePause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onAutoAdvance: () => void;
};

const BUTTON_CLASS =
  'flex h-11 w-11 items-center justify-center rounded-[10px] bg-tinta/55 text-papel ring-1 ring-inset ring-papel/15 backdrop-blur-md transition duration-200 hover:bg-tinta/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel active:scale-90';

const pad = (value: number) => String(value).padStart(2, '0');

export const CarouselControls = ({
  activeIndex,
  total,
  paused,
  userPaused,
  onTogglePause,
  onPrevious,
  onNext,
  onAutoAdvance,
}: Props) => (
  /* Todo a la izquierda, junto al contador: nada queda encima del producto. */
  <div className='flex flex-wrap items-center gap-x-6 gap-y-3 px-6 tablet:px-10 lg:px-0'>
    <div aria-hidden className='flex items-center gap-3 font-display text-sm font-semibold text-papel'>
      <span className='tabular-nums'>{pad(activeIndex + 1)}</span>
      <span className='h-0.5 w-24 overflow-hidden rounded-full bg-papel/25'>
        {/* Único temporizador del autoplay. Sin animación (reduced motion) no hay autoplay y la barra indica la posición. */}
        <span
          key={activeIndex}
          onAnimationEnd={onAutoAdvance}
          style={{
            transform: `scaleX(${(activeIndex + 1) / total})`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
          className='block h-full origin-left bg-miel motion-safe:animate-hero-progress'
        />
      </span>
      <span className='tabular-nums'>{pad(total)}</span>
    </div>

    <div className='flex items-center gap-2'>
      <button
        type='button'
        aria-label={userPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
        onClick={onTogglePause}
        onPointerDown={(e) => e.stopPropagation()}
        className={cn(BUTTON_CLASS, 'motion-reduce:hidden')}
      >
        {userPaused ? <Play className='h-5 w-5' /> : <Pause className='h-5 w-5' />}
      </button>
      <button type='button' aria-label='Sabor anterior' onClick={onPrevious} className={BUTTON_CLASS}>
        <ChevronLeft className='h-5 w-5' />
      </button>
      <button type='button' aria-label='Sabor siguiente' onClick={onNext} className={BUTTON_CLASS}>
        <ChevronRight className='h-5 w-5' />
      </button>
    </div>
  </div>
);
