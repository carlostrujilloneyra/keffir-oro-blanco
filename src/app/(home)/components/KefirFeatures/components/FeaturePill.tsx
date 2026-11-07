import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_SUAVE } from '@/components/ui/Motion/Motion';
import { cn } from '@/lib/utils';
import type { Feature } from '../data/features';

type Props = {
  feature: Feature;
  active: boolean;
  tabId: string;
  panelId: string;
  onSelect: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
};

const LAYOUT_TRANSITION = { duration: 0.4, ease: EASE_SUAVE };

export const FeaturePill = forwardRef<HTMLButtonElement, Props>(
  ({ feature, active, tabId, panelId, onSelect, onKeyDown }, ref) => {
    const reduce = useReducedMotion();

    return (
      <motion.div
        layout={!reduce}
        transition={LAYOUT_TRANSITION}
        role='presentation'
        style={{ borderRadius: 12 }}
        /* Sobre papel en mobile y sobre el panel oscuro desde lg: la inactiva cambia de fondo para seguir viéndose. */
        className={cn(
          'backdrop-blur-md',
          active
            ? 'bg-papel-hueso text-tinta'
            : 'bg-tinta/80 text-papel hover:bg-tinta lg:bg-papel/10 lg:hover:bg-papel/20',
        )}
      >
        <button
          ref={ref}
          id={tabId}
          type='button'
          role='tab'
          aria-selected={active}
          aria-controls={panelId}
          tabIndex={active ? 0 : -1}
          onClick={onSelect}
          onKeyDown={onKeyDown}
          className='block min-h-11 w-full rounded-card px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel'
        >
          <motion.span
            layout={reduce ? false : 'position'}
            transition={LAYOUT_TRANSITION}
            className='block font-display text-base font-semibold'
          >
            {feature.title}
          </motion.span>

          {active && (
            <motion.span
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className='mt-1 block text-sm leading-snug text-tinta-media'
            >
              {feature.description}
            </motion.span>
          )}
        </button>
      </motion.div>
    );
  },
);

FeaturePill.displayName = 'FeaturePill';
