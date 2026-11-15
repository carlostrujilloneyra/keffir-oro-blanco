import React from 'react';
import {random, staticFile} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {useTexture} from '@react-three/drei';
import * as THREE from 'three';
import {ALTO, ANCHO} from '../tema';

/*
  Misma técnica que remotion-sorteo/src/PruebaParallax.tsx: cada imagen es un plano en una escena 3D
  y la cámara se mueve, de modo que las capas se desplazan según su profundidad.
  Aquí el mundo está en píxeles del video: en z = 0 un plano se ve 1:1, así se compone igual que en CSS.
  Renderizar con --gl=angle.
*/
const FOV = 30;
const DIST = ALTO / 2 / Math.tan((FOV / 2) * (Math.PI / 180));
const mx = (x: number) => x - ANCHO / 2;
const my = (y: number) => ALTO / 2 - y;

export type Plano = {src: string; ancho: number; alto: number; x: number; base: number; z?: number; giro?: number; sombra?: boolean; reflejo?: number; funde?: number};
export type Franja = {color: string; x: number; ancho: number; z: number};
export type Camara = {x?: number; y?: number; acercar?: number; miraX?: number; miraY?: number; miraZ?: number};

// Sombra de contacto: elipse con caída suave generada como textura (un círculo plano se vería recortado).
const useSombra = () =>
  React.useMemo(() => {
    const N = 64, data = new Uint8Array(N * N * 4);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const d = Math.hypot(x - N / 2 + 0.5, y - N / 2 + 0.5) / (N / 2);
      data[(y * N + x) * 4 + 3] = Math.round(255 * 0.5 * Math.max(0, 1 - d) ** 1.6);
    }
    const tex = new THREE.DataTexture(data, N, N, THREE.RGBAFormat);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);

// Degradado para el reflejo en el piso: opaco junto a la base, se apaga hacia arriba de la imagen volteada.
const useDegradado = () =>
  React.useMemo(() => {
    const N = 64, data = new Uint8Array(N * 4);
    for (let j = 0; j < N; j++) {
      const v = Math.round(255 * Math.max(0, 1 - j / N / 0.34) ** 1.4);
      data.set([v, v, v, 255], j * 4);
    }
    const tex = new THREE.DataTexture(data, 1, N, THREE.RGBAFormat);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);

// Borde superior desvanecido para fotos con fondo propio (`funde` = fracción del alto): transparente arriba, opaca desde ahí.
const useFundido = (frac?: number) =>
  React.useMemo(() => {
    if (!frac) return null;
    const N = 128, data = new Uint8Array(N * 4);
    for (let j = 0; j < N; j++) {
      const s = Math.min(1, (1 - j / (N - 1)) / frac), v = Math.round(255 * s * s * (3 - 2 * s));
      data.set([v, v, v, 255], j * 4);
    }
    const tex = new THREE.DataTexture(data, 1, N, THREE.RGBAFormat);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, [frac]);

const Imagen: React.FC<{p: Plano; sombra: THREE.Texture; degradado: THREE.Texture}> = ({p, sombra, degradado}) => {
  // useTexture suspende hasta que carga; ThreeCanvas no captura el frame con un Suspense pendiente.
  const tex = useTexture(staticFile(p.src));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const fundido = useFundido(p.funde);
  return (
    <group position={[mx(p.x), my(p.base), p.z ?? 0]}>
      {p.reflejo && (
        <mesh position={[0, -p.alto / 2 + 4, -1]} scale={[1, -1, 1]} rotation-y={p.giro ?? 0}>
          <planeGeometry args={[p.ancho, p.alto]} />
          <meshBasicMaterial map={tex} alphaMap={degradado} transparent opacity={p.reflejo} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      )}
      {p.sombra !== false && (
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[p.ancho * 1.3, p.ancho * 0.2]} />
          <meshBasicMaterial map={sombra} transparent depthWrite={false} toneMapped={false} />
        </mesh>
      )}
      <mesh position={[0, p.alto / 2, 0]} rotation-y={p.giro ?? 0}>
        <planeGeometry args={[p.ancho, p.alto]} />
        <meshBasicMaterial map={tex} alphaMap={fundido ?? undefined} transparent alphaTest={0.02} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const Motas: React.FC<{t: number; color: string; n: number}> = ({t, color, n}) => (
  <>
    {Array.from({length: n}, (_, i) => {
      const r = (k: string) => random(`mota-${i}-${k}`);
      const s = 5 + r('s') * 11;
      return (
        <mesh key={i} position={[(r('x') - 0.5) * 2200, (r('y') - 0.5) * 2600 + Math.sin(t * 0.6 + i) * 22 + t * 9, -300 - r('z') * 1600]}>
          <circleGeometry args={[s, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.25 + r('o') * 0.4} toneMapped={false} />
        </mesh>
      );
    })}
  </>
);

const Cam: React.FC<{c: Camara}> = ({c}) => {
  const camera = useThree((s) => s.camera);
  camera.position.set(c.x ?? 0, c.y ?? 0, DIST - (c.acercar ?? 0));
  // por defecto mira recto: mover la cámara desplaza cada capa según su profundidad sin girar el encuadre
  camera.lookAt(c.miraX ?? c.x ?? 0, c.miraY ?? c.y ?? 0, c.miraZ ?? 0);
  return null;
};

export const Parallax3D: React.FC<{planos: Plano[]; franjas?: Franja[]; camara: Camara; t: number; motas?: string; nMotas?: number}> = ({planos, franjas = [], camara, t, motas, nMotas = 34}) => {
  const sombra = useSombra();
  const degradado = useDegradado();
  return (
    <ThreeCanvas width={ANCHO} height={ALTO} camera={{fov: FOV, near: 50, far: 12000, position: [0, 0, DIST]}} style={{position: 'absolute', inset: 0}}>
      <Cam c={camara} />
      {franjas.map((f) => (
        <mesh key={f.color + f.x} position={[mx(f.x), 0, f.z]}>
          <planeGeometry args={[f.ancho, ALTO * 2.2]} />
          <meshBasicMaterial color={f.color} toneMapped={false} />
        </mesh>
      ))}
      {motas && <Motas t={t} color={motas} n={nMotas} />}
      {planos.map((p) => (
        <Imagen key={p.src + p.x} p={p} sombra={sombra} degradado={degradado} />
      ))}
    </ThreeCanvas>
  );
};

/*
  Foto a cuadro completo (public/img/*-hero.webp, *-bowl.webp) como plano al fondo de la escena 3D, para moverle una cámara de verdad:
  - `zoom` acerca la cámara hacia `foco` (px del cuadro con la foto en reposo): ese punto no se mueve y todo crece desde él.
  - `incl` inclina la vista unos grados [horizontal, vertical] orbitando la cámara alrededor de la foto. La foto no gira
    sobre sí misma: es plana y se notaría.
  - `escala` y `dy` colocan la foto en reposo (algo más grande, más abajo); si al bajar asoma su borde superior, `funde`
    lo desvanece sobre el fondo de la escena (fracción del alto de la foto).
  Las motas flotan delante de la foto y se desplazan más que ella (paralaje).
*/
const Z_FOTO = -1400, LEJOS = DIST - Z_FOTO, KZ = LEJOS / DIST;
export const Foto3D: React.FC<{src: string; t: number; zoom?: number; foco?: [number, number]; incl?: [number, number]; escala?: number; dy?: number; funde?: number; motas?: string}> = ({src, t, zoom = 1, foco = [540, 960], incl = [0, 0], escala = 1.04, dy = 0, funde, motas = '#E4F1FB'}) => {
  const u = 1 - 1 / zoom;
  // la cámara avanza por la recta que va de su posición inicial al foco, que está sobre el plano de la foto
  const cx = mx(foco[0]) * KZ * u, cy = my(foco[1]) * KZ * u;
  const brazo = LEJOS * (1 - u), rad = Math.PI / 180;
  const alto = ALTO * KZ * escala;
  return (
    <Parallax3D t={t} motas={motas} nMotas={24}
      camara={{x: cx + Math.tan(incl[0] * rad) * brazo, y: cy + Math.tan(incl[1] * rad) * brazo, acercar: LEJOS * u, miraX: cx, miraY: cy, miraZ: Z_FOTO}}
      planos={[{src, ancho: ANCHO * KZ * escala, alto, x: 540, base: 960 + alto / 2 + dy * KZ, z: Z_FOTO, sombra: false, funde}]} />
  );
};
