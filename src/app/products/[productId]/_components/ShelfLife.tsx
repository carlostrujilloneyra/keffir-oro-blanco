import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';

import { Clock } from 'lucide-react';

interface ShelfLifeProps {
  shelfLife: string;
}

export const ShelfLife = ({ shelfLife }: ShelfLifeProps) => {
  if (!shelfLife) return null;

  return (
    <AccordionItem value='shelf-life'>
      <AccordionTrigger className='text-base font-semibold text-gray-800 hover:no-underline tablet:text-[18px]'>
        Tiempo de vida
      </AccordionTrigger>

      <AccordionContent>
        <div className='flex items-center gap-2 text-gray-600 tablet:gap-3'>
          <div>
            <Clock className='h-4 w-4 tablet:h-5 tablet:w-5' />
          </div>

          <span className='text-sm font-medium tablet:text-base'>{shelfLife}</span>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
