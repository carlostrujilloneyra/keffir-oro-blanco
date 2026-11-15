export const FPS = 30;
export const ANCHO = 1080;
export const ALTO = 1920;

/*
  Zona segura de TikTok: sin texto en los 220 px de arriba, los 420 de abajo ni los 160 de la derecha.
  Las imágenes sí pueden salir de la zona; el texto nunca.
*/
export const SEGURA = {x0: 72, x1: 920, y0: 220, y1: 1500};

/*
  Subtítulos: blancos sobre placa oscura semitransparente, con el borde inferior justo encima de la zona de 420 px.
  La palabra activa toma el color del sabor (`subtitulo` de cada paleta); en los fondos neutros, el del video.
*/
export const SUBTITULOS = {abajo: 1480, tam: 48, placa: 'rgba(8,8,10,.6)', natural: '#8AD2FF', frutado: '#FF62B0'};

export const FUENTE = {slab: 'AlfaSlab, serif', anton: 'Anton, sans-serif', txt: 'Poppins, sans-serif'};

export const TINTA = '#15130F';
export const PAPEL = '#F8F2E6';
export const AZUL_ETIQUETA = '#1F8FE0';

export type Tono = 'natural' | 'marino' | 'noche' | 'leche' | 'rosa' | 'fresa' | 'arandanos' | 'frutos' | 'mora' | 'cacao' | 'tinta';

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
  arandanos: {luz: '#B8A0E4', base: '#7D60B7', sombra: '#392466', texto: PAPEL, acento: '#EFE6FF', cinta: TINTA, cintaTexto: PAPEL, subtitulo: '#CDB9FF'},
  frutos: {luz: '#F25C9F', base: '#C81F6E', sombra: '#670A38', texto: PAPEL, acento: '#FFE38A', cinta: TINTA, cintaTexto: PAPEL, subtitulo: '#FF62B0'},
  // mismo vino oscuro que el fondo de hero-frutos-bosque-vaso.png
  mora: {luz: '#3D0C28', base: '#1B0511', sombra: '#0D0208', texto: PAPEL, acento: '#FFE38A', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#FF62B0'},
  cacao: {luz: '#916046', base: '#5B3625', sombra: '#24130B', texto: PAPEL, acento: '#F4D6B0', cinta: PAPEL, cintaTexto: TINTA, subtitulo: '#E6B48A'},
  tinta: {luz: '#2E2A24', base: '#181613', sombra: '#090807', texto: PAPEL, acento: '#FFD27A', cinta: PAPEL, cintaTexto: TINTA},
};
