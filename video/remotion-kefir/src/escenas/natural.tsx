import React from 'react';
import {AbsoluteFill, Img, interpolateColors, staticFile} from 'remotion';
import {cl, EIO, muelle, pulso, rampa, SUAVE, useT, vaiven} from '../anim';
import {Fondo, Gotas, Grano} from '../componentes/Fondo';
import {IconoLuna, IconoSol} from '../componentes/Iconos';
import {Foto3D} from '../componentes/Parallax3D';
import {Sello} from '../componentes/Sello';
import {marcaVaso, Servido} from '../componentes/Servido';
import {Cinta, Linea, Sale} from '../componentes/Texto';
import type {Escena} from '../datos/tipos';
import {AZUL_ETIQUETA, PALETAS, PAPEL, SEGURA, TINTA} from '../tema';
import {Destello, FotoHeroe, Halo, Heroe} from './comunes';

type FC = React.FC<{e: Escena}>;
const LECHE = '#F3EEE2';
const DORADO = '#F0C56B'; // tapa dorada: así distingue el cliente el de cabra

/*
  1 · Gancho: desde el frame 0 la botella llega con un punch-in desde el splash de leche y el titular ya está completo.
  En "…y NO lo es" (cue `golpe`): destello, golpe de cámara y la cinta de YOGURT cambia al azul de la etiqueta.
*/
export const GanchoNatural: FC = ({e}) => {
  const t = useT();
  const g = e.cues.golpe;
  const s = muelle(t, e.inicio, true);
  const no = rampa(t, g, g + 0.25);
  const W = 1150, H = (W * 1537) / 1023;
  const z = 1.55 - s * 0.55 + rampa(t, 0.2, g, 0, 0.09, (k) => k) + no * 0.1 + pulso(t, g, 0.06, 0.4) * 0.06 + rampa(t, g + 0.25, g + 2, 0, 0.03, (k) => k);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[56, 60]} />
      <Halo x={600} y={1300} d={1500} fuerza={0.38 + no * 0.2} />
      <Heroe e={e}>
        <Img src={staticFile(e.imagenes!.heroe)} style={{position: 'absolute', left: 600 - W / 2, top: 452, width: W, height: H, transformOrigin: '50% 45%',
          scale: `${z}`, rotate: `${(1 - s) * -9 + pulso(t, g, 0.06, 0.5) * 2.5}deg`, filter: `blur(${(1 - cl(s)) * 12}px) drop-shadow(0 46px 60px rgba(8,22,36,.5))`}} />
      </Heroe>
      <Gotas t={t} color={LECHE} semilla="n1" n={7} zona={[0, 700, 1080, 1900]} />
      <Destello t={t} en={g} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.l1} y={240} tam={150} sombra />
      <div style={{scale: `${1 + pulso(t, g, 0.07, 0.45) * 0.05}`, transformOrigin: '300px 520px', position: 'absolute', inset: 0}}>
        <Linea txt={e.textos.l2} t={t} en={e.cues.l2} y={408} x={SEGURA.x0 + 34} tam={210} marca={interpolateColors(no, [0, 1], [TINTA, AZUL_ETIQUETA])} />
      </div>
    </AbsoluteFill>
  );
};

/*
  Escenas de producto (2, 3, 6 y 8): un solo movimiento de cámara por escena, lento y continuo. La cámara se acerca hacia
  la tapa y el logo y luego se aleja suave (`vaiven`), con una inclinación 3D de pocos grados que deriva apenas.
  El producto se coloca para que el nombre y el logo de la etiqueta queden por encima de los subtítulos (y ≈ 1484-1566).
*/
const camara = (t: number, e: Escena, pico?: number, resto?: number) => {
  const a = e.inicio - 0.3, b = e.fin! + 0.3;
  return {va: vaiven(t, a, b, pico, resto), deriva: rampa(t, a, b, -1, 1, (k) => k)};
};

/*
  2 · Qué es: las dos botellas. El acercamiento llega a 1.49x sobre la foto (tapas, cuellos y logos); más cerca, los logos
  bajarían hasta los subtítulos o las tapas subirían al titular, que por eso va en una sola línea.
  En "hecho a mano" cambia el titular: nunca hay más de 7 palabras en pantalla.
*/
export const QueEs: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono], c = e.cues;
  const {va, deriva} = camara(t, e, 0.55, 0.05);
  return (
    <AbsoluteFill style={{background: '#090B14'}}>
      <Heroe e={e}>
        <Foto3D src={e.imagenes!.heroe} t={t} zoom={1 + va * 0.355} foco={[540, 1112]} incl={[2.2 - deriva * 0.7, -1]} escala={1.1} dy={96} />
      </Heroe>
      <Grano fuerza={0.2} />
      <Sale t={t} en={c.mano - 0.14}>
        <Linea txt={e.textos.cien} t={t} en={c.cien} y={238} tam={112} sombra resalta={e.textos.resalta} colorResalta={p.acento} />
      </Sale>
      <Linea txt={e.textos.mano} t={t} en={c.mano} y={244} tam={96} sombra />
      <Cinta txt={e.textos.lote} t={t} en={c.lote} x={628} y={258} tam={34} fondo={p.cinta} color={p.cintaTexto} />
    </AbsoluteFill>
  );
};

/*
  3 · Beneficios: la botella a la derecha con el zoom lento; a la izquierda, arriba, las tres frases de la etiqueta entran
  una por una con la voz y se quedan hasta el final. La foto baja (`dy`) para dejarles el sitio sobre la tapa.
  El acercamiento llega a 1.55x sobre la foto (tapa, cuello y logo) y vuelve a la botella entera. El foco está elegido para que,
  en el punto más cercano, la base del logo quede justo sobre los subtítulos y la tapa pase a la derecha de las cintas
  (por eso van sin icono: así terminan antes de x = 645, donde empieza la tapa).
*/
export const Beneficios: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono];
  const {va, deriva} = camara(t, e, 0.5, 0);
  return (
    <AbsoluteFill style={{background: '#0B121C'}}>
      <Heroe e={e}>
        <Foto3D src={e.imagenes!.heroe} t={t} zoom={1 + va * 0.49} foco={[600, 1319]} incl={[-2.2 + deriva * 0.7, -0.8]} dy={170} funde={0.14} />
      </Heroe>
      <Grano fuerza={0.2} />
      {e.lista!.map((b, i) => (
        <Cinta key={b.txt} txt={b.txt} t={t} en={b.en} y={240 + i * 92} tam={40} fondo={p.cinta} color={p.cintaTexto} />
      ))}
    </AbsoluteFill>
  );
};

/*
  4 · Sin añadidos: escena clara para cortar el ritmo de las fotos oscuras. Dos marcadores de la etiqueta y, en
  "cien por ciento artesanal", el sello: el primer marcador le deja el sitio. Las botellas se acercan despacio.
*/
export const SinAnadidos: FC = ({e}) => {
  const t = useT(), c = e.cues;
  const s = muelle(t, e.inicio - 0.2);
  const sello = rampa(t, c.sello - 0.2, c.sello + 0.25, 0, 1, EIO);
  const W = 1760, H = (W * 1122) / 1402;
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[50, 62]} />
      <Heroe e={e}>
        <Img src={staticFile(e.imagenes!.heroe)} style={{position: 'absolute', left: 500 - W / 2, top: 610 + (1 - s) * 120, width: W, height: H, transformOrigin: '50% 70%', opacity: cl(s * 3),
          scale: `${1.08 - s * 0.08 + rampa(t, e.inicio, e.fin!, 0, 0.07, (k) => k)}`, filter: 'drop-shadow(0 40px 50px rgba(90,70,30,.3))'}} />
      </Heroe>
      <Gotas t={t} color="#FFFFFF" semilla="n4" n={6} zona={[0, 1250, 1080, 1900]} />
      <Sale t={t} en={c.sello - 0.2}>
        <Linea txt={e.textos.sin1} t={t} en={c.sin1} y={262} x={SEGURA.x0 + 12} tam={72} marca={TINTA} />
      </Sale>
      <Linea txt={e.textos.sin2} t={t} en={c.sin2} y={388 - sello * 126} x={SEGURA.x0 + 12 + (1 - sello) * 30} tam={72} marca={TINTA} />
      <Sello t={t} en={c.sello} x={790} y={494} d={280} centro={e.textos.sello.split('|')} fondo={AZUL_ETIQUETA} color={PAPEL} inclinacion={8} />
    </AbsoluteFill>
  );
};

/*
  Foto héroe de vaca + cabra (hero-vaca-cabra.png, base 1498x1792; trae su fondo azul oscuro, el del tono "noche").
  Medidas dentro de la foto: tapas en y 285, logos hasta y 1060, la de cabra (tapa dorada) centrada en x 1092 y
  separada de la de vaca en x ≈ 872.
*/
const HERO = {k: 0.951, left: -292, top: 319};

/*
  5 · Origen: un solo movimiento. La cámara parte algo cerrada del lado de la de cabra y abre despacio hasta las dos botellas.
  `c1` (cabra de pastoreo libre) deja el sitio a `c2` (ollas de acero quirúrgico).
*/
export const Origen: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono], c = e.cues;
  const s = rampa(t, e.inicio - 0.25, e.inicio + 0.9);
  const abre = rampa(t, e.inicio - 0.3, e.fin! + 0.3, 0, 1, SUAVE);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} plano />
      <Heroe e={e}>
        <FotoHeroe src={e.imagenes!.heroe} k={HERO.k} left={HERO.left} top={HERO.top} arriba={10} origen={`${1040 - abre * 210}px 716px`} escala={1.17 - abre * 0.15} opacidad={cl(s * 2.2)} incl={[1.6 - abre * 3.2, 0.8]} />
      </Heroe>
      <Grano fuerza={0.22} />
      <Gotas t={t} color={LECHE} semilla="n5" n={4} zona={[0, 1620, 1080, 1900]} />
      <Linea txt={e.textos.titulo} t={t} en={c.titulo} y={240} tam={150} sombra resalta={e.textos.resalta} colorResalta={DORADO} />
      {/* sin cintas: solo el titular (variantes cuya voz no las nombra) */}
      {e.textos.c1 && (
        <>
          <Sale t={t} en={c.c2 - 0.3}>
            <Cinta txt={e.textos.c1} t={t} en={c.c1} y={428} tam={40} fondo={p.cinta} color={p.cintaTexto} />
          </Sale>
          <Cinta txt={e.textos.c2} t={t} en={c.c2} y={428} tam={40} fondo={p.cinta} color={p.cintaTexto} />
        </>
      )}
    </AbsoluteFill>
  );
};

/*
  6 · Lactosa, en dos tiempos unidos por un fundido. Primero la botella de 475 ml con el vaso que rebalsa ("Bajos en lactosa").
  En "el de cabra…" pasa a la foto héroe encuadrada solo en la botella de cabra: la de vaca se oculta con la máscara
  (`izq`, justo en la separación entre las dos) y la cámara se acerca a la etiqueta "de leche de cabra".
  El zoom del segundo tiempo crece desde la base del logo, que así no baja hacia los subtítulos.
*/
const CABRA = {k: 1.18, left: -549, top: 204};
export const Lactosa: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono], c = e.cues;
  // sin cue `cabra` la escena se queda en el primer tiempo (el acercamiento sigue hasta el final)
  const cabra = c.cabra ?? e.fin! + 0.3;
  const b = c.cabra === undefined ? 0 : rampa(t, cabra - 0.3, cabra + 0.3, 0, 1, EIO);
  const a = e.inicio - 0.3;
  return (
    <AbsoluteFill style={{background: '#0B121C'}}>
      <Heroe e={e}>
        {b < 1 && <Foto3D src={e.imagenes!.heroe} t={t} zoom={1 + rampa(t, a, cabra + 0.3, 0, 0.12, SUAVE)} foco={[777, 1010]} incl={[-2 + rampa(t, a, cabra, 0, 1.2, (k) => k), -0.8]} dy={70} funde={0.1} />}
        {b > 0 && (
          <AbsoluteFill style={{opacity: b}}>
            <Fondo tono={e.tono} t={t} plano />
            <FotoHeroe src={e.imagenes!.cabra} k={CABRA.k} left={CABRA.left} top={CABRA.top} arriba={10} izq={[58.3, 59.3]} origen={`${1092 * CABRA.k}px ${1060 * CABRA.k}px`}
              escala={1 + rampa(t, c.cabra - 0.3, e.fin! + 0.3, 0, 0.11, SUAVE)} incl={[2 - rampa(t, c.cabra, e.fin!, 0, 1.2, (k) => k), 0.8]} />
          </AbsoluteFill>
        )}
      </Heroe>
      <Grano fuerza={0.2} />
      <Gotas t={t} color={LECHE} semilla="n6" n={4} zona={[0, 1620, 1080, 1900]} />
      <Sale t={t} en={cabra - 0.25}>
        <Linea txt={e.textos.l1} t={t} en={c.l1} y={240} tam={150} sombra />
        <Linea txt={e.textos.l2} t={t} en={c.l2} y={396} tam={150} sombra color={p.acento} />
        <Cinta txt={e.textos.c1} t={t} en={c.c1} y={584} tam={38} fondo={p.cinta} color={p.cintaTexto} />
      </Sale>
      {e.textos.l3 && (
        <>
          <Linea txt={e.textos.l3} t={t} en={c.cabra} y={240} tam={138} sombra resalta={e.textos.resalta} colorResalta={DORADO} />
          <Cinta txt={e.textos.c2} t={t} en={c.c2} y={416} tam={40} fondo={p.cinta} color={p.cintaTexto} />
        </>
      )}
    </AbsoluteFill>
  );
};

/*
  7 · ¿Primera vez?: la botella se destapa, se inclina y llena el shot hasta la línea de 30 ml mientras el contador sube.
  El titular deja el sitio a los dos momentos del día (cue `pasos`).
*/
const ICONOS_PASOS = [IconoSol, IconoLuna];
export const EscenaServido: FC = ({e}) => {
  const t = useT(), c = e.cues;
  const vaso: [number, number] = [300, 1374];
  const m = marcaVaso(vaso);
  // mismo llenado que dibuja Servido: el número llega a 30 cuando el kéfir toca la línea
  const ml = Math.round(rampa(t, c.sirve + 0.3, c.lleno, 0, 30, (k) => 1 - (1 - k) ** 1.2));
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[30, 62]} piso={false} />
      <AbsoluteFill style={{scale: `${1 + rampa(t, e.inicio, e.inicio + 4.4, 0, 0.06, (k) => k)}`, transformOrigin: '30% 72%'}}>
        <Halo x={330} y={1200} d={900} color="#9CCBF0" fuerza={0.34} />
        {/* mesa: una línea de horizonte detrás del vaso y un plano que se apaga hacia abajo */}
        <div style={{position: 'absolute', left: -80, right: -80, top: 1296, height: 700, background: 'linear-gradient(to bottom, rgba(140,185,225,.2) 0%, rgba(140,185,225,.07) 22%, rgba(8,16,24,.35) 100%)'}} />
        <div style={{position: 'absolute', left: -80, right: -80, top: 1295, height: 3, background: 'linear-gradient(to right, transparent, rgba(190,220,245,.5) 30%, rgba(190,220,245,.5) 70%, transparent)'}} />
        <Heroe e={e}>
          <Servido t={t} vaso={vaso} boca={[462, 850]} cues={{inclina: c.inclina, sirve: c.sirve, lleno: c.lleno, fin: c.fin}} />
        </Heroe>
        <Linea txt={`${ml} ml`} t={t} en={c.sirve + 0.25} x={m.x} y={m.y - 72} tam={150} />
      </AbsoluteFill>
      <Sale t={t} en={c.pasos - 0.2}>
        <Linea txt={e.textos.titulo} t={t} en={c.titulo} y={240} tam={136} />
      </Sale>
      {e.lista!.map((paso, i) => {
        const Icono = ICONOS_PASOS[i];
        const y = 250 + i * 118;
        const p = rampa(t, paso.en, paso.en + 0.4);
        return (
          <React.Fragment key={paso.txt}>
            <div style={{position: 'absolute', left: SEGURA.x0, top: y + 12, opacity: p, scale: `${0.9 + p * 0.1}`}}>
              <Icono tam={70} color={PALETAS[e.tono].acento} />
            </div>
            <Linea txt={paso.txt} t={t} en={paso.en} x={SEGURA.x0 + 96} y={y} tam={92} escalon={0.05} />
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
