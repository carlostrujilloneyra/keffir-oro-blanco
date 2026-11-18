export const FPS = 30;
export const ANCHO = 1080;
export const ALTO = 1920;

/*
  Zona segura de TikTok: sin texto en los 220 px de arriba, los 420 de abajo ni los 160 de la derecha.
  Las imágenes sí pueden salir de la zona; el texto nunca.
*/
export const SEGURA = {x0: 72, x1: 920, y0: 220, y1: 1500};

/*
  Subtítulos: blancos sobre placa oscura semitransparente, centrados en el cuadro con el centro al 80 % del alto
  (y ≈ 1525): más abajo los tapa la interfaz de TikTok, Reels y los estados. `x0`-`x1` los mantiene lejos de los botones
  de la derecha. Si chocan con el logo o el nombre de la etiqueta, se mueve o achica el producto: el subtítulo no sube.
  La palabra activa toma el color del sabor (`subtitulo` de cada paleta); en los fondos neutros, el del video.
*/
export const SUBTITULOS = {abajo: 1566, x0: 160, x1: 920, tam: 48, placa: 'rgba(8,8,10,.6)', natural: '#8AD2FF', frutado: '#FF62B0'};

export const FUENTE = {slab: 'AlfaSlab, serif', anton: 'Anton, sans-serif', txt: 'Poppins, sans-serif'};

export const TINTA = '#15130F';
export const PAPEL = '#F8F2E6';
export const AZUL_ETIQUETA = '#1F8FE0';

export type Tono = 'natural' | 'marino' | 'noche' | 'leche' | 'rosa' | 'fresa' | 'grosella' | 'arandanos' | 'uva' | 'frutos' | 'mora' | 'cacao' | 'cacaoNoche' | 'tinta';

export type Paleta = {
  luz: string; // zona iluminada del fondo
  base: string;
  sombra: string; // bordes y piso
  texto: string;
  acento: string; // énfasis dentro de la escena
  cinta: string; // fondo de las cintas
  cintaTexto: string;
  subtitulo?: string; // palabra activa de los subtítulos (si falta, la del video)
};

// Un color por sabor, sacado de las etiquetas. "leche" y "tinta" son los neutros de la marca.
export const PALETAS: Record<Tono, Paleta> = {
  natural: {luz: '#86A7C0', base: '#4C6F8C', sombra: '#213A50', texto: PAPEL, acento: '#A9DDFF', cinta: TINTA, cintaTexto: PAPEL, subtitulo: '#8AD2FF'},
  marino: {luz: '#44688A', base: '#27425B', sombra: '#0F1D2A', texto: PAPEL, acento: '#8FD2FF', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#8AD2FF'},
  // mismo azul oscuro que el fondo de hero-vaca-cabra.png, para fundir la foto con la escena
  noche: {luz: '#11223C', base: '#060F1E', sombra: '#03070F', texto: PAPEL, acento: '#8FD2FF', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#8AD2FF'},
  leche: {luz: '#FFFEFA', base: '#F5EFE3', sombra: '#DCD1BC', texto: TINTA, acento: '#FFD27A', cinta: TINTA, cintaTexto: PAPEL},
  rosa: {luz: '#FFA9C8', base: '#EE5F99', sombra: '#A21D5D', texto: PAPEL, acento: '#FFE38A', cinta: TINTA, cintaTexto: PAPEL, subtitulo: '#FF9EC6'},
  fresa: {luz: '#EC4E70', base: '#BC1F47', sombra: '#5F0A24', texto: PAPEL, acento: '#FFD3DB', cinta: TINTA, cintaTexto: PAPEL, subtitulo: '#FF9EC6'},
  // grosella, uva y cacaoNoche: los fondos oscuros de las fotos IA de fresa, arándanos y chocolate (como "mora" para frutos del bosque)
  grosella: {luz: '#3A121B', base: '#1D0A0E', sombra: '#0F0508', texto: PAPEL, acento: '#FF9EB5', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#FF9EC6'},
  arandanos: {luz: '#B8A0E4', base: '#7D60B7', sombra: '#392466', texto: PAPEL, acento: '#EFE6FF', cinta: TINTA, cintaTexto: PAPEL, subtitulo: '#CDB9FF'},
  uva: {luz: '#2A1D3A', base: '#16101B', sombra: '#0B080E', texto: PAPEL, acento: '#CDB9FF', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#CDB9FF'},
  frutos: {luz: '#F25C9F', base: '#C81F6E', sombra: '#670A38', texto: PAPEL, acento: '#FFE38A', cinta: TINTA, cintaTexto: PAPEL, subtitulo: '#FF62B0'},
  // mismo vino oscuro que el fondo de hero-frutos-bosque-vaso.png
  mora: {luz: '#3D0C28', base: '#1B0511', sombra: '#0D0208', texto: PAPEL, acento: '#FFE38A', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#FF62B0'},
  cacao: {luz: '#916046', base: '#5B3625', sombra: '#24130B', texto: PAPEL, acento: '#F4D6B0', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#E6B48A'},
  cacaoNoche: {luz: '#3A2318', base: '#160D0B', sombra: '#0B0605', texto: PAPEL, acento: '#F0C79E', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#E6B48A'},
  tinta: {luz: '#2E2A24', base: '#181613', sombra: '#090807', texto: PAPEL, acento: '#FFD27A', cinta: PAPEL, cintaTexto: TINTA},
};

// El degradado verde de los botones `primary` de la web (`gradient-verde` en tailwind.config.ts).
export const GRADIENTE_VERDE = 'linear-gradient(135deg, #2F7D52 0%, #1E3A2F 100%)';
