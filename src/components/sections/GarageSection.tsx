"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// A stylized 3D representation of the garage interior
function GarageModelPlaceholder() {
  const group = useRef<THREE.Group>(null);
  
  return (
    <group ref={group}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 2, -10]} receiveShadow>
        <boxGeometry args={[20, 6, 0.5]} />
        <meshStandardMaterial color="#080808" roughness={0.9} />
      </mesh>
      
      {/* Equipment (Lifts/Tools) */}
      <mesh position={[-4, 0.5, -4]} castShadow receiveShadow>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#D4A017" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[4, 0.5, -4]} castShadow receiveShadow>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#D4A017" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Abstract Glowing Accent */}
      <mesh position={[0, 4, -9.5]}>
        <boxGeometry args={[8, 0.2, 0.2]} />
        <meshBasicMaterial color="#C0392B" />
      </mesh>
    </group>
  );
}

export default function GarageSection() {
  return (
    <section id="garage" className="py-24 bg-black relative border-t border-silver/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white mb-4"
          >
            The <span className="text-primary italic">Workshop</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-silver/60 max-w-2xl mx-auto"
          >
            Take a 3D virtual tour of our state-of-the-art facility featuring computerized chassis measuring and spectro-photometric mixing banks.
          </motion.p>
        </div>
      </div>

      {/* 3D Virtual Tour Canvas */}
      <div className="w-full h-[600px] md:h-[700px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none" />
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={2} angle={0.8} penumbra={1} castShadow />
            <GarageModelPlaceholder />
            <ContactShadows position={[0, -0.99, 0]} opacity={0.5} scale={20} blur={2.5} far={4} />
            <Environment preset="night" />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate 
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2 - 0.1}
            />
          </Suspense>
        </Canvas>
        
        {/* Overlay interactive prompt */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center animate-bounce bg-black/50 backdrop-blur-md">
            <span className="text-primary text-xl">↕</span>
          </div>
          <p className="text-primary text-xs font-bold uppercase tracking-widest mt-4 bg-black/80 px-4 py-1 rounded-full">Drag to explore</p>
        </div>
      </div>

      {/* Team Profiles */}
      <div className="container mx-auto px-6 md:px-12 mt-24">
        <h3 className="text-3xl font-heading font-bold text-center mb-12">Master Technicians</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Marcus Rossi", role: "Lead Painter", exp: "15 Years", image: "https://i.pravatar.cc/400?img=11" },
            { name: "Elena Silva", role: "Chassis Specialist", exp: "12 Years", image: "https://i.pravatar.cc/400?img=5" },
            { name: "James Wei", role: "Restoration Director", exp: "20 Years", image: "https://i.pravatar.cc/400?img=8" },
          ].map((profile, idx) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-obsidian border border-silver/10 rounded-none overflow-hidden group"
            >
              <div className="h-64 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
              </div>
              <div className="p-6 relative">
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-obsidian text-xs font-bold uppercase tracking-widest px-3 py-1">
                  {profile.exp}
                </div>
                <h4 className="text-xl font-heading font-bold text-white mb-1">{profile.name}</h4>
                <p className="text-primary text-sm uppercase tracking-widest">{profile.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
