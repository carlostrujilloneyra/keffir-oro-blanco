'use client';

import { useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Reveal } from '@/components/ui/Motion/Motion';
import { FeatureMedia } from './components/FeatureMedia';
import { FeaturePill } from './components/FeaturePill';
import { features } from './data/features';

const LAST_INDEX = features.length - 1;
const PANEL_ID = 'conoce-el-kefir-panel';

const getTabId = (id: string) => `conoce-el-kefir-${id}`;

const stepClass =
  'flex h-11 w-11 items-center justify-center rounded-[10px] bg-tinta/80 text-papel backdrop-blur-md transition duration-200 hover:bg-tinta lg:bg-papel/10 lg:hover:bg-papel/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel active:scale-90 disabled:pointer-events-none disabled:opacity-40';

export const KefirFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const active = features[activeIndex];

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    const nextIndex = {
      ArrowDown: activeIndex === LAST_INDEX ? 0 : activeIndex + 1,
      ArrowUp: activeIndex === 0 ? LAST_INDEX : activeIndex - 1,
      Home: 0,
      End: LAST_INDEX,
    }[e.key];

    if (nextIndex === undefined) return;
    e.preventDefault();
    setActiveIndex(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <section aria-labelledby='conoce-el-kefir-titulo' className='w-full py-6 tablet:py-8 lg:py-10'>
      <Reveal inView className='mb-6 flex flex-col gap-2 tablet:mb-8 lg:mb-10'>
        <Eyebrow>Por qué TRIALFERI</Eyebrow>
        <h2
          id='conoce-el-kefir-titulo'
          className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta tablet:text-4xl lg:text-5xl'
        >
          Conoce el kéfir
        </h2>
      </Reveal>

      <Reveal inView className='grid gap-4 lg:grid-cols-[340px_1fr] lg:gap-0'>
        <div className='relative z-10 flex flex-col gap-3 lg:col-start-1 lg:row-start-1 lg:self-center lg:p-6'>
          <div
            role='tablist'
            aria-label='Características del kéfir'
            aria-orientation='vertical'
            className='flex flex-col gap-2'
          >
            {features.map((feature, index) => (
              <FeaturePill
                key={feature.id}
                ref={(element) => {
                  tabsRef.current[index] = element;
                }}
                feature={feature}
                active={index === activeIndex}
                tabId={getTabId(feature.id)}
                panelId={PANEL_ID}
                onSelect={() => setActiveIndex(index)}
                onKeyDown={handleKeyDown}
              />
            ))}
          </div>

          <div className='flex gap-2'>
            <button
              type='button'
              aria-label='Característica anterior'
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex(activeIndex - 1)}
              className={stepClass}
            >
              <ChevronUp className='h-5 w-5' />
            </button>
            <button
              type='button'
              aria-label='Característica siguiente'
              disabled={activeIndex === LAST_INDEX}
              onClick={() => setActiveIndex(activeIndex + 1)}
              className={stepClass}
            >
              <ChevronDown className='h-5 w-5' />
            </button>
          </div>
        </div>

        <FeatureMedia
          feature={active}
          tabId={getTabId(active.id)}
          panelId={PANEL_ID}
          className='order-first lg:order-none lg:col-span-full lg:col-start-1 lg:row-start-1'
        />
      </Reveal>
    </section>
  );
};
