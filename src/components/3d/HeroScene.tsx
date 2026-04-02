"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const CARS = [
  {
    id: "sports-car",
    name: "SPORTS CAR",
    svg: (
      <svg viewBox="0 0 800 250" className="w-full h-full text-[#080808] fill-current drop-shadow-[0_20px_40px_rgba(0,0,0,1)] relative">
        <path d="M 50 180 C 30 180, 20 160, 30 140 C 60 100, 200 80, 350 60 C 450 40, 600 50, 700 100 C 750 130, 780 150, 780 170 C 780 190, 760 200, 740 200 L 60 200 C 40 200, 50 180, 50 180 Z" stroke="#111" strokeWidth="2" />
        <path d="M 330 65 C 450 45, 550 55, 630 90 L 400 90 Z" fill="#222" opacity="0.4" />
        <circle cx="180" cy="180" r="50" fill="#050505" stroke="#222" strokeWidth="4" />
        <circle cx="180" cy="180" r="25" fill="#111" />
        <circle cx="620" cy="180" r="50" fill="#050505" stroke="#222" strokeWidth="4" />
        <circle cx="620" cy="180" r="25" fill="#111" />
        <path d="M 760 160 L 950 180 L 900 220 Z" fill="url(#headlight1)" opacity="0.6" style={{ mixBlendMode: "screen" }} />
        <defs>
          <linearGradient id="headlight1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="760" cy="160" r="8" fill="#fff" filter="blur(2px)" />
        <path d="M 30 130 C 20 130, 10 140, 10 150 L 30 155 Z" fill="#C0392B" />
        <circle cx="20" cy="140" r="15" fill="#C0392B" filter="blur(6px)" opacity="0.8" />
      </svg>
    )
  },
  {
    id: "sedan",
    name: "LUXURY SEDAN",
    svg: (
      <svg viewBox="0 0 800 250" className="w-full h-full text-[#080808] fill-current drop-shadow-[0_20px_40px_rgba(0,0,0,1)] relative">
        <path d="M 40 180 C 20 180, 10 160, 20 140 C 40 100, 150 90, 250 80 C 350 40, 500 40, 600 80 C 700 90, 780 120, 780 160 C 780 180, 760 200, 740 200 L 60 200 Z" stroke="#111" strokeWidth="2" />
        <path d="M 280 80 C 380 40, 480 40, 580 80 L 400 80 Z" fill="#222" opacity="0.4" />
        <circle cx="160" cy="180" r="45" fill="#050505" stroke="#222" strokeWidth="4" />
        <circle cx="160" cy="180" r="22" fill="#111" />
        <circle cx="640" cy="180" r="45" fill="#050505" stroke="#222" strokeWidth="4" />
        <circle cx="640" cy="180" r="22" fill="#111" />
      </svg>
    )
  },
  {
    id: "suv",
    name: "PREMIUM SUV",
    svg: (
      <svg viewBox="0 0 800 250" className="w-full h-full text-[#080808] fill-current drop-shadow-[0_20px_40px_rgba(0,0,0,1)] relative">
        <path d="M 30 200 L 760 200 C 780 200, 780 140, 760 120 C 740 100, 680 80, 600 70 C 500 40, 300 40, 200 40 C 100 40, 50 100, 30 140 Z" stroke="#111" strokeWidth="2" />
        <path d="M 220 50 C 320 45, 480 45, 580 75 L 400 75 Z" fill="#222" opacity="0.4" />
        <circle cx="180" cy="200" r="55" fill="#050505" stroke="#222" strokeWidth="4" />
        <circle cx="180" cy="200" r="25" fill="#111" />
        <circle cx="620" cy="200" r="55" fill="#050505" stroke="#222" strokeWidth="4" />
        <circle cx="620" cy="200" r="25" fill="#111" />
      </svg>
    )
  },
  {
    id: "truck",
    name: "HEAVY DUTY TRUCK",
    svg: (
      <svg viewBox="0 0 800 250" className="w-full h-full text-[#080808] fill-current drop-shadow-[0_20px_40px_rgba(0,0,0,1)] relative">
        <path d="M 20 200 L 780 200 L 780 120 C 780 100, 750 80, 700 80 L 450 80 C 450 40, 400 30, 300 30 C 200 30, 150 70, 120 100 L 20 100 Z" stroke="#111" strokeWidth="2" />
        <path d="M 160 100 C 200 70, 250 40, 300 40 L 420 40 L 420 80 L 160 80 Z" fill="#222" opacity="0.4" />
        <circle cx="140" cy="200" r="60" fill="#050505" stroke="#222" strokeWidth="4" />
        <circle cx="140" cy="200" r="30" fill="#111" />
        <circle cx="660" cy="200" r="60" fill="#050505" stroke="#222" strokeWidth="4" />
        <circle cx="660" cy="200" r="30" fill="#111" />
      </svg>
    )
  }
];

export default function HeroScene() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCar = () => {
    setCurrentIndex((prev) => (prev + 1) % CARS.length);
  };

  const prevCar = () => {
    setCurrentIndex((prev) => (prev - 1 + CARS.length) % CARS.length);
  };

  const getIndices = () => {
    const prev = (currentIndex - 1 + CARS.length) % CARS.length;
    const next = (currentIndex + 1) % CARS.length;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getIndices();

  // Handle responsive layout offsets based on simple window assumptions
  // Mobile offsets are smaller. We'll use percentage based X transforms.

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A] flex flex-col items-center justify-center">
      
      {/* Garage Background - Wall and Floor */}
      <div className="absolute inset-0 w-full h-full bg-[#050505]">
        
        {/* Dark Wall Texture */}
        <div className="absolute top-0 w-full h-[60%] bg-[#080808] border-b-4 border-[#111]">
          {/* Horizontal Strip Lights */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-12 flex flex-col justify-around opacity-40">
            <div className="w-full h-1.5 bg-gradient-to-r from-black via-white to-black shadow-[0_0_30px_rgba(255,255,255,1)]" />
            <div className="w-full h-1.5 bg-gradient-to-r from-black via-white to-black shadow-[0_0_30px_rgba(255,255,255,1)]" />
          </div>
        </div>
        
        {/* Concrete Floor with Grid Perspective */}
        <div 
          className="absolute bottom-0 w-[200%] h-[40%] bg-[linear-gradient(rgba(245,166,35,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(245,166,35,0.05)_2px,transparent_2px)] left-1/2 -translate-x-1/2"
          style={{ 
            backgroundSize: "100px 50px",
            transform: "perspective(800px) rotateX(75deg)",
            transformOrigin: "top"
          }}
        />
        
        {/* Ambient Floor Reflection Glow */}
        <div className="absolute bottom-[10%] w-full h-[30%] bg-[#F5A623]/10 blur-[100px]" />
      </div>

      {/* 3D SVG Carousel Area */}
      <div className="relative w-full h-[400px] flex items-end justify-center perspective-[1000px] mt-20">
        
        {CARS.map((car, idx) => {
          let state = "hidden";
          if (idx === current) state = "center";
          if (idx === prev) state = "left";
          if (idx === next) state = "right";

          // Don't render if it's not one of the visible 3
          if (state === "hidden" && CARS.length > 3) return null;

          const isCenter = state === "center";
          const isLeft = state === "left";
          const isRight = state === "right";

          let x = "0%";
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;
          let filter = "blur(0px)";

          if (isLeft) {
            x = "-60%";
            scale = 0.65;
            opacity = 0.4;
            zIndex = 5;
            filter = "blur(4px)";
          } else if (isRight) {
            x = "60%";
            scale = 0.65;
            opacity = 0.4;
            zIndex = 5;
            filter = "blur(4px)";
          }

          return (
            <motion.div
              key={car.id}
              initial={false}
              animate={{ x, scale, opacity, zIndex, filter }}
              transition={{ type: "spring", stiffness: 120, damping: 25, mass: 1 }}
              className="absolute bottom-0 w-[350px] md:w-[650px] flex flex-col items-center"
              style={{ transformOrigin: "bottom center" }}
            >
              <div className="relative w-full h-[150px] md:h-[220px]">
                {car.svg}
                
                {/* Gold Underglow for center car */}
                <motion.div 
                  animate={{ opacity: isCenter ? 0.8 : 0 }}
                  className="absolute -bottom-10 left-[10%] w-[80%] h-20 bg-[#F5A623] blur-[40px] rounded-[100%] mix-blend-screen pointer-events-none" 
                />
              </div>

              {/* Name Label */}
              <motion.div 
                animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 20 }}
                className="mt-8 px-6 py-2 border border-[#F5A623]/30 bg-black/50 backdrop-blur-md rounded-full"
              >
                <span className="text-[#F5A623] font-bold tracking-widest text-xs">{car.name}</span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Navigation Arrows */}
        <div className="absolute inset-0 w-full h-full max-w-6xl mx-auto flex items-center justify-between px-4 z-20 pointer-events-none">
          <button 
            onClick={prevCar}
            className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center hover:bg-[#F5A623]/30 hover:scale-110 transition-all backdrop-blur-md"
          >
            <ChevronLeft size={36} />
          </button>
          
          <button 
            onClick={nextCar}
            className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center hover:bg-[#F5A623]/30 hover:scale-110 transition-all backdrop-blur-md"
          >
            <ChevronRight size={36} />
          </button>
        </div>

      </div>
    </div>
  );
}
