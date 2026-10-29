import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, interpolateColors, spring, Easing, random} from 'remotion';

import {TIMING} from './timing';
export const DURATION = TIMING.duration;
const FPS = 30;

// ---------- Paleta y tipografía ----------
const C = {
  crema: '#F7EEE4', vino: '#5A0E24', vinoOsc: '#2b0510', oro: '#F2B705', oroClaro: '#FFE7A0',
  verde: '#24553A', tinta: '#2A1016', azul: '#1D3F73',
};
const SANS = 'Tight, sans-serif';
const SERIF = 'Serif, serif';

// ---------- Tiempos de la voz (pausas detectadas) ----------
const T = {
  B: 2.69, C: 4.75, D: 8.12, E: 10.42, F: 12.9, G: 15.07, H: 18.36,
  I: 21.88, J: 23.75, K: 24.98, L: 26.22, M: 28.11, N: 29.54, O: 31.25, P: 34.0,
};
// Ventanas de cada sabor
const W = {nat: [12.95, 15.2], fre: [15.2, 16.15], ara: [16.15, 16.9], fru: [16.9, 18.3], cot: [18.3, 21.75]};

// ---------- Helpers ----------
const EO = Easing.bezier(0.22, 1, 0.36, 1);
const EI = Easing.bezier(0.64, 0, 0.78, 0);
const cl = (x: number) => Math.max(0, Math.min(1, x));
const r = (t: number, a: number, b: number, from = 0, to = 1, e: any = EO) =>
  interpolate(t, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
const sp = (f: number, at: number, cfg: any = {}) =>
  spring({frame: f - Math.round(at * FPS), fps: FPS, config: {damping: 11, stiffness: 150, mass: 0.7, ...cfg}});
const inW = (t: number, a: number, b: number) => t >= a && t < b;
const abs: React.CSSProperties = {position: 'absolute'};
const toOld = (tn: number) => {
  const m = TIMING.map; // pares [nuevo, viejo]
  if (tn <= m[0][0]) return m[0][1] + (tn - m[0][0]);
  for (let i = 0; i < m.length - 1; i++) {
    const [a0, b0] = m[i], [a1, b1] = m[i + 1];
    if (tn <= a1) return a1 === a0 ? b1 : b0 + (tn - a0) * (b1 - b0) / (a1 - a0);
  }
  const [aL, bL] = m[m.length - 1];
  return bL + (tn - aL);
};

// ---------- Tipografía cinética ----------
const Kinetic: React.FC<{text: string; at: number; f: number; style: React.CSSProperties; stagger?: number; from?: number; out?: number; grad?: string}> = ({text, at, f, style, stagger = 0.035, from = 90, out, grad}) => {
  const t = f / FPS;
  const o = out !== undefined ? 1 - r(t, out, out + 0.25) : 1;
  return (
    <div style={{...abs, left: 0, right: 0, textAlign: 'center', whiteSpace: 'pre', opacity: o, ...style}}>
      {text.split('').map((ch, i) => {
        const s = sp(f, at + i * stagger, {damping: 12, stiffness: 170});
        return (
          <span key={i} style={{display: 'inline-block', transform: `translateY(${(1 - s) * from}px) rotate(${(1 - s) * (i % 2 ? 10 : -10)}deg)`, opacity: cl(s * 2),
            ...(grad ? {backgroundImage: grad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: 6} : {})} as any}>
            {ch === ' ' ? ' ' : ch}
          </span>
        );
      })}
    </div>
  );
};

// Línea simple con entrada suave
const Line: React.FC<{at: number; f: number; style: React.CSSProperties; children: any; out?: number; dy?: number}> = ({at, f, style, children, out, dy = 40}) => {
  const t = f / FPS;
  const s = sp(f, at, {damping: 14, stiffness: 140});
  const o = cl(s * 1.5) * (out !== undefined ? 1 - r(t, out, out + 0.25) : 1);
  return <div style={{...abs, left: 0, right: 0, textAlign: 'center', opacity: o, transform: `translateY(${(1 - s) * dy}px)`, ...style}}>{children}</div>;
};

// ---------- Gotita (personaje) ----------
type Goti = {x: number; y: number; size: number; sx?: number; sy?: number; rot?: number; lx?: number; ly?: number; blink?: number; happy?: boolean; opacity?: number};
const Gotita: React.FC<Goti> = ({x, y, size, sx = 1, sy = 1, rot = 0, lx = 0, ly = 0, blink = 0, happy = false, opacity = 1}) => {
  const k = size / 126;
  const eyeRy = 8 * (1 - blink * 0.9);
  return (
    <svg width={110 * k} height={130 * k} viewBox="-55 -128 110 130"
      style={{...abs, left: x - 55 * k, top: y - 128 * k, overflow: 'visible', opacity,
        transformOrigin: '50% 98%', transform: `rotate(${rot}deg) scale(${sx},${sy})`}}>
      <defs>
        <linearGradient id="gg" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E3EBF5" />
        </linearGradient>
      </defs>
      <ellipse cx="0" cy="1" rx="34" ry="5" fill="rgba(0,0,0,.18)" />
      <path d="M0 -126 C 0 -126 44 -70 44 -44 A 44 44 0 0 1 -44 -44 C -44 -70 0 -126 0 -126 Z" fill="url(#gg)" stroke="#C9D5E4" strokeWidth="2.5" />
      <ellipse cx="-18" cy="-76" rx="7" ry="13" fill="#fff" opacity=".9" transform="rotate(25 -18 -76)" />
      <ellipse cx="-27" cy="-30" rx="7" ry="4.5" fill="#F4A9B6" opacity=".75" />
      <ellipse cx="27" cy="-30" rx="7" ry="4.5" fill="#F4A9B6" opacity=".75" />
      {[-15, 15].map((ex) => (
        <g key={ex}>
          <ellipse cx={ex + lx * 2.5} cy={-46 + ly * 2.5} rx="6.5" ry={eyeRy} fill={C.tinta} />
          {blink < 0.5 && <circle cx={ex + lx * 2.5 + 2} cy={-49 + ly * 2.5} r="2" fill="#fff" />}
        </g>
      ))}
      {happy ? <path d="M-9 -31 Q0 -20 9 -31" fill="none" stroke={C.tinta} strokeWidth="3.2" strokeLinecap="round" />
             : <path d="M-5 -29 Q0 -26 5 -29" fill="none" stroke={C.tinta} strokeWidth="3" strokeLinecap="round" />}
    </svg>
  );
};

// ---------- Partículas ----------
type Burst = [number, number, number, number, string[], number, number, 'drop' | 'conf' | 'spark'];
const BURSTS: Burst[] = [
  [2.72, 540, 1040, 46, [C.oroClaro, C.oro, '#fff'], 1500, 14, 'spark'],
  [8.75, 840, 930, 18, [C.verde, '#8FD19E', C.oro], 1100, 12, 'conf'],
  [13.35, 380, 1150, 22, ['#fff', '#EAF2FA', '#CFE0F0'], 1250, 22, 'drop'],
  [13.6, 720, 1150, 22, ['#fff', '#EAF2FA', '#CFE0F0'], 1250, 22, 'drop'],
  [15.28, 540, 1000, 26, ['#fff', '#F7C5CF', '#E0476A'], 1400, 20, 'drop'],
  [16.23, 540, 1000, 26, ['#fff', '#D9CCF2', '#5B3AA6'], 1400, 20, 'drop'],
  [16.98, 540, 1000, 28, ['#fff', '#F3BCD5', '#8C1048', '#3B2A7A'], 1400, 20, 'drop'],
  [19.4, 320, 1150, 16, ['#fff', '#E7EED6', '#9BB36A'], 1100, 16, 'drop'],
  [20.5, 740, 1180, 16, ['#fff', '#E7EED6', '#9BB36A'], 1100, 16, 'drop'],
  [23.8, 540, 1040, 30, [C.oroClaro, C.oro, '#fff'], 1300, 12, 'spark'],
  [25.05, 540, 900, 40, [C.oroClaro, C.oro, C.crema, '#E39B0B'], 1600, 16, 'conf'],
  [26.3, 540, 1300, 60, [C.oroClaro, C.oro, C.crema], 1800, 16, 'conf'],
  [29.65, 720, 860, 40, [C.verde, '#8FD19E', C.oro], 1500, 15, 'conf'],
  [31.35, 540, 1010, 46, [C.oroClaro, C.oro, '#fff'], 1500, 12, 'spark'],
  [34.05, 790, 1190, 60, [C.oroClaro, C.oro, C.crema, '#E39B0B'], 1800, 17, 'conf'],
];
const Particles: React.FC<{t: number; list?: Burst[]}> = ({t, list = BURSTS}) => {
  const out: any[] = [];
  list.forEach(([t0, x0, y0, n, cols, v, sz, type], bi) => {
    const dt = t - t0;
    if (dt < 0 || dt > 2.2) return;
    for (let i = 0; i < n; i++) {
      const rr = (k: string) => random(`${bi}-${i}-${k}`);
      const a = rr('a') * Math.PI * 2, spd = v * (0.35 + rr('v') * 0.75), s = sz * (0.5 + rr('s') * 0.9);
      const c = cols[Math.floor(rr('c') * cols.length)];
      const g = type === 'spark' ? 300 : 2300;
      const x = x0 + Math.cos(a) * spd * dt * 0.55;
      const y = y0 + Math.sin(a) * spd * dt * 0.55 - (type === 'spark' ? 0 : 750 * dt) + 0.5 * g * dt * dt;
      const life = type === 'spark' ? 1.1 : 1.8;
      const o = cl(1 - dt / life);
      if (o <= 0) continue;
      const st: React.CSSProperties = {...abs, left: x - s / 2, top: y - s / 2, opacity: o, background: c};
      if (type === 'conf') Object.assign(st, {width: s, height: s * 0.5, borderRadius: 3, transform: `rotate(${(rr('r') * 720 - 360) * dt}deg)`});
      else if (type === 'spark') Object.assign(st, {width: s, height: s, borderRadius: '50%', boxShadow: `0 0 ${s}px ${c}`, transform: `scale(${1 - dt / life})`});
      else Object.assign(st, {width: s, height: s * 1.15, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'});
      out.push(<div key={`${bi}-${i}`} style={st} />);
    }
  });
  return <AbsoluteFill style={{zIndex: 60, pointerEvents: 'none'}}>{out}</AbsoluteFill>;
};

// ---------- Ticket dorado ----------
const Ticket: React.FC<{w?: number; style?: React.CSSProperties; big?: boolean}> = ({w = 760, style, big = true}) => {
  const k = w / 760;
  return (
    <div style={{...abs, width: 760, height: 320, transformOrigin: '0 0', ...style}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${k})`, transformOrigin: '0 0', width: 760, height: 320}}>
        <div style={{...abs, inset: 0, borderRadius: 26, background: 'linear-gradient(135deg,#FFE7A0 0%,#F2B705 45%,#E39B0B 100%)',
          boxShadow: '0 30px 60px rgba(0,0,0,.4), inset 0 0 0 6px rgba(255,255,255,.35)',
          WebkitMask: 'radial-gradient(circle 32px at 560px 0,transparent 98%,#000) , radial-gradient(circle 32px at 560px 100%,transparent 98%,#000)',
          WebkitMaskComposite: 'source-in'} as any} />
        <div style={{...abs, left: 560, top: 42, bottom: 42, borderLeft: '5px dashed rgba(90,14,36,.45)'}} />
        <div style={{...abs, left: 44, top: 40, width: 500, color: C.vino, fontFamily: SANS}}>
          <div style={{fontWeight: 800, fontSize: 24, letterSpacing: 6}}>SORTEO CANASTA</div>
          <div style={{fontWeight: 900, fontSize: 132, lineHeight: 1, letterSpacing: -2}}>TRIALFERI</div>
          <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 44, marginTop: 4}}>sábado 31 de octubre</div>
        </div>
        <div style={{...abs, left: 565, right: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: C.vino, fontFamily: SANS}}>
          <div style={{fontWeight: 900, fontSize: 120, lineHeight: 1}}>1</div>
          <div style={{fontWeight: 800, fontSize: 24, letterSpacing: 5}}>TICKET</div>
        </div>
      </div>
    </div>
  );
};

// ---------- Ola de transición ----------
const Wave: React.FC<{t: number; at: number; color: string}> = ({t, at, color}) => {
  if (t < at - 0.45 || t > at + 0.35) return null;
  // sube desde abajo, cubre en 'at', luego sigue subiendo y sale por arriba
  const y = interpolate(t, [at - 0.45, at, at + 0.35], [1920, -150, -2300], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const ph = t * 9;
  let d = `M0 120 `;
  for (let x = 0; x <= 1080; x += 40) d += `L${x} ${120 + Math.sin(x / 120 + ph) * 38} `;
  d += `L1080 2300 L0 2300 Z`;
  return <svg width={1080} height={2300} style={{...abs, left: 0, top: y, zIndex: 80}}><path d={d} fill={color} /></svg>;
};


// ============================================================
// Productos v5 (tiempo real de la voz v3)
const P = {start: 12.8, end: 34.8, natEnd: 21.4, fruta: 21.44, fre: 23.05, ara: 23.95, fru: 25.0, cot: 26.5, queso: 29.0,
  probio: 15.75, digest: 17.45, lactosa: 19.8, ajo: 27.45, oli: 28.15, diet: 30.1, cuajo: 31.85, sal: 33.84};
const PB: Burst[] = [
  [13.05, 380, 1580, 24, ['#fff', '#EAF2FA', '#CFE0F0'], 1250, 22, 'drop'],
  [13.3, 760, 1580, 24, ['#fff', '#EAF2FA', '#CFE0F0'], 1250, 22, 'drop'],
  [15.8, 540, 640, 36, [C.oroClaro, C.oro, '#fff'], 1300, 12, 'spark'],
  [19.85, 940, 910, 30, [C.oroClaro, C.oro, '#fff'], 1200, 12, 'spark'],
  [23.12, 540, 1150, 30, ['#fff', '#F7C5CF', '#E0476A'], 1450, 22, 'drop'],
  [24.02, 540, 1150, 30, ['#fff', '#D9CCF2', '#5B3AA6'], 1450, 22, 'drop'],
  [25.07, 540, 1150, 32, ['#fff', '#F3BCD5', '#8C1048', '#3B2A7A'], 1450, 22, 'drop'],
  [27.55, 300, 1450, 16, ['#fff', '#E7EED6', '#9BB36A'], 1100, 16, 'drop'],
  [28.25, 770, 1460, 16, ['#fff', '#E7EED6', '#9BB36A'], 1100, 16, 'drop'],
  [29.35, 540, 1200, 24, ['#fff', '#F6F1E4', '#E4DCC6'], 1200, 18, 'drop'],
  [33.9, 540, 760, 70, ['#F6B9C4', '#F9D3D9', '#E98FA0', '#ffffff'], 1500, 13, 'conf'],
];
const ProductsV5: React.FC<{tn: number}> = ({tn}) => {
  const fn = tn * FPS;
  if (tn < P.start - 0.02 || tn >= P.end + 0.05) return null;
  const inn0 = r(tn, P.start - 0.02, P.start + 0.3);
  // fondo por escena
  const bg = interpolateColors(tn,
    [P.start, P.fruta - 0.05, P.fruta + 0.3, P.fre, P.fre + 0.4, P.ara, P.ara + 0.4, P.fru, P.fru + 0.4, P.cot, P.cot + 0.4, P.queso, P.queso + 0.4],
    ['#E6F0F8', '#E6F0F8', '#F7EEE4', '#F7EEE4', '#F7D7DE', '#F7D7DE', '#E4DAF4', '#E4DAF4', '#F3CFE0', '#F3CFE0', '#E8EED8', '#E8EED8', '#F4EDDF']);
  // barrido horizontal entre escenas (0.45 s, con desenfoque)
  const slide = (a: number, b: number, last = false) => {
    const i = r(tn, a - 0.12, a + 0.18), o = last ? 0 : r(tn, b - 0.12, b + 0.18, 0, 1, EI);
    const x = (1 - i) * 1080 - o * 1080;
    const vis = tn >= a - 0.12 && tn < b + 0.2;
    return {vis, st: {...abs, inset: 0, transform: `translateX(${x}px)`, filter: Math.abs(x) > 4 ? `blur(${Math.abs(x) / 1080 * 16}px)` : undefined} as React.CSSProperties};
  };
  const S = (at: number, cfg: any = {}) => sp(fn, at, cfg);
  const scenes: any[] = [];

  // ---- 1) Natural vaca + cabra con beneficios ----
  {
    const {vis, st} = slide(P.start, P.natEnd);
    if (vis) {
      const sv = S(12.95, {damping: 9, stiffness: 160}), sc = S(13.2, {damping: 9, stiffness: 160});
      const pv = S(14.0, {damping: 10}), pc = S(14.2, {damping: 10});
      const pb = S(P.probio, {damping: 8, stiffness: 190});
      const lac = S(P.lactosa, {damping: 7, stiffness: 200});
      const wr = r(tn, P.digest, P.digest + 1.3, 0, 1, Easing.linear);
      const lift = r(tn, P.probio - 0.2, P.probio + 0.4);
      const go = S(18.6, {damping: 9});
      scenes.push(
        <div key="nat" style={st}>
          <Kinetic f={fn} at={12.9} text="Kéfir" style={{top: 262, fontFamily: SERIF, fontStyle: 'italic', fontSize: 130, color: C.azul, lineHeight: 1}} />
          <Kinetic f={fn} at={13.05} text="NATURAL" grad="linear-gradient(180deg,#2E63B8 0%,#1D3F73 100%)" style={{top: 392, fontWeight: 900, fontSize: 146, color: C.azul, letterSpacing: -4, lineHeight: 1}} />
          {/* sello alto en probióticos */}
          {tn >= P.probio && (
            <div style={{...abs, left: 0, right: 0, top: 560, textAlign: 'center', zIndex: 6, transform: `scale(${1.9 - 0.9 * pb}) rotate(${-3 - (1 - pb) * 10}deg)`, opacity: cl(pb * 3)}}>
              <span style={{display: 'inline-block', background: '#111', color: '#fff', fontWeight: 900, fontSize: 64, letterSpacing: -1, padding: '14px 70px 16px 40px',
                clipPath: 'polygon(0 0, calc(100% - 44px) 0, 100% 50%, calc(100% - 44px) 100%, 0 100%)', boxShadow: '0 16px 30px rgba(0,0,0,.25)'}}>ALTO EN PROBIÓTICOS</span>
            </div>
          )}
          {tn >= P.digest && (
            <div style={{...abs, left: 0, right: 0, top: 682, textAlign: 'center', zIndex: 6}}>
              <span style={{display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontSize: 60, color: '#2E63B8', whiteSpace: 'nowrap',
                clipPath: `inset(-20px ${100 - wr * 100}% -20px -20px)`, WebkitTextStroke: '10px #fff', paintOrder: 'stroke fill'} as any}>mantiene tu sistema digestivo saludable</span>
            </div>
          )}
          <div style={{...abs, inset: 0, transform: `translateY(${lift * 40}px) scale(${1 - lift * 0.04})`, transformOrigin: '540px 1580px'}}>
            <div style={{...abs, left: 40, right: 40, top: 1490, height: 170, borderRadius: '50%', background: 'radial-gradient(closest-side,rgba(29,63,115,.2),transparent)'}} />
            <Img src={staticFile('vaca-1l.png')} style={{...abs, left: 380 - 287, top: 1580 - 900, height: 900, transformOrigin: '50% 100%',
              transform: `translateY(${(1 - sv) * -900}px) rotate(${(1 - sv) * -12}deg) scaleY(${0.92 + 0.08 * sv})`, filter: 'drop-shadow(0 30px 28px rgba(29,63,115,.28))'}} />
            <Img src={staticFile('cabra-1l.png')} style={{...abs, left: 760 - 171, top: 1580 - 900, height: 900, transformOrigin: '50% 100%',
              transform: `translateY(${(1 - sc) * -900}px) rotate(${(1 - sc) * 12}deg) scaleY(${0.92 + 0.08 * sc})`, filter: 'drop-shadow(0 30px 28px rgba(29,63,115,.28))'}} />
            {[[380, pv, 'vaca'], [760, pc, 'cabra']].map(([x, k, l]: any) => (
              <div key={l} style={{...abs, left: x - 110, width: 220, top: 1605, textAlign: 'center', transform: `scale(${k})`}}>
                <span style={{background: C.azul, color: '#fff', fontWeight: 800, fontSize: 36, padding: '10px 30px', borderRadius: 999}}>{l}</span>
              </div>
            ))}
            {tn >= 18.6 && <Gotita x={575} y={1590 - (1 - go) * 60} size={130} sy={go} happy lx={0.9} ly={-0.6} />}
          </div>
          {tn >= P.lactosa && (
            <div style={{...abs, left: 830, top: 800, width: 220, height: 220, borderRadius: '50%', background: C.oro, color: C.vino, zIndex: 7,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 18px 34px rgba(90,14,36,.3)',
              transform: `rotate(${12 + (1 - lac) * 50}deg) scale(${lac})`}}>
              <div style={{...abs, inset: 12, borderRadius: '50%', border: '3px dashed rgba(90,14,36,.5)'}} />
              <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 50, lineHeight: 1}}>bajo en</div>
              <div style={{fontWeight: 900, fontSize: 54, letterSpacing: -2, lineHeight: 1}}>LACTOSA</div>
            </div>
          )}
        </div>
      );
    }
  }
  // ---- 2) "¿Con fruta?" ----
  {
    const {vis, st} = slide(P.fruta, P.fre);
    if (vis) {
      const e = r(tn, P.fruta, P.fruta + 1.4);
      scenes.push(
        <div key="cf" style={st}>
          <Kinetic f={fn} at={P.fruta + 0.05} text="y si lo prefieres" style={{top: 560, fontFamily: SERIF, fontStyle: 'italic', fontSize: 100, color: '#B3123A', lineHeight: 1}} />
          <Kinetic f={fn} at={P.fruta + 0.3} stagger={0.05} text="CON FRUTA" grad="linear-gradient(180deg,#C2185B 0%,#5A0E24 100%)" style={{top: 690, fontWeight: 900, fontSize: 168, color: C.vino, letterSpacing: -6, lineHeight: 1}} />
          {['fresa-recta.png', 'arandanos-recta.png', 'frutos.png'].map((im, i) => {
            const k = S(P.fruta + 0.5 + i * 0.15, {damping: 9});
            const xs = [270, 540, 810][i], hs = 440, ws = hs * [556 / 1307, 472 / 1231, 1019 / 1469][i];
            return <Img key={im} src={staticFile(im)} style={{...abs, left: xs - ws / 2, top: 1000, height: hs + 60, width: ws * (hs + 60) / hs, width: ws, transform: `translateY(${(1 - k) * 700}px) rotate(${(i - 1) * 7 * k}deg)`, opacity: k > 0.01 ? 1 : 0,
              filter: 'drop-shadow(0 20px 20px rgba(58,7,21,.25))', transformOrigin: '50% 100%'}} />;
          })}
          <div style={{...abs, left: 0, right: 0, top: 880, height: 6, display: 'none', opacity: e}} />
        </div>
      );
    }
  }
  // ---- 3) Frutados (más grandes y con más tiempo) ----
  ([
    ['fre', P.fre, P.ara, 'FRESA', 'fresa-recta.png', 556 / 1307, 'sp-fresa1.png', 'sp-fresa2.png', '#B3123A', '#EFB0BF', 'con pulpa natural', 300, 1.0],
    ['ara', P.ara, P.fru, 'ARÁNDANOS', 'arandanos-recta.png', 472 / 1231, 'sp-ara1.png', 'sp-ara2.png', '#4B2C8C', '#CBB9EC', 'con pulpa natural', 158, 1.25],
    ['fru', P.fru, P.cot, 'FRUTOS', 'frutos.png', 1019 / 1469, 'sp-frutos.png', null, '#9C1456', '#E7A6C6', 'del bosque', 250, 1.0],
  ] as any[]).forEach(([key, a, b, word, bottle, ratio, spb, spf, col, wcol, sub, fs, spS]) => {
    const {vis, st} = slide(a, b);
    if (!vis) return;
    const H = 900, W = H * ratio;
    const d = S(a + 0.02, {damping: 8, stiffness: 200});
    const e = r(tn, a + 0.02, a + 0.45);
    const fsp = S(a + 0.18, {damping: 7, stiffness: 210});
    const wd = S(a + 0.05, {damping: 14, stiffness: 120});
    const shine = r(tn, a + 0.35, a + 0.9);
    scenes.push(
      <div key={key} style={st}>
        <div style={{...abs, left: 0, right: 0, top: 262, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 100, color: col, lineHeight: 1}}>kéfir frutado</div>
        <div style={{...abs, left: -100, right: -100, top: 900 - fs * 0.5, textAlign: 'center', fontWeight: 900, fontSize: fs * 1.12, letterSpacing: -6, lineHeight: 1, color: wcol,
          transform: `scale(${1.25 - 0.25 * wd + (tn - a) * 0.025})`}}>{word}</div>
        <Img src={staticFile(spb)} style={{...abs, left: 540 - 500, top: 640, width: 1000, transformOrigin: '50% 55%',
          transform: `scale(${(0.3 + 0.8 * e + (tn - a) * 0.035) * spS}) rotate(${(1 - e) * -25 + (tn - a) * 3}deg)`, opacity: cl(e * 3)}} />
        <div style={{...abs, left: 540 - W / 2, top: 1530 - H, width: W, height: H, transformOrigin: '50% 100%',
          transform: `translateY(${(1 - d) * -700}px) rotate(${Math.sin((tn - a) * 2.5) * 1.5}deg) scaleY(${0.9 + 0.1 * d})`}}>
          <Img src={staticFile(bottle)} style={{width: '100%', height: '100%', display: 'block', filter: 'drop-shadow(0 34px 30px rgba(58,7,21,.32))'}} />
          <div style={{...abs, inset: 0, mixBlendMode: 'screen', background: 'linear-gradient(105deg,rgba(255,255,255,0) 42%,rgba(255,255,255,.7) 50%,rgba(255,255,255,0) 58%)',
            backgroundSize: '300% 100%', backgroundPosition: `${100 - shine * 100}% 0`, WebkitMaskImage: `url(${staticFile(bottle)})`, WebkitMaskSize: '100% 100%'} as any} />
        </div>
        {spf && <Img src={staticFile(spf)} style={{...abs, left: key === 'fre' ? 20 : 710, top: key === 'fre' ? 1180 : 1100, width: 360, transform: `scale(${fsp}) rotate(${(1 - fsp) * 30}deg)`}} />}
        <div style={{...abs, left: 0, right: 0, top: 1555, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 100, color: col, lineHeight: 1,
          transform: `translateY(${(1 - S(a + 0.12)) * 40}px)`, opacity: cl(S(a + 0.12) * 2), WebkitTextStroke: '12px #fff', paintOrder: 'stroke fill'} as any}>{sub}</div>
      </div>
    );
  });
  // ---- 4) Cottage ----
  {
    const {vis, st} = slide(P.cot, P.queso);
    if (vis) {
      const ja = S(P.ajo, {damping: 7, stiffness: 180}), jo = S(P.oli, {damping: 7, stiffness: 180});
      scenes.push(
        <div key="cot" style={st}>
          <Kinetic f={fn} at={P.cot + 0.1} text="Queso" style={{top: 262, fontFamily: SERIF, fontStyle: 'italic', fontSize: 130, color: C.verde, lineHeight: 1}} />
          <Kinetic f={fn} at={P.cot + 0.25} text="COTTAGE" grad="linear-gradient(180deg,#8A1838 0%,#5A0E24 100%)" style={{top: 395, fontWeight: 900, fontSize: 150, color: C.vino, letterSpacing: -4, lineHeight: 1}} />
          <Line f={fn} at={P.cot + 0.5} style={{top: 548, fontFamily: SERIF, fontStyle: 'italic', fontSize: 84, color: C.verde, lineHeight: 1}}>de cabra</Line>
          <div style={{...abs, left: 30, right: 30, top: 1400, height: 150, borderRadius: '50%', background: 'radial-gradient(closest-side,rgba(36,85,58,.22),transparent)'}} />
          <Img src={staticFile('cottage-cabra-ajo.png')} style={{...abs, left: 300 - 290, top: 1480 - 620, height: 620, transformOrigin: '50% 100%',
            transform: `translateY(${(1 - ja) * -900}px) rotate(${-5 + (1 - ja) * -25}deg)`, opacity: tn >= P.ajo ? 1 : 0}} />
          <Img src={staticFile('cottage-cabra-olivo.png')} style={{...abs, left: 770 - 330, top: 1495 - 520, height: 520, transformOrigin: '50% 100%',
            transform: `translateY(${(1 - jo) * -900}px) rotate(${5 + (1 - jo) * 25}deg)`, opacity: tn >= P.oli ? 1 : 0}} />
          <div style={{...abs, left: 100, width: 400, top: 1520, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 86, color: C.vino, opacity: cl(S(P.ajo + 0.3) * 2)}}>al ajo</div>
          <div style={{...abs, left: 570, width: 400, top: 1520, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 86, color: C.vino, opacity: cl(S(P.oli + 0.3) * 2)}}>al olivo</div>
        </div>
      );
    }
  }
  // ---- 5) Queso de cabra con cuajo natural ----
  {
    const {vis, st} = slide(P.queso, P.end, true);
    if (vis) {
      const q = S(P.queso + 0.25, {damping: 8, stiffness: 150});
      const dt = S(P.diet, {damping: 8, stiffness: 190});
      const tag = (at: number) => S(at, {damping: 8, stiffness: 200});
      const out = r(tn, P.end - 0.1, P.end + 0.05);
      scenes.push(
        <div key="qc" style={{...st, opacity: 1 - out}}>
          <Kinetic f={fn} at={P.queso + 0.05} text="Queso de cabra" stagger={0.03} style={{top: 270, fontFamily: SERIF, fontStyle: 'italic', fontSize: 118, color: C.verde, lineHeight: 1}} />
          {tn >= P.diet && <div style={{...abs, left: 0, right: 0, top: 405, textAlign: 'center', fontWeight: 900, fontSize: 150, letterSpacing: -5, lineHeight: 1, paddingBottom: 8,
            backgroundImage: 'linear-gradient(180deg,#8A1838 0%,#5A0E24 100%)', WebkitBackgroundClip: 'text', color: 'transparent',
            transform: `scale(${1.6 - 0.6 * dt})`, opacity: cl(dt * 3)}}>DIETÉTICO</div>}
          <div style={{...abs, left: 40, right: 40, top: 1430, height: 160, borderRadius: '50%', background: 'radial-gradient(closest-side,rgba(90,60,20,.24),transparent)'}} />
          <Img src={staticFile('queso-cabra.png')} style={{...abs, left: 540 - 450, top: 1500 - 838, width: 900, transformOrigin: '50% 60%',
            transform: `translateY(${(1 - q) * -1000}px) rotate(${(1 - q) * -60 + Math.sin((tn - P.queso) * 1.5) * 1.5}deg) scale(${0.9 + 0.1 * q})`, opacity: tn >= P.queso + 0.25 ? 1 : 0,
            filter: 'drop-shadow(0 30px 30px rgba(60,40,10,.3))'}} />
          {[[P.cuajo, 'cuajo natural', 70, 610, -6], [P.sal, 'sal de maras', 610, 650, 6]].map(([at, l, x, y, rot]: any) => tn >= at && (
            <div key={l} style={{...abs, left: x, top: y, zIndex: 5, transform: `rotate(${rot}deg) scale(${tag(at)})`}}>
              <span style={{display: 'inline-block', background: l === 'sal de maras' ? '#E98FA0' : C.verde, color: '#fff', fontWeight: 800, fontSize: 42, padding: '12px 30px', borderRadius: 999, boxShadow: '0 12px 24px rgba(0,0,0,.2)'}}>{l}</span>
            </div>
          ))}
          <div style={{...abs, left: 0, right: 0, top: 1545, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 74, color: C.vino, opacity: r(tn, P.queso + 0.6, P.queso + 0.9)}}>leche de cabra · hecho a mano</div>
        </div>
      );
    }
  }
  return (
    <div style={{...abs, inset: 0, zIndex: 40, background: bg, transform: `translateX(${(1 - inn0) * 1080}px)`}}>
      {scenes}
      <Particles t={tn} list={PB} />
    </div>
  );
};

// ============================================================
export const Teaser: React.FC = () => {
  const fN = useCurrentFrame();
  const tN = fN / FPS;
  // remapeo: el diseño está escrito en la línea de tiempo de la voz anterior
  const t = toOld(tN);
  const f = t * FPS;
  const M0 = TIMING.man0, M1 = TIMING.man1;

  // ---- Fondo ----
  const darkO = r(t, 31.2, 31.25);
  const vinoO = r(t, 21.75, 21.8) * (1 - r(t, 28.11, 28.15));
  const lightBg = (() => {
    if (t < 4.8) return C.crema;
    if (t < W.nat[0]) return '#EEF2E4';
    if (t < W.fre[0] - 0.05) return '#E6F0F8';
    if (t < W.cot[1] + 0.1) {
      const stops = [W.fre[0] - 0.05, W.fre[0] + 0.2, W.ara[0], W.ara[0] + 0.2, W.fru[0], W.fru[0] + 0.2, W.cot[0], W.cot[0] + 0.25];
      const cols = ['#E6F0F8', '#F7D7DE', '#F7D7DE', '#E4DAF4', '#E4DAF4', '#F3CFE0', '#F3CFE0', '#E8EED8'];
      return interpolateColors(t, stops, cols);
    }
    return C.crema;
  })();
  const darkMode = darkO > 0.5 || vinoO > 0.5;

  // ---- Gotita ----
  let g: Goti | null = null;
  let gotiBehindCanasta = false;
  if (t < 2.75) {
    const s = sp(f, 0.25, {damping: 9});
    const lookUp = r(t, 1.1, 1.3);
    g = {x: 790, y: 850 + (1 - s) * 200, size: 170, lx: -1 + lookUp, ly: 0.6 - lookUp * 1.6, blink: t > 1.85 && t < 1.97 ? 1 : 0};
    gotiBehindCanasta = true;
  } else if (t < 4.6) {
    const j = r(t, 2.75, 3.25, 0, 1, Easing.linear);
    const x = 790 + (540 - 790) * j;
    const y = (850 + (785 - 850) * j) - Math.sin(j * Math.PI) * 330;
    const land = sp(f, 3.25, {damping: 7, stiffness: 220});
    const squash = t > 3.25 ? 1 - (1 - land) * 0.35 : 1 + Math.sin(j * Math.PI) * 0.12;
    g = {x, y, size: 170, sx: 2 - squash, sy: squash, happy: true, rot: (1 - j) * -15 * (t < 3.25 ? 1 : 0), ly: -0.4, blink: t > 4.0 && t < 4.12 ? 1 : 0};
  } else if (t >= 8.1 && t < 12.95) {
    // salta por la línea del Metropolitano
    const hops = [[8.1, 120, 8.45, 330], [8.45, 330, 8.8, 560], [8.8, 560, 9.15, 740]];
    let x = 740, yb = 955, sq = 1;
    for (const [a, x0, b, x1] of hops) {
      if (t >= a && t < b) { const k = (t - a) / (b - a); x = x0 + (x1 - x0) * k; yb = 955 - Math.sin(k * Math.PI) * 130; sq = 1 + Math.sin(k * Math.PI) * 0.12; }
    }
    if (t < 8.1) x = 120;
    const enter = sp(f, 8.1, {damping: 10});
    if (t < 8.45) { x = 120 + (330 - 120) * cl((t - 8.1) / 0.35); }
    // salto final que se convierte en transición líquida
    let size = 120, opacity = 1;
    if (t >= 12.55) {
      const k = r(t, 12.55, 12.95, 0, 1, EI);
      x = 740 + (540 - 740) * k; yb = 955 + (1300 - 955) * k; size = 120 + k * 2600;
    }
    g = {x, y: yb, size, sx: 2 - sq, sy: sq * enter, happy: true, lx: 0.6, ly: -0.2, blink: (t > 10.9 && t < 11.02) ? 1 : 0, opacity};
  } else if (t >= 14.3 && t < W.nat[1]) {
    const s = sp(f, 14.3, {damping: 9});
    g = {x: 930, y: 1385, size: 130, sy: s, lx: -1, ly: -0.6, happy: true};
  } else if (t >= 20.9 && t < 21.75) {
    const s = sp(f, 20.9, {damping: 7, stiffness: 200});
    g = {x: 745, y: 868 - (1 - s) * 500, size: 130, sy: 0.75 + 0.25 * s, sx: 1.25 - 0.25 * s, happy: true, lx: -0.8, ly: 0.3};
  } else if (t >= 25.1 && t < 28.1) {
    const s = sp(f, 25.6, {damping: 8, stiffness: 180});
    const hop = t > T.L ? Math.abs(Math.sin((t - T.L) * 6)) * 40 * cl(1 - (t - T.L) / 1.5) : 0;
    g = {x: 830, y: 870 - (1 - s) * 600 - hop, size: 140, happy: true, lx: -0.5, ly: 0.2, opacity: t < 25.6 ? 0 : 1};
  } else if (t >= 28.15 && t < 31.3) {
    const s = sp(f, 28.25, {damping: 9});
    let size = 340, x = 380, y = 1160;
    g = {x, y: y + (1 - s) * 300, size, happy: t > T.N, lx: t < T.N ? 0.6 : 0.9, ly: t < T.N ? -0.4 : -0.6, blink: (t > 29.0 && t < 29.12) ? 1 : 0};
  } else if (t >= 32.2) {
    const s = sp(f, 32.2, {damping: 9});
    const lookUp = r(t, 32.9, 33.1);
    g = {x: 780, y: 850 + (1 - s) * 200, size: 140, lx: -1 + lookUp, ly: 0.6 - lookUp * 1.6, blink: t > 35.5 && t < 35.62 ? 1 : 0, happy: t > 34.0};
    gotiBehindCanasta = true;
  }
  // color de gotita para transiciones que llenan pantalla
  const gotiFill = (t >= 12.55 && t < 12.95);

  // ---- Canasta silueta ----
  const showCanasta = t < 4.75 || t >= 31.25;
  const canastaY = t < 4.75 ? 1080 : 1010;
  const canastaW = t < 4.75 ? 760 : 600;
  const canastaS = t < 4.75 ? 1 + t * 0.01 : 0.5 + 0.5 * sp(f, 31.4, {damping: 10});
  const rays = (t >= 2.7 && t < 4.75) ? r(t, 2.7, 3.0) : t >= 31.3 ? r(t, 31.3, 31.8) : 0;

  const brandColor = darkMode ? C.crema : C.vino;

  return (
    <AbsoluteFill style={{background: lightBg, fontFamily: SANS, overflow: 'hidden'}}>
      {/* fondos oscuros */}
      <AbsoluteFill style={{opacity: cl(darkO), background: 'radial-gradient(60% 40% at 50% 55%,#6b1229 0%,#2b0510 60%,#12020a 100%)'}} />
      <AbsoluteFill style={{opacity: cl(vinoO), background: 'radial-gradient(65% 45% at 50% 50%,#7a1531 0%,#4a0a1d 60%,#26040f 100%)'}} />
      {/* manchas pastel del inicio */}
      {t < 4.9 && <AbsoluteFill style={{opacity: 1 - r(t, 4.6, 4.85), background:
        'radial-gradient(42% 26% at 12% 20%,rgba(247,197,212,.85),transparent 70%), radial-gradient(40% 25% at 92% 48%,rgba(214,198,242,.85),transparent 70%), radial-gradient(48% 28% at 20% 88%,rgba(205,226,244,.9),transparent 70%), radial-gradient(35% 22% at 85% 92%,rgba(255,226,160,.7),transparent 70%)'}} />}
      {/* rayos */}
      {rays > 0 && (
        <div style={{...abs, left: 540 - 1000, top: canastaY - 1000, width: 2000, height: 2000, borderRadius: '50%', opacity: rays * 0.9,
          transform: `rotate(${t * 12}deg)`,
          background: t < 5 ? 'repeating-conic-gradient(from 0deg,rgba(227,155,11,.28) 0deg 7deg,rgba(227,155,11,0) 7deg 18deg)' : 'repeating-conic-gradient(from 0deg,rgba(242,183,5,.22) 0deg 7deg,rgba(242,183,5,0) 7deg 18deg)',
          WebkitMaskImage: 'radial-gradient(closest-side,#000 20%,transparent 75%)'} as any} />
      )}

      {/* marca */}
      <div style={{...abs, top: 166, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, color: brandColor, zIndex: 50}}>
        <i style={{width: 70, height: 2, background: 'currentColor', opacity: 0.45}} />
        <Img src={staticFile('logo.png')} style={{width: 100, height: 100, borderRadius: '50%', boxShadow: '0 6px 16px rgba(0,0,0,.18)', opacity: t > 35.75 ? 1 - r(t, 35.75, 36.0) : 1}} />
        <span style={{fontWeight: 800, fontSize: 28, letterSpacing: 8}}>TRIALFERI</span>
        <i style={{width: 70, height: 2, background: 'currentColor', opacity: 0.45}} />
      </div>

      {/* ===== S1 / S2 / S7: canasta misteriosa ===== */}
      {showCanasta && gotiBehindCanasta && g && <Gotita {...g} />}
      {showCanasta && gotiBehindCanasta && t < 2.75 && (() => {
        const at = t < 2.75 ? 1.15 : 32.9;
        const s = sp(f, at, {damping: 6, stiffness: 200});
        return <div style={{...abs, left: 790 - 60, top: (t < 2.75 ? 850 : 1150) - 170 - 150, width: 120, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic',
          fontSize: 150, lineHeight: 1, color: '#E39B0B', transform: `scale(${s}) rotate(${Math.sin(t * 5) * 8}deg)`, textShadow: '0 6px 20px rgba(227,155,11,.45)', zIndex: 6}}>?</div>;
      })()}
      {showCanasta && (
        <div style={{...abs, left: 540 - canastaW / 2, top: canastaY - (canastaW * 0.857) / 2, width: canastaW, zIndex: 5,
          transform: `scale(${canastaS})`, opacity: t < 4.75 ? 1 - r(t, 4.55, 4.75) : r(t, 31.3, 31.5)}}>
          <div style={{filter: t < 2.7 ? 'drop-shadow(0 0 3px rgba(255,214,120,.95)) drop-shadow(0 18px 40px rgba(90,14,36,.35))'
                                       : 'drop-shadow(0 0 5px rgba(255,214,120,1)) drop-shadow(0 0 46px rgba(242,183,5,.85))'}}>
            <div style={{width: '100%', aspectRatio: '900 / 771', background: t >= 31.25 ? 'linear-gradient(180deg,#1a0208,#0d0105)' : 'linear-gradient(180deg,#8a1838 0%,#5A0E24 60%,#3a0715 100%)',
              WebkitMaskImage: `url(${staticFile('canasta.png')})`, WebkitMaskSize: '100% 100%', WebkitMaskRepeat: 'no-repeat'} as any} />
          </div>
        </div>
      )}
      {t < 2.75 && (
        <>
          <div style={{...abs, left: 0, right: 0, top: 268, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 132, color: '#B3123A', lineHeight: 1.05,
            transform: `scale(${1 + t * 0.012})`, opacity: 1 - r(t, 2.55, 2.72)}}>¿Qué trae</div>
          <div style={{...abs, left: 0, right: 0, top: 405, textAlign: 'center', fontWeight: 900, fontSize: 124, color: C.vino, letterSpacing: -3, lineHeight: 1,
            transform: `scale(${1.02 + t * 0.012})`, opacity: 1 - r(t, 2.55, 2.72)}}>LA CANASTA?</div>
        </>
      )}
      {inW(t, 2.7, 4.75) && (
        <>
          <Kinetic f={f} at={2.76} text="GRAN" out={4.5} style={{top: 270, fontWeight: 900, fontSize: 168, color: '#E39B0B', letterSpacing: -4, lineHeight: 1}} />
          <Kinetic f={f} at={2.9} text="SORTEO" out={4.5} style={{top: 425, fontWeight: 900, fontSize: 168, color: C.vino, letterSpacing: -4, lineHeight: 1}} />
        </>
      )}
      {showCanasta && !gotiBehindCanasta && g && <div style={{zIndex: 7, position: 'absolute', inset: 0}}><Gotita {...g} /></div>}
      {inW(t, 3.3, 4.75) && (
        <div style={{...abs, left: 0, right: 0, top: 1450, textAlign: 'center', opacity: 1 - r(t, 4.5, 4.7), zIndex: 8}}>
          <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 104, color: C.vino, lineHeight: 1, transform: `translateY(${(1 - sp(f, 3.3)) * 40}px)`, opacity: cl(sp(f, 3.3) * 2)}}>este sábado 31</div>
          <svg width="520" height="30" style={{display: 'block', margin: '6px auto 0'}}><path d="M10 18 Q 260 -4 510 18" stroke={C.oro} strokeWidth="7" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - r(t, 3.5, 4.0)} /></svg>
        </div>
      )}
      {/* círculo crema que sale de la gotita */}
      {inW(t, 4.45, 4.9) && (() => {
        const rad = r(t, 4.45, 4.85, 0, 2300, EI);
        return <div style={{...abs, left: 540 - rad, top: 700 - rad, width: rad * 2, height: rad * 2, borderRadius: '50%', background: '#EEF2E4', zIndex: 70}} />;
      })()}

      {/* ===== S3: feria ===== */}
      {inW(t, 4.8, 12.95) && (
        <>
          <Line f={f} at={4.95} out={12.55} style={{top: 300, fontWeight: 800, fontSize: 30, letterSpacing: 9, color: C.verde}}>ENCUÉNTRANOS EN LA</Line>
          <Kinetic f={f} at={5.1} text="Feria" out={12.55} style={{top: 340, fontFamily: SERIF, fontStyle: 'italic', fontSize: 150, color: C.verde, lineHeight: 1}} />
          <Kinetic f={f} at={5.35} stagger={0.025} text="AGROECOLÓGICA" out={12.55} grad="linear-gradient(180deg,#8A1838 0%,#5A0E24 100%)" style={{top: 495, fontWeight: 900, fontSize: 110, color: C.vino, letterSpacing: -3, lineHeight: 1}} />
          <Line f={f} at={6.3} out={12.55} style={{top: 615, fontFamily: SERIF, fontStyle: 'italic', fontSize: 100, color: C.verde, lineHeight: 1.05}}>del Valle Chillón</Line>
          {/* línea del Metropolitano */}
          {t >= 8.0 && (() => {
            const draw = r(t, 8.05, 8.9);
            const o = 1 - r(t, 12.55, 12.8);
            const pin = sp(f, 8.7, {damping: 8, stiffness: 180});
            return (
              <div style={{...abs, inset: 0, opacity: o}}>
                <svg width={1080} height={1100} style={{...abs, left: 0, top: 0}}>
                  <line x1="90" y1="955" x2="990" y2="955" stroke={C.verde} strokeWidth="10" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
                  {[150, 400, 650].map((x, i) => <circle key={x} cx={x} cy={955} r={14 * cl((draw - x / 990) * 6)} fill={C.crema} stroke={C.verde} strokeWidth="6" />)}
                </svg>
                <svg width="110" height="140" viewBox="0 0 24 30" style={{...abs, left: 840 - 55, top: 955 - 140, transformOrigin: '50% 100%', transform: `translateY(${(1 - pin) * -300}px) scale(${0.4 + 0.6 * pin})`, opacity: cl(pin * 3)}}>
                  <path d="M12 0C5.4 0 0 5.3 0 11.9 0 20.8 12 30 12 30s12-9.2 12-18.1C24 5.3 18.6 0 12 0z" fill={C.vino} />
                  <circle cx="12" cy="11.5" r="4.6" fill={C.crema} />
                </svg>
                <div style={{...abs, left: 90, right: 160, top: 995, textAlign: 'left', opacity: cl(sp(f, 9.0) * 2), transform: `translateY(${(1 - sp(f, 9.0)) * 30}px)`}}>
                  <div style={{fontWeight: 900, fontSize: 46, color: C.tinta, letterSpacing: -1}}>Auxiliar Av. Universitaria</div>
                  <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 46, color: C.verde, lineHeight: 1.15}}>junto a la estación Chimpú Ocllo</div>
                </div>
              </div>
            );
          })()}
          {/* reloj */}
          {t >= T.E && (() => {
            const s = sp(f, T.E, {damping: 10});
            const ang = r(t, T.E + 0.2, T.E + 1.5, 240, 420, Easing.inOut(Easing.cubic));
            const o = 1 - r(t, 12.55, 12.8);
            const h1 = Math.round(interpolate(t, [T.E + 0.2, T.E + 1.5], [8, 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
            return (
              <div style={{...abs, left: 90, top: 1230, display: 'flex', gap: 44, alignItems: 'center', transformOrigin: '0 50%', scale: '1.22', opacity: o * cl(s * 2), transform: `translateY(${(1 - s) * 50}px)`}}>
                <svg width="230" height="230" viewBox="-50 -50 100 100">
                  <circle r="46" fill="#fff" stroke={C.vino} strokeWidth="5" />
                  {Array.from({length: 12}).map((_, i) => <line key={i} x1="0" y1="-38" x2="0" y2="-33" stroke={C.vino} strokeWidth="3" transform={`rotate(${i * 30})`} />)}
                  <path d={`M0 0 L ${Math.sin((ang * Math.PI) / 180) * 30} ${-Math.cos((ang * Math.PI) / 180) * 30}`} stroke={C.oro} strokeWidth="5" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="0" y2="-24" stroke={C.vino} strokeWidth="5" strokeLinecap="round" />
                  <circle r="5" fill={C.vino} />
                </svg>
                <div style={{color: C.vino}}>
                  <div style={{fontWeight: 800, fontSize: 30, letterSpacing: 7, color: C.verde}}>SÁBADO 31</div>
                  <div style={{fontWeight: 900, fontSize: 92, letterSpacing: -3, lineHeight: 1}}>8 a. m.</div>
                  <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 74, lineHeight: 1}}>a {h1 > 12 ? h1 - 12 : h1 === 12 ? 12 : h1 < 8 ? 8 : h1} {h1 >= 12 ? 'p. m.' : 'a. m.'}</div>
                </div>
              </div>
            );
          })()}
        </>
      )}

      {/* ===== S4: productos ===== */}
      {inW(t, W.nat[0], W.nat[1] + 0.3) && (() => {
        const out = r(t, W.nat[1] - 0.05, W.nat[1] + 0.25, 0, 1, EI);
        const sv = sp(f, 13.2, {damping: 9, stiffness: 160}), sc = sp(f, 13.45, {damping: 9, stiffness: 160});
        const pv = sp(f, 13.95, {damping: 10}), pc = sp(f, 14.15, {damping: 10});
        return (
          <div style={{...abs, inset: 0, transform: `translateX(${-out * 1080}px)`, filter: out > 0.02 ? `blur(${out * 18}px)` : undefined}}>
            <Kinetic f={f} at={13.0} text="Kéfir" style={{top: 262, fontFamily: SERIF, fontStyle: 'italic', fontSize: 140, color: C.azul, lineHeight: 1}} />
            <Kinetic f={f} at={13.15} text="NATURAL" style={{top: 405, fontWeight: 900, fontSize: 150, color: C.azul, letterSpacing: -4, lineHeight: 1}} />
            <div style={{...abs, left: 70, right: 70, top: 1260, height: 160, borderRadius: '50%', background: 'radial-gradient(closest-side,rgba(29,63,115,.18),transparent)'}} />
            <Img src={staticFile('vaca-1l.png')} style={{...abs, left: 395 - 243, top: 1380 - 760, height: 760, transformOrigin: '50% 100%',
              transform: `translateY(${(1 - sv) * -700}px) rotate(${(1 - sv) * -12}deg) scaleY(${0.92 + 0.08 * sv})`, filter: 'drop-shadow(0 30px 28px rgba(29,63,115,.28))'}} />
            <Img src={staticFile('cabra-1l.png')} style={{...abs, left: 735 - 144, top: 1380 - 760, height: 760, transformOrigin: '50% 100%',
              transform: `translateY(${(1 - sc) * -700}px) rotate(${(1 - sc) * 12}deg) scaleY(${0.92 + 0.08 * sc})`, filter: 'drop-shadow(0 30px 28px rgba(29,63,115,.28))'}} />
            <div style={{...abs, left: 395 - 110, width: 220, top: 1405, textAlign: 'center', transform: `scale(${pv})`}}>
              <span style={{background: C.azul, color: '#fff', fontWeight: 800, fontSize: 34, padding: '10px 28px', borderRadius: 999}}>vaca</span>
            </div>
            <div style={{...abs, left: 735 - 110, width: 220, top: 1405, textAlign: 'center', transform: `scale(${pc})`}}>
              <span style={{background: C.azul, color: '#fff', fontWeight: 800, fontSize: 34, padding: '10px 28px', borderRadius: 999}}>cabra</span>
            </div>
            {g && t >= 14.3 && t < W.nat[1] && <Gotita {...g} />}
          </div>
        );
      })()}
      {([
        ['fre', 'FRESA', 'fresa-recta.png', 264, 'sp-fresa1.png', 'sp-fresa2.png', '#B3123A', '#EFB0BF', 'con pulpa natural', 300],
        ['ara', 'ARÁNDANOS', 'arandanos-recta.png', 238, 'sp-ara1.png', 'sp-ara2.png', '#4B2C8C', '#CBB9EC', 'con pulpa natural', 158],
        ['fru', 'FRUTOS', 'frutos.png', 444, 'sp-frutos.png', null, '#9C1456', '#E7A6C6', 'del bosque', 250],
      ] as any[]).map(([key, word, bottle, bw, spb, spf, col, wcol, sub, fs]) => {
        const [a, b] = (W as any)[key];
        if (!inW(t, a - 0.05, b + 0.3)) return null;
        const inn = r(t, a - 0.05, a + 0.25), out = r(t, b - 0.05, b + 0.25, 0, 1, EI);
        const x = (1 - inn) * 1080 - out * 1080;
        const bl = Math.abs(x) / 1080 * 18;
        const d = sp(f, a + 0.02, {damping: 8, stiffness: 170});
        const e = r(t, a + 0.05, a + 0.5);
        const fsp = sp(f, a + 0.2, {damping: 7, stiffness: 200});
        const wd = sp(f, a, {damping: 14, stiffness: 120});
        return (
          <div key={key} style={{...abs, inset: 0, transform: `translateX(${x}px)`, filter: bl > 0.3 ? `blur(${bl}px)` : undefined}}>
            <div style={{...abs, left: 0, right: 0, top: 262, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 100, color: col, lineHeight: 1}}>kéfir frutado</div>
            <div style={{...abs, left: -100, right: -100, top: 760 - fs * 0.5, textAlign: 'center', fontWeight: 900, fontSize: fs, letterSpacing: -6, lineHeight: 1, color: wcol,
              transform: `scale(${1.25 - 0.25 * wd + (t - a) * 0.03})`}}>{word}</div>
            <Img src={staticFile(spb)} style={{...abs, left: 540 - 400, top: 620, width: 800, transform: `scale(${0.3 + 0.8 * e + (t - a) * 0.04}) rotate(${(1 - e) * -25 + (t - a) * 4}deg)`, opacity: cl(e * 3)}} />
            <Img src={staticFile(bottle)} style={{...abs, left: 540 - bw / 2 * (640 / 620), top: 1300 - 640, height: 640, transformOrigin: '50% 100%',
              transform: `translateY(${(1 - d) * -500}px) rotate(${Math.sin((t - a) * 3) * 1.5}deg) scaleY(${0.9 + 0.1 * d})`, filter: 'drop-shadow(0 30px 26px rgba(58,7,21,.3))'}} />
            {spf && <Img src={staticFile(spf)} style={{...abs, left: key === 'fre' ? 60 : 690, top: key === 'fre' ? 1020 : 960, width: 300, transform: `scale(${fsp}) rotate(${(1 - fsp) * 30}deg)`}} />}
            <div style={{...abs, left: 0, right: 0, top: 1335, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 92, color: col, lineHeight: 1,
              transform: `translateY(${(1 - sp(f, a + 0.15)) * 40}px)`, opacity: cl(sp(f, a + 0.15) * 2), WebkitTextStroke: '10px #fff', paintOrder: 'stroke fill'} as any}>{sub}</div>
          </div>
        );
      })}
      {inW(t, W.cot[0] - 0.05, 21.8) && (() => {
        const inn = r(t, W.cot[0] - 0.05, W.cot[0] + 0.25);
        const x = (1 - inn) * 1080;
        const ja = sp(f, 19.3, {damping: 7, stiffness: 180}), jo = sp(f, 20.4, {damping: 7, stiffness: 180});
        return (
          <div style={{...abs, inset: 0, transform: `translateX(${x}px)`, filter: x > 3 ? `blur(${x / 60}px)` : undefined}}>
            <Kinetic f={f} at={18.45} text="Queso" style={{top: 262, fontFamily: SERIF, fontStyle: 'italic', fontSize: 130, color: C.verde, lineHeight: 1}} />
            <Kinetic f={f} at={18.6} text="COTTAGE" grad="linear-gradient(180deg,#8A1838 0%,#5A0E24 100%)" style={{top: 395, fontWeight: 900, fontSize: 150, color: C.vino, letterSpacing: -4, lineHeight: 1}} />
            <Line f={f} at={18.9} style={{top: 548, fontFamily: SERIF, fontStyle: 'italic', fontSize: 84, color: C.verde, lineHeight: 1}}>de cabra</Line>
            <div style={{...abs, left: 60, right: 60, top: 1210, height: 140, borderRadius: '50%', background: 'radial-gradient(closest-side,rgba(36,85,58,.2),transparent)'}} />
            <Img src={staticFile('cottage-cabra-ajo.png')} style={{...abs, left: 320 - 235, top: 1290 - 500, height: 500, transformOrigin: '50% 100%',
              transform: `translateY(${(1 - ja) * -900}px) rotate(${-5 + (1 - ja) * -25}deg)`, opacity: t >= 19.3 ? 1 : 0}} />
            <Img src={staticFile('cottage-cabra-olivo.png')} style={{...abs, left: 745 - 270, top: 1300 - 430, height: 430, transformOrigin: '50% 100%',
              transform: `translateY(${(1 - jo) * -900}px) rotate(${5 + (1 - jo) * 25}deg)`, opacity: t >= 20.4 ? 1 : 0}} />
            <div style={{...abs, left: 320 - 200, width: 400, top: 1320, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 80, color: C.vino, opacity: cl(sp(f, 19.6) * 2), transform: `translateY(${(1 - sp(f, 19.6)) * 30}px)`}}>al ajo</div>
            <div style={{...abs, left: 745 - 200, width: 400, top: 1320, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 80, color: C.vino, opacity: cl(sp(f, 20.7) * 2), transform: `translateY(${(1 - sp(f, 20.7)) * 30}px)`}}>al olivo</div>
            {g && t >= 20.9 && t < 21.75 && <Gotita {...g} />}
          </div>
        );
      })()}

      {/* ===== S5: ticket ===== */}
      {inW(t, 21.75, 28.15) && (() => {
        const n = t < T.K ? Math.round(interpolate(t, [21.95, 23.3], [0, 20], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EO}))
                          : t < 25.5 ? 40 : 60;
        const bump = t >= T.K ? (sp(f, t < 25.5 ? 25.05 : 25.5, {damping: 8}) ) : 1;
        const print = r(t, T.J - 0.05, T.J + 0.55);
        const tk2 = sp(f, 25.05, {damping: 9, stiffness: 160}), tk3 = sp(f, 25.5, {damping: 9, stiffness: 160});
        return (
          <>
            <Kinetic f={f} at={21.95} text="¿Cómo" style={{top: 262, fontFamily: SERIF, fontStyle: 'italic', fontSize: 120, color: C.oro, lineHeight: 1}} />
            <Kinetic f={f} at={22.1} text="PARTICIPAR?" style={{top: 385, fontWeight: 900, fontSize: 124, color: C.crema, letterSpacing: -4, lineHeight: 1}} />
            <div style={{...abs, left: 0, right: 0, top: 530, textAlign: 'center', color: C.crema, opacity: r(t, 21.95, 22.2)}}>
              <span style={{fontWeight: 900, fontSize: 220, letterSpacing: -8, lineHeight: 1, display: 'inline-block', transform: `scale(${0.9 + 0.1 * bump})`}}>S/ {n}</span>
              <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 64, marginTop: -6, color: C.oroClaro}}>{n <= 20 ? 'de compra' : n === 40 ? '= 2 tickets' : '= 3 tickets'}</div>
            </div>
            {/* ranura de impresión */}
            <div style={{...abs, left: 130, width: 820, top: 905, height: 14, borderRadius: 7, background: '#1a0208', opacity: r(t, 23.3, 23.6) * (1 - r(t, 24.9, 25.2))}} />
            <div style={{...abs, left: 0, right: 0, top: 912, height: 600, overflow: 'hidden'}}>
              {/* ticket 3 y 2 caen apilados */}
              {t >= 25.5 && <Ticket style={{left: 215, top: 6 - (1 - tk3) * 900, transform: `rotate(${7 - (1 - tk3) * 20}deg)`}} />}
              {t >= 25.05 && <Ticket style={{left: 105, top: 16 - (1 - tk2) * 900, transform: `rotate(${-6 + (1 - tk2) * 20}deg)`}} />}
              <Ticket style={{left: 160, top: -340 + print * 380, transform: `rotate(${Math.sin(Math.max(0, t - T.J - 0.5) * 3) * 1.2}deg)`, opacity: t >= T.J - 0.05 ? 1 : 0}} />
            </div>
            {t >= 25.05 && (
              <div style={{...abs, left: 95, top: 815, width: 150, height: 150, borderRadius: '50%', background: C.crema, color: C.vino, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 74, letterSpacing: -2, boxShadow: '0 16px 30px rgba(0,0,0,.35)', transform: `scale(${bump})`, zIndex: 20}}>×{t < 25.5 ? 2 : 3}</div>
            )}
            <Line f={f} at={T.L} style={{top: 1335, fontWeight: 900, fontSize: 92, color: C.crema, letterSpacing: -3, lineHeight: 1}}>más tickets,</Line>
            <Line f={f} at={T.L + 0.35} style={{top: 1428, fontFamily: SERIF, fontStyle: 'italic', fontSize: 88, color: C.oro, lineHeight: 1}}>más oportunidades.</Line>
            {g && t >= 25.6 && <div style={{position: 'absolute', inset: 0, zIndex: 25}}><Gotita {...g} y={g.y + 160} /></div>}
          </>
        );
      })()}

      {/* ===== S6: ya participas ===== */}
      {inW(t, 28.1, 31.3) && (() => {
        const ck = sp(f, T.N, {damping: 8, stiffness: 200});
        return (
          <>
            <Kinetic f={f} at={28.2} text="¿Ya tienes" style={{top: 300, fontFamily: SERIF, fontStyle: 'italic', fontSize: 130, color: C.vino, lineHeight: 1}} />
            <Kinetic f={f} at={28.4} text="TU TICKET?" style={{top: 430, fontWeight: 900, fontSize: 140, color: C.vino, letterSpacing: -4, lineHeight: 1}} />
            {/* ticket en mano de la gotita */}
            <Ticket w={390} style={{left: 480, top: 990 + (1 - sp(f, 28.5, {damping: 10})) * 400, transform: `rotate(${-12 + Math.sin(t * 2) * 2}deg)`, zIndex: 3}} />
            {g && <div style={{position: 'absolute', inset: 0, zIndex: gotiFill ? 75 : 4}}><Gotita {...g} /></div>}
            {t >= T.N && (
              <svg width="230" height="230" viewBox="0 0 24 24" style={{...abs, left: 690, top: 640, transform: `scale(${ck})`, zIndex: 5}}>
                <circle cx="12" cy="12" r="11.5" fill={C.verde} />
                <path d="M6.5 12.5l3.6 3.6L17.8 8.4" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - r(t, T.N + 0.15, T.N + 0.5)} />
              </svg>
            )}
            <Line f={f} at={T.N + 0.1} style={{top: 1290, fontWeight: 900, fontSize: 120, color: C.vino, letterSpacing: -4, lineHeight: 1}}>¡Ya estás</Line>
            <Line f={f} at={T.N + 0.35} style={{top: 1405, fontFamily: SERIF, fontStyle: 'italic', fontSize: 110, color: C.verde, lineHeight: 1}}>participando!</Line>
          </>
        );
      })()}

      {/* ===== S7: final ===== */}
      {t >= 31.25 && (
        <>
          <Kinetic f={f} at={31.35} text="SORTEO" style={{top: 290, fontWeight: 900, fontSize: 176, color: C.crema, letterSpacing: -5, lineHeight: 1}} />
          <div style={{...abs, left: 0, right: 0, top: 488, textAlign: 'center', transform: `scale(${sp(f, 31.95, {damping: 8})})`}}>
            <span style={{background: C.oro, color: C.vinoOsc, fontWeight: 900, fontSize: 56, padding: '16px 40px', borderRadius: 999, letterSpacing: -1, boxShadow: '0 14px 30px rgba(0,0,0,.35)'}}>sábado 31 · 3:00 p. m.</span>
          </div>
          <div style={{...abs, left: 0, right: 0, top: 620, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 70, color: C.oroClaro, opacity: cl(sp(f, 32.4) * 2)}}>¿qué traerá la canasta?</div>
          {t >= T.P && (() => {
            const s = r(t, T.P, T.P + 0.3, 0, 1, EO);
            return (
              <div style={{...abs, left: 660, top: 1060, width: 260, height: 260, borderRadius: '50%', background: C.crema, color: C.vino, zIndex: 30,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 22px 40px rgba(0,0,0,.45)',
                transform: `rotate(${-12 - (1 - s) * 30}deg) scale(${2.2 - 1.2 * s + (t > T.P + 0.4 ? 0.03 * Math.sin((t - T.P) * 5) : 0)})`, opacity: s > 0 ? 1 : 0}}>
                <div style={{...abs, inset: 14, borderRadius: '50%', border: '4px dashed rgba(90,14,36,.5)'}} />
                <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 58, lineHeight: 1}}>último</div>
                <div style={{fontWeight: 900, fontSize: 96, lineHeight: 0.95, letterSpacing: -3}}>DÍA</div>
              </div>
            );
          })()}
          <Line f={f} at={34.6} style={{top: 1330, fontWeight: 600, fontSize: 40, color: C.crema, lineHeight: 1.35, zIndex: 30}}>
            <>Consigue tu ticket en la <b style={{color: C.oro, fontWeight: 900}}>Feria Agroecológica<br />del Valle Chillón</b> · 8 a. m. – 2 p. m.</>
          </Line>
          <Line f={f} at={35.0} style={{top: 1480, fontWeight: 800, fontSize: 38, letterSpacing: 4, color: C.crema, opacity: 0.85, zIndex: 30}}>@trialferi</Line>
        </>
      )}

      {/* Gotita como transición líquida (feria -> productos) */}
      {g && gotiFill && t < 13 && <div style={{position: 'absolute', inset: 0, zIndex: 75}}><Gotita {...g} /></div>}
      {g && inW(t, 8.1, 12.55) && <div style={{position: 'absolute', inset: 0, zIndex: 20}}><Gotita {...g} /></div>}
      {/* círculo vino al final (S6 -> S7) */}
      {inW(t, 30.95, 31.35) && (() => {
        const rad = r(t, 30.95, 31.28, 0, 2400, EI);
        return <div style={{...abs, left: 400 - rad, top: 1000 - rad, width: rad * 2, height: rad * 2, borderRadius: '50%', background: '#4a0a1d', zIndex: 76}} />;
      })()}


      {/* ===== Firma final con logo ===== */}
      {t >= 35.8 && (() => {
        const rad = r(t, 35.8, 36.15, 0, 2300, EI);
        const lg = sp(f, 36.0, {damping: 9, stiffness: 150});
        const gw = sp(f, 36.25, {damping: 8});
        return (
          <div style={{...abs, inset: 0, zIndex: 82}}>
            <div style={{...abs, left: 540 - rad, top: 1000 - rad, width: rad * 2, height: rad * 2, borderRadius: '50%', background: C.crema}} />
            <div style={{...abs, inset: 0, background: 'radial-gradient(42% 26% at 12% 20%,rgba(247,197,212,.8),transparent 70%), radial-gradient(40% 25% at 92% 50%,rgba(214,198,242,.8),transparent 70%), radial-gradient(48% 28% at 20% 88%,rgba(205,226,244,.85),transparent 70%)', opacity: r(t, 36.0, 36.3)}} />
            <Img src={staticFile('logo.png')} style={{...abs, left: 540 - 210, top: 560, width: 420, height: 420, borderRadius: '50%', transform: `scale(${lg}) rotate(${(1 - lg) * -40}deg)`, boxShadow: '0 30px 60px rgba(90,14,36,.25)'}} />
            <div style={{...abs, left: 0, right: 0, top: 1030, textAlign: 'center', fontWeight: 900, fontSize: 110, letterSpacing: -3, color: C.vino, opacity: cl(sp(f, 36.2) * 2), transform: `translateY(${(1 - sp(f, 36.2)) * 40}px)`}}>TRIALFERI</div>
            <div style={{...abs, left: 0, right: 0, top: 1170, textAlign: 'center', opacity: cl(sp(f, 36.4) * 2), transform: `scale(${sp(f, 36.4, {damping: 9})})`}}>
              <span style={{background: C.vino, color: C.crema, fontWeight: 800, fontSize: 40, padding: '14px 34px', borderRadius: 999}}>Sorteo · sáb 31 · 3:00 p. m.</span>
            </div>
            <div style={{...abs, left: 0, right: 0, top: 1290, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 64, color: '#B3123A', opacity: r(t, 36.6, 36.9)}}>@trialferi</div>
            <Gotita x={830} y={985} size={150} happy sy={gw} rot={Math.sin(t * 8) * 6 * cl(gw)} lx={-0.8} ly={-0.4} />
          </div>
        );
      })()}
      <Wave t={t} at={21.75} color="#4a0a1d" />
      <Wave t={t} at={28.11} color={C.crema} />
      {/* destello */}
      {inW(t, 2.62, 3.0) && <AbsoluteFill style={{background: '#FFF4D6', opacity: 0.8 * (1 - r(t, 2.62, 3.0)), zIndex: 85}} />}

      {/* ===== Manteca (escena nueva, en tiempo real de la voz nueva) ===== */}
      {tN >= M0 - 0.05 && t < 21.8 && (() => {
        const u = tN - M0, fu = u * FPS;
        const inn = r(tN, M0 - 0.05, M0 + 0.25);
        const x = (1 - inn) * 1080;
        const jar = spring({frame: fu - 9, fps: FPS, config: {damping: 8, stiffness: 160, mass: 0.7}});
        const kp = TIMING.manPrice - M0;
        const strike = r(u, kp, kp + 0.35);
        const np = spring({frame: fu - Math.round((kp + 0.25) * FPS), fps: FPS, config: {damping: 8, stiffness: 180}});
        const badge = spring({frame: fu - Math.round((kp + 0.05) * FPS), fps: FPS, config: {damping: 7, stiffness: 200}});
        const gw = spring({frame: fu - Math.round(1.3 * FPS), fps: FPS, config: {damping: 7, stiffness: 200}});
        const ln = (d: number) => spring({frame: fu - Math.round(d * FPS), fps: FPS, config: {damping: 13, stiffness: 150}});
        return (
          <div style={{...abs, inset: 0, zIndex: 40, transform: `translateX(${x}px)`, filter: x > 3 ? `blur(${x / 60}px)` : undefined,
            background: 'radial-gradient(70% 45% at 45% 55%,#FFF8E6 0%,#FBE9BF 60%,#F1D592 100%)'}}>
            <div style={{...abs, left: 0, right: 0, top: 262, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 120, color: '#B3123A', lineHeight: 1, opacity: cl(ln(0.1) * 2), transform: `translateY(${(1 - ln(0.1)) * 50}px)`}}>¡Y aprovecha!</div>
            <div style={{...abs, left: 0, right: 0, top: 392, textAlign: 'center', fontWeight: 900, fontSize: 150, letterSpacing: -4, lineHeight: 1, paddingBottom: 8, backgroundImage: 'linear-gradient(180deg,#8A1838 0%,#5A0E24 100%)', WebkitBackgroundClip: 'text', color: 'transparent', opacity: cl(ln(0.35) * 2), transform: `scale(${0.85 + 0.15 * ln(0.35)})`}}>MANTECA</div>
            <div style={{...abs, left: 0, right: 0, top: 548, textAlign: 'center', fontWeight: 800, fontSize: 44, color: C.vino, letterSpacing: 8, opacity: cl(ln(0.6) * 2)}}>DE CERDO · 1 LITRO</div>
            <div style={{...abs, left: 40, width: 700, top: 1420, height: 140, borderRadius: '50%', background: 'radial-gradient(closest-side,rgba(90,14,36,.22),transparent)'}} />
            <Img src={staticFile('manteca.png')} style={{...abs, left: 40, top: 1500 - 840, height: 840, transformOrigin: '50% 100%',
              transform: `translateY(${(1 - jar) * -900}px) rotate(${(1 - jar) * -14}deg) scaleY(${0.92 + 0.08 * jar})`, opacity: u > 0.28 ? 1 : 0, filter: 'drop-shadow(0 26px 26px rgba(90,14,36,.3))'}} />
            {u > 1.3 && <Gotita x={690} y={1500 - (1 - gw) * 500} size={130} happy sy={0.8 + 0.2 * gw} sx={1.2 - 0.2 * gw} lx={0.9} ly={0.4} />}
            {/* precio */}
            <div style={{...abs, left: 640, width: 360, top: 880, textAlign: 'center', color: C.vino, whiteSpace: 'nowrap', opacity: cl(ln(0.8) * 2)}}>
              <div style={{position: 'relative', display: 'inline-block', fontWeight: 800, fontSize: 86, opacity: 0.55}}>S/ 60
                <div style={{...abs, left: -6, top: '52%', height: 8, width: `${strike * 112}%`, background: '#B3123A', borderRadius: 4, transform: 'rotate(-10deg)', transformOrigin: '0 50%'}} />
              </div>
              <div style={{fontWeight: 900, fontSize: 140, letterSpacing: -5, lineHeight: 1, marginTop: 6, color: '#B3123A', transform: `scale(${np})`, opacity: u > kp + 0.25 ? 1 : 0}}>S/ 54</div>
              <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 50, color: '#B3123A', opacity: r(u, kp + 0.6, kp + 0.9)}}>frasco de 1 L</div>
            </div>
            {u > kp + 0.05 && (
              <div style={{...abs, left: 40, top: 690, width: 190, height: 190, borderRadius: '50%', background: C.oro, color: C.vino, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 16px 30px rgba(90,14,36,.3)', transform: `rotate(${-14 + (1 - badge) * -40}deg) scale(${badge})`}}>
                <div style={{fontWeight: 900, fontSize: 70, letterSpacing: -3, lineHeight: 1}}>-10%</div>
                <div style={{fontWeight: 800, fontSize: 18, letterSpacing: 3}}>DESCUENTO</div>
              </div>
            )}
            <div style={{...abs, left: 0, right: 0, top: 1545, textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 84, color: C.vino, opacity: r(u, TIMING.manFeria - M0, TIMING.manFeria - M0 + 0.3)}}>solo en la feria</div>
          </div>
        );
      })()}
      <ProductsV5 tn={tN} />
      <Particles t={t} />
      {/* grano */}
      <svg width={1080} height={1920} style={{...abs, inset: 0, opacity: 0.09, mixBlendMode: 'soft-light', zIndex: 90}}>
        <filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves={2} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>
    </AbsoluteFill>
  );
};
