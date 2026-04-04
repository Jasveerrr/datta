import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-silver/10 relative overflow-hidden">
      {/* Decorative Gold Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-3xl font-heading font-bold tracking-tighter flex items-center gap-2 mb-6">
            <span className="text-primary">Garage</span>
            <span className="text-silver">Go</span>
          </Link>
          <p className="text-silver/60 text-sm leading-relaxed max-w-sm mb-6">
            Your car deserves the best. Premium $10,000 car body repair and full restoration services blending cutting-edge tech with unmatched craftsmanship.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-silver/60 hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-silver/60 hover:text-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-silver/60 hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-silver/60 hover:text-primary transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg font-bold mb-6 text-white uppercase tracking-widest">Services</h4>
          <ul className="flex flex-col gap-3 text-silver/60 text-sm">
            <li><Link href="/#services" className="hover:text-primary transition-colors">Dent Removal</Link></li>
            <li><Link href="/#services" className="hover:text-primary transition-colors">Scratch & Paint</Link></li>
            <li><Link href="/#services" className="hover:text-primary transition-colors">Collision Repair</Link></li>
            <li><Link href="/#services" className="hover:text-primary transition-colors">Full Body Restoration</Link></li>
            <li><Link href="/#services" className="hover:text-primary transition-colors">Ceramic Coating</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-bold mb-6 text-white uppercase tracking-widest">Company</h4>
          <ul className="flex flex-col gap-3 text-silver/60 text-sm">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/#garage" className="hover:text-primary transition-colors">Our Garage</Link></li>
            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-bold mb-6 text-white uppercase tracking-widest">Contact Info</h4>
          <ul className="flex flex-col gap-3 text-silver/60 text-sm">
            <li>123 Luxury Lane, Automotive District</li>
            <li>Los Angeles, CA 90001</li>
            <li>hello@garagego.com</li>
            <li>+1 (555) GARAGE-G</li>
            <li className="flex items-center gap-2 mt-4 text-primary font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Open Now - Closes at 8 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-silver/10 flex flex-col md:flex-row justify-between items-center text-xs text-silver/40">
        <p>&copy; {new Date().getFullYear()} GarageGo. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
