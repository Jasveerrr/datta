"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "admin@garagego.com" && password === "admin123") {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Garage Lighting */}
      <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-[#F5A623]/5 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-md z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-black text-white tracking-tighter mb-2">
            Garage<span className="text-[#F5A623]">Go</span>
          </h1>
          <p className="text-[#F5A623] text-xs font-bold tracking-widest uppercase">Admin Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#111111] border border-white/5 p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded mb-6 text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#E8E8E8]/60 mb-2 font-bold">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white placeholder-[#E8E8E8]/30 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                placeholder="admin@garagego.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#E8E8E8]/60 mb-2 font-bold">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-white placeholder-[#E8E8E8]/30 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="w-full mt-4 bg-[#F5A623] hover:bg-[#E8B936] text-black font-bold py-4 rounded-lg tracking-widest uppercase text-sm transition-colors">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
