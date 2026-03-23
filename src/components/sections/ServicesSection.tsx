"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";
import MagneticButton from "@/components/ui/MagneticButton";

const services = [
  {
    title: "Dent Removal",
    price: "From $250",
    description: "Paintless dent repair using precision tools to restore your car's body without affecting the factory finish.",
    features: [
      "No paint matching required",
      "Maintains original factory finish",
      "Same-day turnaround for minor dents",
      "Environmentally friendly process"
    ]
  },
  {
    title: "Scratch & Paint",
    price: "From $400",
    description: "Flawless color matching and blending to erase scratches, chips, and scuffs from any panel.",
    features: [
      "Spectrophotometer color matching",
      "Premium European clear coats",
      "Targeted spot repair available",
      "Lifetime guarantee against peeling"
    ]
  },
  {
    title: "Collision Repair",
    price: "From $1,500",
    description: "Structural realignment and complete body reconstruction following major or minor impacts.",
    features: [
      "3D computerized chassis measuring",
      "OEM replacement parts used",
      "Insurance claim handling assistance",
      "Comprehensive safety inspection"
    ]
  },
  {
    title: "Full Restoration",
    price: "From $5,000",
    description: "Bare-metal restoration and custom fabrication for classic cars or complete luxury overhauls.",
    features: [
      "Media blasting and rust removal",
      "Custom metal fabrication",
      "Show-quality multi-stage paint",
      "Photographic documentation of process"
    ]
  },
  {
    title: "Ceramic Coating",
    price: "From $800",
    description: "Aerospace-grade nano-ceramic protection to preserve your paint's gloss and repel contaminants.",
    features: [
      "9H hardness scratch resistance",
      "Extreme hydrophobic properties",
      "UV and chemical protection",
      "Multi-year durability warranty"
    ]
  },
  {
    title: "Window Replacement",
    price: "From $350",
    description: "OEM glass replacement with precision calibration for advanced driver-assistance systems (ADAS).",
    features: [
      "OEM acoustic and thermal glass",
      "Camera and radar recalibration",
      "Premium urethane adhesives",
      "Same-day drive-away safe"
    ]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 bg-obsidian relative border-t border-silver/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-white mb-6"
            >
              Elite Servicing.<br />
              <span className="text-primary">Uncompromising Quality.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-silver/60 text-lg md:text-xl"
            >
              From minor aesthetic corrections to structural chassis reconstruction, our facility utilizes state-of-the-art technology and master craftsmanship to deliver perfection.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <MagneticButton variant="outline" className="px-8 py-4 bg-black/50">
              View Full Catalog
            </MagneticButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
