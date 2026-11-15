import type {Tono} from '../tema';

export type TipoEscena =
  | 'ganchoNatural' | 'queEs' | 'beneficios' | 'diferencia' | 'servido' | 'primeraVez'
  | 'ganchoFrutado' | 'frutaDeVerdad' | 'sabor' | 'frutosDelBosque' | 'chocolate' | 'todos'
  | 'combinalo' | 'cierre';

/*
  Una escena = un tramo de la voz. `inicio` y `cues` están en segundos de la voz (transcripción de Whisper):
  al regrabar la voz solo se actualizan estos números.
  - `ola`: color de la franja del barrido que trae esta escena (el del sabor que llega).
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
  ola?: string;
  clip?: {src: string; desde?: number};
  foto: number[];
  enGolpe?: 'golpe' | 'medio' | 'voz'; // lo rellena ritmo.ts: dónde cayó el corte respecto a la música
};

export type VideoKefirProps = {
  variante: 'natural' | 'frutado';
  duracion: number;
  voz: string;
  musica: string;
  musicaDesde: number; // segundos que se recorta el inicio de la música para cuadrar los golpes (lo calcula ritmo.ts)
  escenas: Escena[];
};
