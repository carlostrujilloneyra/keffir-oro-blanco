import React from 'react';
import type {Caption} from '@remotion/captions';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {InicioCtx} from './anim';
import {Corte} from './componentes/Corte';
import {OLA_FRAMES, OLA_PRE} from './componentes/Ola';
import {LimpioCtx} from './componentes/Fondo';
import {Subtitulos} from './componentes/Subtitulos';
import captionsFrutado from './datos/captions-frutado.json';
import captionsNatural from './datos/captions-natural.json';
import type {Escena, TipoEscena, VideoKefirProps} from './datos/tipos';
import {Cierre, Combinalo} from './escenas/comunes';
import {FrutaDeVerdad, FrutosDelBosque, GanchoFrutado, Sabor, Stevia} from './escenas/frutado';
import {Beneficios, EscenaServido, GanchoNatural, Lactosa, Origen, QueEs, SinAnadidos} from './escenas/natural';
import {PALETAS, SUBTITULOS, TINTA} from './tema';

const ESCENAS: Record<TipoEscena, React.FC<{e: Escena; variante: VideoKefirProps['variante']}>> = {
  ganchoNatural: GanchoNatural, queEs: QueEs, beneficios: Beneficios, sinAnadidos: SinAnadidos, origen: Origen, lactosa: Lactosa, servido: EscenaServido,
  ganchoFrutado: GanchoFrutado, frutaDeVerdad: FrutaDeVerdad, sabor: Sabor, frutosDelBosque: FrutosDelBosque, stevia: Stevia,
  combinalo: Combinalo, cierre: Cierre,
};

const CAPTIONS: Record<VideoKefirProps['variante'], Caption[]> = {natural: captionsNatural, frutado: captionsFrutado};

/*
  Una sola composición para los dos videos: recibe la variante y sus escenas por props.
  El audio de aquí es solo para previsualizar en Studio; el render final va --muted y la mezcla
  (voz + música con ducking + efectos) se hace con ffmpeg, igual que en remotion-sorteo.
*/
export const VideoKefir: React.FC<VideoKefirProps> = ({variante, escenas, voz, musica, musicaDesde}) => {
  const {fps, durationInFrames} = useVideoConfig();
  // la palabra activa del subtítulo usa el color del sabor que está en pantalla; en fondos neutros, el del video
  const colorEn = (t: number) => PALETAS[[...escenas].reverse().find((e) => t >= e.inicio)?.tono ?? escenas[0].tono].subtitulo ?? SUBTITULOS[variante];
  return (
    <AbsoluteFill style={{background: TINTA}}>
      <LimpioCtx.Provider value={variante === 'frutado'}>
      {escenas.map((e, i) => {
        const Comp = ESCENAS[e.tipo];
        // cada escena entra OLA_PRE frames antes de su corte y la anterior aguanta hasta que la transición termina
        const desde = Math.round(e.inicio * fps) - (i ? OLA_PRE : 0);
        const hasta = i < escenas.length - 1 ? Math.round(escenas[i + 1].inicio * fps) + OLA_FRAMES - OLA_PRE + 1 : durationInFrames;
        return (
          <Sequence key={e.id} name={e.id} from={desde} durationInFrames={hasta - desde}>
            <InicioCtx.Provider value={desde / fps}>
              <Corte id={e.id} entra={i ? e.transicion ?? 'ola' : undefined} sale={escenas[i + 1] && (escenas[i + 1].transicion ?? 'ola')} dur={hasta - desde} color={e.ola}>
                <Comp e={e} variante={variante} />
              </Corte>
            </InicioCtx.Provider>
          </Sequence>
        );
      })}
      </LimpioCtx.Provider>
      <Subtitulos captions={CAPTIONS[variante]} colorEn={colorEn} />
      <Audio src={staticFile(voz)} />
      <Audio src={staticFile(musica)} trimBefore={Math.round(musicaDesde * fps)} volume={0.16} />
    </AbsoluteFill>
  );
};
