import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { formatPrice } from '@/lib/formatPrice';
import type { ProductGroup, SubcategoryComparison as Comparison } from '@/features/products';

type Props = {
  comparison: Comparison;
  groups: ProductGroup[];
};

export const SubcategoryComparison = ({ comparison, groups }: Props) => {
  const columns = Object.entries(comparison.columns).map(([name, label]) => {
    const group = groups.find((g) => g.product.name === name);
    /* Una clave que no es producto de la subcategoría rompe el build, no la página. */
    if (!group) throw new Error(`Comparación "${comparison.title}": "${name}" no está en la subcategoría`);
    return { name, label, fromPrice: group.fromPrice };
  });

  const rows = [
    ...comparison.rows.map(({ label, values }) => ({
      label,
      cells: columns.map((column) => values[column.name] ?? '—'),
    })),
    { label: 'Precio', cells: columns.map((column) => `Desde ${formatPrice(column.fromPrice)}`) },
  ];

  return (
    <section aria-labelledby='comparacion-titulo' className='flex w-full max-w-4xl flex-col gap-6 pb-8 md:pb-12'>
      <div className='flex flex-col gap-3'>
        <Eyebrow>Cuál elegir</Eyebrow>
        <h2
          id='comparacion-titulo'
          className='font-display text-3xl font-semibold leading-[1.05] tracking-tight text-tinta lg:text-4xl'
        >
          {comparison.title}
        </h2>
      </div>

      <div className='rounded-card bg-papel-hueso px-4 py-2 tablet:px-8 tablet:py-4'>
        <table className='w-full table-fixed border-collapse text-left text-sm tablet:text-base'>
          <thead>
            <tr>
              <td className='w-[22%] tablet:w-1/5' />
              {columns.map((column) => (
                <th key={column.name} scope='col' className='px-2 py-3 font-display text-lg font-semibold text-tinta'>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, cells }, rowIndex) => (
              <tr key={label} className='border-t border-papel-sombra/70'>
                <th scope='row' className='py-3 pr-2 align-top text-xs font-medium text-tinta-suave tablet:text-sm'>
                  {label}
                </th>
                {cells.map((cell, i) => (
                  <td
                    key={columns[i].name}
                    className={
                      rowIndex === rows.length - 1
                        ? 'px-2 py-3 align-top font-display font-semibold text-tinta'
                        : 'px-2 py-3 align-top text-tinta-media'
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
