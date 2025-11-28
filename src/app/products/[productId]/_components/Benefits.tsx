import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';
import { CircleCheck } from 'lucide-react';

interface BenefitsProps {
  benefits: string[];
}

export const Benefits = ({ benefits }: BenefitsProps) => {
  if (!benefits || benefits.length === 0) return null;

  return (
    <AccordionItem value='benefits'>
      <AccordionTrigger className='text-base font-semibold text-gray-800 hover:no-underline tablet:text-[18px]'>
        Beneficios
      </AccordionTrigger>

      <AccordionContent>
        <ul className='space-y-3'>
          {benefits.map((benefit, index) => (
            <li key={index} className='flex items-center gap-3 text-gray-600'>
              <div>
                <CircleCheck className='h-4 w-4 tablet:h-5 tablet:w-5' />
              </div>
              <span className='text-sm tablet:text-base' dangerouslySetInnerHTML={{ __html: benefit }} />
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};
