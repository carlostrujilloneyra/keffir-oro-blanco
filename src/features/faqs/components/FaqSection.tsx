import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';
import { questionsData } from '../data/questions';

export const FaqSection = () => {
  if (!questionsData || questionsData.length === 0) return null;

  return (
    <section className='container-max w-full bg-gray-100/80 px-6 py-8 tablet:p-10 lg:p-18'>
      <div className='mb-4 text-center tablet:mb-6'>
        <h2 className='mb-3 text-[32px] font-semibold leading-[1.1] text-gray-800 tablet:text-[40px] lg:mb-5'>
          Preguntas Frecuentes
        </h2>

        <p className='text-lg text-gray-600 tablet:text-xl'>Tu Guía para un Bienestar Natural</p>
      </div>

      <Accordion type='single' collapsible defaultValue={questionsData[0].value} className='mx-auto'>
        {questionsData.map(({ value, question, answer }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className='text-base font-semibold text-gray-800 hover:no-underline tablet:text-xl'>
              {question}
            </AccordionTrigger>

            <AccordionContent className='text-gray-600 lg:text-base'>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
