import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { PackCard } from '@/features/products/components/PackCard';
import { NAV_ITEMS, NavSlug, SUB_MENUS, type SubMenuEntry } from '@/constants/navItems';

type ClickHandler = (e: React.MouseEvent<HTMLElement>) => void;

const EntryItem = ({ label, href, description, icon, chips, onClick }: SubMenuEntry & { onClick: ClickHandler }) => (
  /*
    La tarjeta no es un <a>: los chips son enlaces propios y anidar
    anclas es HTML inválido. El hover se pinta sobre el <li>.
  */
  <li className='grid grid-cols-[auto_1fr] gap-3 rounded-[8px] p-3 hover:bg-papel-hueso'>
    <span className='flex h-6 w-6 items-center justify-center text-verde'>{icon}</span>

    <div className='min-w-0'>
      <Link
        href={href}
        onClick={onClick}
        className='text-sm font-semibold text-tinta transition-colors hover:text-verde focus-visible:underline focus-visible:outline-none'
      >
        {label}
      </Link>

      {description && (
        <p className='mt-0.5 line-clamp-2 text-xs leading-snug text-tinta-suave md:text-[13px]'>{description}</p>
      )}

      {chips.length > 0 && (
        /* Atajo directo al producto, sin abrir otro nivel de menú. */
        <ul className='mt-2 flex flex-wrap gap-1.5'>
          {chips.map((chip) => (
            <li key={chip.href}>
              <Link
                href={chip.href}
                onClick={onClick}
                /* Velo de tinta: se apoya igual sobre papel (reposo) y papel-hueso (hover). */
                className='inline-flex rounded-[4px] bg-tinta/[0.06] px-2.5 py-1 text-xs font-medium text-tinta-media transition-colors hover:bg-verde/15 hover:text-verde focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde'
              >
                {chip.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  </li>
);

type SubMenuProps = { slug: NavSlug; closed?: boolean; onNavigate?: () => void };

export const SubMenu = ({ slug, closed = false, onNavigate }: SubMenuProps) => {
  const parent = NAV_ITEMS.find((item) => item.slug === slug);

  /* Quita el foco al clicar: el panel también abre por :focus-within. */
  const handleClick: ClickHandler = (e) => {
    e.currentTarget.blur();
    onNavigate?.();
  };
  const { groups, pack, total } = SUB_MENUS[slug];
  const columns = groups.length + (pack ? 1 : 0);

  return (
    /* Se centra respecto del <ul> del NavBar (no del ítem) para que un panel ancho no se salga. */
    <div
      className={cn(
        'invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200',
        !closed &&
          'group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100',
      )}
    >
      <div
        className={cn(
          'rounded-card border border-papel-sombra bg-papel shadow-[0_18px_45px_-12px_rgba(22,32,26,0.28)]',
          columns > 1 ? 'w-[min(960px,calc(100vw-4rem))]' : 'w-[460px]',
        )}
      >
        <div
          className={cn(
            'grid gap-6 p-5',
            columns === 3 && 'grid-cols-[1fr_1fr_0.85fr]',
            columns === 2 && 'grid-cols-2',
          )}
        >
          {groups.map((group, index) => (
            <div key={group.title ?? index} className='flex flex-col gap-2'>
              {group.title && <Eyebrow className='mb-1 ml-3'>{group.title}</Eyebrow>}
              <ul className='flex flex-col gap-1'>
                {group.entries.map((entry) => (
                  <EntryItem key={entry.href} {...entry} onClick={handleClick} />
                ))}
              </ul>
            </div>
          ))}

          {pack && <PackCard pack={pack} />}
        </div>

        {parent && (
          <div className='border-t border-papel-sombra/70 px-5 py-3'>
            <Link
              href={parent.href}
              onClick={handleClick}
              className='text-sm font-semibold text-verde underline decoration-verde/30 underline-offset-4 transition-colors hover:decoration-verde focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde'
            >
              Ver los {total} productos de {parent.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
