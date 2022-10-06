/* eslint-disable react-hooks/exhaustive-deps */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useFrame as useRaf } from '@studio-freight/hamo';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Color, MathUtils, Vector2 } from 'three';

import { useScroll } from '@/hooks/useScroll';

import fragmentShader from './particles/fragment.glsl';
import vertexShader from './particles/vertex.glsl';

function Raf({ render = true }) {
  const { advance } = useThree();

  useRaf((time: any) => {
    if (render) {
      advance(time / 1000);
    }
  });
}

function Particles({
  width = 250,
  height = 250,
  depth = 250,
  count = 1000,
  scale = 100,
  size = 100,
}) {
  const positions = useMemo(() => {
    const array = new Array(count * 3);

    for (let i = 0; i < array.length; i += 3) {
      array[i] = MathUtils.randFloatSpread(width);
      array[i + 1] = MathUtils.randFloatSpread(height);
      array[i + 2] = MathUtils.randFloatSpread(depth);
    }

    return Float32Array.from(array);
  }, [count, scale, width, height, depth]);

  const noise = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count * 3 }, () => Math.random() * 100)
      ),
    [count]
  );

  const sizes = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * size)
      ),
    [count, size]
  );

  const speeds = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * 0.2)
      ),
    [count]
  );

  const scales = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * 100)
      ),
    [count]
  );

  const material = useRef();
  const points = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uColor: {
        value: new Color('rgb(220, 47, 174)'),
      },
      uScroll: {
        value: 0,
      },
      uResolution: {
        value: new Vector2(width, height),
      },
    }),
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(width, height);
  }, [width, height]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  useScroll(({ scroll }) => {
    uniforms.uScroll.value = scroll;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
        <bufferAttribute attach='attributes-noise' args={[noise, 3]} />
        <bufferAttribute attach='attributes-size' args={[sizes, 1]} />
        <bufferAttribute attach='attributes-speed' args={[speeds, 1]} />
        <bufferAttribute attach='attributes-scale' args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
      />
    </points>
  );
}

function Content() {
  const { viewport } = useThree();

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Particles
        width={viewport.width}
        height={viewport.height}
        depth={500}
        count={100}
        scale={500}
        size={150}
      />
    </>
  );
}

export default function WebGL({ render = true }) {
  return (
    <Canvas
      gl={{
        powerPreference: 'high-performance',
        antialias: true,
        // stencil: false,
        // depth: false,
        alpha: true,
      }}
      dpr={[1, 2]}
      frameloop='never'
      orthographic
      camera={{ near: 0.01, far: 10000, position: [0, 0, 1000] }}
    >
      <Raf render={render} />
      <Suspense>
        <Content />
      </Suspense>
    </Canvas>
  );
}
