"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe, Sparkles, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";
import { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Destinations", href: "#destinations" },
  { name: "Why Us", href: "#why-us" },
  { name: "Process", href: "#process" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Stories", href: "#stories" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lenis = useLenis();
  const navRef = useRef<HTMLElement>(null);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    
    if (id === "home") {
      lenis?.scrollTo(0);
    } else {
      const element = document.getElementById(id);
      if (element) {
        lenis?.scrollTo(element, { offset: -80 });
      }
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleActiveSection = () => {
      const ids = [...navLinks.map(l => l.href.replace("#", "")), "home"];
      const scrollPos = window.scrollY + 150; // Precise offset

      // Find all sections and their positions
      const sectionPositions = ids.map(id => {
        const element = document.getElementById(id);
        if (element) {
          return { id, top: element.offsetTop };
        }
        return null;
      }).filter(Boolean) as { id: string, top: number }[];

      // Sort by top position
      sectionPositions.sort((a, b) => b.top - a.top);

      // Find the first section that is above the scroll position
      for (const section of sectionPositions) {
        if (scrollPos >= section.top) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleActiveSection);
    setTimeout(handleActiveSection, 1000);
    
    return () => window.removeEventListener("scroll", handleActiveSection);
  }, []);
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Hello Jade Tours & Travel! I want to plan a trip.\n\n` +
      `I would like to speak with a travel expert about my upcoming plans.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919825438324?text=${encodedMessage}`, '_blank');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl py-3 lg:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100" 
            : "bg-white/10 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-0 py-4 lg:py-10"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          
          {/* Elite Branding */}
          <Link 
            href="#home" 
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 lg:gap-3 group"
          >
            <div className="text-[#388E3C]">
              <Globe className="w-7 h-7 lg:w-10 lg:h-10" strokeWidth={1.2} />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg lg:text-2xl font-sans font-black tracking-tighter leading-none transition-colors duration-500 ${isScrolled ? "text-gray-950" : "text-gray-950 lg:text-gray-950"}`}>JADE</span>
              <span className={`text-[6px] lg:text-[8px] font-black uppercase tracking-[0.4em] leading-none mt-1 transition-colors duration-500 ${isScrolled ? "text-gray-400" : "text-gray-500 lg:text-gray-400"}`}>
                Tours & Travel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Editorial Minimalist */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <div className="flex items-center gap-4 xl:gap-8">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-sans text-[9px] xl:text-[11px] font-black uppercase tracking-[0.2em] xl:tracking-[0.3em] transition-all relative py-1 group"
                  >
                    <div className="h-[14px] overflow-hidden relative block">
                      <motion.div 
                        animate={{ y: isActive ? "-50%" : "0%" }}
                        whileHover={{ y: "-50%" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        className="flex flex-col"
                      >
                        <span className={`h-[14px] flex items-center leading-none transition-colors duration-500 ${isActive ? "text-[#388E3C]" : "text-gray-950"}`}>{link.name}</span>
                        <span className="h-[14px] flex items-center leading-none text-[#388E3C]">{link.name}</span>
                      </motion.div>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#388E3C]/20"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            
            <button 
              onClick={handleContactClick}
              className="flex items-center gap-2 px-6 py-3 font-black text-[10px] uppercase tracking-[0.2em] rounded-full transition-all border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] bg-white text-gray-950 group"
            >
              <Phone className="w-3.5 h-3.5 text-gray-950 group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
              <span>Travel Expert</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 active:scale-90 ${
                isScrolled 
                  ? "bg-white text-gray-950 shadow-sm border border-gray-100" 
                  : "bg-white/10 text-gray-950 backdrop-blur-md border border-white/20 shadow-lg"
              }`}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Immersive Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[120] bg-[#050807] text-white lg:hidden flex flex-col p-8 pt-12"
          >
            {/* Background Texture/Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#388E3C_0%,transparent_50%)]" />
            </div>

            <div className="relative z-10 flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(56,142,60,0.4)]">
                    <Globe className="w-5 h-5" strokeWidth={1.5} />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xl font-black tracking-tighter leading-none">JADE</span>
                   <span className="text-[6px] font-black uppercase tracking-[0.4em] leading-none mt-1.5 text-gray-400">Tours & Travel</span>
                 </div>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-90 transition-transform"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative z-10 flex flex-col gap-5 overflow-y-auto no-scrollbar py-2">
              {navLinks.map((link, i) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;

                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`text-[28px] font-black tracking-tightest uppercase flex items-center justify-between group py-3 border-b border-white/5 transition-colors ${isActive ? "text-primary" : "text-white"}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-black tracking-widest ${isActive ? "text-primary" : "text-primary/40"}`}>{String(i+1).padStart(2, '0')}</span>
                        <span className="transition-colors duration-300">{link.name}</span>
                      </div>
                      <ArrowUpRight className={`w-5 h-5 transition-all ${isActive ? "text-primary translate-x-1 -translate-y-1" : "text-white/10"}`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="relative z-10 mt-auto pt-10 pb-4 space-y-8">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <button
                  onClick={handleContactClick}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white font-black rounded-2xl text-sm shadow-[0_25px_50px_rgba(56,142,60,0.3)] uppercase tracking-[0.25em] active:scale-[0.97] transition-all"
                >
                  <Phone size={18} strokeWidth={2.5} />
                  Book Now
                </button>
              </motion.div>
              
              <div className="flex flex-col items-center gap-5">
                <div className="flex justify-center gap-10 opacity-30">
                  <Globe size={18} strokeWidth={1.5} />
                  <Sparkles size={18} strokeWidth={1.5} />
                  <Menu size={18} strokeWidth={1.5} />
                </div>
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] text-center">Global Standards • Secure Protocols</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
