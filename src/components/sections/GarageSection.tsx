"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Wrench, Clock, CheckCircle2 } from "lucide-react";

const bays = [
  { 
    id: 1, 
    name: "Bay 01", 
    status: "IN REPAIR", 
    car: "2023 Porsche 911 GT3", 
    owner: "R*** V.", 
    progress: 65, 
    eta: "Tomorrow, 4:00 PM",
    icon: Wrench, 
    color: "text-primary border-primary",
    bgColor: "bg-primary/20",
    svgX: 100
  },
  { 
    id: 2, 
    name: "Bay 02", 
    status: "QUEUED", 
    car: "2021 Mercedes G63 AMG", 
    owner: "S*** L.", 
    progress: 0, 
    eta: "Pending Inspection",
    icon: Clock, 
    color: "text-silver border-silver",
    bgColor: "bg-silver/20",
    svgX: 400
  },
  { 
    id: 3, 
    name: "Bay 03", 
    status: "READY", 
    car: "1969 Ferrari Dino", 
    owner: "M*** T.", 
    progress: 100, 
    eta: "Awaiting Pickup",
    icon: CheckCircle2, 
    color: "text-green-500 border-green-500",
    bgColor: "bg-green-500/20",
    svgX: 700
  },
];

export default function GarageSection() {
  const [activeBay, setActiveBay] = useState<number | null>(null);

  return (
    <section id="garage" className="py-32 bg-[#050505] relative border-t border-silver/5 overflow-hidden">
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
            A high-tech, precision-driven environment. Monitor the live floor plan of our facility to see exactly where precision meets performance.
          </motion.p>
        </div>

        {/* Interactive Floor Plan Container */}
        <div className="relative w-full max-w-6xl mx-auto h-[600px] bg-[#0A0A0A] border border-silver/10 rounded-2xl shadow-2xl overflow-hidden flex items-end justify-center">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#D4A017 1px, transparent 1px), linear-gradient(90deg, #D4A017 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* SVG Floor Plan */}
          <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="xMidYMax slice">
            
            {/* Garage Walls/Lines */}
            <path d="M 0 150 L 1000 150" stroke="#333" strokeWidth="2" strokeDasharray="10 10" />
            <path d="M 0 500 L 1000 500" stroke="#444" strokeWidth="4" />
            
            {/* rendered bays */}
            {bays.map((bay, i) => (
              <g key={bay.id} transform={`translate(${bay.svgX}, 200)`} className="cursor-pointer" onClick={() => setActiveBay(bay.id)}>
                {/* Bay Floor Markings */}
                <rect x="0" y="0" width="200" height="300" fill="none" stroke="#222" strokeWidth="2" />
                <rect x="10" y="10" width="180" height="280" fill="#111" />
                
                {/* Number */}
                <text x="20" y="40" fill="#333" fontSize="24" fontFamily="monospace" fontWeight="bold">0{bay.id}</text>
                
                {/* Car Silhouette (Top-Down Isometric abstraction) */}
                <motion.g
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.8, type: "spring" }}
                >
                  <rect x="40" y="60" width="120" height="200" rx="20" fill="#1A1A1A" stroke="#333" strokeWidth="2" />
                  <rect x="50" y="100" width="100" height="60" rx="5" fill="#0A0A0A" /> {/* Roof/Windshield */}
                  {/* Subtle headlights glow if active */}
                  {bay.status === "IN REPAIR" && (
                    <>
                      <circle cx="60" cy="50" r="10" fill="#D4A017" opacity="0.3" filter="blur(4px)" />
                      <circle cx="140" cy="50" r="10" fill="#D4A017" opacity="0.3" filter="blur(4px)" />
                    </>
                  )}
                </motion.g>

                {/* Animated Garage Door Opening (Revealing the car) */}
                <motion.rect
                  x="0" y="300" width="200" height="300" fill="#080808"
                  initial={{ y: 0 }}
                  whileInView={{ y: -300 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 + i * 0.2, duration: 1.5, ease: "anticipate" }}
                  style={{ transformOrigin: "bottom" }}
                />
              </g>
            ))}
          </svg>

          {/* HTML Overlays for Bays (Badges) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {bays.map((bay) => (
              <div 
                key={bay.id} 
                className="absolute text-center transform -translate-x-1/2"
                style={{ left: `${(bay.svgX + 100) / 1000 * 100}%`, top: '150px' }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + bay.id * 0.2 }}
                  className={`pointer-events-auto cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full border bg-black/80 backdrop-blur-md shadow-lg ${bay.color}`}
                  onClick={() => setActiveBay(bay.id)}
                >
                  <bay.icon size={14} />
                  <span className="text-[10px] font-bold tracking-widest uppercase">{bay.status}</span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Side Panel UI */}
          <AnimatePresence>
            {activeBay !== null && (
              <motion.div 
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 right-0 w-full md:w-96 h-full bg-obsidian/95 backdrop-blur-xl border-l border-primary/20 p-8 shadow-2xl z-20 flex flex-col"
              >
                <button 
                  onClick={() => setActiveBay(null)}
                  className="absolute top-6 right-6 text-silver/60 hover:text-primary transition-colors"
                >
                  <X size={24} />
                </button>
                
                {bays.filter(b => b.id === activeBay).map(bay => (
                  <div key={bay.id} className="flex flex-col h-full mt-4">
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${bay.color} ${bay.bgColor}`}>
                        <bay.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider">{bay.name}</h3>
                        <p className={`text-xs font-bold tracking-widest uppercase ${bay.color}`}>{bay.status}</p>
                      </div>
                    </div>

                    <div className="space-y-6 flex-grow">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-silver/60 mb-1">Vehicle</p>
                        <p className="text-lg font-medium text-white">{bay.car}</p>
                      </div>
                      
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-silver/60 mb-1">Owner</p>
                        <p className="text-sm font-medium text-silver">{bay.owner}</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-silver/60 mb-2">
                          <span>Progress</span>
                          <span className="text-primary">{bay.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-silver/10">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${bay.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-silver/60 mb-1">Next Milestone / ETA</p>
                        <p className="text-sm font-medium text-white">{bay.eta}</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-silver/10">
                      <p className="text-[10px] text-silver/40 text-center uppercase tracking-widest">Live telemetry active</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
