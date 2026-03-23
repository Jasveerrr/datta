"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, ContactShadows, PresentationControls, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import Particles from "./Particles";

// Placeholder car model - a sleek abstracted box since no GLTF is available yet
function PlaceholderCar() {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <group ref={meshRef}>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.6, 4.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* Cabin/Windshield Area */}
      <mesh position={[0, 0.9, -0.2]} castShadow>
        <boxGeometry args={[1.8, 0.5, 2]} />
        <meshStandardMaterial color="#222" roughness={0} metalness={1} opacity={0.6} transparent />
      </mesh>

      {/* Headlights (Glowing) */}
      <mesh position={[0.7, 0.5, 2.26]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshBasicMaterial color="#fff" />
      </mesh>
      <mesh position={[-0.7, 0.5, 2.26]}>
        <boxGeometry args={[0.4, 0.1, 0.05]} />
        <meshBasicMaterial color="#fff" />
      </mesh>

      {/* Wheels */}
      {[[-1.1, 0, 1.5], [1.1, 0, 1.5], [-1.1, 0, -1.5], [1.1, 0, -1.5]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>
      ))}
      
      {/* Tail spoiler for sport vibe */}
      <mesh position={[0, 1.1, -2.1]}>
        <boxGeometry args={[2.2, 0.1, 0.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

function Scene() {
  const { mouse, camera } = useThree();

  useFrame(() => {
    // Parallax effect based on mouse movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2 + mouse.y * 1, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#080808"]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} shadow-bias={-0.0001} castShadow />
      
      <PresentationControls
        global

        snap={true}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <PlaceholderCar />
      </PresentationControls>

      <ContactShadows position={[0, -0.8, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
      
      <Particles count={500} />
      
      <Environment preset="studio" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-screen absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
