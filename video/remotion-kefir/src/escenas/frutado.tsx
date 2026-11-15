import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {cl, muelle, rampa, useT} from '../anim';
import {Fondo, Gotas, Grano} from '../componentes/Fondo';
import {Parallax3D} from '../componentes/Parallax3D';
import {Producto} from '../componentes/Producto';
import {Sello} from '../componentes/Sello';
import {Cinta, Dato, Linea} from '../componentes/Texto';
import type {Escena} from '../datos/tipos';
import {PALETAS, PAPEL, SEGURA, TINTA} from '../tema';
import {FotoHeroe, Halo, Heroe} from './comunes';

type FC = React.FC<{e: Escena}>;

// Medidas reales de cada splash (px), para escalarlos sin deformar.
const MEDIDAS: Record<string, [number, number]> = {
  'img/sp-fresa1.png': [575, 491], 'img/sp-fresa2.png': [448, 487], 'img/sp-ara1.png': [573, 723], 'img/sp-ara2.png': [467, 656], 'img/chocolate-splash.png': [736, 1104],
};

/*
  Splash de fruta: explota con escala + giro y un desenfoque de movimiento que se resuelve al asentarse.
  `foco` > 0 lo deja desenfocado (primer plano); `cae` lo trae desde arriba.
*/
const Splash: React.FC<{src: string; x: number; y: number; t: number; en: number; escala?: number; rot?: number; foco?: number; cae?: number; deriva?: number}> = ({src, x, y, t, en, escala = 1, rot = 0, foco = 0, cae = 0, deriva = 10}) => {
  const [w, h] = MEDIDAS[src];
  const s = muelle(t, en, true);
  const mov = (1 - cl(s)) * 16;
  return (
    <Img src={staticFile(src)} style={{position: 'absolute', left: x - (w * escala) / 2, top: y - (h * escala) / 2 - (1 - s) * cae + Math.sin(t * 0.9 + x) * deriva, width: w * escala, height: h * escala,
      scale: `${0.45 + s * 0.55}`, rotate: `${rot - (1 - s) * 38}deg`, opacity: cl(s * 4), filter: `blur(${foco + mov}px)`}} />
  );
};

// 1 · Gancho: el trío de frutados con fruta cayendo.
export const GanchoFrutado: FC = ({e}) => {
  const t = useT();
  const s = muelle(t, e.inicio, true);
  const W = 1160, H = (W * 1402) / 1122;
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[50, 62]} />
      <Halo x={540} y={1250} d={1500} fuerza={0.4} />
      <Splash src="img/sp-fresa2.png" x={930} y={560} t={t} en={0.05} escala={0.8} rot={18} foco={3} cae={520} />
      <Heroe e={e}>
        <Img src={staticFile(e.imagenes!.heroe)} style={{position: 'absolute', left: 540 - W / 2, top: 577 + (1 - s) * 90, width: W, height: H, transformOrigin: '50% 70%',
          scale: `${1.22 - s * 0.22 + rampa(t, 0.4, 4.6, 0, 0.05, (k) => k)}`, filter: 'drop-shadow(0 40px 50px rgba(110,10,60,.42))'}} />
      </Heroe>
      <Splash src="img/sp-ara2.png" x={40} y={1720} t={t} en={0.3} escala={0.95} rot={-14} foco={9} cae={900} />
      <Splash src="img/sp-fresa1.png" x={1050} y={1780} t={t} en={0.5} escala={1.05} rot={24} foco={12} cae={1100} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.l1} y={240} tam={164} sombra />
      <Linea txt={e.textos.l2} t={t} en={e.cues.l2} y={400} tam={164} sombra />
      <Dato t={t} en={e.cues.apoyo} y={570} tam={36} peso={600}>{e.textos.apoyo}</Dato>
      <Cinta txt={e.textos.cinta} t={t} en={e.cues.cinta} y={624} tam={34} />
    </AbsoluteFill>
  );
};

// Mancha de color que deja la fruta sobre el fondo de leche.
const Mancha: React.FC<{x: number; y: number; d: number; color: string; p: number}> = ({x, y, d, color, p}) => (
  <div style={{position: 'absolute', left: x - d / 2, top: y - d / 2, width: d, height: d * 0.86, borderRadius: '46% 54% 58% 42% / 52% 44% 56% 48%', background: `radial-gradient(circle at 46% 46%, ${color} 0%, ${color} 38%, transparent 72%)`,
    opacity: cl(p * 2) * 0.62, scale: `${0.3 + p * 0.7}`, filter: 'blur(26px)'}} />
);

// 2 · Fruta de verdad: sobre fondo de leche, cada splash tiñe lo que toca; el rojo de la fresa trae la escena siguiente.
export const FrutaDeVerdad: FC = ({e}) => {
  const t = useT();
  const rojo = PALETAS.fresa.base;
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[40, 34]} />
      <Mancha x={236} y={1660} d={860} color={PALETAS.arandanos.luz} p={rampa(t, e.cues.sin1, e.cues.sin1 + 1.6)} />
      <Mancha x={650} y={1340} d={1250} color={PALETAS.fresa.luz} p={rampa(t, e.cues.color - 0.2, e.cues.color + 1.2)} />
      <Splash src="img/sp-ara1.png" x={230} y={1640} t={t} en={e.cues.sin1 - 0.1} escala={1.15} rot={-10} />
      <Splash src="img/sp-fresa1.png" x={640} y={1330} t={t} en={e.cues.color - 0.25} escala={1.8} rot={4} />
      <Splash src="img/sp-ara2.png" x={1010} y={1800} t={t} en={e.cues.sin2} escala={0.95} rot={20} foco={10} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.l1} y={240} tam={212} color={TINTA} />
      <Linea txt={e.textos.l2} t={t} en={e.cues.l2} y={446} tam={212} color={rojo} />
      <Cinta txt={e.textos.sin1} t={t} en={e.cues.sin1} y={694} tam={36} />
      <Cinta txt={e.textos.sin2} t={t} en={e.cues.sin2} y={784} x={SEGURA.x0 + 34} tam={36} />
      <Linea txt={e.textos.color} t={t} en={e.cues.color} y={896} tam={86} color={rojo} escalon={0.06} />
    </AbsoluteFill>
  );
};

/*
  3 y 4 · Fresa y Arándanos comparten encuadre a propósito: las dos fotos de vertido tienen la misma pose,
  así el corte entre ellas se lee como un mismo vaso que cambia de sabor (match cut).
*/
export const Sabor: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono];
  const s = muelle(t, e.inicio - 0.25, true);
  const tam = Number(e.textos.tam);
  const W = 880, H = 1321;
  const yCinta = 306 + tam + 42;
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[66, 50]} />
      <Halo x={740} y={1150} d={1400} color={p.luz} fuerza={0.6} />
      <Splash src={e.imagenes!.splash1} x={870} y={1650} t={t} en={e.inicio - 0.15} escala={Number(e.textos.escalaSplash)} rot={8} />
      <Linea txt={e.textos.pre} t={t} en={e.cues.nombre - 0.12} y={240} tam={58} fuente="slab" />
      <Linea txt={e.textos.nombre} t={t} en={e.cues.nombre} y={306} tam={tam} sombra />
      <Heroe e={e}>
        <Img src={staticFile(e.imagenes!.heroe)} style={{position: 'absolute', left: 320 + (1 - s) * 150, top: 420, width: W, height: H, transformOrigin: '80% 30%',
          scale: `${1 + rampa(t, e.inicio, e.inicio + 5, 0, 0.045, (k) => k)}`, filter: `drop-shadow(0 34px 44px ${p.sombra})`}} />
      </Heroe>
      <Splash src={e.imagenes!.splash2} x={96} y={1810} t={t} en={e.inicio} escala={1.25} rot={-16} foco={11} />
      <Cinta txt={e.textos.pulpa} t={t} en={e.cues.pulpa} y={yCinta} tam={36} />
      <Dato t={t} en={e.cues.dato} y={yCinta + 112} tam={44} ancho={400} peso={500}>
        {e.textos.dato.split('|').map((l) => <div key={l}>{l}</div>)}
      </Dato>
    </AbsoluteFill>
  );
};

/*
  5 · Frutos del bosque: foto héroe (botella + vaso con las cuatro frutas cayendo) sobre su fondo vino oscuro (tono "mora").
  Sello "El más pedido" junto al titular, sello "4 frutos en 1" como etiqueta sobre el hombro de la botella y las cuatro
  frutas en cintas que entran juntas y pulsan cuando la voz nombra cada una.
*/
export const FrutosDelBosque: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono];
  const s = rampa(t, e.inicio - 0.25, e.inicio + 0.9);
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} plano />
      <Heroe e={e}>
        <FotoHeroe src={e.imagenes!.heroe} k={0.8} left={-59} top={445} arriba={9} abajo={5} origen="72% 60%" escala={1.07 - s * 0.07 + rampa(t, e.inicio, e.inicio + 8.2, 0, 0.035, (k) => k)} opacidad={cl(s * 2.2)} />
      </Heroe>
      <Grano fuerza={0.22} />
      <Gotas t={t} color="#F7B8D2" semilla="f5" n={5} zona={[0, 1500, 1080, 1900]} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.nombre} y={240} tam={190} sombra />
      <Linea txt={e.textos.l2} t={t} en={e.cues.nombre + 0.3} y={426} tam={118} sombra />
      <Sello t={t} en={e.cues.pedido} x={772} y={392} d={290} centro={e.textos.sello1.split('|')} />
      <Sello t={t} en={e.cues.cuatro} x={824} y={868} d={290} centro={e.textos.sello2.split('|')} fondo={TINTA} color={PAPEL} inclinacion={9} />
      <div style={{position: 'absolute', left: SEGURA.x0, top: 556, width: 540, display: 'flex', flexWrap: 'wrap', gap: '10px 10px'}}>
        {e.lista!.map((f) => (
          <Cinta key={f.txt} txt={f.txt} t={t} en={f.en} y={0} tam={34} fondo={p.cinta} color={p.cintaTexto} enFlujo pulso={f.pulso} colorPulso="#FF8FC4" />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 6 · Chocolate: la mano ofrece la botella, con el remolino de cacao detrás.
export const Chocolate: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono];
  const s = muelle(t, e.inicio - 0.25, true);
  const W = 817, H = 1348;
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[58, 52]} />
      <Halo x={640} y={1100} d={1300} color="#C98A5E" fuerza={0.5} />
      <Splash src={e.imagenes!.splash} x={800} y={1010} t={t} en={e.inicio - 0.15} escala={1.22} rot={10} deriva={6} />
      <Heroe e={e}>
        <Img src={staticFile(e.imagenes!.heroe)} style={{position: 'absolute', left: 650 - W / 2, top: 572 + (1 - s) * 300, width: W, height: H, transformOrigin: '50% 100%', rotate: `${(1 - s) * 7 - 2}deg`,
          scale: `${1 + rampa(t, e.inicio, e.inicio + 3.4, 0, 0.04, (k) => k)}`, filter: 'drop-shadow(0 34px 44px rgba(10,4,0,.55))'}} />
      </Heroe>
      <Gotas t={t} color="#7A4A2E" semilla="f6" n={6} zona={[0, 1200, 1080, 1900]} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.l1} y={240} tam={84} />
      <Linea txt={e.textos.l2} t={t} en={e.cues.l2} y={326} tam={156} sombra />
      <Cinta txt={e.textos.cinta} t={t} en={e.cues.cinta} y={496} tam={34} fondo={p.cinta} color={p.cintaTexto} />
    </AbsoluteFill>
  );
};

// 7 · Todos: las cuatro botellas, cada una frente a la franja de su color; la cámara las recorre (parallax 3D).
const FILA = [
  {src: 'img/fresa-recta.png', w: 556, h: 1307, tono: 'fresa'},
  {src: 'img/arandanos-recta.png', w: 472, h: 1231, tono: 'arandanos'},
  {src: 'img/frutos.png', w: 585, h: 1463, tono: 'frutos'},
  {src: 'img/chocolate-botella.png', w: 465, h: 1300, tono: 'cacao'},
] as const;
export const Todos: FC = ({e}) => {
  const t = useT();
  const viaje = rampa(t, e.inicio, e.inicio + 5.2, 0, 1, (k) => k);
  const Z = -700, k = 1 + 700 / 3582.7; // las franjas están detrás: se agrandan para verse del ancho de pantalla
  const bordes = [-2400, 278, 540, 802, 3480];
  return (
    <AbsoluteFill style={{background: TINTA}}>
      <Heroe e={e}>
        <Parallax3D t={t} camara={{x: -46 + viaje * 92, acercar: viaje * 120}}
          franjas={FILA.map((b, i) => {
            const a = (bordes[i] - 540) * k, z = (bordes[i + 1] - 540) * k;
            return {color: PALETAS[b.tono].base, x: (a + z) / 2 + 540, ancho: z - a + 2, z: Z};
          })}
          planos={FILA.map((b, i) => {
            const s = muelle(t, e.inicio - 0.2 + i * 0.09, true);
            const alto = 740;
            return {src: b.src, reflejo: 0.22, ancho: (alto * b.w) / b.h, alto, x: 147 + i * 262, base: 1638 + (1 - s) * 260, z: i % 2 ? -110 : 40, giro: (1 - s) * -0.5};
          })} />
      </Heroe>
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,.34) 0%, rgba(0,0,0,.12) 34%, transparent 46%, transparent 70%, rgba(0,0,0,.4) 100%)'}} />
      <Linea txt={e.textos.l1} t={t} en={e.cues.l1} y={240} tam={150} sombra />
      <Linea txt={e.textos.l2} t={t} en={e.cues.l2} y={388} tam={150} sombra />
      <Cinta txt={e.textos.c1} t={t} en={e.cues.c1} y={560} tam={34} />
      <Cinta txt={e.textos.c2} t={t} en={e.cues.c2} y={638} x={SEGURA.x0 + 34} tam={34} />
    </AbsoluteFill>
  );
};

