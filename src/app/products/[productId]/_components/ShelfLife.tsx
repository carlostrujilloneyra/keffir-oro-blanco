import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';

import { Clock } from 'lucide-react';

interface ShelfLifeProps {
  shelfLife: string;
}

export const ShelfLife = ({ shelfLife }: ShelfLifeProps) => {
  if (!shelfLife) return null;

  return (
    <AccordionItem value='shelf-life'>
      <AccordionTrigger className='font-display text-base font-semibold text-tinta hover:no-underline tablet:text-lg'>
        Tiempo de vida
      </AccordionTrigger>

      <AccordionContent>
        <div className='flex items-center gap-2 text-tinta-media tablet:gap-3'>
          <Clock className='h-4 w-4 shrink-0 text-verde tablet:h-5 tablet:w-5' />
          <span className='text-sm font-medium tablet:text-base'>{shelfLife}</span>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
