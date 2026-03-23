"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";

const testimonials = [
  {
    author: "Richard V.",
    car: "2023 Porsche 911 GT3",
    quote: "The quality of work is simply unparalleled. They didn't just repair my bumper; they restored it to absolute factory spec. The color matching is flawless.",
    rating: 5,
    image: "https://i.pravatar.cc/400?img=12"
  },
  {
    author: "Sophia L.",
    car: "2021 Mercedes G63 AMG",
    quote: "A $10,000 repair felt entirely justified when I saw the final result. The 3D tracking dashboard kept me updated daily. Best luxury shop in the state.",
    rating: 5,
    image: "https://i.pravatar.cc/400?img=9"
  },
  {
    author: "Michael T.",
    car: "1969 Ferrari Dino 246 GTS",
    quote: "Entrusting a classic to a shop is terrifying. GarageGo treated it like a museum piece. The bare-metal restoration was handled with utmost mastery.",
    rating: 5,
    image: "https://i.pravatar.cc/400?img=14"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-32 bg-obsidian relative border-t border-silver/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white mb-16 text-center"
        >
          Client <span className="text-primary italic">Experiences</span>
        </motion.h2>

        <div className="relative w-full max-w-4xl h-[400px] md:h-[300px] perspective-[1500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ rotateX: 20, opacity: 0, scale: 0.9, z: -100 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1, z: 0 }}
              exit={{ rotateX: -20, opacity: 0, scale: 0.9, z: -100 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="absolute inset-0 bg-black/40 border border-primary/20 backdrop-blur-md p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center rounded-2xl shadow-[0_20px_50px_rgba(212,160,23,0.1)] transform-gpu"
            >
              <div className="flex-shrink-0 relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary">
                  <img src={testimonials[currentIndex].image} alt="Client" className="w-full h-full object-cover" />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-2 -right-2 bg-primary text-obsidian px-2 py-1 text-xs font-bold font-heading rounded flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {testimonials[currentIndex].rating}.0
                </div>
              </div>

              <div className="flex-grow text-center md:text-left">
                <div className="flex gap-1 justify-center md:justify-start mb-4 text-primary">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-silver/90 italic font-heading font-medium leading-relaxed mb-6">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <h4 className="text-white font-bold text-lg">{testimonials[currentIndex].author}</h4>
                  <p className="text-primary text-sm uppercase tracking-widest">{testimonials[currentIndex].car}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-12">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-full border border-silver/20 flex items-center justify-center text-silver hover:bg-silver hover:text-obsidian hover:border-silver transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-full border border-silver/20 flex items-center justify-center text-silver hover:bg-silver hover:text-obsidian hover:border-silver transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
