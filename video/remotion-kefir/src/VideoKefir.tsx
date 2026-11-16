import React from 'react';
import type {Caption} from '@remotion/captions';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {InicioCtx} from './anim';
import {Corte} from './componentes/Corte';
import {OLA_FRAMES, OLA_PRE} from './componentes/Ola';
import {LimpioCtx, SinGranoCtx} from './componentes/Fondo';
import {Subtitulos} from './componentes/Subtitulos';
import captionsFrutado from './datos/captions-frutado.json';
import captionsFrutadoEco from './datos/captions-frutado-ecocultivo.json';
import captionsNatural from './datos/captions-natural.json';
import captionsNaturalEco from './datos/captions-natural-ecocultivo.json';
import {familia, type Escena, type Familia, type TipoEscena, type Variante, type VideoKefirProps} from './datos/tipos';
import {Cierre, Combinalo} from './escenas/comunes';
import {Cabra, CierreTienda, Mapa} from './escenas/ecocultivo';
import {FrutaDeVerdad, FrutosDelBosque, GanchoFrutado, Sabor, Stevia} from './escenas/frutado';
import {Beneficios, EscenaServido, GanchoNatural, Lactosa, Origen, QueEs, SinAnadidos} from './escenas/natural';
import {PALETAS, SUBTITULOS, TINTA} from './tema';

const ESCENAS: Record<TipoEscena, React.FC<{e: Escena; variante: Familia}>> = {
  ganchoNatural: GanchoNatural, queEs: QueEs, beneficios: Beneficios, sinAnadidos: SinAnadidos, origen: Origen, lactosa: Lactosa, servido: EscenaServido,
  ganchoFrutado: GanchoFrutado, frutaDeVerdad: FrutaDeVerdad, sabor: Sabor, frutosDelBosque: FrutosDelBosque, stevia: Stevia,
  combinalo: Combinalo, cierre: Cierre,
  cabra: Cabra, mapa: Mapa, cierreTienda: CierreTienda,
};

const CAPTIONS: Record<Variante, Caption[]> = {natural: captionsNatural, frutado: captionsFrutado, 'natural-ecocultivo': captionsNaturalEco, 'frutado-ecocultivo': captionsFrutadoEco};

/*
  Una sola composición para los dos videos: recibe la variante y sus escenas por props.
  El audio de aquí es solo para previsualizar en Studio; el render final va --muted y la mezcla
  (voz + música con ducking + efectos) se hace con ffmpeg, igual que en remotion-sorteo.
*/
export const VideoKefir: React.FC<VideoKefirProps> = ({variante, escenas, voz, musica, musicaDesde}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const fam = familia(variante);
  // la palabra activa del subtítulo usa el color del sabor que está en pantalla; en fondos neutros, el del video
  const colorEn = (t: number) => PALETAS[[...escenas].reverse().find((e) => t >= e.inicio)?.tono ?? escenas[0].tono].subtitulo ?? SUBTITULOS[fam];
  return (
    <AbsoluteFill style={{background: TINTA}}>
      <LimpioCtx.Provider value={fam === 'frutado' || variante !== fam}>
      <SinGranoCtx.Provider value={variante !== fam}>
      {escenas.map((e, i) => {
        const Comp = ESCENAS[e.tipo];
        // cada escena entra OLA_PRE frames antes de su corte y la anterior aguanta hasta que la transición termina
        const desde = Math.round(e.inicio * fps) - (i ? OLA_PRE : 0);
        const hasta = i < escenas.length - 1 ? Math.round(escenas[i + 1].inicio * fps) + OLA_FRAMES - OLA_PRE + 1 : durationInFrames;
        return (
          <Sequence key={e.id} name={e.id} from={desde} durationInFrames={hasta - desde}>
            <InicioCtx.Provider value={desde / fps}>
              <Corte id={e.id} entra={i ? e.transicion ?? 'ola' : undefined} sale={escenas[i + 1] && (escenas[i + 1].transicion ?? 'ola')} dur={hasta - desde} color={e.ola}>
                <Comp e={e} variante={fam} />
              </Corte>
            </InicioCtx.Provider>
          </Sequence>
        );
      })}
      </SinGranoCtx.Provider>
      </LimpioCtx.Provider>
      {/* EcoCultivo: subtítulos 40 px más abajo (SUBTITULOS es de los videos aprobados) */}
      <Subtitulos captions={CAPTIONS[variante]} colorEn={colorEn} abajo={variante !== fam ? SUBTITULOS.abajo + 40 : undefined} />
      <Audio src={staticFile(voz)} />
      <Audio src={staticFile(musica)} trimBefore={Math.round(musicaDesde * fps)} volume={0.16} />
    </AbsoluteFill>
  );
};
