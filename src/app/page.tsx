import Loader from "@/components/ui/Loader";
import HeroScene from "@/components/3d/HeroScene";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import ServicesSection from "@/components/sections/ServicesSection";
import GarageSection from "@/components/sections/GarageSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <Loader>
      <div className="relative min-h-screen bg-obsidian overflow-hidden">
        {/* 3D Background */}
        <HeroScene />
        
        {/* Overlay Content */}
        <div className="relative z-10 h-screen flex flex-col items-center justify-center pointer-events-none px-6 text-center">
          <div className="mt-20 flex flex-col items-center">
            <h1 className="text-5xl md:text-8xl font-heading font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
              YOUR CAR DESERVES <span className="text-primary glow-text block mt-2">THE BEST.</span>
            </h1>
            <p className="text-silver/80 text-lg md:text-xl max-w-2xl mb-12 font-sans font-medium">
              Experience the pinnacle of automotive restoration. A premium $10,000 car body repair and full restoration service blending cutting-edge tech with unmatched craftsmanship.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
              <Link href="/quote">
                <MagneticButton variant="primary" className="px-8 py-4 text-lg border border-primary">
                  Book a Repair
                </MagneticButton>
              </Link>
              <Link href="/quote">
                <MagneticButton variant="outline" className="px-8 py-4 text-lg bg-obsidian/50 backdrop-blur-md">
                  Get Instant Quote
                </MagneticButton>
              </Link>
            </div>
            
            <div className="mt-16 flex items-center gap-4 text-silver/60">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-obsidian bg-silver/20 bg-cover bg-center`} style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')`}} />
                ))}
              </div>
              <p className="text-sm font-semibold tracking-wide uppercase"><span className="text-primary">4,287</span> Cars Repaired</p>
            </div>
          </div>
        </div>
      </div>
      
      <ServicesSection />
      <GarageSection />
      <TestimonialsSection />
      <ContactSection />
    </Loader>
  );
}
