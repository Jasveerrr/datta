"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DamageMarker from "@/components/3d/DamageMarker";
import MagneticButton from "@/components/ui/MagneticButton";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, title: "Vehicle Details" },
  { id: 2, title: "Damage Report" },
  { id: 3, title: "Service Selection" },
  { id: 4, title: "Final Details" },
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    damagedParts: [] as string[],
    severity: 1,
    serviceType: "Dent Removal",
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const nextStep = async () => {
    if (step < steps.length) {
      setDirection(1);
      setStep(step + 1);
    } else {
      // Final submission -> Redirect to Stripe
      setIsLoading(true);
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [{ id: "repair-deposit" }],
            customerEmail: formData.email,
          }),
        });
        const { url, error } = await response.json();
        if (url) {
          window.location.href = url;
        } else {
          console.error("Stripe Error:", error);
          setIsCompleted(true); // Fallback to success screen if stripe fails (for demo)
        }
      } catch (err) {
        console.error("Checkout Error:", err);
        setIsCompleted(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const calculatePrice = useMemo(() => {
    const basePrices: Record<string, number> = {
      "Dent Removal": 250,
      "Scratch & Paint": 400,
      "Collision Repair": 1500,
      "Full Body Restoration": 5000,
      "Ceramic Coating": 800,
      "Window Replacement": 350,
    };
    
    const base = basePrices[formData.serviceType] || 250;
    const partsMultiplier = Math.max(1, formData.damagedParts.length * 0.5);
    const severityMultiplier = 1 + (formData.severity - 1) * 0.25;

    return Math.floor(base * partsMultiplier * severityMultiplier);
  }, [formData.serviceType, formData.damagedParts, formData.severity]);

  const slideVariants = {
    initial: (direction: number) => ({ x: direction > 0 ? "50%" : "-50%", opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? "-50%" : "50%", opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header & Price Tracker */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-silver/10 pb-6 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white">
              Instant <span className="text-primary">Quote</span>
            </h1>
            <p className="text-silver/60 mt-2">Get an estimated price for your premium repair.</p>
          </div>
          
          <div className="bg-black/50 border border-primary/20 p-4 rounded-xl backdrop-blur-md min-w-[200px] text-right shadow-[0_0_15px_rgba(212,160,23,0.1)]">
            <p className="text-xs text-silver/60 uppercase tracking-widest mb-1">Estimated Cost</p>
            <p className="text-3xl font-heading font-bold text-primary">${calculatePrice.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress Timeline */}
        {!isCompleted && (
          <div className="flex justify-between relative mb-12 max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-silver/10 -z-10" />
            <motion.div 
              className="absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-accent to-primary -z-10 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (step - 1) / (steps.length - 1) }}
              transition={{ duration: 0.5 }}
            />
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-500 border ${
                  step >= s.id ? "bg-primary text-obsidian border-primary" : "bg-obsidian text-silver border-silver/20"
                }`}>
                  {s.id}
                </div>
                <span className={`text-xs uppercase tracking-wider hidden md:block ${step >= s.id ? "text-primary font-bold" : "text-silver/40"}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Form Container */}
        {isCompleted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 border border-primary/30 rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-2xl shadow-primary/10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </motion.div>
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Quote Submitted!</h2>
            <p className="text-silver/80 mb-8 max-w-md mx-auto">
              Your request for a <strong>{formData.serviceType}</strong> on your <strong>{formData.year} {formData.make} {formData.model}</strong> has been received. Our luxury concierge will contact you shortly to confirm your booking.
            </p>
            <div className="bg-obsidian border border-silver/10 p-6 rounded-lg mb-8 inline-block text-left">
              <p className="text-xs text-silver/60 uppercase tracking-widest mb-1">Estimated Cost</p>
              <p className="text-4xl font-heading font-black text-primary">${calculatePrice.toLocaleString()}</p>
            </div>
          </motion.div>
        ) : (
          <div className="relative overflow-hidden min-h-[500px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full absolute"
              >
                
                {/* STEP 1: Vehicle Details */}
                {step === 1 && (
                  <div className="max-w-2xl mx-auto space-y-6">
                    <h3 className="text-2xl font-heading font-bold mb-6">Tell us about your vehicle</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-silver/60 uppercase tracking-widest">Make</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Porsche" 
                          value={formData.make}
                          onChange={(e) => setFormData({...formData, make: e.target.value})}
                          className="w-full bg-obsidian border border-silver/20 rounded-none px-4 py-3 text-silver focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-silver/60 uppercase tracking-widest">Model</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 911 GT3" 
                          value={formData.model}
                          onChange={(e) => setFormData({...formData, model: e.target.value})}
                          className="w-full bg-obsidian border border-silver/20 rounded-none px-4 py-3 text-silver focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-silver/60 uppercase tracking-widest">Year</label>
                      <input 
                        type="number" 
                        placeholder="2024" 
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        className="w-full bg-obsidian border border-silver/20 rounded-none px-4 py-3 text-silver focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Damage Report */}
                {step === 2 && (
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                      <h3 className="text-2xl font-heading font-bold">Select Damaged Areas</h3>
                      <div className="text-sm border border-primary/30 px-4 py-2 rounded-full text-primary bg-primary/5">
                        {formData.damagedParts.length} parts selected
                      </div>
                    </div>
                    
                    <DamageMarker 
                      onDamageSelect={(part) => {
                        setFormData((prev) => {
                          const parts = prev.damagedParts.includes(part)
                            ? prev.damagedParts.filter(p => p !== part)
                            : [...prev.damagedParts, part];
                          return { ...prev, damagedParts: parts };
                        });
                      }} 
                    />

                    <div className="mt-12 max-w-2xl mx-auto space-y-4">
                      <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
                        <span className="text-silver/60">Damage Severity</span>
                        <span className="text-accent">{formData.severity}/5</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={formData.severity}
                        onChange={(e) => setFormData({...formData, severity: parseInt(e.target.value)})}
                        className="w-full accent-accent h-2 bg-silver/10 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-silver/40">
                        <span>Minor Scratch</span>
                        <span>Heavy Structural</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Service Selection */}
                {step === 3 && (
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-heading font-bold mb-8 text-center">Select Primary Service</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {["Dent Removal", "Scratch & Paint", "Collision Repair", "Full Body Restoration", "Ceramic Coating", "Window Replacement"].map((service) => (
                        <div 
                          key={service}
                          onClick={() => setFormData({...formData, serviceType: service})}
                          className={`
                            cursor-pointer p-6 border transition-all duration-300 transform
                            ${formData.serviceType === service 
                              ? "border-primary bg-primary/10 -translate-y-2 shadow-[0_10px_30px_rgba(212,160,23,0.15)]" 
                              : "border-silver/10 bg-black/40 hover:border-silver/40 hover:-translate-y-1"}
                          `}
                        >
                          <h4 className="font-heading font-bold text-lg text-white mb-2">{service}</h4>
                          <p className="text-sm text-silver/60">Premium quality guaranteed. Industry-leading materials.</p>
                          
                          {formData.serviceType === service && (
                            <motion.div layoutId="service-indicator" className="w-full h-1 bg-primary mt-6 rounded-full" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4: Final Details */}
                {step === 4 && (
                  <div className="max-w-2xl mx-auto space-y-6">
                    <h3 className="text-2xl font-heading font-bold mb-6">Contact & Schedule</h3>
                    <div className="space-y-2">
                      <label className="text-xs text-silver/60 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-obsidian border border-silver/20 rounded-none px-4 py-3 text-silver focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-silver/60 uppercase tracking-widest">Email Address</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-obsidian border border-silver/20 rounded-none px-4 py-3 text-silver focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-silver/60 uppercase tracking-widest">Phone Number</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-obsidian border border-silver/20 rounded-none px-4 py-3 text-silver focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 pt-4">
                      <label className="text-xs text-silver/60 uppercase tracking-widest">Preferred Inspection Date</label>
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-obsidian border border-silver/20 rounded-none px-4 py-3 text-silver focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  </div>
                )}
                
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Navigation Buttons */}
        {!isCompleted && (
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-silver/10">
            <button 
              onClick={prevStep}
              className={`flex items-center gap-2 text-sm uppercase tracking-widest font-bold transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-silver hover:text-white'}`}
            >
              <ChevronLeft size={16} /> Back
            </button>
            
            <MagneticButton 
              variant="primary" 
              onClick={nextStep}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  {step === steps.length ? "Secure Your Booking" : "Continue"} <ChevronRight size={16} />
                </>
              )}
            </MagneticButton>
          </div>
        )}

      </div>
    </div>
  );
}
