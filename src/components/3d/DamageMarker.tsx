"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Html } from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";


// Simplified Car panels for damage marking
const panels = [
  { id: "front-bumper", position: [0, 0.5, 2.1], name: "Front Bumper" },
  { id: "hood", position: [0, 1.1, 1], name: "Hood" },
  { id: "roof", position: [0, 1.8, -0.2], name: "Roof" },
  { id: "left-door", position: [-1.1, 0.8, 0], name: "Left Door" },
  { id: "right-door", position: [1.1, 0.8, 0], name: "Right Door" },
  { id: "rear-bumper", position: [0, 0.6, -2.1], name: "Rear Bumper" },
  { id: "trunk", position: [0, 1.2, -1.8], name: "Trunk" },
];

export default function DamageMarker({ onDamageSelect }: { onDamageSelect: (part: string) => void }) {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  const togglePart = (id: string, name: string) => {
    setSelectedParts((prev) => {
      const isSelected = prev.includes(id);
      const newSelection = isSelected ? prev.filter(p => p !== id) : [...prev, id];
      // Notify parent of total selected count or names here
      // For simplicity, just triggering generic update callback
      onDamageSelect(name);
      return newSelection;
    });
  };

  return (
    <div className="w-full h-[500px] md:h-[600px] border border-silver/10 mt-8 relative rounded-xl overflow-hidden shadow-2xl shadow-primary/10 bg-black/40 backdrop-blur-md">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xl font-heading font-bold text-silver uppercase tracking-widest">Mark Damage</h3>
        <p className="text-sm text-silver/60">Click on the vehicle panels to highlight damaged areas.</p>
      </div>
      
      <Canvas shadows camera={{ position: [4, 3, 5], fov: 40 }}>
        <Suspense fallback={<Html center className="text-primary font-heading">Loading 3D Interface...</Html>}>
          <color attach="background" args={["#080808"]} />
          <ambientLight intensity={0.6} />
          <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} castShadow />
          
          <group position={[0, -0.5, 0]}>
            {/* Core Box (Chassis) */}
            <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
              <boxGeometry args={[2, 1, 4]} />
              <meshStandardMaterial color="#111" roughness={0.5} />
            </mesh>

            {/* Interactive Panels */}
            {panels.map((panel) => {
              const isSelected = selectedParts.includes(panel.id);
              const isHovered = hovered === panel.id;
              
              return (
                <MotionMesh
                  key={panel.id}
                  position={panel.position as [number, number, number]}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    togglePart(panel.id, panel.name);
                  }}
                  onPointerOver={(e: any) => {
                    e.stopPropagation();
                    setHovered(panel.id);
                    document.body.style.cursor = 'pointer';
                  }}
                  onPointerOut={() => {
                    setHovered(null);
                    document.body.style.cursor = 'auto';
                  }}
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    y: (panel.position[1] as number) + (isSelected ? 0.1 : 0)
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <sphereGeometry args={[0.3, 32, 32]} />
                  <meshStandardMaterial 
                    color={isSelected ? "#C0392B" : isHovered ? "#cfcfcf" : "#D4A017"} 
                    emissive={isSelected ? "#C0392B" : "#000"}
                    emissiveIntensity={isSelected ? 0.5 : 0}
                    transparent
                    opacity={0.9} 
                    roughness={0.2}
                    metalness={0.8}
                  />
                  {/* Floating label when hovered or selected */}
                  {(isHovered || isSelected) && (
                    <Html position={[0, 0.5, 0]} center>
                      <div className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded border backdrop-blur-md transition-colors ${isSelected ? 'bg-accent/20 border-accent text-accent' : 'bg-black/80 border-primary text-primary'}`}>
                        {panel.name}
                      </div>
                    </Html>
                  )}
                </MotionMesh>
              );
            })}
            
            <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.6} far={2} />
          </group>

          <OrbitControls 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2.1} 
            minDistance={4} 
            maxDistance={8} 
            autoRotate={!hovered && selectedParts.length === 0}
            autoRotateSpeed={0.5}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
