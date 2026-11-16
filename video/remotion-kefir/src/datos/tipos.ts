import type {Tono} from '../tema';

export type TipoEscena =
  | 'ganchoNatural' | 'queEs' | 'beneficios' | 'sinAnadidos' | 'origen' | 'lactosa' | 'servido'
  | 'ganchoFrutado' | 'frutaDeVerdad' | 'sabor' | 'frutosDelBosque' | 'stevia'
  | 'combinalo' | 'cierre'
  | 'cabra' | 'mapa' | 'cierreTienda';

// Cómo entra una escena (componentes/Corte.tsx). Sin indicar, el barrido de Ola.
export type Transicion = 'ola' | 'fundido' | 'whip' | 'whipIzq' | 'flash' | 'zoom';

/*
  Una escena = un tramo de la voz. `inicio` y `cues` están en segundos de la voz (transcripción de Whisper):
  al regrabar la voz solo se actualizan estos números.
  - `transicion` y `ola`: cómo entra la escena y el color que trae (franja del barrido o destello): el del sabor que llega.
  - `lista[].pulso`: segundo en que la voz nombra ese ítem, si el ítem se muestra antes (ver regla de 1.5 s abajo).
  - `clip`: video real (en public/) que reemplaza al visual de producto de la escena cuando existan grabaciones.
  - `foto`: segundo(s) del frame más cargado; de ahí sale el storyboard.
  Regla de lectura: ningún texto sale de pantalla antes de 1.5 s de haber terminado de aparecer. Por eso algunos
  cues van un poco antes que la palabra de la voz (los subtítulos sí van palabra por palabra).
*/
export type Escena = {
  id: string;
  tipo: TipoEscena;
  inicio: number;
  tono: Tono;
  textos: Record<string, string>;
  cues: Record<string, number>;
  lista?: {txt: string; nota?: string; en: number; pulso?: number}[];
  imagenes?: Record<string, string>;
  transicion?: Transicion;
  ola?: string;
  clip?: {src: string; desde?: number};
  foto: number[];
  enGolpe?: 'golpe' | 'medio' | 'voz'; // lo rellena ritmo.ts: dónde cayó el corte respecto a la música
  fin?: number; // lo rellena ritmo.ts: inicio de la escena siguiente (o fin del video); con él se reparte el movimiento de cámara
};

export type Variante = 'natural' | 'frutado' | 'natural-ecocultivo' | 'frutado-ecocultivo';
// Las variantes de biotienda heredan el aspecto de su video base (fondo limpio del frutado, color de subtítulos, cierre)
export type Familia = 'natural' | 'frutado';
export const familia = (v: Variante): Familia => (v.startsWith('frutado') ? 'frutado' : 'natural');

export type VideoKefirProps = {
  variante: Variante;
  duracion: number;
  voz: string;
  musica: string;
  musicaDesde: number; // segundos que se recorta el inicio de la música para cuadrar los golpes (lo calcula ritmo.ts)
  escenas: Escena[];
};
