import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';
import { WHATSAPP_URL } from '@/lib/site';
import { questionsData } from '../data/questions';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Button } from '@/components/ui/Button/Button';

export const FaqSection = () => {
  if (!questionsData || questionsData.length === 0) return null;

  return (
    <section
      id='faq'
      aria-labelledby='faq-titulo'
      className='w-full scroll-mt-24 bg-papel px-6 py-section tablet:px-10 lg:px-18'
    >
      <div className='container-max grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16'>
        {/* Encabezado (sticky en desktop) */}
        <div className='flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start'>
          <Eyebrow>Preguntas frecuentes</Eyebrow>

          <h2
            id='faq-titulo'
            className='font-display text-4xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-5xl'
          >
            Lo que más nos preguntan
          </h2>

          <p className='max-w-md text-tinta-media'>Sobre el kéfir y cómo elaboramos nuestros productos.</p>

          <Button asChild variant='primary' className='mt-1'>
            <Link href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer'>
              ¿Otra pregunta? Escríbenos
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>

        {/*
          Lista con separadores finos en vez de cards: sobre el crema de la
          sección, las cajas beige apenas contrastaban y pesaban más que las
          propias preguntas.
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
                {/* + que gira a × al abrir. Va en un span: el trigger oculta sus svg directos. */}
                <span
                  aria-hidden
                  className='mt-1 shrink-0 text-tinta-suave transition-transform duration-300 group-hover:text-verde group-data-[state=open]:rotate-45 group-data-[state=open]:text-verde'
                >
                  <Plus className='h-5 w-5' />
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
