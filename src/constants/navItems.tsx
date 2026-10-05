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
import {
  allProducts,
  categoryDetails,
  getCategoryPack,
  getProductById,
  getSubcategoryProducts,
  ProductCategory,
  subcategoryDetails,
  type Pack,
  type Product,
  type SubcategoryDetail,
} from '@/features/products';
import { getCategoryUrl, getProductUrl, getSubcategoryUrl } from '@/lib/routes';

export type NavSlug = ProductCategory;

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

export interface SubMenuEntry {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  chips: SubMenuChip[];
}

export interface SubMenuGroup {
  /* Sin título cuando la categoría no mezcla productos con y sin lácteos. */
  title?: string;
  entries: SubMenuEntry[];
}

export interface SubMenu {
  groups: SubMenuGroup[];
  pack?: Pack;
  /* Total de productos de la categoría, para "Ver los N productos". */
  total: number;
}

export const NAV_ITEMS: NavItem[] = Object.values(ProductCategory).map((category) => ({
  label: categoryDetails[category].title,
  href: getCategoryUrl(category),
  slug: category,
  hasSubMenu: true,
}));

/* Solo lo propio del menú, por slug de subcategoría. Título y enlace salen de subcategoryDetails. */
interface MenuExtras {
  description: string;
  icon: React.ReactNode;
  chips?: { label: string; productId: string }[];
}

const menuExtras: Record<string, MenuExtras> = {
  'kefir-natural': {
    description: 'De vaca y de cabra, sin fruta ni azúcar añadida. En 1 L, 475 ml y 250 ml.',
    icon: <CowIcon className='h-6 w-6' />,
    chips: [
      { label: 'Vaca', productId: 'kefir-vaca-1l' },
      { label: 'Cabra', productId: 'kefir-cabra-1l' },
    ],
  },
  'kefir-frutado': {
    description: 'La cremosidad del kéfir con pulpa de fruta real, endulzado con stevia.',
    icon: <FruitIcon className='h-6 w-6' />,
    chips: [
      { label: 'Fresa', productId: 'kefir-fresa' },
      { label: 'Arándanos', productId: 'kefir-arandanos' },
      { label: 'Aguaymanto', productId: 'kefir-aguaymanto' },
      { label: 'Frutos del bosque', productId: 'kefir-frutos-bosque' },
      { label: 'Chocolate', productId: 'kefir-chocolate' },
    ],
  },
  'kefir-de-agua': {
    description: 'Refrescante, burbujeante y sin lácteos. Probióticos vivos para quien no tolera la leche.',
    icon: <KefirAguaIcon className='h-6 w-6' />,
  },
  kombucha: {
    description: 'Té fermentado con cultivos vivos. Ligera, burbujeante y sin conservantes.',
    icon: <KombuchaIcon className='h-6 w-6' />,
  },
  fermentados: {
    description: 'Fermentados de mesa con probióticos naturales, para acompañar y untar.',
    icon: <CheeseIcon className='h-6 w-6' />,
    chips: [
      { label: 'Chucrut morado', productId: 'chucrut-morado' },
      { label: 'Crema de kéfir', productId: 'crema-de-kefir-aceituna' },
    ],
  },
  'manteca-de-cerdo': {
    description: '100% natural y artesanal, para cocinar, freír y hornear. En cuatro presentaciones.',
    icon: <PigIcon className='h-6 w-6' />,
  },
  mermeladas: {
    description: 'Fruta cocida despacio, sin conservantes. Nada más.',
    icon: <StrawberryIcon className='h-6 w-6' />,
    chips: [
      { label: 'De fresa', productId: 'mermelada-fresa' },
      { label: 'Quito quito', productId: 'mermelada-quito-quito' },
    ],
  },
  despensa: {
    description: 'Los básicos de la cocina, con procedencia.',
    icon: <ButterIcon className='h-6 w-6' />,
    chips: [
      { label: 'Sal de Maras', productId: 'sal-de-maras' },
      { label: 'Vinagre de manzana', productId: 'vinagre-de-manzana' },
    ],
  },
};

type ProductFilter = (product: Product) => boolean;

/* Entrada de una subcategoría con solo los productos que pasan el filtro (null si no queda ninguno). */
const buildEntry = (sub: SubcategoryDetail, keep: ProductFilter): SubMenuEntry | null => {
  if (!getSubcategoryProducts(sub).some(keep)) return null;

  const extras = menuExtras[sub.slug];
  const chips = (extras?.chips ?? [])
    .map(({ label, productId }) => ({ label, product: getProductById(productId) }))
    .filter(({ product }) => keep(product))
    .map(({ label, product }) => ({ label, href: getProductUrl(product.slug) }));

  return {
    label: sub.title,
    href: getSubcategoryUrl(sub.category, sub.slug),
    description: extras?.description,
    icon: extras?.icon,
    chips,
  };
};

const buildGroup = (subs: SubcategoryDetail[], keep: ProductFilter, title?: string): SubMenuGroup => ({
  title,
  entries: subs.map((sub) => buildEntry(sub, keep)).filter((entry): entry is SubMenuEntry => entry !== null),
});

/* Si la categoría mezcla productos con y sin lácteos, el menú se parte en dos grupos (ayuda a intolerantes). */
const buildSubMenu = (category: ProductCategory): SubMenu => {
  const subs = subcategoryDetails.filter((sub) => sub.category === category);
  const products = allProducts.filter((product) => product.category === category);
  const mixesDairy = products.some((p) => p.containsDairy) && products.some((p) => !p.containsDairy);

  return {
    groups: mixesDairy
      ? [
          buildGroup(subs, (p) => !!p.containsDairy, 'Con lácteos'),
          buildGroup(subs, (p) => !p.containsDairy, 'Sin lácteos'),
        ]
      : [buildGroup(subs, () => true)],
    pack: getCategoryPack(category),
    total: products.length,
  };
};

export const SUB_MENUS = Object.fromEntries(
  Object.values(ProductCategory).map((category) => [category, buildSubMenu(category)]),
) as Record<NavSlug, SubMenu>;
