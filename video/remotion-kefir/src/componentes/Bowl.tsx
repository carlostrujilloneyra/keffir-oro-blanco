import React from 'react';
import {random} from 'remotion';
import {rampa} from '../anim';

/*
  Bowl ilustrado (no hay fotos de granola, cereales ni fruta suelta). Para que conviva con las fotos de producto
  se modela como un objeto con luz: cerámica moteada con brillo y luz de rebote, pared interior visible,
  kéfir con brillo propio, sombra de contacto y una sombra pequeña bajo cada ingrediente.
  Cada ingrediente cae en su cue y se asienta. Coordenadas locales: (0,0) es el centro de la boca, A el radio horizontal.
*/
type Pieza = {tipo: 'granola' | 'aro' | 'fresa' | 'arandano'; x: number; y: number; s: number; rot: number; orden: number};

const piezas = (A: number): Record<'granola' | 'cereales' | 'frutas', Pieza[]> => {
  const B = A * 0.36;
  // reparte n piezas dentro de un sector de la superficie del kéfir, de atrás hacia delante
  const sector = (grupo: string, n: number, cx: number, cy: number, rx: number, ry: number, tipos: Pieza['tipo'][], s0: number) =>
    Array.from({length: n}, (_, i) => {
      const r = (k: string) => random(`${grupo}-${i}-${k}`);
      const a = r('a') * Math.PI * 2, d = Math.sqrt(r('d'));
      return {tipo: tipos[i % tipos.length], x: cx + Math.cos(a) * d * rx, y: cy + Math.sin(a) * d * ry, s: s0 * (0.82 + r('s') * 0.4), rot: r('r') * 360, orden: r('o')};
    }).sort((p, q) => p.y - q.y);
  return {
    granola: sector('granola', 14, -A * 0.4, B * 0.2, A * 0.33, B * 0.4, ['granola'], A * 0.072),
    cereales: sector('cereales', 12, A * 0.4, B * 0.16, A * 0.32, B * 0.38, ['aro'], A * 0.058),
    frutas: sector('frutas', 9, A * 0.02, B * 0.5, A * 0.36, B * 0.24, ['fresa', 'arandano', 'arandano'], A * 0.088),
  };
};

const Dibujo: React.FC<{p: Pieza}> = ({p}) => {
  const s = p.s;
  if (p.tipo === 'granola')
    return (
      <g>
        <path d={`M${-s} ${-s * 0.1}Q${-s * 0.9} ${-s * 0.95} ${-s * 0.1} ${-s * 0.85}Q${s * 0.75} ${-s * 1.05} ${s} ${-s * 0.2}Q${s * 1.15} ${s * 0.65} ${s * 0.2} ${s * 0.85}Q${-s * 0.75} ${s} ${-s} ${-s * 0.1}Z`} fill="url(#b-granola)" />
        <ellipse cx={-s * 0.32} cy={-s * 0.28} rx={s * 0.44} ry={s * 0.24} fill="#EFD7A3" transform={`rotate(-25 ${-s * 0.32} ${-s * 0.28})`} />
        <ellipse cx={s * 0.36} cy={s * 0.16} rx={s * 0.38} ry={s * 0.2} fill="#DDB877" transform={`rotate(30 ${s * 0.36} ${s * 0.16})`} />
        <ellipse cx={-s * 0.2} cy={s * 0.42} rx={s * 0.3} ry={s * 0.16} fill="#C99A55" transform={`rotate(-8 ${-s * 0.2} ${s * 0.42})`} />
        <circle cx={s * 0.12} cy={-s * 0.48} r={s * 0.17} fill="#6B3F1D" />
        <circle cx={s * 0.5} cy={-s * 0.32} r={s * 0.1} fill="#8A5527" />
      </g>
    );
  if (p.tipo === 'aro')
    return (
      <g>
        <ellipse cy={s * 0.14} rx={s} ry={s * 0.76} fill="none" stroke="#B9791F" strokeWidth={s * 0.62} />
        <ellipse rx={s} ry={s * 0.76} fill="none" stroke="#E6AC46" strokeWidth={s * 0.62} />
        <path d={`M${-s * 0.95} ${-s * 0.3}A${s} ${s * 0.76} 0 0 1 ${s * 0.45} ${-s * 0.7}`} fill="none" stroke="#FBE3A6" strokeWidth={s * 0.18} strokeLinecap="round" />
      </g>
    );
  if (p.tipo === 'fresa')
    return (
      <g>
        <path d={`M0 ${s * 1.15}C${-s * 1.3} ${s * 0.2} ${-s * 1.1} ${-s} 0 ${-s * 0.75}C${s * 1.1} ${-s} ${s * 1.3} ${s * 0.2} 0 ${s * 1.15}Z`} fill="url(#b-fresa)" />
        <path d={`M0 ${s * 0.8}C${-s * 0.78} ${s * 0.1} ${-s * 0.68} ${-s * 0.58} 0 ${-s * 0.42}C${s * 0.68} ${-s * 0.58} ${s * 0.78} ${s * 0.1} 0 ${s * 0.8}Z`} fill="#F5909F" />
        <path d={`M0 ${s * 0.44}C${-s * 0.32} ${s * 0.05} ${-s * 0.27} ${-s * 0.27} 0 ${-s * 0.2}C${s * 0.27} ${-s * 0.27} ${s * 0.32} ${s * 0.05} 0 ${s * 0.44}Z`} fill="#FCDADF" />
        <path d={`M${-s * 0.72} ${-s * 0.5}Q${-s * 0.3} ${-s * 0.86} ${s * 0.2} ${-s * 0.74}`} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={s * 0.1} strokeLinecap="round" />
      </g>
    );
  return (
    <g>
      <circle r={s * 0.74} fill="url(#b-arandano)" />
      <ellipse cx={-s * 0.24} cy={-s * 0.3} rx={s * 0.24} ry={s * 0.15} fill="rgba(255,255,255,.5)" transform={`rotate(-30 ${-s * 0.24} ${-s * 0.3})`} />
      <path d={`M${-s * 0.2} ${s * 0.02}l${s * 0.2} ${-s * 0.14}l${s * 0.2} ${s * 0.14}l${-s * 0.07} ${s * 0.22}h${-s * 0.26}Z`} fill="#161D47" />
    </g>
  );
};

export const Bowl: React.FC<{
  t: number; x: number; y: number; A: number; cues: {granola: number; cereales: number; frutas: number}; bowl?: [string, string]; kefir?: [string, string];
}> = ({t, x, y, A, cues, bowl = ['#2D7FC4', '#123C63'], kefir = ['#FFFFFF', '#EFE7D6']}) => {
  const B = A * 0.36, H = A * 0.8, G = A * 0.045; // G: grosor del borde
  const grupos = React.useMemo(() => piezas(A), [A]);
  const caida = (p: Pieza, cue: number) => {
    const a = cue - 0.5 + p.orden * 0.3; // salen antes de la palabra para aterrizar con ella
    const v = rampa(t, a, a + 0.38, 0, 1, (k) => k * k); // caída acelerada (gravedad)
    const asienta = rampa(t, a + 0.38, a + 0.6);
    return {y: p.y - (1 - v) * (A * 2), visible: t >= a, estira: v < 1 ? 1 + v * 0.55 : 1 - Math.sin(asienta * Math.PI) * 0.14, hundida: asienta, cae: v};
  };
  const orden: [keyof typeof grupos, number][] = [['granola', cues.granola], ['cereales', cues.cereales], ['frutas', cues.frutas]];
  const cuerpo = `M${-A} 0C${-A} ${H * 0.74} ${-A * 0.5} ${H} ${-A * 0.3} ${H}L${A * 0.3} ${H}C${A * 0.5} ${H} ${A} ${H * 0.74} ${A} 0Z`;
  // onda en la superficie cuando algo acaba de caer
  const golpe = Math.max(...orden.map(([, cue]) => Math.max(0, 1 - Math.abs(t - cue - 0.05) * 3)));
  return (
    <svg width={A * 2.8} height={A * 4.6} viewBox={`${-A * 1.4} ${-A * 2.7} ${A * 2.8} ${A * 4.6}`} style={{position: 'absolute', left: x - A * 1.4, top: y - A * 2.7, overflow: 'visible'}}>
      <defs>
        <linearGradient id="b-cuerpo" x1="0" x2="1">
          <stop offset="0" stopColor={bowl[0]} />
          <stop offset=".3" stopColor={bowl[0]} />
          <stop offset=".78" stopColor={bowl[1]} />
          <stop offset="1" stopColor={bowl[1]} />
        </linearGradient>
        <linearGradient id="b-profundo" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(0,0,0,0)" />
          <stop offset=".55" stopColor="rgba(0,0,0,.12)" />
          <stop offset="1" stopColor="rgba(0,0,0,.5)" />
        </linearGradient>
        <linearGradient id="b-pared" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={bowl[1]} />
          <stop offset="1" stopColor={bowl[0]} />
        </linearGradient>
        <radialGradient id="b-kefir" cx=".36" cy=".3" r=".85">
          <stop offset="0" stopColor={kefir[0]} />
          <stop offset=".6" stopColor={kefir[0]} />
          <stop offset="1" stopColor={kefir[1]} />
        </radialGradient>
        <linearGradient id="b-granola" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#C08A43" />
          <stop offset="1" stopColor="#8A5A26" />
        </linearGradient>
        <linearGradient id="b-fresa" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#EE3A52" />
          <stop offset="1" stopColor="#B3122B" />
        </linearGradient>
        <radialGradient id="b-arandano" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#5766B4" />
          <stop offset="1" stopColor="#1F285C" />
        </radialGradient>
        <filter id="b-suave" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={A * 0.05} /></filter>
        <filter id="b-fino" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={A * 0.014} /></filter>
        {/* moteado de cerámica: ruido fino convertido en pecas */}
        <filter id="b-moteado" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="7" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -11 5.4" />
        </filter>
        <clipPath id="b-clip-cuerpo"><path d={cuerpo} /></clipPath>
        <clipPath id="b-clip-kefir"><ellipse cy={B * 0.2} rx={A * 0.9} ry={B * 0.78} /></clipPath>
      </defs>

      {/* sombra proyectada amplia + sombra de contacto pegada al pie */}
      <ellipse cx={A * 0.16} cy={H + A * 0.05} rx={A * 1.08} ry={A * 0.16} fill="rgba(60,42,14,.34)" filter="url(#b-suave)" />
      <ellipse cx={A * 0.03} cy={H + A * 0.012} rx={A * 0.4} ry={A * 0.045} fill="rgba(30,20,6,.62)" filter="url(#b-fino)" />

      {/* cuerpo: color, oscurecimiento hacia abajo, moteado, brillo y luz de rebote */}
      <path d={cuerpo} fill="url(#b-cuerpo)" />
      <path d={cuerpo} fill="url(#b-profundo)" />
      <g clipPath="url(#b-clip-cuerpo)">
        <rect x={-A} y={0} width={A * 2} height={H} filter="url(#b-moteado)" opacity=".2" />
        <ellipse cx={-A * 0.52} cy={H * 0.36} rx={A * 0.16} ry={H * 0.3} fill="rgba(255,255,255,.5)" filter="url(#b-suave)" transform={`rotate(24 ${-A * 0.52} ${H * 0.36})`} />
        <ellipse cx={-A * 0.62} cy={H * 0.24} rx={A * 0.035} ry={H * 0.13} fill="rgba(255,255,255,.75)" filter="url(#b-fino)" transform={`rotate(22 ${-A * 0.62} ${H * 0.24})`} />
        <path d={`M${-A * 0.32} ${H * 0.985}L${A * 0.42} ${H * 0.985}`} stroke="rgba(255,244,214,.35)" strokeWidth={A * 0.03} strokeLinecap="round" filter="url(#b-fino)" />
      </g>

      {/* borde con grosor, pared interior y kéfir */}
      <ellipse rx={A} ry={B} fill={bowl[0]} />
      <ellipse rx={A} ry={B} fill="rgba(255,255,255,.3)" />
      <ellipse cy={G * 0.5} rx={A - G} ry={B - G * 0.7} fill="url(#b-pared)" />
      <ellipse cy={B * 0.2} rx={A * 0.9} ry={B * 0.78} fill="url(#b-kefir)" />
      <g clipPath="url(#b-clip-kefir)">
        {/* sombra de la pared sobre el kéfir, remolino y brillos */}
        <ellipse cy={-B * 0.62} rx={A} ry={B * 0.5} fill="rgba(70,48,20,.3)" filter="url(#b-suave)" />
        <path d={`M${-A * 0.6} ${B * 0.3}C${-A * 0.2} ${-B * 0.2} ${A * 0.25} ${B * 0.7} ${A * 0.65} ${B * 0.1}`} fill="none" stroke={kefir[1]} strokeWidth={A * 0.05} strokeLinecap="round" filter="url(#b-fino)" opacity=".9" />
        <ellipse cx={-A * 0.3} cy={B * 0.02} rx={A * 0.26} ry={B * 0.09} fill="rgba(255,255,255,.85)" filter="url(#b-fino)" transform={`rotate(-8 ${-A * 0.3} ${B * 0.02})`} />
        <ellipse cy={B * 0.2} rx={A * (0.3 + golpe * 0.5)} ry={B * (0.24 + golpe * 0.42)} fill="none" stroke="rgba(120,90,50,.28)" strokeWidth={A * 0.012} opacity={golpe} />
      </g>

      {orden.map(([g, cue]) =>
        grupos[g].map((p, i) => {
          const c = caida(p, cue);
          if (!c.visible) return null;
          return (
            <React.Fragment key={g + i}>
              {/* la sombra aparece al acercarse a la superficie */}
              <ellipse cx={p.x + p.s * 0.22} cy={p.y + p.s * 0.5} rx={p.s * 1.05} ry={p.s * 0.5} fill="rgba(70,45,20,.42)" filter="url(#b-fino)" opacity={c.cae * c.cae} />
              <g transform={`translate(${p.x} ${c.y}) rotate(${p.rot + (1 - c.hundida) * 46}) scale(1 ${c.estira})`} filter={c.cae < 1 ? 'url(#b-fino)' : undefined}>
                <Dibujo p={p} />
              </g>
            </React.Fragment>
          );
        }),
      )}

      {/* filo de luz en el borde delantero */}
      <path d={`M${-A * 0.985} ${B * 0.12}A${A} ${B} 0 0 0 ${A * 0.5} ${B * 0.87}`} fill="none" stroke="rgba(255,255,255,.62)" strokeWidth={A * 0.014} strokeLinecap="round" />
    </svg>
  );
};
