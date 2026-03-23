"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After image (Underneath) */}
      <div className="absolute inset-0">
        <img src={afterImage} alt="After" className="w-full h-full object-cover grayscale-0" />
        <div className="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary border border-primary/30 rounded">
          After
        </div>
      </div>

      {/* Before image (On top, clipped) */}
      <div 
        className="absolute inset-0 border-r-2 border-primary shadow-[2px_0_15px_rgba(212,160,23,0.5)] bg-black"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img src={beforeImage} alt="Before" className="w-full h-[500px] object-cover grayscale opacity-80" />
        <div className="absolute top-4 left-4 bg-obsidian/80 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-widest text-silver border border-silver/30 rounded">
          Before
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize flex items-center justify-center -translate-x-1/2"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 rounded-full bg-obsidian border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(212,160,23,0.8)]">
          <div className="w-1 h-3 bg-silver/50 mx-[1px] rounded-full" />
          <div className="w-1 h-3 bg-silver/50 mx-[1px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
