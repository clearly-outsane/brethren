/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Preload } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useFrame as useRaf } from '@studio-freight/hamo';
import { Suspense } from 'react';

function Raf({ render = true }) {
  const { advance } = useThree();

  useRaf((time) => {
    if (render) {
      advance(time / 1000);
    }
  });
}

const Content = () => {
  return;
};

export default function WebGL({ render = true }) {
  return (
    <Canvas
      mode='concurrent'
      gl={{
        powerPreference: 'high-performance',
        antialias: true,
        // stencil: false,
        // depth: false,
        alpha: true,
      }}
      dpr={[1, 2]}
      frameloop='never'
      shadows
      // orthographic
      camera={{ near: 0.1, far: 10000, position: [-15, 8, 18], fov: 35 }}
    >
      <fog attach='fog' args={['#171717', 20, 30]} />
      <color attach='background' args={['#171717']} />
      <Raf render={render} />
      <Preload all />
      <Suspense>
        <Content />
      </Suspense>
    </Canvas>
  );
}
