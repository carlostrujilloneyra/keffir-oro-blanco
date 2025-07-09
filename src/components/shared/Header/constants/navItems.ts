interface NavItem {
  label: string;
  href: string;
  slug: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Lácteos',
    href: '/categorias/lacteos', //leche, mantequilla, queso
    slug: 'lacteos',
  },

  {
    label: 'Bebidas Fermentadas',
    href: '/categorias/bebidas-fermentadas', //kefir de agua, kefir de leche, kombucha
    slug: 'bebidas-fermentadas',
  },

  {
    label: 'Kéfir Frutado',
    href: '/categorias/kefir-frutado', // variedades de kefir frutado
    slug: 'kefir-frutado',
  },

  {
    label: 'Tradicionales',
    href: '/categorias/tradicionales', // manteca de cerdo, mermelada
    slug: 'tradicionales',
  },
];
