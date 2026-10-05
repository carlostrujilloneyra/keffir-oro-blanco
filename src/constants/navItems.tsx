import {
  ButterIcon,
  CheeseIcon,
  CowIcon,
  FruitIcon,
  KefirAguaIcon,
  KombuchaIcon,
  PigIcon,
  StrawberryIcon,
} from '@/components/ui/icons';
import { getProductUrlById, ProductCategory } from '@/features/products';
import { getCategoryUrl, getSubcategoryUrl } from '@/lib/routes';

export type NavSlug = 'probioticos' | 'tradicionales';

interface NavItem {
  label: string;
  href: string;
  hasSubMenu?: boolean;
  slug: NavSlug;
}

/*
  Atajo a un producto concreto dentro de la subcategoría. Se queda en el nivel
  de sabor o tipo, nunca en la talla: esa la resuelve el SizeSelector de la
  página de producto. Bajar hasta las tallas metería el catálogo entero en el
  header.
*/
interface SubMenuChip {
  label: string;
  href: string;
}

interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  chips?: SubMenuChip[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Probióticos',
    href: getCategoryUrl(ProductCategory.PROBIOTICOS),
    slug: 'probioticos',
    hasSubMenu: true,
  },

  {
    label: 'Tradicionales',
    href: getCategoryUrl(ProductCategory.TRADICIONALES),
    slug: 'tradicionales',
    hasSubMenu: true,
  },
];

export const SUB_MENUS_ITEMS: Partial<Record<NavSlug, SubMenuItem[]>> = {
  probioticos: [
    {
      label: 'Kéfir de leche natural',
      href: getSubcategoryUrl(ProductCategory.PROBIOTICOS, 'kefir-natural'),
      description: 'De vaca y de cabra, sin fruta ni azúcar añadida. En 1 L, 475 ml y 250 ml.',
      icon: <CowIcon className='h-6 w-6' />,
      chips: [
        { label: 'Vaca', href: getProductUrlById('kefir-vaca-1l') },
        { label: 'Cabra', href: getProductUrlById('kefir-cabra-1l') },
      ],
    },
    {
      label: 'Kéfires frutados',
      href: getSubcategoryUrl(ProductCategory.PROBIOTICOS, 'kefir-frutado'),
      description: 'La cremosidad del kéfir con pulpa de fruta real, endulzado con stevia.',
      icon: <FruitIcon className='h-6 w-6' />,
      chips: [
        { label: 'Fresa', href: getProductUrlById('kefir-fresa') },
        { label: 'Arándanos', href: getProductUrlById('kefir-arandanos') },
        { label: 'Aguaymanto', href: getProductUrlById('kefir-aguaymanto') },
        { label: 'Frutos del bosque', href: getProductUrlById('kefir-frutos-bosque') },
        { label: 'Chocolate', href: getProductUrlById('kefir-chocolate') },
      ],
    },
    {
      label: 'Kéfir de agua',
      href: getSubcategoryUrl(ProductCategory.PROBIOTICOS, 'kefir-de-agua'),
      description: 'Refrescante, burbujeante y sin lácteos. Probióticos vivos para quien no tolera la leche.',
      icon: <KefirAguaIcon className='h-6 w-6' />,
    },
    {
      label: 'Kombucha',
      href: getSubcategoryUrl(ProductCategory.PROBIOTICOS, 'kombucha'),
      description: 'Té fermentado con cultivos vivos. Ligera, burbujeante y sin conservantes.',
      icon: <KombuchaIcon className='h-6 w-6' />,
    },
    {
      label: 'Fermentados',
      href: getSubcategoryUrl(ProductCategory.PROBIOTICOS, 'fermentados'),
      description: 'Fermentados de mesa con probióticos naturales, para acompañar y untar.',
      icon: <CheeseIcon className='h-6 w-6' />,
      chips: [
        { label: 'Chucrut morado', href: getProductUrlById('chucrut-morado') },
        { label: 'Crema de kéfir', href: getProductUrlById('crema-de-kefir-aceituna') },
      ],
    },
  ],

  tradicionales: [
    {
      label: 'Manteca de cerdo',
      href: getSubcategoryUrl(ProductCategory.TRADICIONALES, 'manteca-de-cerdo'),
      description: '100% natural y artesanal, para cocinar, freír y hornear. En cuatro presentaciones.',
      icon: <PigIcon className='h-6 w-6' />,
    },
    {
      label: 'Mermeladas',
      href: getSubcategoryUrl(ProductCategory.TRADICIONALES, 'mermeladas'),
      description: 'Fruta cocida despacio, sin conservantes. Nada más.',
      icon: <StrawberryIcon className='h-6 w-6' />,
      chips: [
        { label: 'De fresa', href: getProductUrlById('mermelada-fresa') },
        { label: 'Quito quito', href: getProductUrlById('mermelada-quito-quito') },
      ],
    },
    {
      label: 'Despensa',
      href: getSubcategoryUrl(ProductCategory.TRADICIONALES, 'despensa'),
      description: 'Los básicos de la cocina, con procedencia.',
      icon: <ButterIcon className='h-6 w-6' />,
      chips: [
        { label: 'Sal de Maras', href: getProductUrlById('sal-de-maras') },
        { label: 'Vinagre de manzana', href: getProductUrlById('vinagre-de-manzana') },
      ],
    },
  ],
};
