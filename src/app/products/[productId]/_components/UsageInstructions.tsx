import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';

interface UsageInstructionsProps {
  howToUse: React.ReactNode;
}

export const UsageInstructions = ({ howToUse }: UsageInstructionsProps) => {
  if (!howToUse) return null;

  return (
    <AccordionItem value='usage'>
      <AccordionTrigger className='font-display text-base font-semibold text-tinta hover:no-underline tablet:text-lg'>
        Modo de uso
      </AccordionTrigger>

      <AccordionContent>
        <div className='flex flex-col gap-3 text-sm leading-relaxed text-tinta-media tablet:gap-4 tablet:text-base'>
          {howToUse}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
