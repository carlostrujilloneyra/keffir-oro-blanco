import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';
import { WHATSAPP_URL } from '@/lib/site';
import { questionsData } from '../data/questions';

export const FaqSection = () => {
  if (!questionsData || questionsData.length === 0) return null;

  return (
    <section aria-labelledby='faq-titulo' className='w-full bg-papel px-6 py-section tablet:px-10 lg:px-18'>
      <div className='container-max grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16'>
        {/* Encabezado (sticky en desktop) */}
        <div className='flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start'>
          <span className='inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-tinta-suave'>
            <span className='h-2 w-2 rounded-full bg-verde' />
            Preguntas frecuentes
          </span>

          <h2
            id='faq-titulo'
            className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'
          >
            Todo lo que quieres saber
          </h2>

          <p className='max-w-md text-tinta-media'>
            Tu guía para un bienestar natural. Resolvemos lo más consultado sobre nuestros fermentos y productos
            artesanales.
          </p>

          <Link
            href={WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-verde px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-papel transition-all duration-200 hover:brightness-110 active:scale-[0.98]'
          >
            ¿Otra pregunta? Escríbenos
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </div>

        {/*
          Lista con separadores finos en vez de cards: sobre el crema de la
          sección, las cajas beige apenas contrastaban y pesaban más que las
          propias preguntas. El indicador redondo (chevron que gira 180°) es la
          única pieza con color, y marca el estado sin necesidad de recuadro.
        */}
        <Accordion
          type='single'
          collapsible
          defaultValue={questionsData[0].value}
          className='divide-y divide-papel-sombra border-y border-papel-sombra'
        >
          {questionsData.map(({ value, question, answer }) => (
            <AccordionItem key={value} value={value} className='border-b-0'>
              <AccordionTrigger className='group items-start gap-6 py-6 text-left font-display text-base font-semibold text-tinta transition-colors duration-200 hover:text-verde hover:no-underline tablet:text-lg [&>svg]:hidden'>
                {question}
                <span
                  aria-hidden
                  className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-papel-sombra text-tinta-suave transition-all duration-300 group-hover:border-verde/40 group-hover:text-verde group-data-[state=open]:rotate-180 group-data-[state=open]:border-transparent group-data-[state=open]:bg-verde group-data-[state=open]:text-papel'
                >
                  <ChevronDown className='h-4 w-4' />
                </span>
              </AccordionTrigger>

              <AccordionContent className='max-w-measure pb-7 pr-12 text-[15px] leading-relaxed text-tinta-media'>
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
