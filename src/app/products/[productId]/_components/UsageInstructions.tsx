import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';

interface UsageInstructionsProps {
  howToUse: React.ReactNode;
}

export const UsageInstructions = ({ howToUse }: UsageInstructionsProps) => {
  if (!howToUse) return null;

  return (
    <AccordionItem value='usage'>
      <AccordionTrigger className='text-base font-semibold text-gray-800 hover:no-underline tablet:text-[18px]'>
        Modo de uso
      </AccordionTrigger>

      <AccordionContent>
        <div className='flex flex-col gap-3 text-justify text-sm text-gray-600 tablet:gap-4 tablet:text-base'>
          {howToUse}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
