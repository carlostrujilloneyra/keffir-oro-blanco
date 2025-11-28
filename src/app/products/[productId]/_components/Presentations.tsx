import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion/accordion';
import { formatPrice } from '@/lib/formatPrice';

interface ProductVariant {
  id: string;
  name: string;
  price?: number;
}

interface PresentationsProps {
  presentations: ProductVariant[];
}

export const Presentations = ({ presentations }: PresentationsProps) => {
  if (!presentations || presentations.length === 0) {
    return null;
  }

  return (
    <AccordionItem value='presentations'>
      <AccordionTrigger className='text-base font-semibold text-gray-800 hover:no-underline tablet:text-[18px]'>
        Presentaciones disponibles
      </AccordionTrigger>

      <AccordionContent>
        <div className='space-y-3'>
          {presentations.map((presentation) => (
            <div
              key={presentation.id}
              className='flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:border-gray-300'
            >
              <span className='font-medium text-gray-700'>{presentation.name}</span>
              {presentation.price && (
                <span className='font-semibold text-gray-900'>S/ {formatPrice(presentation.price)}</span>
              )}
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
