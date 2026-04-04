"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  User,
  Phone,
  Mail,
  FileText,
  MapPin,
  Wrench,
  CheckCircle2,
  Upload,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  { id: "dent_removal", label: "Dent Removal", icon: "🔨" },
  { id: "scratch_paint", label: "Scratch & Paint", icon: "🎨" },
  { id: "collision_repair", label: "Collision Repair", icon: "💥" },
  { id: "full_restoration", label: "Full Restoration", icon: "✨" },
  { id: "mechanical", label: "Mechanical", icon: "⚙️" },
  { id: "glass_repair", label: "Glass Repair", icon: "🪟" },
  { id: "detailing", label: "Detailing & PPF", icon: "💎" },
  { id: "frame_repair", label: "Frame Repair", icon: "🏗️" },
];

const CITIES = ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai", "Hyderabad", "Ahmedabad", "Kolkata", "Jaipur", "Surat"];

function generateWorkshopId(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `WS-${rand}`;
}

interface FormState {
  workshopName: string;
  ownerName: string;
  phone: string;
  email: string;
  gst: string;
  city: string;
  address: string;
  services: string[];
  yearsInBusiness: string;
  shopPhotos: File[];
}

export default function WorkshopsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [workshopId, setWorkshopId] = useState("");
  const [form, setForm] = useState<FormState>({
    workshopName: "",
    ownerName: "",
    phone: "",
    email: "",
    gst: "",
    city: "",
    address: "",
    services: [],
    yearsInBusiness: "",
    shopPhotos: [],
  });
  const [dragActive, setDragActive] = useState(false);

  const toggleService = (id: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }));
  };

  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "image/jpeg" || f.type === "image/png"
    );
    setForm((f) => ({ ...f, shopPhotos: [...f.shopPhotos, ...files].slice(0, 6) }));
  };

  const handlePhotoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setForm((f) => ({ ...f, shopPhotos: [...f.shopPhotos, ...files].slice(0, 6) }));
  };

  const removePhoto = (idx: number) => {
    setForm((f) => ({ ...f, shopPhotos: f.shopPhotos.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateWorkshopId();
    setWorkshopId(id);
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
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 bg-primary rounded-full blur-xl"
            />
            <CheckCircle2 size={80} className="relative text-primary" />
          </div>
          <h1 className="text-4xl font-heading font-black text-white mb-3">Application Received!</h1>
          <p className="text-silver/60 mb-6">Welcome to the DattaMotors network, {form.workshopName}.</p>

          <div className="bg-black/40 border border-primary/30 rounded-xl px-6 py-5 mb-6 inline-block">
            <p className="text-xs uppercase tracking-widest text-silver/60 mb-1">Your Workshop ID</p>
            <p className="text-3xl font-mono font-black text-primary tracking-wider">{workshopId}</p>
          </div>

          <div className="bg-[#0A0A0A] border border-silver/10 rounded-xl p-6 text-left space-y-3 mb-8">
            <p className="text-xs uppercase tracking-widest text-silver/50 mb-4">What Happens Next</p>
            {[
              { step: "1", text: "Our verification team reviews your documents & GST number" },
              { step: "2", text: "A DattaMotors agent visits your workshop (within 48 hours)" },
              { step: "3", text: "Account activated — you start receiving job requests!" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-obsidian text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {step}
                </span>
                <p className="text-sm text-silver/70">{text}</p>
              </div>
            ))}
          </div>

          <p className="text-silver/40 text-sm mb-6">
            Our team will verify and activate your account within{" "}
            <span className="text-primary font-bold">24 hours</span>.
          </p>

          <button
            onClick={() => { setSubmitted(false); setForm({ workshopName: "", ownerName: "", phone: "", email: "", gst: "", city: "", address: "", services: [], yearsInBusiness: "", shopPhotos: [] }); }}
            className="px-8 py-3 border border-silver/20 text-silver/60 hover:text-white hover:border-silver/40 transition-colors text-sm uppercase tracking-widest rounded"
          >
            Register Another Workshop
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20 px-6">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/8 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm uppercase tracking-[0.3em] mb-3 font-semibold">
            Partner Network
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-white">
            Register Your <span className="text-primary">Workshop</span>
          </h1>
          <p className="text-silver/60 mt-4 max-w-xl mx-auto">
            Join our verified network and receive repair job requests directly from customers nearby.
          </p>

          {/* Stats bar */}
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            {[
              { value: "340+", label: "Active Workshops" },
              { value: "4,200+", label: "Jobs Completed" },
              { value: "₹2.4Cr", label: "Revenue Generated" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-heading font-black text-primary">{value}</p>
                <p className="text-[10px] uppercase tracking-widest text-silver/50">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Section: Business Details */}
          <FormSection icon={<Building2 size={18} />} title="Business Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <FormInput
                  label="Workshop Name"
                  value={form.workshopName}
                  onChange={(v) => setForm({ ...form, workshopName: v })}
                  placeholder="e.g. Sharma Auto Restoration"
                  icon={<Building2 size={14} />}
                />
              </div>
              <FormInput
                label="GST Number"
                value={form.gst}
                onChange={(v) => setForm({ ...form, gst: v.toUpperCase() })}
                placeholder="e.g. 27AAPFU0939F1ZV"
                icon={<FileText size={14} />}
              />
              <FormInput
                label="Years in Business"
                value={form.yearsInBusiness}
                onChange={(v) => setForm({ ...form, yearsInBusiness: v })}
                placeholder="e.g. 12"
                type="number"
                icon={<CheckCircle2 size={14} />}
              />
            </div>
          </FormSection>

          {/* Section: Owner Details */}
          <FormSection icon={<User size={18} />} title="Owner Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Owner / Manager Name"
                value={form.ownerName}
                onChange={(v) => setForm({ ...form, ownerName: v })}
                placeholder="Full name"
                icon={<User size={14} />}
              />
              <FormInput
                label="Phone Number"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="+91 98765 43210"
                type="tel"
                icon={<Phone size={14} />}
              />
              <div className="md:col-span-2">
                <FormInput
                  label="Email Address"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="workshop@email.com"
                  type="email"
                  icon={<Mail size={14} />}
                />
              </div>
            </div>
          </FormSection>

          {/* Section: Location */}
          <FormSection icon={<MapPin size={18} />} title="Location">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormSelect
                label="City"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
                options={CITIES}
                placeholder="Select City"
              />
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">
                  Full Workshop Address
                </label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Plot no., area, landmark, city, PIN code"
                  className="w-full bg-black/50 border border-silver/20 text-white placeholder-silver/30 px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none text-sm"
                />
              </div>
            </div>
          </FormSection>

          {/* Section: Services */}
          <FormSection icon={<Wrench size={18} />} title="Services Offered">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SERVICES.map((svc) => {
                const selected = form.services.includes(svc.id);
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => toggleService(svc.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all duration-300 text-center cursor-pointer",
                      selected
                        ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(245,166,35,0.15)]"
                        : "border-silver/10 hover:border-silver/25 hover:bg-white/5"
                    )}
                  >
                    <span className="text-2xl">{svc.icon}</span>
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest leading-tight", selected ? "text-primary" : "text-silver/60")}>
                      {svc.label}
                    </span>
                    {selected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                      >
                        <CheckCircle2 size={10} className="text-obsidian" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
            {form.services.length === 0 && (
              <p className="text-silver/40 text-xs text-center mt-2">Select at least one service</p>
            )}
          </FormSection>

          {/* Section: Shop Photos */}
          <FormSection icon={<Upload size={18} />} title="Shop Photos">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handlePhotoDrop}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
                dragActive
                  ? "border-primary bg-primary/10 scale-[1.01]"
                  : "border-silver/20 hover:border-primary/40 hover:bg-white/3"
              )}
            >
              <Upload className="mx-auto mb-3 text-primary" size={32} />
              <p className="text-white font-heading font-bold">
                {dragActive ? "Drop photos here!" : "Drag & drop shop photos"}
              </p>
              <p className="text-silver/50 text-xs mt-1 mb-4">JPG, PNG • Max 6 photos</p>
              <label className="px-5 py-2 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest hover:bg-primary/20 transition-colors rounded cursor-pointer">
                Browse Photos
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={handlePhotoInput}
                />
              </label>
            </div>

            <AnimatePresence>
              {form.shopPhotos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4"
                >
                  {form.shopPhotos.map((file, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-silver/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Shop ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 w-5 h-5 bg-black/80 border border-silver/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} className="text-white" />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </FormSection>

          {/* Terms & Submit */}
          <div className="bg-black/40 border border-silver/10 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-6">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-0.5 accent-primary w-4 h-4 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-silver/60 leading-relaxed cursor-pointer">
                I confirm that all details provided are accurate and I agree to
                the <span className="text-primary underline cursor-pointer">DattaMotors Partner Terms & Conditions</span>.
                I understand my workshop will be verified before activation.
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-obsidian font-black uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all duration-300 rounded shadow-[0_0_30px_rgba(245,166,35,0.3)] hover:shadow-[0_0_50px_rgba(245,166,35,0.5)]"
            >
              Submit Application <ChevronRight size={16} />
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

// Sub-components
function FormSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="bg-black/40 border border-silver/10 rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="text-primary">{icon}</span>
        <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function FormInput({
  label, value, onChange, placeholder, type = "text", icon,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-silver/60 mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/30">{icon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-black/50 border border-silver/20 text-white placeholder-silver/30 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors text-sm",
            icon ? "pl-9 pr-4" : "px-4"
          )}
        />
      </div>
    </div>
  );
}

function FormSelect({
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
