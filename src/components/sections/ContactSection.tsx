"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
      alert("Message Sent! Our luxury concierge will be in touch.");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-obsidian relative border-t border-silver/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info & Map */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white mb-6"
            >
              Get in <span className="text-primary italic">Touch</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-silver/60 mb-12"
            >
              Whether it's a minor touch-up or a meticulous restoration, reach out to secure your spot at our premier facility.
            </motion.p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0 bg-primary/5">
                  <span className="text-primary font-heading font-bold">L</span>
                </div>
                <div>
                  <h4 className="text-white font-bold font-heading mb-1 text-lg">Location</h4>
                  <p className="text-silver/70 text-sm">123 Luxury Lane, Automotive District<br/>Los Angeles, CA 90001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0 bg-primary/5">
                  <span className="text-primary font-heading font-bold">C</span>
                </div>
                <div>
                  <h4 className="text-white font-bold font-heading mb-1 text-lg">Contact</h4>
                  <p className="text-silver/70 text-sm">hello@garagego.com<br/>+1 (555) GARAGE-G</p>
                </div>
              </div>
            </div>

            {/* Simplified Map Embed Placeholder */}
            <div className="w-full h-64 bg-black/50 border border-silver/10 rounded-xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Los+Angeles,CA&zoom=12&size=600x300&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x888888&style=feature:water|element:geometry|color:0x0e0e0e&style=feature:landscape|element:geometry|color:0x080808')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-obsidian border border-primary px-4 py-2 text-primary font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                  View on Maps
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-black/40 border border-silver/5 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col h-full">
              <div className="space-y-8 flex-grow">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    required
                    className="w-full bg-transparent border-b border-silver/30 py-4 text-white focus:outline-none focus:border-primary peer transition-colors"
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute left-0 text-silver/60 uppercase tracking-widest text-xs font-bold transition-all duration-300 pointer-events-none
                      ${formState.name ? '-top-4 text-[10px] text-primary' : 'top-4 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary'}
                    `}
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    required
                    className="w-full bg-transparent border-b border-silver/30 py-4 text-white focus:outline-none focus:border-primary peer transition-colors"
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-0 text-silver/60 uppercase tracking-widest text-xs font-bold transition-all duration-300 pointer-events-none
                      ${formState.email ? '-top-4 text-[10px] text-primary' : 'top-4 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary'}
                    `}
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative group flex-grow">
                  <textarea 
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    required
                    className="w-full bg-transparent border-b border-silver/30 py-4 text-white focus:outline-none focus:border-primary peer transition-colors resize-none h-32"
                  />
                  <label 
                    htmlFor="message" 
                    className={`absolute left-0 text-silver/60 uppercase tracking-widest text-xs font-bold transition-all duration-300 pointer-events-none
                      ${formState.message ? '-top-4 text-[10px] text-primary' : 'top-4 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary'}
                    `}
                  >
                    How can we help?
                  </label>
                </div>
              </div>

              <MagneticButton 
                variant="primary" 
                type="submit"
                className="w-full mt-12 py-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
