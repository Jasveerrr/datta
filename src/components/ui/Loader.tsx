"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="relative flex items-center justify-center perspective-[1000px]">
              {/* Logo Assembly Animation */}
              <motion.div
                initial={{ rotateX: 90, rotateY: -90, z: -500, opacity: 0 }}
                animate={{ rotateX: 0, rotateY: 0, z: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.4 }}
                className="text-6xl md:text-8xl font-heading font-black tracking-tighter flex gap-2"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.span 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="text-primary drop-shadow-[0_0_15px_rgba(212,160,23,0.5)]"
                >
                  Garage
                </motion.span>
                <motion.span 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="text-silver"
                >
                  Go
                </motion.span>
              </motion.div>
              
              {/* Glowing ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0, rotateX: 70 }}
                animate={{ scale: 1, opacity: 0.5, rotateX: 70, rotateZ: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-primary/30 border-t-primary"
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-16 overflow-hidden h-1 w-48 bg-silver/10 rounded-full"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full w-full bg-gradient-to-r from-accent via-primary to-primary rounded-full shadow-[0_0_10px_rgba(212,160,23,0.8)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Expose children immediately but hide them visually until loader is done to allow R3F to mount */}
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease-in" }}>
        {children}
      </div>
    </>
  );
}
