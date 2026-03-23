"use client";

import { useState } from "react";
import { socket } from "@/lib/socket";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import MagneticButton from "@/components/ui/MagneticButton";

const data = [
  { name: "Jan", revenue: 40000, jobs: 24 },
  { name: "Feb", revenue: 52000, jobs: 35 },
  { name: "Mar", revenue: 61000, jobs: 42 },
  { name: "Apr", revenue: 45000, jobs: 28 },
  { name: "May", revenue: 78000, jobs: 55 },
  { name: "Jun", revenue: 95000, jobs: 62 },
];

const STAGES = ["RECEIVED", "INSPECTION", "REPAIR", "PAINT", "QUALITY_CHECK", "READY"];

export default function AdminDashboard() {
  const [activeJob, setActiveJob] = useState("JB-8432-XYZ");
  const [currentStage, setCurrentStage] = useState("PAINT");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleStatusUpdate = () => {
    // Check if socket is disconnected, connect just for this action if necessary
    if (!socket.connected) {
      socket.connect();
    }
    
    // Emit the update via WebSocket
    socket.emit("statusUpdate", {
      jobId: activeJob,
      stage: currentStage,
      timestamp: new Date().toISOString()
    });
    
    setUpdateMessage("Status actively broadcasted to client!");
    setTimeout(() => setUpdateMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-obsidian text-silver p-6 md:p-12 pt-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center bg-black/40 border border-silver/10 p-6 rounded-2xl backdrop-blur-md">
          <div>
            <h1 className="text-3xl font-heading font-black text-white">GarageHQ <span className="text-primary tracking-widest uppercase text-lg">Admin</span></h1>
            <p className="text-silver/60 text-sm">Real-time Operations & Analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold">Systems Online</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold">
              ADMIN
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Revenue Analytics */}
          <div className="lg:col-span-2 bg-black/40 border border-silver/10 p-6 rounded-2xl">
            <h2 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
              Revenue Trajectory <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-1 rounded">YTD 2026</span>
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4A017" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4A017" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                  <YAxis stroke="#ffffff40" tick={{ fill: '#ffffff60', fontSize: 12 }} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#080808', borderColor: '#D4A017', color: '#fff' }}
                    itemStyle={{ color: '#D4A017' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#D4A017" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-primary/20 to-black border border-primary/50 p-6 rounded-2xl flex-1 flex flex-col justify-center">
              <p className="text-sm uppercase tracking-widest text-primary font-bold mb-2">Total MRR</p>
              <h3 className="text-5xl font-heading font-black text-white">$371,000</h3>
              <p className="text-green-500 text-sm mt-2 font-bold">+24.5% vs last month</p>
            </div>
            <div className="bg-black/40 border border-silver/10 p-6 rounded-2xl flex-1 flex flex-col justify-center">
              <p className="text-sm uppercase tracking-widest text-silver/60 font-bold mb-2">Active Jobs</p>
              <h3 className="text-5xl font-heading font-black text-white">42</h3>
              <p className="text-silver/60 text-sm mt-2">12 entering Quality Check</p>
            </div>
          </div>

        </div>

        {/* Real-Time operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Status Broadcaster */}
          <div className="bg-black/40 border border-primary/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(212,160,23,0.05)]">
            <h2 className="text-xl font-heading font-bold text-white mb-6 flex items-center justify-between">
              Live Stage Updater
              <span className="text-xs font-normal text-silver/60 bg-white/5 border border-white/10 px-2 py-1 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> WebSocket Broadcast Active
              </span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-silver/60 block mb-2">Target Job ID</label>
                <input 
                  type="text" 
                  value={activeJob}
                  onChange={(e) => setActiveJob(e.target.value)}
                  className="w-full bg-obsidian border border-silver/20 px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-silver/60 block mb-2">Advance Stage To</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {STAGES.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setCurrentStage(stage)}
                      className={`py-3 text-xs font-bold uppercase tracking-wider border transition-colors ${
                        currentStage === stage ? 'bg-primary text-black border-primary' : 'bg-black/50 text-silver/60 border-silver/10 hover:border-silver/40'
                      }`}
                    >
                      {stage.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <MagneticButton variant="primary" onClick={handleStatusUpdate} className="flex-1">
                  Broadcast Update
                </MagneticButton>
              </div>
              {updateMessage && (
                <p className="text-green-500 text-sm text-center font-bold tracking-wide">{updateMessage}</p>
              )}
            </div>
          </div>

          {/* Active Job Queue */}
          <div className="bg-black/40 border border-silver/10 p-6 rounded-2xl overflow-hidden flex flex-col">
            <h2 className="text-xl font-heading font-bold text-white mb-6">Repair Queue</h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {[
                { id: "JB-8432-XYZ", car: "2024 Porsche 911", stage: "PAINT", time: "4 hrs ago" },
                { id: "JB-9102-ABC", car: "2023 Range Rover", stage: "REPAIR", time: "1 day ago" },
                { id: "JB-1142-DEF", car: "1969 Ferrari Dino", stage: "RECEIVED", time: "Just now" },
                { id: "JB-3321-GHI", car: "2022 Rivian R1T", stage: "QUALITY_CHECK", time: "5 hrs ago" },
              ].map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-obsidian border border-silver/10 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div>
                    <h4 className="font-bold text-white group-hover:text-primary transition-colors">{job.id}</h4>
                    <p className="text-sm text-silver/60">{job.car}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 rounded mb-1">
                      {job.stage.replace("_", " ")}
                    </span>
                    <p className="text-xs text-silver/40">{job.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
