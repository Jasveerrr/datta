"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Garage", href: "/#garage" },
    { name: "Track Repair", href: "/track" },
    { name: "AdminHQ", href: "/admin" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-obsidian/90 backdrop-blur-md py-4 shadow-lg shadow-primary/5" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold tracking-tighter flex items-center gap-2">
          <span className="text-primary">Garage</span>
          <span className="text-silver">Go</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-silver hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/quote">
            <MagneticButton variant="primary">Get Quote</MagneticButton>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-silver hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-obsidian z-50 flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-8 right-8 text-silver hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={36} />
            </button>
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-heading uppercase tracking-widest text-silver hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" onClick={() => setIsMobileMenuOpen(false)}>
                  <MagneticButton variant="primary" className="mt-8 text-lg px-8 py-4">
                    Get Instant Quote
                  </MagneticButton>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
