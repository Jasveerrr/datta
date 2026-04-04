"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Car,
  Camera,
  MapPin,
  CheckCircle2,
  Upload,
  X,
  Zap,
  Calendar,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Car Details", icon: Car },
  { id: 2, label: "Damage", icon: Zap },
  { id: 3, label: "Photos", icon: Camera },
  { id: 4, label: "Location", icon: MapPin },
];

const CAR_AREAS = [
  { id: "hood", label: "Hood", x: 50, y: 12, w: 28, h: 14 },
  { id: "roof", label: "Roof", x: 50, y: 30, w: 26, h: 14 },
  { id: "front", label: "Front", x: 50, y: 6, w: 18, h: 8 },
  { id: "rear", label: "Rear", x: 50, y: 85, w: 18, h: 8 },
  { id: "left_door", label: "Left Door", x: 18, y: 50, w: 14, h: 22 },
  { id: "right_door", label: "Right Door", x: 82, y: 50, w: 14, h: 22 },
  { id: "bumper", label: "Bumper", x: 50, y: 93, w: 22, h: 8 },
];

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad", "Ahmedabad", "Kolkata"];

const CAR_MAKES = ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota", "Kia", "MG", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Skoda", "Jeep", "Ford"];

function generateRequestId(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RQ-${year}-${rand}`;
}

interface FormData {
  make: string;
  model: string;
  year: string;
  color: string;
  plate: string;
  description: string;
  damagedAreas: string[];
  photos: File[];
  city: string;
  timeline: string;
}

// Native drag-and-drop photo uploader (no react-dropzone needed)
function PhotoDropzone({ photos, setPhotos }: { photos: File[]; setPhotos: (f: File[]) => void }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: File[]) => {
    const valid = incoming.filter((f) => f.type === "image/jpeg" || f.type === "image/png");
    setPhotos([...photos, ...valid].slice(0, 8));
  }, [photos, setPhotos]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragActive(true); };
  const handleDragLeave = () => setIsDragActive(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    addFiles(Array.from(e.dataTransfer.files));
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  };

  const removePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300",
          isDragActive
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-silver/20 hover:border-primary/50 hover:bg-white/5"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleInput}
        />
        <Upload className="mx-auto mb-4 text-primary" size={40} />
        <p className="text-white font-heading font-bold text-lg">
          {isDragActive ? "Drop your photos here!" : "Drag & drop damage photos"}
        </p>
        <p className="text-silver/60 text-sm mt-2">JPG, PNG • Max 8 photos</p>
        <span className="mt-4 inline-block px-6 py-2 bg-primary/10 border border-primary/30 text-primary text-sm uppercase tracking-widest hover:bg-primary/20 transition-colors rounded">
          Browse Files
        </span>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {photos.map((file, idx) => (
            <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-silver/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt={`Photo ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}
                className="absolute top-1 right-1 w-6 h-6 bg-black/80 border border-silver/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Car diagram
function CarDiagram({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-silver/60 text-sm uppercase tracking-widest">Click to mark damaged areas</p>
      <div className="relative w-full max-w-sm mx-auto" style={{ aspectRatio: "1 / 1.8" }}>
        {/* Car silhouette using CSS */}
        <svg viewBox="0 0 200 360" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Car body outline */}
          <ellipse cx="100" cy="300" rx="70" ry="12" fill="#111" opacity="0.6" />
          {/* Rear bumper */}
          <rect x="65" y="310" width="70" height="20" rx="10" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
          {/* Rear lights */}
          <rect x="68" y="298" width="18" height="8" rx="3" fill="#8B0000" opacity="0.7" />
          <rect x="114" y="298" width="18" height="8" rx="3" fill="#8B0000" opacity="0.7" />
          {/* Body sides */}
          <path d="M 40 100 L 30 290 Q 30 300 40 300 L 160 300 Q 170 300 170 290 L 160 100 Z" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          {/* Windshield rear */}
          <path d="M 55 135 L 50 185 L 150 185 L 145 135 Z" fill="#0a1628" stroke="#333" strokeWidth="1" opacity="0.9" />
          {/* Roof */}
          <path d="M 55 90 L 50 135 L 150 135 L 145 90 Z" fill="#151515" stroke="#2a2a2a" strokeWidth="1" />
          {/* Windshield front */}
          <path d="M 60 55 L 55 90 L 145 90 L 140 55 Z" fill="#0a1628" stroke="#333" strokeWidth="1" opacity="0.9" />
          {/* Hood */}
          <path d="M 65 30 L 60 55 L 140 55 L 135 30 Z" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          {/* Front grille */}
          <rect x="70" y="10" width="60" height="25" rx="8" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
          {/* Front lights */}
          <rect x="73" y="14" width="20" height="10" rx="3" fill="#444830" opacity="0.8" />
          <rect x="107" y="14" width="20" height="10" rx="3" fill="#444830" opacity="0.8" />
          {/* Left doors */}
          <rect x="32" y="195" width="30" height="68" rx="4" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          <rect x="32" y="140" width="30" height="55" rx="4" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          {/* Right doors */}
          <rect x="138" y="195" width="30" height="68" rx="4" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          <rect x="138" y="140" width="30" height="55" rx="4" fill="#1c1c1c" stroke="#2a2a2a" strokeWidth="1" />
          {/* Wheels */}
          <circle cx="55" cy="290" r="22" fill="#0D0D0D" stroke="#333" strokeWidth="2" />
          <circle cx="55" cy="290" r="14" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
          <circle cx="145" cy="290" r="22" fill="#0D0D0D" stroke="#333" strokeWidth="2" />
          <circle cx="145" cy="290" r="14" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
          <circle cx="55" cy="95" r="22" fill="#0D0D0D" stroke="#333" strokeWidth="2" />
          <circle cx="55" cy="95" r="14" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
          <circle cx="145" cy="95" r="22" fill="#0D0D0D" stroke="#333" strokeWidth="2" />
          <circle cx="145" cy="95" r="14" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
        </svg>

        {/* Clickable overlay areas */}
        {CAR_AREAS.map((area) => {
          const isSelected = selected.includes(area.id);
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => onToggle(area.id)}
              style={{
                position: "absolute",
                left: `${area.x - area.w / 2}%`,
                top: `${area.y - area.h / 2}%`,
                width: `${area.w}%`,
                height: `${area.h}%`,
              }}
              className={cn(
                "rounded transition-all duration-300 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest border",
                isSelected
                  ? "bg-primary/50 border-primary text-obsidian shadow-[0_0_12px_rgba(245,166,35,0.6)]"
                  : "bg-transparent border-transparent hover:bg-white/10 hover:border-white/20 text-transparent hover:text-silver/80"
              )}
            >
              {area.label}
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {selected.map((id) => {
            const area = CAR_AREAS.find((a) => a.id === id)!;
            return (
              <span key={id} className="px-3 py-1 bg-primary/20 border border-primary/40 text-primary text-xs uppercase tracking-widest rounded-full">
                {area.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
};

export default function QuotesPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [form, setForm] = useState<FormData>({
    make: "",
    model: "",
    year: "",
    color: "",
    plate: "",
    description: "",
    damagedAreas: [],
    photos: [],
    city: "",
    timeline: "",
  });

  const goNext = () => {
    if (step < 4) { setDirection(1); setStep(step + 1); }
  };
  const goPrev = () => {
    if (step > 1) { setDirection(-1); setStep(step - 1); }
  };

  const toggleArea = (id: string) => {
    setForm((f) => ({
      ...f,
      damagedAreas: f.damagedAreas.includes(id)
        ? f.damagedAreas.filter((a) => a !== id)
        : [...f.damagedAreas, id],
    }));
  };

  const handleSubmit = () => {
    const id = generateRequestId();
    setRequestId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="max-w-lg w-full text-center"
        >
          <div className="relative inline-block mb-8">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 bg-primary rounded-full blur-xl"
            />
            <CheckCircle2 size={80} className="relative text-primary" />
          </div>
          <h1 className="text-4xl font-heading font-black text-white mb-3">Request Submitted!</h1>
          <div className="bg-black/40 border border-primary/30 rounded-xl px-6 py-4 mb-6 inline-block">
            <p className="text-xs uppercase tracking-widest text-silver/60 mb-1">Your Request ID</p>
            <p className="text-3xl font-mono font-black text-primary tracking-wider">{requestId}</p>
          </div>
          <p className="text-silver/80 text-lg leading-relaxed mb-8">
            Your request has been sent to <span className="text-primary font-bold">12 workshops nearby</span>.<br />
            You&apos;ll receive quotes within <span className="text-white font-bold">2 hours</span>.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {["Workshops Notified", "Avg Response Time", "Quotes Expected"].map((label, i) => (
              <div key={label} className="bg-black/40 border border-silver/10 rounded-xl p-4">
                <p className="text-2xl font-heading font-black text-primary">{["12", "~45 min", "5-8"][i]}</p>
                <p className="text-[10px] uppercase tracking-widest text-silver/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <a
            href={`/quotes/${requestId}`}
            className="inline-block px-8 py-4 bg-primary text-obsidian font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors"
          >
            View Live Quotes →
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20 px-6">
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3 font-semibold">Repair Marketplace</p>
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-white">
            Get <span className="text-primary">Competing</span> Quotes
          </h1>
          <p className="text-silver/60 mt-4 max-w-xl mx-auto">
            Submit your repair job once — multiple verified workshops bid for your business.
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-12 gap-0">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isDone = s.id < step;
            return (
              <div key={s.id} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: isDone ? "#F5A623" : isActive ? "#F5A623" : "transparent",
                    borderColor: isDone || isActive ? "#F5A623" : "rgba(255,255,255,0.1)",
                    scale: isActive ? 1.1 : 1,
                  }}
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center relative z-10"
                >
                  {isDone ? (
                    <CheckCircle2 size={20} className="text-obsidian" />
                  ) : (
                    <Icon size={18} className={isActive ? "text-obsidian" : "text-silver/40"} />
                  )}
                </motion.div>
                {idx < STEPS.length - 1 && (
                  <div className="w-16 md:w-24 h-0.5 relative">
                    <div className="absolute inset-0 bg-silver/10" />
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-primary"
                      animate={{ width: isDone ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="bg-black/40 border border-silver/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <StepHeader
                    icon={<Car size={22} />}
                    title="Car Details"
                    subtitle="Tell us about your vehicle"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SelectField
                      label="Car Make"
                      value={form.make}
                      onChange={(v) => setForm({ ...form, make: v })}
                      options={CAR_MAKES}
                      placeholder="Select Make"
                    />
                    <InputField
                      label="Model"
                      value={form.model}
                      onChange={(v) => setForm({ ...form, model: v })}
                      placeholder="e.g. Swift, Creta, City"
                    />
                    <InputField
                      label="Year"
                      value={form.year}
                      onChange={(v) => setForm({ ...form, year: v })}
                      placeholder="e.g. 2022"
                      type="number"
                    />
                    <InputField
                      label="Color"
                      value={form.color}
                      onChange={(v) => setForm({ ...form, color: v })}
                      placeholder="e.g. Pearl White"
                    />
                    <div className="md:col-span-2">
                      <InputField
                        label="License Plate"
                        value={form.plate}
                        onChange={(v) => setForm({ ...form, plate: v.toUpperCase() })}
                        placeholder="e.g. MH01AB1234"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-8">
                  <StepHeader
                    icon={<Zap size={22} />}
                    title="Describe the Damage"
                    subtitle="Click the car to mark damaged areas, then describe the issue"
                  />
                  <CarDiagram selected={form.damagedAreas} onToggle={toggleArea} />
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">
                      Damage Description
                    </label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe the damage in detail — dents, scratches, collision damage, etc."
                      className="w-full bg-black/50 border border-silver/20 text-white placeholder-silver/30 px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <StepHeader
                    icon={<Camera size={22} />}
                    title="Upload Photos"
                    subtitle="Clear photos help workshops give accurate quotes"
                  />
                  <PhotoDropzone
                    photos={form.photos}
                    setPhotos={(photos) => setForm({ ...form, photos })}
                  />
                  <p className="text-silver/40 text-xs text-center">
                    Tip: Upload photos of all damaged areas from multiple angles
                  </p>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-6">
                  <StepHeader
                    icon={<MapPin size={22} />}
                    title="Location & Timeline"
                    subtitle="Help nearby workshops find your request"
                  />
                  <SelectField
                    label="Your City"
                    value={form.city}
                    onChange={(v) => setForm({ ...form, city: v })}
                    options={CITIES}
                    placeholder="Select City"
                  />
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-silver/60 mb-3">
                      Preferred Timeline
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "urgent", label: "Urgent", desc: "Within 24 hrs", icon: <Zap size={18} /> },
                        { id: "this_week", label: "This Week", desc: "3-7 days", icon: <Calendar size={18} /> },
                        { id: "flexible", label: "Flexible", desc: "No rush", icon: <Clock size={18} /> },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setForm({ ...form, timeline: t.id })}
                          className={cn(
                            "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-300 text-center",
                            form.timeline === t.id
                              ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(245,166,35,0.2)]"
                              : "border-silver/15 text-silver/60 hover:border-silver/30 hover:bg-white/5"
                          )}
                        >
                          {t.icon}
                          <span className="font-bold text-sm uppercase tracking-widest">{t.label}</span>
                          <span className="text-[10px] opacity-70">{t.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-black/50 border border-silver/10 rounded-xl p-5 space-y-2">
                    <p className="text-xs uppercase tracking-widest text-silver/50 mb-3">Summary</p>
                    {[
                      ["Vehicle", `${form.year} ${form.make} ${form.model} (${form.color})`],
                      ["Plate", form.plate],
                      ["Damaged Areas", form.damagedAreas.length > 0 ? form.damagedAreas.map((a) => CAR_AREAS.find((ca) => ca.id === a)?.label).join(", ") : "None specified"],
                      ["Photos", `${form.photos.length} uploaded`],
                      ["City", form.city || "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center text-sm">
                        <span className="text-silver/50">{label}</span>
                        <span className="text-white font-medium max-w-[60%] text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-silver/10">
            <button
              onClick={goPrev}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-3 border border-silver/20 text-silver/60 hover:text-white hover:border-silver/40 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-sm uppercase tracking-widest rounded"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < 4 ? (
              <button
                onClick={goNext}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-obsidian font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all duration-300 text-sm rounded shadow-[0_0_20px_rgba(245,166,35,0.3)] hover:shadow-[0_0_30px_rgba(245,166,35,0.5)]"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-obsidian font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all duration-300 text-sm rounded shadow-[0_0_20px_rgba(245,166,35,0.3)] hover:shadow-[0_0_30px_rgba(245,166,35,0.5)]"
              >
                Submit Request <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Step label */}
        <p className="text-center text-silver/40 text-xs uppercase tracking-widest mt-6">
          Step {step} of 4 — {STEPS[step - 1].label}
        </p>
      </div>
    </div>
  );
}

// Reusable sub-components
function StepHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-primary">{icon}</span>
        <h2 className="text-2xl font-heading font-black text-white">{title}</h2>
      </div>
      <p className="text-silver/60 text-sm">{subtitle}</p>
    </div>
  );
}

function InputField({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-black/50 border border-silver/20 text-white placeholder-silver/30 px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/50 border border-silver/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm appearance-none"
      >
        <option value="" className="text-silver/40">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#0A0A0A] text-white">{opt}</option>
        ))}
      </select>
    </div>
  );
}
