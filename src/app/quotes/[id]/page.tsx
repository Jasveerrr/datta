"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Star,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Shield,
  CreditCard,
  Package,
  BadgeCheck,
  TrendingDown,
  Zap,
  ArrowLeft,
  Phone,
  X,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Workshop {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: number;
  price: number;
  estimatedDays: number;
  note: string;
  badge?: "best_value" | "cheapest" | "fastest";
  included: string[];
  warranty: string;
  paymentTerms: string;
  address: string;
  fullAddress: string;
  phone: string;
  mapsQuery: string;
  specialist: string;
  yearsInBusiness: number;
}

const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: "ws1",
    name: "Sharma Auto Restoration",
    rating: 4.9,
    reviews: 312,
    distance: 1.2,
    price: 18500,
    estimatedDays: 5,
    note: "Specialists in luxury vehicle restoration. We use OEM-grade Glasurit paints and precision dent-pulling rigs. Your car leaves looking factory-new.",
    badge: "best_value",
    included: ["Full panel respray", "Dent removal", "Clear coat protection", "Interior dust protection", "Complimentary wash & polish"],
    warranty: "24-month workmanship warranty",
    paymentTerms: "30% advance, balance on delivery",
    address: "Plot 14, Andheri East, Mumbai",
    fullAddress: "Plot 14, MIDC Industrial Zone, Andheri East, Mumbai, Maharashtra 400093",
    phone: "+919823041567",
    mapsQuery: "Sharma+Auto+Restoration+Andheri+East+Mumbai",
    specialist: "Luxury & Collision Repair",
    yearsInBusiness: 15,
  },
  {
    id: "ws2",
    name: "Mehta Motors Body Shop",
    rating: 4.7,
    reviews: 189,
    distance: 2.8,
    price: 14200,
    estimatedDays: 7,
    note: "Trusted for over 18 years. We offer transparent pricing — no hidden charges. All repairs are photo-documented at every stage.",
    badge: "cheapest",
    included: ["Panel work", "Base coat + clear coat", "Surface prep & primer", "Photo documentation"],
    warranty: "12-month warranty",
    paymentTerms: "50% advance, 50% on delivery",
    address: "Shed 7, MIDC Marol, Mumbai",
    fullAddress: "Shed 7, MIDC Marol Industrial Area, Andheri East, Mumbai, Maharashtra 400059",
    phone: "+919712384056",
    mapsQuery: "Mehta+Motors+Body+Shop+Marol+Mumbai",
    specialist: "General Body Repair",
    yearsInBusiness: 18,
  },
  {
    id: "ws3",
    name: "Kapoor Karz Premium",
    rating: 4.8,
    reviews: 97,
    distance: 0.9,
    price: 22000,
    estimatedDays: 4,
    note: "Express service with zero compromise on quality. We run double-shift operations to meet tight timelines. German paint tech, Indian price.",
    badge: "fastest",
    included: ["Express lane priority", "Full respray", "Computerised colour match", "Detailing package", "Free pick & drop"],
    warranty: "18-month warranty",
    paymentTerms: "Full payment in advance (10% discount)",
    address: "Vile Parle West, Mumbai",
    fullAddress: "Shop 3, Hanuman Road, Vile Parle West, Mumbai, Maharashtra 400056",
    phone: "+919967123480",
    mapsQuery: "Kapoor+Karz+Premium+Vile+Parle+Mumbai",
    specialist: "Express & Premium Repairs",
    yearsInBusiness: 9,
  },
  {
    id: "ws4",
    name: "BayOne Collision Center",
    rating: 4.5,
    reviews: 244,
    distance: 4.1,
    price: 16800,
    estimatedDays: 8,
    note: "Insurance-approved repair center with direct billing facility. Structural repairs and airbag systems handled in-house.",
    included: ["Structural repair", "Insurance documentation", "Panel beating", "Surface finishing"],
    warranty: "12-month structural warranty",
    paymentTerms: "Insurance direct billing available",
    address: "Kurla West, Mumbai",
    fullAddress: "Unit 9, LBS Marg, Near Kurla Station, Kurla West, Mumbai, Maharashtra 400070",
    phone: "+919881205674",
    mapsQuery: "BayOne+Collision+Center+Kurla+Mumbai",
    specialist: "Insurance Claims & Structural",
    yearsInBusiness: 12,
  },
  {
    id: "ws5",
    name: "Rajput Refinish Studio",
    rating: 4.6,
    reviews: 156,
    distance: 3.3,
    price: 19900,
    estimatedDays: 6,
    note: "Boutique studio focused on custom finishes. PPF, ceramic coating, and showroom-grade swirl-free polishing available as add-ons.",
    included: ["Custom colour matching", "PPF consultation", "Panel respray", "Swirl-free polish"],
    warranty: "Lifetime PPF warranty (if opted)",
    paymentTerms: "60% advance, balance on handover",
    address: "Lower Parel, Mumbai",
    fullAddress: "G-12, Phoenix Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013",
    phone: "+919930765412",
    mapsQuery: "Rajput+Refinish+Studio+Lower+Parel+Mumbai",
    specialist: "Custom Finishes & Detailing",
    yearsInBusiness: 7,
  },
  {
    id: "ws6",
    name: "Patel Panel Works",
    rating: 4.3,
    reviews: 421,
    distance: 5.6,
    price: 11500,
    estimatedDays: 10,
    note: "Volume workshop with quick turnaround for budget-conscious customers. No compromise on panel alignment — we use digital gauges.",
    included: ["Panel dent repair", "Single-stage respray", "Basic prep work"],
    warranty: "6-month warranty",
    paymentTerms: "Full payment on pickup",
    address: "Goregaon East, Mumbai",
    fullAddress: "Plot 22, SEEPZ Zone, Saki Vihar Road, Goregaon East, Mumbai, Maharashtra 400063",
    phone: "+919819054321",
    mapsQuery: "Patel+Panel+Works+Goregaon+Mumbai",
    specialist: "Budget-Friendly Repairs",
    yearsInBusiness: 22,
  },
];

type SortKey = "price" | "rating" | "speed";

// ─── Star Rating ────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? "text-primary fill-primary" : "text-silver/20"}
        />
      ))}
    </div>
  );
}

// ─── Workshop Selection Modal ─────────────────────────────────────────────
function WorkshopModal({
  workshop,
  onClose,
}: {
  workshop: Workshop;
  onClose: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 40 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none"
      >
        <div
          className="pointer-events-auto w-full sm:max-w-lg bg-[#111111] border border-primary/30 rounded-t-3xl sm:rounded-2xl shadow-[0_0_60px_rgba(212,160,23,0.15)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

          {!confirmed ? (
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-1">Selected Workshop</p>
                  <h2 className="text-xl font-heading font-black text-white leading-tight">{workshop.name}</h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <StarRating rating={workshop.rating} />
                    <span className="text-sm font-bold text-white">{workshop.rating}</span>
                    <span className="text-xs text-silver/50">({workshop.reviews} reviews)</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-silver/10 text-silver/50 hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Price */}
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-silver/60">Quoted Price</span>
                <span className="text-2xl font-heading font-black text-primary">
                  ₹{workshop.price.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 mb-3 p-3 rounded-xl bg-white/3 border border-silver/8">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-silver/40 mb-0.5">Address</p>
                  <p className="text-sm text-silver/80 leading-relaxed">{workshop.fullAddress}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-white/3 border border-silver/8">
                <Phone size={16} className="text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-silver/40 mb-0.5">Phone</p>
                  <p className="text-sm text-white font-semibold font-mono">{workshop.phone.replace("+91", "+91 ")}</p>
                </div>
                <a
                  href={`tel:${workshop.phone}`}
                  className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-emerald-500/20 transition-colors"
                >
                  Call Now
                </a>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${workshop.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-silver/20 text-silver/70 hover:border-primary/40 hover:text-primary text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300"
                >
                  <Navigation size={14} />
                  Open in Google Maps
                </a>

                <button
                  onClick={() => setConfirmed(true)}
                  className="w-full py-3.5 bg-primary text-obsidian font-black text-sm uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_20px_rgba(212,160,23,0.25)] hover:shadow-[0_0_30px_rgba(212,160,23,0.45)]"
                >
                  Confirm This Workshop
                </button>
              </div>
            </div>
          ) : (
            // ── Success Screen ──────────────────────────────────────────
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-8 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6"
              >
                <CheckCircle2 size={40} className="text-primary" />
              </motion.div>

              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Booking Confirmed</p>
              <h2 className="text-2xl font-heading font-black text-white mb-3 leading-tight">
                You&apos;re all set!
              </h2>
              <p className="text-silver/60 text-sm leading-relaxed mb-1">
                Your job has been assigned to
              </p>
              <p className="text-white font-bold text-base mb-4">{workshop.name}</p>
              <p className="text-silver/70 text-sm mb-6">
                They will contact you within <span className="text-primary font-semibold">1 hour</span>.
              </p>

              <div className="w-full bg-black/40 border border-primary/20 rounded-xl px-6 py-4 mb-6">
                <p className="text-[10px] uppercase tracking-widest text-silver/40 mb-1">Booking ID</p>
                <p className="text-xl font-mono font-black text-primary">{bookingId}</p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 border border-silver/20 text-silver/60 hover:text-primary hover:border-primary/40 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Workshop Card ─────────────────────────────────────────────────────────
function WorkshopCard({
  workshop,
  index,
  onSelect,
}: {
  workshop: Workshop;
  index: number;
  onSelect: (workshop: Workshop) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const badgeMap = {
    best_value: { label: "Best Value", color: "bg-primary text-obsidian", icon: <BadgeCheck size={12} /> },
    cheapest: { label: "Cheapest", color: "bg-emerald-500 text-white", icon: <TrendingDown size={12} /> },
    fastest: { label: "Fastest", color: "bg-blue-500 text-white", icon: <Zap size={12} /> },
  };

  const badge = workshop.badge ? badgeMap[workshop.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "group relative border rounded-2xl overflow-hidden transition-all duration-300",
        workshop.badge === "best_value"
          ? "border-primary/40 shadow-[0_0_30px_rgba(245,166,35,0.12)]"
          : "border-silver/10",
        "hover:border-primary/30 hover:shadow-[0_0_25px_rgba(245,166,35,0.08)] hover:-translate-y-1"
      )}
    >
      {/* Gold top accent for best value */}
      {workshop.badge === "best_value" && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}

      <div className="bg-[#0A0A0A] p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-lg font-heading font-black text-white truncate">{workshop.name}</h3>
              {badge && (
                <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0", badge.color)}>
                  {badge.icon} {badge.label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-silver/60 flex-wrap gap-y-1">
              <div className="flex items-center gap-1.5">
                <StarRating rating={workshop.rating} />
                <span className="font-bold text-white">{workshop.rating}</span>
                <span>({workshop.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-primary" />
                <span>{workshop.distance} km away</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-primary" />
                <span>{workshop.estimatedDays} days</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-right shrink-0">
            <p className="text-3xl font-heading font-black text-primary">₹{workshop.price.toLocaleString("en-IN")}</p>
            <p className="text-[10px] uppercase tracking-widest text-silver/40 mt-0.5">All inclusive</p>
          </div>
        </div>

        {/* Note */}
        <p className="mt-4 text-sm text-silver/70 leading-relaxed italic border-l-2 border-primary/30 pl-3">
          &ldquo;{workshop.note}&rdquo;
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-5 gap-3 flex-wrap">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-silver/50 hover:text-primary transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? "Hide Details" : "View Details"}
          </button>
          {/* FIX: SELECT THIS WORKSHOP now opens modal */}
          <button
            onClick={() => onSelect(workshop)}
            className="px-6 py-2.5 bg-primary text-obsidian text-xs font-black uppercase tracking-widest hover:bg-yellow-400 transition-all duration-300 rounded shadow-[0_0_15px_rgba(245,166,35,0.2)] hover:shadow-[0_0_25px_rgba(245,166,35,0.4)]"
          >
            Select This Workshop
          </button>
        </div>

        {/* Expanded section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-silver/10 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-3">
                    <Package size={12} /> What&apos;s Included
                  </div>
                  <ul className="space-y-1.5">
                    {workshop.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-silver/70">
                        <span className="text-primary mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-3">
                    <Shield size={12} /> Warranty
                  </div>
                  <p className="text-sm text-white font-semibold">{workshop.warranty}</p>
                  <p className="text-xs text-silver/50 mt-2">{workshop.specialist} • {workshop.yearsInBusiness} yrs exp.</p>
                  <p className="text-xs text-silver/40 mt-1">{workshop.address}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary mb-3">
                    <CreditCard size={12} /> Payment Terms
                  </div>
                  <p className="text-sm text-white">{workshop.paymentTerms}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function QuotesComparison() {
  const params = useParams();
  const requestId = params.id as string;
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const sorted = [...MOCK_WORKSHOPS].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "speed") return a.estimatedDays - b.estimatedDays;
    return 0;
  });

  const lowestPrice = Math.min(...MOCK_WORKSHOPS.map((w) => w.price));
  const avgPrice = Math.round(MOCK_WORKSHOPS.reduce((s, w) => s + w.price, 0) / MOCK_WORKSHOPS.length);

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20 px-6">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Back link */}
        <Link
          href="/quotes"
          className="inline-flex items-center gap-2 text-silver/50 hover:text-primary transition-colors text-sm uppercase tracking-widest mb-8"
        >
          <ArrowLeft size={14} /> New Request
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-primary text-xs uppercase tracking-[0.3em] mb-2">Live Quotes</p>
              <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white">
                Workshop <span className="text-primary">Bids</span>
              </h1>
              <p className="text-silver/60 mt-2 text-sm">
                Request <span className="font-mono text-primary font-bold">{requestId}</span> — 6 workshops responded
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 shrink-0">
              {[
                { label: "Bids Received", value: "6" },
                { label: "Lowest Quote", value: `₹${lowestPrice.toLocaleString("en-IN")}` },
                { label: "Average Price", value: `₹${avgPrice.toLocaleString("en-IN")}` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-black/40 border border-silver/10 rounded-xl p-3 text-center">
                  <p className="text-lg font-heading font-black text-primary">{value}</p>
                  <p className="text-[9px] uppercase tracking-widest text-silver/50 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sort controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-8 flex-wrap"
        >
          <span className="text-xs uppercase tracking-widest text-silver/40">Sort by:</span>
          {([
            { key: "price", label: "Lowest Price", icon: <TrendingDown size={13} /> },
            { key: "rating", label: "Highest Rated", icon: <Star size={13} /> },
            { key: "speed", label: "Fastest Turnaround", icon: <Zap size={13} /> },
          ] as { key: SortKey; label: string; icon: React.ReactNode }[]).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs uppercase tracking-widest transition-all duration-300",
                sortBy === opt.key
                  ? "bg-primary border-primary text-obsidian font-bold shadow-[0_0_15px_rgba(245,166,35,0.3)]"
                  : "border-silver/15 text-silver/60 hover:border-primary/40 hover:text-primary"
              )}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {sorted.map((workshop, idx) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                index={idx}
                onSelect={setSelectedWorkshop}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-silver/30 text-xs mt-10 uppercase tracking-widest"
        >
          All workshops are verified by DattaMotors. Prices include labour & material costs.
        </motion.p>
      </div>

      {/* Workshop Selection Modal */}
      <AnimatePresence>
        {selectedWorkshop && (
          <WorkshopModal
            workshop={selectedWorkshop}
            onClose={() => setSelectedWorkshop(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
