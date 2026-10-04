import { type Product } from '../types/product.type';

const BASE = '/assets/images/splashes';

export interface SplashLayer {
  src: string;
  /** Posición y tamaño de la capa dentro del panel (clases Tailwind). */
  className: string;
  /** Retardo de la animación para escalonar la entrada. */
  delay?: string;
}

// Frutados: dos splashes grandes anclados abajo, uno a cada lado — enmarcan la
// base de la botella como las esquinas inferiores de la etiqueta física.
const X_LEFT = 'left-[-16%]';
const X_RIGHT = 'right-[-16%]';
const SIZE = 'h-[72%] w-[74%]'; // tamaño por defecto
const SIZE_LG = 'h-[96%] w-[98%]'; // un poco más grande (arándanos)

/** Composición de 2 capas grandes: abajo-izquierda y abajo-derecha.
    `posY` permite bajar/subir el par (por defecto pegado abajo). */
const leftRight = (left: string, right: string, size: string = SIZE, posY: string = 'bottom-[-4%]'): SplashLayer[] => [
  { src: `${BASE}/${left}`, className: `${posY} ${X_LEFT} ${size}`, delay: '0ms' },
  { src: `${BASE}/${right}`, className: `${posY} ${X_RIGHT} ${size}`, delay: '90ms' },
];

/** Un solo splash centrado detrás de la botella (natural/chocolate).
    `box` permite agrandarlo (p. ej. `-inset-[16%]` lo hace desbordar y verse más grande). */
const centered = (src: string, box: string = 'inset-0'): SplashLayer[] => [{ src: `${BASE}/${src}`, className: box }];

/*
  Splash por sabor (grupo `name`). Aparece al hover, o fijo cuando la card está
  destacada (centro del coverflow). Todos los PNG son transparentes.
  - Natural (leche vaca/cabra): un splash centrado.
  - Frutados: dos splashes grandes izq/der en la parte inferior.
*/
const SPLASHES: Record<string, SplashLayer[]> = {
  'kefir-leche-vaca': centered('leche/splash1.png', 'inset-0 translate-y-[8%] rotate-[30deg] translate-x-4'),
  'kefir-leche-cabra': centered('leche/splash1.png', 'inset-0 translate-y-[8%] rotate-[30deg] translate-x-4'),
  'kefir-pulpa-fresa': leftRight('fresa/fresas-2.png', 'fresa/fresas-3.png'),
  'kefir-pulpa-arandanos': leftRight(
    'arandanos/arandanos-1.png',
    'arandanos/arandanos-2.png',
    SIZE_LG,
    'bottom-[-12%]',
  ),
  'kefir-aguaymanto': leftRight('aguaymanto/aguaymantos-1.png', 'aguaymanto/aguaymantos-3.png'),
  'kefir-chocolate': centered('chocolate/chocolate-1.png', '-inset-[22%]'),
  'kefir-frutos-bosque': leftRight('arandanos/arandanos-2.png', 'arandanos/arandanos-1.png'),
};

export const getProductSplash = (product: Product): SplashLayer[] => SPLASHES[product.name] ?? [];
