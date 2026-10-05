import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { badgeConfig, type BadgeType } from '@/features/products/data/badgeConfig';

/* Atributos propios del producto, con la cinta de su etiqueta física. */
export const LabelClaims = ({ tags }: { tags: BadgeType[] }) => {
  if (tags.length === 0) return null;

  return (
    <div className='flex flex-col gap-3 border-t border-papel-sombra pt-6'>
      <h2 className='font-display text-base font-semibold text-tinta tablet:text-lg'>Lo que dice su etiqueta</h2>
      <ul className='flex flex-col items-start gap-2'>
        {tags.map((tag) => (
          <li key={tag}>
            <Eyebrow className='text-sm tablet:text-sm'>{badgeConfig[tag].label}</Eyebrow>
          </li>
        ))}
      </ul>
    </div>
  );
};
