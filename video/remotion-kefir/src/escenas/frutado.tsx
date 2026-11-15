import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {cl, muelle, pulso, rampa, useT} from '../anim';
import {Fondo, Gotas, Grano} from '../componentes/Fondo';
import {Franjas, SABORES} from '../componentes/Franjas';
import {Sello} from '../componentes/Sello';
import {Cinta, Linea, Sale} from '../componentes/Texto';
import type {Escena} from '../datos/tipos';
import {PALETAS, PAPEL, SEGURA, TINTA} from '../tema';
import {Destello, FotoIA, Heroe} from './comunes';

type FC = React.FC<{e: Escena}>;

// Medidas reales de cada splash (px), para escalarlos sin deformar.
const MEDIDAS: Record<string, [number, number]> = {
  'img/sp-fresa1.png': [575, 491], 'img/sp-fresa2.png': [448, 487], 'img/sp-ara1.png': [573, 723], 'img/sp-ara2.png': [467, 656],
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

/*
  1 · Gancho: desde el frame 0, un corte por sabor cuando la voz lo nombra (destello de su color + punch-in sobre la botella)
  y, en "¿cuál eliges?", las cuatro juntas en franjas. El titular está completo desde el inicio.
*/
export const GanchoFrutado: FC = ({e}) => {
  const t = useT(), c = e.cues, p = PALETAS[e.tono];
  const cortes = [c.fresa, c.arandanos, c.frutos, c.chocolate];
  const i = cortes.reduce((n, a, k) => (t >= a ? k : n), 0);
  const s = SABORES[i], a = cortes[i];
  return (
    <AbsoluteFill>
      <Heroe e={e}>
        {/* la última foto sigue debajo mientras suben las franjas */}
        <FotoIA src={s.src} z={1.06 + rampa(t, a, a + 0.5) * 0.16 + rampa(t, a + 0.5, a + 1.6, 0, 0.05, (k) => k)} foco={[s.cx, 1500]} />
        {i > 0 && <Destello t={t} en={a} color={PALETAS[s.tono].luz} fuerza={0.6} />}
        <Franjas t={t} en={c.todos} />
      </Heroe>
      <Grano fuerza={0.2} />
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,.42) 0%, rgba(0,0,0,.14) 34%, transparent 46%)'}} />
      <Destello t={t} en={c.todos} fuerza={0.5} />
      <div style={{position: 'absolute', inset: 0, scale: `${1 + pulso(t, c.todos, 0.08, 0.5) * 0.05}`, transformOrigin: '300px 440px'}}>
        <Linea txt={e.textos.l1} t={t} en={c.l1} y={240} tam={200} sombra />
        <Linea txt={e.textos.l2} t={t} en={c.l2} y={446} tam={200} sombra color={p.subtitulo} />
      </div>
    </AbsoluteFill>
  );
};

// Mancha de color que deja la fruta sobre el fondo de leche.
const Mancha: React.FC<{x: number; y: number; d: number; color: string; p: number}> = ({x, y, d, color, p}) => (
  <div style={{position: 'absolute', left: x - d / 2, top: y - d / 2, width: d, height: d * 0.86, borderRadius: '46% 54% 58% 42% / 52% 44% 56% 48%', background: `radial-gradient(circle at 46% 46%, ${color} 0%, ${color} 38%, transparent 72%)`,
    opacity: cl(p * 2) * 0.62, scale: `${0.3 + p * 0.7}`, filter: 'blur(26px)'}} />
);

// 2 · Fruta de verdad: sobre fondo de leche, cada splash tiñe lo que toca ("el color es de la fruta"); el rojo de la fresa trae la escena siguiente.
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
    </AbsoluteFill>
  );
};

/*
  3, 4 y 6 · Fresa, Arándanos y Chocolate: la foto IA de cada sabor a cuadro completo. La cámara se acerca hacia la fruta
  que cae sobre el vaso (`foco`) y cada cinta da un paso más. Entre sabores se entra con whip pan.
*/
const FOCO: Record<string, [number, number]> = {
  'img/fresa-hero.webp': [330, 800],
  'img/arandanos-hero.webp': [300, 760],
  'img/chocolate-hero.webp': [330, 740],
};
export const Sabor: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono], L = e.lista ?? [];
  const tam = Number(e.textos.tam);
  const yNombre = e.textos.pre ? 328 : 240;
  const z = 1.04 + rampa(t, e.inicio - 0.3, e.inicio + 4.4, 0, 0.1, (k) => k) + L.reduce((s, b) => s + rampa(t, b.en, b.en + 0.3) * 0.035, 0);
  return (
    <AbsoluteFill>
      <Heroe e={e}>
        <FotoIA src={e.imagenes!.heroe} z={z} foco={FOCO[e.imagenes!.heroe]} />
      </Heroe>
      <Grano fuerza={0.2} />
      <Gotas t={t} color={p.acento} semilla={e.id} n={4} zona={[0, 1560, 1080, 1900]} />
      {e.textos.pre && <Linea txt={e.textos.pre} t={t} en={e.cues.nombre - 0.1} y={240} tam={84} sombra />}
      <Linea txt={e.textos.nombre} t={t} en={e.cues.nombre} y={yNombre} tam={tam} sombra color={p.acento} />
      {L.map((b, i) => (
        <Cinta key={b.txt} txt={b.txt} t={t} en={b.en} y={yNombre + tam + 36 + i * 88} x={SEGURA.x0 + i * 26} tam={36} fondo={p.cinta} color={p.cintaTexto} />
      ))}
    </AbsoluteFill>
  );
};

/*
  5 · Frutos del bosque: el más pedido. El sello "El más pedido" entra con la voz y deja su sitio al de "4 frutos en 1";
  cada sello da un golpe de cámara.
*/
export const FrutosDelBosque: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono], c = e.cues;
  const z = 1.04 + rampa(t, e.inicio - 0.3, e.inicio + 5.4, 0, 0.11, (k) => k) + pulso(t, c.pedido + 0.15, 0.06, 0.4) * 0.03 + pulso(t, c.cuatro + 0.15, 0.06, 0.4) * 0.04;
  return (
    <AbsoluteFill>
      <Heroe e={e}>
        <FotoIA src={e.imagenes!.heroe} z={z} foco={[330, 840]} />
      </Heroe>
      <Grano fuerza={0.2} />
      <Gotas t={t} color="#F7B8D2" semilla="f5" n={5} zona={[0, 1560, 1080, 1900]} />
      <Linea txt={e.textos.l1} t={t} en={c.nombre} y={240} tam={190} sombra color={p.subtitulo} />
      <Linea txt={e.textos.l2} t={t} en={c.nombre + 0.14} y={426} tam={118} sombra />
      <Sale t={t} en={c.cuatro - 0.2}>
        <Sello t={t} en={c.pedido} x={770} y={372} d={290} centro={e.textos.sello1.split('|')} />
      </Sale>
      <Sello t={t} en={c.cuatro} x={770} y={372} d={290} centro={e.textos.sello2.split('|')} fondo={p.subtitulo} color={TINTA} inclinacion={9} />
    </AbsoluteFill>
  );
};

// 7 · Stevia: los cuatro sabores en franjas, cada botella sobre su color.
export const Stevia: FC = ({e}) => {
  const t = useT(), c = e.cues;
  return (
    <AbsoluteFill style={{background: TINTA}}>
      <Heroe e={e}>
        <Franjas t={t} en={e.inicio - 0.2} />
      </Heroe>
      <Grano fuerza={0.2} />
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(0,0,0,.34) 0%, rgba(0,0,0,.12) 34%, transparent 46%)'}} />
      <Linea txt={e.textos.l1} t={t} en={c.l1} y={240} tam={170} sombra />
      <Linea txt={e.textos.l2} t={t} en={c.l2} y={416} tam={170} sombra resalta={e.textos.resalta} colorResalta="#FFE38A" />
      <Cinta txt={e.textos.c1} t={t} en={c.c1} y={612} tam={36} fondo={PAPEL} color={TINTA} />
    </AbsoluteFill>
  );
};
