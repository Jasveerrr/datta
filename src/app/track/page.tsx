"use client";

import { useState, useEffect } from "react";
import { socket } from "@/lib/socket";
import { motion } from "framer-motion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { CheckCircle2, Factory, Wrench, PaintBucket, Search, Flag } from "lucide-react";

const STAGES = [
  { id: "RECEIVED", label: "Received", icon: Factory },
  { id: "INSPECTION", label: "Inspection", icon: Search },
  { id: "REPAIR", label: "Repair", icon: Wrench },
  { id: "PAINT", label: "Paint & Curing", icon: PaintBucket },
  { id: "QUALITY_CHECK", label: "Quality Check", icon: CheckCircle2 },
  { id: "READY", label: "Ready", icon: Flag },
];

export default function TrackRepair() {
  const [jobId, setJobId] = useState("JB-8432-XYZ");
  const [currentStage, setCurrentStage] = useState("PAINT");
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");

  useEffect(() => {
    socket.connect();

    // Listen to our Admin socket events
    socket.on("statusUpdate", (data: { jobId: string; stage: string; timestamp: string }) => {
      if (data.jobId === jobId) {
        setCurrentStage(data.stage);
        setLastUpdated("Updated 10 seconds ago");

        // Use browser Notification API if permission granted
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("GarageGo Update", {
            body: `Your vehicle has advanced to: ${data.stage.replace("_", " ")}`,
          });
        }
      }
    });

    return () => {
      socket.off("statusUpdate");
      socket.disconnect();
    };
  }, [jobId]);

  const activeIndex = STAGES.findIndex(s => s.id === currentStage);

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-silver/10 pb-6 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white">
              Track <span className="text-primary">Repair</span>
            </h1>
            <p className="text-silver/60 mt-2">Live vehicle status powered by GarageGo Systems.</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-silver/60 mb-1">Active Job ID</p>
            <div className="bg-black/40 border border-primary/30 px-4 py-2 rounded font-mono font-bold text-primary tracking-wider shadow-[0_0_15px_rgba(212,160,23,0.1)]">
              {jobId}
            </div>
            <p className="text-[10px] text-green-500 mt-2">{lastUpdated}</p>
          </div>
        </header>

        {/* 3D-feeling Timeline */}
        <div className="bg-black/40 border border-silver/10 p-8 md:p-12 rounded-2xl relative overflow-hidden backdrop-blur-sm shadow-2xl">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-xl font-heading font-bold text-white mb-12">Restoration Progress</h3>

            <div className="relative">
              {/* Line background */}
              <div className="absolute top-8 left-0 w-full h-1 bg-silver/10 rounded-full" />
              {/* Active Line Progress */}
              <motion.div
                className="absolute top-8 left-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(212,160,23,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${(activeIndex / (STAGES.length - 1)) * 100}%` }}
                transition={{ duration: 1, type: "spring", bounce: 0.2 }}
              />

              <div className="flex justify-between relative z-10">
                {STAGES.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isActive = idx <= activeIndex;
                  const isCurrent = idx === activeIndex;

                  return (
                    <div key={stage.id} className="flex flex-col items-center relative group">
                      {isCurrent && (
                        <motion.div
                          className="absolute w-16 h-16 rounded-full bg-primary/30 blur-sm top-0"
                          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      <div
                        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive
                            ? "bg-obsidian border-primary text-primary shadow-[0_0_20px_rgba(212,160,23,0.3)]"
                            : "bg-[#0A0A0A] border-silver/10 text-silver/40"
                          }`}
                      >
                        <Icon size={isCurrent ? 28 : 24} className={isCurrent ? "scale-110" : ""} />
                      </div>

                      <div className="mt-4 text-center absolute top-20 w-32 -translate-x-1/2 left-1/2">
                        <p className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? "text-white" : "text-silver/40"}`}>
                          {stage.label}
                        </p>
                        {isCurrent && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                            className="text-[9px] text-primary"
                          >
                            In Progress
                          </motion.span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {/* Notes */}
          <div className="md:col-span-1 space-y-6">
            <h3 className="text-2xl font-heading font-bold">Technician Notes</h3>
            <div className="bg-[#0A0A0A] border border-silver/10 p-6 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors shadow-xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black border border-primary text-primary flex items-center justify-center font-bold tracking-widest text-sm shadow-[0_0_15px_rgba(212,160,23,0.2)]">
                    MR
                  </div>
                  <div>
                    <p className="text-sm text-white font-bold tracking-wider uppercase">Marcus Rossi</p>
                    <p className="text-[10px] text-silver/60 uppercase tracking-widest">Lead Technician</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="px-2 py-0.5 bg-obsidian border border-silver/20 rounded uppercase tracking-widest text-[9px] text-silver/60 mb-1">Update</div>
                  <p className="text-[10px] text-primary font-mono font-black">10:45 AM</p>
                </div>
              </div>
              <p className="text-sm text-silver/80 italic leading-relaxed">
                "Primer cured flawlessly overnight. We are proceeding with the base coat application using the Glasurit 90 Line. Color match spectrometer shows Delta-E of 0.2. Precision on track."
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-silver/10 p-6 flex flex-col items-center justify-center text-center gap-4 rounded-xl shadow-xl">
              <p className="text-xs uppercase tracking-widest text-silver/60">Estimated Completion</p>
              <h4 className="text-4xl font-heading font-black text-white text-shadow-[0_0_20px_rgba(255,255,255,0.2)]">48 Hours</h4>
            </div>
          </div>

          {/* Before/After Gallery */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-heading font-bold mb-6">Repair Validation</h3>
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
              afterImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
