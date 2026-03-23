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
}

export default function ServiceCard({ title, price, description, features }: ServiceProps) {
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
      className="relative w-full h-[450px] cursor-pointer group perspective-[1000px]"
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
          className="absolute inset-0 bg-obsidian border border-silver/10 p-8 flex flex-col justify-end overflow-hidden group-hover:border-primary/50 transition-colors duration-500 shadow-2xl shadow-primary/5 group-hover:shadow-primary/20"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Abstract glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/40 transition-colors duration-500" />
          
          <h3 className="text-2xl font-heading font-bold text-white mb-2" style={{ transform: "translateZ(40px)" }}>{title}</h3>
          <p className="text-silver/60 text-sm mb-6" style={{ transform: "translateZ(30px)" }}>{description}</p>
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest" style={{ transform: "translateZ(50px)" }}>
            <span>Explore Options</span>
            <div className="w-4 h-[1px] bg-primary group-hover:w-8 transition-all duration-300" />
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-obsidian to-black border border-primary p-8 flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="mb-auto">
            <h3 className="text-xl font-heading font-bold text-white mb-1">{title}</h3>
            <p className="text-3xl font-heading font-black text-primary mb-6">{price}</p>
            <ul className="space-y-3">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-silver/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/book" onClick={(e) => e.stopPropagation()}>
            <MagneticButton variant="primary" className="w-full py-4 text-xs font-bold mt-4">
              Book Now
            </MagneticButton>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
