import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';

interface UsageInstructionsProps {
  howToUse: string;
}

export const UsageInstructions = ({ howToUse }: UsageInstructionsProps) => {
  if (!howToUse || howToUse.trim() === '') return null;

  return (
    <AccordionItem value='usage'>
      <AccordionTrigger className='text-base font-semibold text-gray-800 hover:no-underline tablet:text-[18px]'>
        Modo de uso
      </AccordionTrigger>

      <AccordionContent>
        <p className='text-justify text-sm text-gray-600 tablet:text-base'>{howToUse}</p>
      </AccordionContent>
    </AccordionItem>
  );
};
