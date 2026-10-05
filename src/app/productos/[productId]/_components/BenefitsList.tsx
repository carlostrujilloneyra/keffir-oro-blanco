import { inlineMarkdown } from '@/lib/inlineMarkdown';

interface BenefitsListProps {
  /* Texto plano con **negrita** (ver inlineMarkdown). */
  benefits: string[];
}

/*
  Beneficios siempre visibles (no acordeón): son argumento de venta. Lista
  limpia sin panel, para no recargar la columna con otra caja cream.
*/
export const BenefitsList = ({ benefits }: BenefitsListProps) => {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div className='border-t border-papel-sombra pt-6'>
      <h2 className='font-display text-base font-semibold text-tinta tablet:text-lg'>Beneficios</h2>
      <ul className='mt-4 space-y-3'>
        {benefits.map((benefit, index) => (
          <li key={index} className='flex items-start gap-3 text-tinta-media'>
            <span aria-hidden className='shrink-0 text-tinta-suave'>
              —
            </span>
            <span className='text-sm leading-relaxed tablet:text-base'>{inlineMarkdown(benefit)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
