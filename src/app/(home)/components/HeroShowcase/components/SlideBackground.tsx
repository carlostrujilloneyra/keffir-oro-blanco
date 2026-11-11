import { useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'motion/react';
import { tonePanelBackground } from '@/features/products';
import { ToneHalo } from '@/features/products/components/ToneHalo';
import { withAlpha } from '@/lib/color';
import type { HeroVideo as HeroVideoSource } from '../data/heroSlides';
import type { ResolvedHeroSlide } from '../lib/resolveHeroSlides';

/* La foto mide 1.5 veces su alto: hasta 150vw en mobile y ~1000px desde lg. */
export const PHOTO_SIZES = '(min-width: 1024px) 1200px, 150vw';
export const BOTTLE_SIZES = '(min-width: 1024px) 40vw, 90vw';
const BOTTLE_SIZES_ROW = '(min-width: 1024px) 20vw, 45vw';

/* Alto de la foto en mobile: cuadrada en pantallas bajas no deja ver título y botones. */
export const MOBILE_MEDIA_HEIGHT = 'h-[min(100vw,45svh)]';

/* Video desde lg: la toma baja un poco. La escala cubre el hueco que dejaría arriba (2.5% > 2%). */
const MEDIA_SHIFT = 'lg:translate-y-[2%] lg:scale-105';

const HeroVideo = ({ video, paused }: { video: HeroVideoSource; paused: boolean }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (paused) ref.current?.pause();
    else ref.current?.play().catch(() => undefined);
  }, [paused]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload='metadata'
      poster={video.poster}
      aria-hidden
      className={`absolute inset-0 h-full w-full object-cover ${MEDIA_SHIFT}`}
    >
      <source src={video.webm} type='video/webm' />
      <source src={video.mp4} type='video/mp4' />
    </video>
  );
};

type Props = { slide: ResolvedHeroSlide; priority: boolean; videoPaused: boolean };

/* Fondo del slide: video, foto o, sin foto, las botellas sobre el degradado del tono. */
export const SlideBackground = ({ slide, priority, videoPaused }: Props) => {
  const reduce = useReducedMotion();
  const { photo, video, bottles } = slide;

  return (
    <>
      {/* Con foto, el panel entero es del color de su fondo: así no se ve dónde termina la foto. */}
      <div className='absolute inset-0' style={{ background: photo?.backdrop ?? tonePanelBackground[slide.tone] }} />

      {/* En mobile ocupa la franja superior (MOBILE_MEDIA_HEIGHT); el texto va debajo, sobre el degradado. */}
      <div className={`absolute inset-x-0 top-0 ${MOBILE_MEDIA_HEIGHT} lg:inset-0 lg:h-auto`}>
        {video && !reduce ? (
          <HeroVideo video={video} paused={videoPaused} />
        ) : photo ? (
          /*
            La foto entera (3:2), sin recorte, con su `focus` en un punto fijo del panel:
            al centro en mobile y al 75% desde lg, sobre la fila de mini-cards. Lo que
            queda alrededor es el panel, del mismo color que el fondo de la foto.
          */
          <div
            className='absolute left-1/2 top-0 aspect-[3/2] h-full -translate-x-[var(--focus-x)] lg:left-3/4 lg:h-[calc(100%-9rem)]'
            style={{ '--focus-x': photo.focus.split(' ')[0] } as CSSProperties}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={priority}
              sizes={PHOTO_SIZES}
              style={{ objectPosition: photo.focus }}
              className='object-cover'
            />
          </div>
        ) : (
          <div className='absolute inset-x-0 inset-y-6 flex justify-center gap-2 lg:bottom-56 lg:left-auto lg:right-[8%] lg:top-8 lg:w-2/5'>
            <ToneHalo tone={slide.tone} animated={false} />
            {bottles.map((bottle) => (
              <div key={bottle.src + bottle.alt} className='relative h-full flex-1'>
                <Image
                  src={bottle.src}
                  alt={bottle.alt}
                  fill
                  priority={priority}
                  sizes={bottles.length > 1 ? BOTTLE_SIZES_ROW : BOTTLE_SIZES}
                  className='object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.45)]'
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contraste del texto (desde lg): del fondo de la foto a transparente; sin foto, tinta. */}
      <div
        aria-hidden
        className='absolute inset-0 hidden lg:block'
        style={{
          background: photo
            ? `linear-gradient(to right, ${withAlpha(photo.backdrop, 0.9)}, ${withAlpha(photo.backdrop, 0.6)} 45%, ${withAlpha(photo.backdrop, 0)})`
            : 'linear-gradient(to right, rgba(22,32,26,0.9), rgba(22,32,26,0.6) 45%, rgba(22,32,26,0))',
        }}
      />

      {/* Luz del sabor detrás del título: abajo del cuadrado de la foto en mobile, arriba a la izquierda desde lg. */}
      {photo && (
        <div
          aria-hidden
          className='absolute inset-x-0 bottom-0 top-[40%] lg:inset-0 lg:right-[30%]'
          style={{
            background: `radial-gradient(70% 60% at 20% 30%, ${withAlpha(photo.glow, 0.12)}, ${withAlpha(photo.glow, 0)} 70%)`,
          }}
        />
      )}
    </>
  );
};
