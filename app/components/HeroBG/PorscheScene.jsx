"use client";

import * as THREE from "three";
import React, { useRef, useState, useLayoutEffect } from "react";
import { Canvas, useFrame, applyProps } from "@react-three/fiber";
import {
  PerformanceMonitor,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Lightformer,
  Float,
  useGLTF,
} from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";
import { Button } from "@/components/ui/button";

export default function PorscheScene({
  modelPath = "/911-transformed.glb",
  ...props
}) {
  const [degraded, degrade] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden" {...props}>
      <div className="h-[92%]">
        {/* 3D Canvas */}
        <Canvas shadows camera={{ position: [15, 0, 15], fov: 30 }}>
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            castShadow
            intensity={2}
            shadow-bias={-0.0001}
          />
          <ambientLight intensity={0.5} />

          {/* This is position of the car */}
          <PorscheModel
            url={modelPath}
            scale={1.6}
            position={[1.5, -0.18, 0]}
            rotation={[0, Math.PI / 5, 0]}
          />

          <AccumulativeShadows
            position={[0, -1.16, 0]}
            frames={100}
            alphaTest={0.9}
            scale={10}
          >
            <RandomizedLight
              amount={8}
              radius={10}
              ambient={0.5}
              position={[1, 5, -1]}
            />
          </AccumulativeShadows>

          <PerformanceMonitor onDecline={() => degrade(true)} />

          <Environment
            frames={degraded ? 1 : Infinity}
            resolution={256}
            background
            blur={1}
          >
            <Lightformers />
          </Environment>

          <CameraRig />
        </Canvas>
      </div>

      {/* Gradient overlay for better text contrast */}
      <div className="max-h-[92%] absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none"></div>

      {/* Hero Text Section */}
      <div className="absolute left-13 top-1/2 -translate-y-1/2 text-white max-w-xl space-y-14">
        <div>
          <h1 className="text-6xl font-extrabold leading-tight drop-shadow-md font-mono">
            Drive the Legend
            <br />
            <span className="text-yellow-400 font-mono">
              Porsche 911 Carrera
            </span>
          </h1>
        </div>
        <div>
          <p className="text-lg text-gray-200 max-w-md leading-relaxed font-mono">
            Experience the ultimate in speed, luxury, and precision — rent your
            dream car today.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            variant="solid"
            size="sm"
            className="text-base text-black font-mono bg-yellow-400 border border-3 border-slate-50 rounded-md hover:bg-yellow-[#e6c400] transition-all"
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-base text-white font-mono bg-black/30 border border-3 border-white rounded-md hover:bg-yellow-[#e6c400] hover:text-yellow-400 hover:border-yellow-400 transition-all"
          >
            Explore Models
          </Button>
        </div>
        {/* Footer Credits
        <p className="flex justify-end text-xs text-gray-400">Porsche 911 Carrera 4S © Gearshift</p> */}
      </div>

      
    </div>
  );
}

/* ------------------------ SUB COMPONENTS ------------------------ */

function PorscheModel({ url, ...props }) {
  const { scene, nodes, materials } = useGLTF(url);

  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) node.receiveShadow = node.castShadow = true;
    });

    if (materials?.rubber)
      applyProps(materials.rubber, {
        color: "#222",
        roughness: 0.6,
        roughnessMap: null,
        normalScale: [4, 4],
      });

    if (materials?.window)
      applyProps(materials.window, {
        color: "black",
        roughness: 0,
        clearcoat: 0.1,
      });

    if (materials?.coat)
      applyProps(materials.coat, {
        envMapIntensity: 4,
        roughness: 0.5,
        metalness: 1,
      });

    if (materials?.paint)
      applyProps(materials.paint, {
        envMapIntensity: 2,
        roughness: 0.45,
        metalness: 0.8,
        color: "#555",
      });
  }, [nodes, materials]);

  return <primitive object={scene} {...props} />;
}

function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.lerp(
      v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();

  useFrame((_, delta) => {
    if (group.current) {
      group.current.position.z += delta * 10;
      if (group.current.position.z > 20) group.current.position.z = -60;
    }
  });

  return (
    <>
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>

      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      />

      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>

      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth
            colorA="blue"
            colorB="black"
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}
