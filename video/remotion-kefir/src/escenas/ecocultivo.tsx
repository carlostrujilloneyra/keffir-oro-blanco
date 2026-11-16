import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {cl, EIO, muelle, pulso, rampa, SUAVE, useT} from '../anim';
import {Fondo, Grano} from '../componentes/Fondo';
import {IconoWhatsApp} from '../componentes/Iconos';
import {Foto3D} from '../componentes/Parallax3D';
import {Cinta, Dato, Linea, Sale} from '../componentes/Texto';
import type {Escena, Familia} from '../datos/tipos';
import {AZUL_ETIQUETA, FUENTE, PALETAS, PAPEL, SEGURA, TINTA} from '../tema';
import {Destello, Halo, PieCierre, TrazoLuz} from './comunes';

/*
  Escenas propias de las variantes EcoCultivo: cabra, mapa y cierre de tienda.
  Mismos componentes y reglas que el resto: texto en SEGURA, ≥ 1.5 s en pantalla, un movimiento principal por escena.
*/
type FC = React.FC<{e: Escena; variante: Familia}>;

const BOSQUE = '#1E3A2F'; // verde bosque de la marca (carteles del mapa)
const AZUL_RUTA = AZUL_ETIQUETA;

/*
  Cabra: natural-cabra-hero.png (1 L a la izquierda, 475 ml a la derecha). La foto baja (`dy`) para dejarle al titular
  de dos líneas el sitio sobre las tapas. Push-in lento a la de 1 L y paneo a la de 475 ml: el foco va a la altura
  de las tapas, así el zoom crece hacia abajo y las tapas no suben al texto. Halo azul detrás de la botella enfocada.
*/
export const Cabra: FC = ({e}) => {
  const t = useT(), p = PALETAS[e.tono], c = e.cues;
  const a = e.inicio - 0.3, b = e.fin! + 0.3;
  const zoom = 1.1 + rampa(t, a, a + 2.4, 0, 0.07, SUAVE);
  const pan = rampa(t, c.l1 + 1.2, b, 0, 1, SUAVE);
  const foco: [number, number] = [360 + pan * 425, 570 + pan * 320];
  return (
    <AbsoluteFill style={{background: '#0E1E38'}}>
      <Foto3D src={e.imagenes!.heroe} t={t} zoom={zoom} foco={foco} incl={[-2 + pan * 4, -0.8]} escala={0.86} dy={90} funde={0.12} />
      {/* halo azul de la etiqueta: sigue a la botella enfocada */}
      <div style={{position: 'absolute', inset: 0, mixBlendMode: 'screen'}}>
        <Halo x={360 + pan * 400} y={1060} d={1100} color={AZUL_ETIQUETA} fuerza={0.32 + pulso(t, c.l1, 0.3, 1.2) * 0.1} />
      </div>
      <Grano fuerza={0.18} />
      <Linea txt={e.textos.l1} t={t} en={c.l1} y={240} tam={104} sombra />
      <Linea txt={e.textos.l2} t={t} en={c.l2} y={352} tam={104} sombra color={p.acento} />
      <Cinta txt={e.textos.c1} t={t} en={c.c1} y={466} tam={38} fondo={p.cinta} color={p.cintaTexto} />
    </AbsoluteFill>
  );
};

/*
  Mapa ilustrado (SVG propio, no tiles): mundo de 3000 x 3000 px. Avenidas reales alrededor del Mercado San Felipe:
  Angamos Este arriba, República de Panamá a la izquierda, San Felipe a la derecha del destino, El Carmen bajo él.
*/
const MUNDO = 3000;
const CALLE = {angamos: 1350, panama: 1250, sanFelipe: 1700, carmen: 1620, sanCarlos: 1500};
const TIENDA_XY: [number, number] = [1585, CALLE.carmen];
const RUTA: [number, number][] = [[1330, CALLE.angamos], [CALLE.sanFelipe, CALLE.angamos], [CALLE.sanFelipe, CALLE.carmen], TIENDA_XY];
const GENERAL: [number, number] = [1520, 1560];
const ANCLA: [number, number] = [540, 1060]; // punto de la pantalla donde queda fijo el punto azul (y el pin)

const DISTRITOS: {nombre: string; pts: string; label: [number, number]; activo?: boolean}[] = [
  {nombre: 'San Isidro', pts: '250,250 1550,250 1550,1340 250,1340', label: [900, 820]},
  {nombre: 'San Borja', pts: '1560,250 2750,250 2750,2300 2060,2300 2060,1340 1560,1340', label: [2300, 860]},
  {nombre: 'Miraflores', pts: '250,1350 1200,1350 1200,2750 250,2750', label: [700, 2080]},
  {nombre: 'Surquillo', pts: '1210,1350 2050,1350 2050,2300 1700,2700 1210,2750', label: [1630, 2120], activo: true},
];
// edificios extruidos [x, y, ancho, fondo, alto]: solo junto a la ruta y el destino
const EDIFICIOS: [number, number, number, number, number][] = [
  [1560, 1150, 300, 130, 55], [1390, 1250, 90, 60, 70], [1750, 1400, 80, 70, 95], [1750, 1500, 70, 80, 70],
  [1600, 1400, 70, 70, 115], [1430, 1660, 90, 80, 60], [1520, 1660, 170, 110, 38], [1620, 1540, 50, 45, 65],
];
const ARBOLES: [number, number][] = [
  [1420, 1320], [1480, 1320], [1560, 1380], [1660, 1310], [1735, 1320], [1730, 1380], [1730, 1460], [1665, 1470], [1730, 1580],
  [1665, 1560], [1650, 1650], [1450, 1595], [1400, 1650], [1520, 1590], [1760, 1650], [1330, 1390],
];

const largo = (a: [number, number], b: [number, number]) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const TRAMOS = RUTA.slice(1).map((p, i) => largo(RUTA[i], p));
const TOTAL = TRAMOS.reduce((s, x) => s + x, 0);
const mezcla = (a: [number, number], b: [number, number], k: number): [number, number] => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];

// avance de la ruta: cada tramo entre dos cues (Angamos → giro1 → San Felipe → giro2 → El Carmen → pin)
const avance = (t: number, c: Record<string, number>) => {
  const marcas = [c.ruta, c.giro1, c.giro2, c.pin - 0.12];
  let recorrido = 0;
  for (let i = 0; i < 3; i++) recorrido += TRAMOS[i] * rampa(t, marcas[i], marcas[i + 1], 0, 1, SUAVE);
  return recorrido;
};
const puntoEn = (d: number): [number, number] => {
  for (let i = 0; i < TRAMOS.length; i++) {
    if (d <= TRAMOS[i] || i === TRAMOS.length - 1) return mezcla(RUTA[i], RUTA[i + 1], cl(d / TRAMOS[i]));
    d -= TRAMOS[i];
  }
  return TIENDA_XY;
};

const Edificio: React.FC<{b: [number, number, number, number, number]}> = ({b: [x, y, w, d, h]}) => {
  const lado = (estilo: React.CSSProperties, color: string) => <div style={{position: 'absolute', background: color, ...estilo}} />;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: d, transformStyle: 'preserve-3d'}}>
      {lado({left: 0, top: d, width: w, height: h, transformOrigin: 'top', transform: 'rotateX(90deg)'}, '#DDD5C6')}
      {lado({left: 0, top: 0, width: w, height: h, transformOrigin: 'top', transform: 'rotateX(90deg)'}, '#E6DFD2')}
      {lado({left: w, top: 0, width: h, height: d, transformOrigin: 'left', transform: 'rotateY(-90deg)'}, '#E9E2D5')}
      {lado({left: 0, top: 0, width: h, height: d, transformOrigin: 'left', transform: 'rotateY(-90deg)'}, '#E9E2D5')}
      {lado({left: 0, top: 0, width: w, height: d, transform: `translateZ(${h}px)`, boxShadow: 'inset 0 0 0 3px #EFE9DE'}, '#FBF8F2')}
    </div>
  );
};

// Flecha del cartel: el dibujo del giro tal como se ve en pantalla (derecha y abajo; abajo e izquierda)
const Flecha: React.FC<{abajoIzq?: boolean}> = ({abajoIzq}) => (
  <svg width={84} height={84} viewBox="0 0 84 84" style={{flex: 'none'}}>
    <g fill="none" stroke={PAPEL} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" transform={abajoIzq ? 'translate(84 0) scale(-1 1)' : undefined}>
      <path d="M10 22 H44 Q60 22 60 38 V70" />
      <path d="M44 56 L60 72 L76 56" />
    </g>
  </svg>
);

const Cartel: React.FC<{t: number; en: number; txt: string; abajoIzq?: boolean}> = ({t, en, txt, abajoIzq}) => {
  const s = muelle(t, en);
  return (
    <div style={{position: 'absolute', left: SEGURA.x0, top: 236, width: SEGURA.x1 - SEGURA.x0, height: 148, borderRadius: 28, background: BOSQUE, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px',
      boxShadow: '0 22px 50px rgba(20,40,30,.28)', opacity: cl(s * 3), translate: `0 ${(1 - s) * -40}px`, scale: `${0.94 + s * 0.06}`}}>
      <Flecha abajoIzq={abajoIzq} />
      <span style={{fontFamily: FUENTE.txt, fontWeight: 600, fontSize: 58, color: PAPEL, whiteSpace: 'nowrap'}}>{txt}</span>
    </div>
  );
};

const Pin: React.FC<{tam: number}> = ({tam}) => (
  <svg width={tam} height={tam * 1.3} viewBox="0 0 100 130">
    <path d="M50 128 C50 128 8 76 8 46 A42 42 0 0 1 92 46 C92 76 50 128 50 128 Z" fill={BOSQUE} stroke={PAPEL} strokeWidth={6} />
    <circle cx={50} cy={46} r={16} fill="#F2C14E" />
  </svg>
);

/*
  Mapa: (1) vista cenital con los cuatro distritos y un brillo en la tienda; (2) la cámara baja a Surquillo, el plano se
  inclina hasta ~40° y la ruta empieza a dibujarse; (3) el punto azul queda fijo en ANCLA y el mapa se mueve y gira poco
  debajo de él; dos carteles de giro (San Felipe, El Carmen); (4) el pin cae con rebote, la cámara gira ~18° a su
  alrededor y el pin se expande en la tarjeta de la tienda, con las filas escalonadas.
*/
export const Mapa: FC = ({e}) => {
  const t = useT(), c = e.cues, x = e.textos;
  const baja = rampa(t, c.baja, c.ruta + 1.1, 0, 1, SUAVE);
  const d = avance(t, c);
  const punto = puntoEn(d);
  const centro = mezcla(GENERAL, punto, baja);
  const escala = 0.44 + baja * 1.11;
  const llegada = rampa(t, c.pin, e.fin! + 0.3, 0, 1, SUAVE);
  const incl = baja * 40 - llegada * 6;
  const giro = -5 * baja + rampa(t, c.giro1 - 0.3, c.giro1 + 0.9, 0, 7, SUAVE) + rampa(t, c.giro2 - 0.3, c.giro2 + 0.9, 0, -5, SUAVE) + llegada * 18;
  const detalle = rampa(t, c.baja + 0.4, c.ruta + 0.6);
  const brillo = 1 - rampa(t, c.baja + 0.2, c.baja + 0.9);
  const pin = muelle(t, c.pin, true);
  const tarjeta = muelle(t, c.tarjeta, true);
  const filas = [x.nombre, x.mercado, x.direccion];
  const ruta = RUTA.map((p) => p.join(' ')).join(' L');
  return (
    <AbsoluteFill style={{background: '#ECE7DC', overflow: 'hidden', perspective: 1500, perspectiveOrigin: `${ANCLA[0]}px ${ANCLA[1] - 300}px`}}>
      <div style={{position: 'absolute', left: ANCLA[0] - centro[0], top: ANCLA[1] - centro[1], width: MUNDO, height: MUNDO, transformOrigin: `${centro[0]}px ${centro[1]}px`,
        transform: `rotateX(${incl}deg) rotateZ(${giro}deg) scale(${escala})`, transformStyle: 'preserve-3d'}}>
        <svg width={MUNDO} height={MUNDO} viewBox={`0 0 ${MUNDO} ${MUNDO}`} style={{position: 'absolute', inset: 0}}>
          {DISTRITOS.map((k) => (
            <polygon key={k.nombre} points={k.pts} fill={k.activo ? '#DCEBD6' : '#E8E2D5'} stroke="#FFFFFF" strokeWidth={14} />
          ))}
          {/* calles menores: retícula tenue solo alrededor del destino */}
          <g stroke="#FFFFFF" strokeWidth={9} opacity={detalle}>
            {Array.from({length: 12}, (_, i) => 1260 + i * 72).map((v) => <line key={`h${v}`} x1={1220} x2={2040} y1={v + 40} y2={v + 40} />)}
            {Array.from({length: 11}, (_, i) => 1300 + i * 76).map((v) => <line key={`v${v}`} x1={v} x2={v} y1={1360} y2={2200} />)}
          </g>
          {/* avenidas */}
          <g stroke="#FFFFFF" strokeLinecap="round">
            <line x1={250} x2={2750} y1={CALLE.angamos} y2={CALLE.angamos} strokeWidth={34} />
            <line x1={CALLE.panama} x2={CALLE.panama} y1={250} y2={2750} strokeWidth={30} />
            <line x1={CALLE.sanFelipe} x2={CALLE.sanFelipe} y1={CALLE.angamos} y2={2250} strokeWidth={24} />
            <line x1={1220} x2={2040} y1={CALLE.carmen} y2={CALLE.carmen} strokeWidth={20} />
            <line x1={CALLE.sanCarlos} x2={CALLE.sanCarlos} y1={CALLE.angamos} y2={CALLE.carmen} strokeWidth={12} opacity={0.8} />
          </g>
          <g fill="#7DAE6A" opacity={detalle}>
            {ARBOLES.map(([ax, ay]) => <circle key={`${ax}-${ay}`} cx={ax} cy={ay} r={13} />)}
          </g>
          {/* nombres: distritos en la vista general; calles al bajar */}
          <g fontFamily="Poppins, sans-serif" fontWeight={600} textAnchor="middle">
            <g opacity={1 - detalle} fontSize={104}>
              {DISTRITOS.map((k) => <text key={k.nombre} x={k.label[0]} y={k.label[1]} fill={k.activo ? BOSQUE : '#8A8172'}>{k.nombre}</text>)}
            </g>
            <g opacity={detalle} fontSize={30} fill="#7D7466">
              <text x={1150} y={CALLE.angamos - 26}>Av. Angamos Este</text>
              <text x={1640} y={1218} fontSize={26} fill="#9A917F">Mallplaza Angamos</text>
              <text transform={`translate(${CALLE.panama - 26} 1520) rotate(-90)`}>Av. República de Panamá</text>
              <text transform={`translate(${CALLE.sanFelipe + 40} 1760) rotate(90)`}>Av. San Felipe</text>
              <text x={1380} y={CALLE.carmen + 46}>Ca. El Carmen</text>
              <text transform={`translate(${CALLE.sanCarlos - 18} 1490) rotate(-90)`} fontSize={22} fill="#A69D8C">Prol. San Carlos</text>
            </g>
          </g>
          {/* brillo de la tienda en la vista general */}
          <circle cx={TIENDA_XY[0]} cy={TIENDA_XY[1]} r={150 + pulso(t, e.inicio + 0.3, 0.4, 0.9) * 60} fill="url(#brillo)" opacity={brillo} />
          <defs>
            <radialGradient id="brillo">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor={AZUL_RUTA} stopOpacity={0.55} />
              <stop offset="100%" stopColor={AZUL_RUTA} stopOpacity={0} />
            </radialGradient>
          </defs>
          {/* ruta: borde blanco y azul, dibujada hasta el punto */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${d} ${TOTAL + 10}`}>
            <path d={`M${ruta}`} stroke="#FFFFFF" strokeWidth={30} />
            <path d={`M${ruta}`} stroke={AZUL_RUTA} strokeWidth={18} />
          </g>
        </svg>
        {EDIFICIOS.map((b) => <Edificio key={b.join()} b={b} />)}
      </div>
      {/* bruma de horizonte: el borde lejano del plano se pierde */}
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, #F4F0E8 0%, rgba(244,240,232,.85) 14%, rgba(244,240,232,0) 34%)', opacity: baja}} />
      {/* punto azul fijo (la cámara lo sigue) */}
      <div style={{position: 'absolute', left: ANCLA[0] - 22, top: ANCLA[1] - 22, width: 44, height: 44, borderRadius: '50%', background: AZUL_RUTA, border: `8px solid ${PAPEL}`,
        boxShadow: `0 0 0 ${10 + Math.sin(t * 6) * 6}px rgba(31,143,224,.22), 0 8px 18px rgba(0,0,0,.2)`, opacity: rampa(t, c.ruta - 0.2, c.ruta + 0.2) * (1 - cl(pin * 2))}} />
      {/* pin: cae con rebote y un pulso; luego crece hasta ser la tarjeta */}
      {pin > 0 && (
        <>
          <div style={{position: 'absolute', left: ANCLA[0] - 70, top: ANCLA[1] - 70, width: 140, height: 140, borderRadius: '50%', border: `6px solid ${BOSQUE}`,
            opacity: (1 - rampa(t, c.pin + 0.1, c.pin + 0.8)) * cl(pin * 3), scale: `${0.3 + rampa(t, c.pin + 0.1, c.pin + 0.8) * 1.2}`}} />
          <div style={{position: 'absolute', left: ANCLA[0] - 45, top: ANCLA[1] - 117 - (1 - pin) * 260, opacity: cl(pin * 4), transformOrigin: '50% 100%', scale: `${1 + tarjeta * 0.15}`}}>
            <Pin tam={90} />
          </div>
        </>
      )}
      {tarjeta > 0 && (
        <div style={{position: 'absolute', left: 96, top: 600, width: 888 - 96, borderRadius: 28, background: '#FFFFFF', padding: '34px 44px 38px', boxShadow: '0 30px 70px rgba(30,40,30,.25)',
          transformOrigin: `${ANCLA[0] - 96}px ${ANCLA[1] - 140 - 600}px`, scale: `${0.08 + cl(tarjeta) * 0.92}`, opacity: cl(tarjeta * 3), borderTop: `10px solid ${BOSQUE}`}}>
          {/* filas escalonadas (Dato es absoluto: este bloque reserva su alto) */}
          <div style={{position: 'relative', height: 64 + 2 * 60}}>
            {filas.map((f, i) => (
              <Dato key={f} t={t} en={c.tarjeta + 0.12 + i * 0.1} x={0} y={i ? 6 + i * 60 : 0} tam={i ? 38 : 52} peso={i ? 500 : 700} color={i === 2 ? BOSQUE : TINTA}>
                <span style={{whiteSpace: 'nowrap'}}>{f}</span>
              </Dato>
            ))}
          </div>
        </div>
      )}
      {t >= c.giro1 && (
        <Sale t={t} en={c.giro2 - 0.12}>
          <Cartel t={t} en={c.giro1} txt={x.giro1} />
        </Sale>
      )}
      {t >= c.giro2 - 0.05 && <Cartel t={t} en={c.giro2} txt={x.giro2} abajoIzq />}
    </AbsoluteFill>
  );
};

/*
  Cierre de tienda, con la estructura del cierre aprobado (logo a la izquierda, CTA a la derecha, número grande).
  El logo de TRIALFERI se encoge y de él crece el de EcoCultivo (máscara circular, con su fondo) sobre un resplandor.
  Dos fases para no juntar demasiado texto: A) logos + CTA (+ cinta para comentar); B) en "Escríbenos" (cue `escribe`)
  sale la cinta y entran la dirección y el WhatsApp con el número grande. Termina con la línea de luz.
*/
const LOGO = 372;
export const CierreTienda: FC = ({e, variante}) => {
  const t = useT(), c = e.cues, x = e.textos;
  const trialferi = muelle(t, e.inicio - 0.12, true);
  const encoge = rampa(t, c.morph, c.morph + 0.42, 0, 1, EIO);
  const eco = muelle(t, c.morph + 0.22, true);
  const llega = rampa(t, c.escribe, c.escribe + 0.34);
  const golpe = pulso(t, c.escribe, 0.07, 0.45);
  const lineas = x.cta.split('|'), tam = Number(x.tam);
  const yCta = 410 - (lineas.length * tam + (lineas.length - 1) * 10) / 2;
  const centroLogo = [SEGURA.x0 - 12 + LOGO / 2, 232 + LOGO / 2];
  const cueGrupo = [c.g1, c.g2, c.g3];
  return (
    <AbsoluteFill>
      <Fondo tono={e.tono} t={t} luz={[46, 30]} />
      <PieCierre e={e} variante={variante} />
      {/* resplandor radial que acompaña el cambio de logo */}
      <Halo x={centroLogo[0]} y={centroLogo[1]} d={720} color={x.acento} fuerza={0.18 + cl(eco) * 0.2 + pulso(t, c.morph + 0.2, 0.15, 0.8) * 0.3} />
      {encoge < 1 && (
        <Img src={staticFile('img/trialferi-logo.png')} style={{position: 'absolute', left: SEGURA.x0 - 12, top: 232, width: LOGO, height: (LOGO * 1138) / 1224, opacity: cl(trialferi * 3) * (1 - encoge),
          scale: `${(0.6 + trialferi * 0.4) * (1 - encoge * 0.85)}`, rotate: `${(1 - trialferi) * -16}deg`, filter: 'drop-shadow(0 16px 30px rgba(0,0,0,.5))'}} />
      )}
      {eco > 0 && (
        <Img src={staticFile('img/ecocultivo/logo.jpg')} style={{position: 'absolute', left: centroLogo[0] - LOGO * 0.47, top: centroLogo[1] - LOGO * 0.47, width: LOGO * 0.94, height: LOGO * 0.94,
          borderRadius: '50%', opacity: cl(eco * 3), scale: `${0.15 + eco * 0.85}`, boxShadow: '0 16px 40px rgba(0,0,0,.45)'}} />
      )}
      {lineas.map((l, i) => (
        <Linea key={l} txt={l} t={t} en={c.cta + i * 0.1} x={SEGURA.x0 + LOGO + 10} y={yCta + i * (tam + 10)} tam={tam} resalta={x.resalta} colorResalta={x.acento} />
      ))}
      {x.cinta && (
        <Sale t={t} en={c.escribe - 0.24}>
          <Cinta txt={x.cinta} t={t} en={c.cinta} y={640} tam={44} fondo={PAPEL} color={TINTA} />
        </Sale>
      )}
      <Dato t={t} en={c.escribe - 0.12} y={618} tam={40}>{x.direccion}</Dato>
      <Dato t={t} en={c.escribe - 0.02} y={680} tam={40}>
        <span style={{display: 'flex', alignItems: 'center', gap: 16}}><IconoWhatsApp tam={48} />{x.whatsapp}</span>
      </Dato>
      <div style={{position: 'absolute', left: SEGURA.x0, top: 744, display: 'flex', gap: 32, fontFamily: FUENTE.anton, fontSize: 156, lineHeight: 1, opacity: cl(llega * 2.5), scale: `${1.28 - llega * 0.28 + golpe * 0.03}`, transformOrigin: '0 60%'}}>
        {x.numero.split(' ').map((g, i) => (
          <span key={i} style={{color: x.acento, scale: `${1 + pulso(t, cueGrupo[i], 0.12, 0.6) * 0.06}`, transformOrigin: '50% 70%'}}>{g}</span>
        ))}
      </div>
      <Destello t={t} en={c.escribe} color={x.acento} fuerza={0.22} />
      <TrazoLuz t={t} en={c.luz} y={596} ancho={806} color={x.acento} />
    </AbsoluteFill>
  );
};
