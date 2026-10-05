import Link from 'next/link';
import { NAV_ITEMS, NavSlug, SUB_MENUS_ITEMS } from '@/constants/navItems';

interface Props {
  slug: NavSlug;
}

export const SubMenu = ({ slug }: Props) => {
  const parent = NAV_ITEMS.find((item) => item.slug === slug);

  return (
    <div className='invisible absolute left-1/2 top-full z-50 w-[460px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100'>
      <ul className='flex flex-col gap-1 rounded-[18px] border border-papel-sombra bg-papel p-3 shadow-[0_18px_45px_-12px_rgba(22,32,26,0.28)]'>
        {SUB_MENUS_ITEMS[slug]?.map(({ label, href, description, icon, chips }, index) => (
          /*
            La tarjeta no es un <a>: los chips son enlaces propios y anidar
            anclas es HTML inválido. El hover se pinta sobre el <li>.
          */
          <li key={index} className='grid grid-cols-[auto_1fr] gap-3 rounded-[12px] p-3 hover:bg-papel-hueso'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-verde/10 text-verde'>
              {icon}
            </span>

            <div className='min-w-0'>
              <Link
                href={href}
                onClick={(e) => e.currentTarget.blur()}
                className='text-sm font-semibold text-tinta transition-colors hover:text-verde focus-visible:underline focus-visible:outline-none'
              >
                {label}
              </Link>

              <p className='mt-0.5 line-clamp-2 text-xs leading-snug text-tinta-suave md:text-[13px]'>{description}</p>

              {chips && (
                /* Atajo directo al producto, sin abrir otro nivel de menú. */
                <ul className='mt-2 flex flex-wrap gap-1.5'>
                  {chips.map((chip) => (
                    <li key={chip.href}>
                      <Link
                        href={chip.href}
                        onClick={(e) => e.currentTarget.blur()}
                        /*
                          Velo de tinta, no bg-papel: el chip se apoya sobre
                          papel (reposo) o papel-hueso (tarjeta en hover), y un
                          color sólido coincidía con uno de los dos. Sin borde,
                          para que pese menos que la descripción de arriba.
                        */
                        className='inline-flex rounded-full bg-tinta/[0.06] px-2.5 py-1 text-[11px] font-medium text-tinta-media transition-colors hover:bg-verde/15 hover:text-verde focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde'
                      >
                        {chip.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}

        {parent && (
          <li className='mt-1 border-t border-papel-sombra/70 pt-2'>
            <Link
              href={parent.href}
              onClick={(e) => e.currentTarget.blur()}
              className='flex items-center justify-center gap-1.5 rounded-[12px] px-3 py-2 text-sm font-semibold text-verde transition-colors hover:bg-verde/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde'
            >
              Ver todo en {parent.label}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
