import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/Button/Button';
import { EASE_SUAVE } from '@/components/ui/Motion/Motion';
import { cn } from '@/lib/utils';
import type { Feature } from '../data/features';

type Props = {
  feature: Feature;
  tabId: string;
  panelId: string;
  className?: string;
};

const BACKGROUND =
  'radial-gradient(120% 120% at 88% 12%, rgba(47,125,82,0.38), rgba(30,58,47,0) 55%),' +
  'radial-gradient(90% 110% at 0% 100%, rgba(242,183,5,0.12), rgba(22,32,26,0) 60%),' +
  '#16201A';

const IMAGE_SIZES = '(min-width: 1024px) 60vw, 100vw';
/* Desde lg las pastillas se superponen a la izquierda: la toma se centra en el resto. */
const MEDIA_CLASS = 'absolute inset-0 lg:left-[340px]';

export const FeatureMedia = ({ feature, tabId, panelId, className }: Props) => {
  const reduce = useReducedMotion();
  const { media, link } = feature;

  return (
    <div
      id={panelId}
      role='tabpanel'
      aria-labelledby={tabId}
      tabIndex={0}
      style={{ background: BACKGROUND }}
      className={cn(
        'relative aspect-[4/5] overflow-hidden rounded-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel lg:aspect-video',
        className,
      )}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.div
          key={feature.id}
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE_SUAVE }}
          className={MEDIA_CLASS}
        >
          {media.type === 'video' && !reduce ? (
            <video
              src={media.src}
              poster={media.poster}
              aria-label={media.alt}
              autoPlay
              muted
              loop
              playsInline
              preload='metadata'
              className='h-full w-full object-contain'
            />
          ) : (
            <Image
              src={media.type === 'video' ? media.poster : media.src}
              alt={media.alt}
              fill
              loading='eager'
              sizes={IMAGE_SIZES}
              className={cn(
                'object-contain px-6 pt-6 lg:px-10 lg:pt-10',
                media.type === 'image' && media.bleed ? 'object-bottom' : 'pb-6 lg:pb-10',
              )}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {link && (
        /* Fuera de la pastilla: un role='tab' es un botón y no puede contener un enlace. */
        <div className='absolute bottom-4 right-4 lg:bottom-6 lg:right-6'>
          <Button asChild variant='light'>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
