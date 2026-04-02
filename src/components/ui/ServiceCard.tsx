"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";

interface ServiceProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  image: string;
}

export default function ServiceCard({ title, price, description, features, image }: ServiceProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX: isFlipped ? 0 : rotateX,
        rotateY: isFlipped ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] cursor-pointer group perspective-[1000px] transition-transform duration-500 hover:-translate-y-2 z-10 hover:z-20"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 bg-obsidian border border-silver/10 flex flex-col justify-end overflow-hidden transition-all duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_15px_50px_rgba(245,166,35,0.3)] group-hover:border-[#F5A623]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background Image */}
          <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 pointer-events-none" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
          
          <div className="relative z-10 p-8 pt-0">
            <h3 className="text-2xl font-heading font-bold text-white mb-2" style={{ transform: "translateZ(40px)" }}>{title}</h3>
            <p className="text-silver/80 text-sm mb-6 font-medium leading-relaxed" style={{ transform: "translateZ(30px)" }}>{description}</p>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest" style={{ transform: "translateZ(50px)" }}>
              <span>Explore Options</span>
              <div className="w-4 h-[1px] bg-primary group-hover:w-8 transition-all duration-300" />
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#111111] to-black border border-primary p-8 flex flex-col shadow-[0_15px_50px_rgba(245,166,35,0.3)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="mb-auto font-sans">
            <h3 className="text-xl font-heading font-bold text-white mb-1">{title}</h3>
            <p className="text-3xl font-heading font-black text-primary mb-6">{price}</p>
            <ul className="space-y-3">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-silver/80 font-medium tracking-wide">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/register" onClick={(e) => e.stopPropagation()}>
            <MagneticButton variant="primary" className="w-full py-4 text-xs font-bold mt-4 tracking-widest">
              BOOK SERVICE
            </MagneticButton>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
