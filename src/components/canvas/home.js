/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Billboard,
  Environment,
  Float,
  Lightformer,
  Preload,
  shaderMaterial,
  useGLTF,
} from '@react-three/drei';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useFrame as useRaf } from '@studio-freight/hamo';
import { Suspense, useMemo, useRef, useState } from 'react';
import { MathUtils, UniformsLib } from 'three';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';

import { mapRange } from '@/lib/maths';
import useBoundStore from '@/lib/store';
import { useScroll } from '@/hooks/useScroll';

import fColorShift from './colorshift/shader.frag';
import vColorShift from './colorshift/shader.vert';
import LetterB from './models/LetterB';
import Sphere from './models/Sphere';

function Raf({ render = true }) {
  const { advance } = useThree();

  useRaf((time) => {
    if (render) {
      advance(time / 1000);
    }
  });
}

const uniforms = {};
Object.entries(UniformsLib.fog).forEach(([key, { value }]) => {
  uniforms[key] = value;
});

const ColorShiftMaterial = shaderMaterial(
  {
    uTime: 0,
    uGrayMix: 0,
    ...uniforms,
  },
  vColorShift,
  fColorShift
);

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
ColorShiftMaterial.key = MathUtils.generateUUID();

extend({
  ColorShiftMaterial,
});

const ScrollGroup = ({ children }) => {
  const groupRef = useRef();
  const state = useThree();

  useScroll(({ scroll }) => {
    let temp = new THREE.Vector3(0, 0, -1);
    state.camera.getWorldDirection(temp);
    groupRef.current.position.x = temp
      .clone()
      .multiplyScalar((scroll / 10000) * 150).x;
    groupRef.current.position.z = temp
      .clone()
      .multiplyScalar((scroll / 10000) * 150).z;
  });

  return <group ref={groupRef}>{children}</group>;
};

function Statue({ ...props }) {
  const { nodes, _ } = useGLTF('/models/Statue.glb');
  const { materials } = useGLTF('/models/LetterB.glb');
  const group = useRef();
  const [speed] = useState(() => 0.15 + Math.random() / 10);
  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <Float
          position={[1, 0, -1]}
          speed={speed}
          rotationIntensity={1}
          floatIntensity={20}
          dispose={null}
        >
          <mesh
            geometry={nodes.Mesh_0001.geometry}
            material={materials.Material_0}
            position={[0, 0.39, 0]}
          />
        </Float>
      </group>
    </>
  );
}

function Cube({ ...props }) {
  const { nodes, _ } = useGLTF('/models/cube.glb');
  const { materials } = useGLTF('/models/LetterB.glb');
  const group = useRef();
  const [speed] = useState(() => 0.15 + Math.random() / 10);
  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <Float
          speed={speed}
          rotationIntensity={10}
          floatIntensity={1}
          dispose={null}
        >
          <mesh
            geometry={nodes.Cube.geometry}
            material={materials.Material_0}
            position={[0, 0, 0]}
            rotation={[Math.PI / 4, 0, 0]}
            scale={10}
          />
        </Float>
      </group>
    </>
  );
}
useGLTF.preload('/models/cube.glb');

const Content = ({ easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) => {
  const sphereCount = 20;
  const sphereDepth = 80;
  const bRef = useRef(null);
  const groundRef = useRef(null);
  const billboardRef = useRef(null);
  const { viewport, size } = useThree();

  const _thresholds = useBoundStore(({ thresholds }) => thresholds);
  const thresholds = useMemo(() => {
    return Object.values(_thresholds).sort((a, b) => a - b);
  }, [_thresholds]);

  useFrame((state, delta) => {
    if (billboardRef.current.material) {
      billboardRef.current.material.uniforms.uTime.value =
        state.clock.getElapsedTime();
    }
  });

  useScroll(({ scroll }) => {
    //? thresholds here is sorted by which one comes first from the top but if you want a specific one use _thresholds["section-name"]
    const progressForFloor = mapRange(
      thresholds[0] / 3,
      thresholds[0],
      scroll,
      0,
      1
    );
    const progressForBackground = mapRange(
      (thresholds[0] * 2) / 3,
      thresholds[0],
      scroll,
      0,
      1
    );

    const endProgressForBackground = mapRange(
      thresholds[0],
      thresholds[0] * 1.5,
      scroll,
      1,
      0
    );

    const progressForBackground2 = mapRange(
      thresholds[2] - size.height / 2,
      thresholds[2] - 124,
      scroll,
      0,
      1
    );

    if (groundRef.current.material) {
      groundRef.current.material.opacity = 1 - progressForFloor;
    }

    if (billboardRef.current.material) {
      if (scroll < thresholds[0]) {
        billboardRef.current.material.uniforms.uGrayMix.value =
          1 - progressForBackground;
      } else if (thresholds[0] < scroll && scroll < thresholds[1]) {
        billboardRef.current.material.uniforms.uGrayMix.value =
          1 - endProgressForBackground;
      } else if (thresholds[2] - size.height < scroll) {
        billboardRef.current.material.uniforms.uGrayMix.value = Math.max(
          0,
          1 - progressForBackground2
        );
      } else {
        billboardRef.current.material.uniforms.uGrayMix.value = 1;
      }
    }
  });

  return (
    <>
      {/* <axesHelper /> */}
      {/* <OrbitControls makeDefault /> */}
      <pointLight
        position={[-2.67, 2.3, 2.5]}
        intensity={2}
        color='#3BCAF7'
        distance={33}
        decay={1}
        castShadow={true}
        shadow-radius={50}
      />
      <pointLight
        position={[4, 8, -5]}
        intensity={1}
        color='#FEB548'
        distance={23}
        decay={1}
        castShadow={true}
        shadow-radius={50}
        shadow-bias={0.0}
      />
      <pointLight
        position={[-4, 8, -4]}
        intensity={1.5}
        color='#FF00EA'
        distance={14}
        decay={1}
        castShadow={true}
        shadow-radius={50}
      />
      <Environment frames={Infinity} resolution={256}>
        <Lightformer
          form='circle'
          intensity={20}
          rotation-x={Math.PI / 2}
          position={[-14.67, 2.3, 2.5]}
          scale={[10, 1, 1]}
          color='#3BCAF7'
        />
      </Environment>
      <ScrollGroup>
        <LetterB ref={bRef} />
        <group position={[-17, 0, 17]} rotation={[0, -Math.PI / 4, 0]}>
          {Array.from({ length: sphereCount }, (_, i) => (
            <Sphere
              key={i}
              index={i}
              z={Math.round(easing(i / sphereCount) * sphereDepth)}
            />
          ))}
        </group>

        <Statue
          scale={1.2}
          rotation={[0, Math.PI, 0]}
          position={[-22, 0, 38]}
        />

        <Cube scale={3.2} position={[-44, -4, 36]} />
      </ScrollGroup>
      <mesh
        ref={groundRef}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={50}
        receiveShadow
        material-reflectivity={0}
      >
        <planeGeometry />
        <CustomShaderMaterial
          // ref={materialRef}
          baseMaterial={THREE.MeshPhysicalMaterial}
          vertexShader={vColorShift}
          fragmentShader={fColorShift}
          uniforms={{
            uTime: {
              value: 0,
            },
            uGrayMix: {
              value: 0,
            },
          }}
          roughness={1}
          color='#313131'
          transparent
        />
      </mesh>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[-9, 0, 9]}
      >
        <mesh
          ref={billboardRef}
          scale={[viewport.width * 1, viewport.height * 1.2, 1]}
        >
          <planeGeometry args={[1, 1, 16, 16]} />
          <colorShiftMaterial
            key={ColorShiftMaterial.key}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
      </Billboard>
    </>
  );
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
