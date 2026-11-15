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

export type Plano = {src: string; ancho: number; alto: number; x: number; base: number; z?: number; giro?: number; sombra?: boolean; reflejo?: number};
export type Franja = {color: string; x: number; ancho: number; z: number};
export type Camara = {x?: number; y?: number; acercar?: number; miraX?: number; miraY?: number};

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

const Imagen: React.FC<{p: Plano; sombra: THREE.Texture; degradado: THREE.Texture}> = ({p, sombra, degradado}) => {
  // useTexture suspende hasta que carga; ThreeCanvas no captura el frame con un Suspense pendiente.
  const tex = useTexture(staticFile(p.src));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
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
        <meshBasicMaterial map={tex} transparent alphaTest={0.02} toneMapped={false} side={THREE.DoubleSide} />
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
  camera.lookAt(c.miraX ?? c.x ?? 0, c.miraY ?? c.y ?? 0, 0);
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
