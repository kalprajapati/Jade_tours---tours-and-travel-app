"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sparkles, ArrowUpRight, MessageCircle, ChevronDown, Phone } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { 
    name: "About Us", 
    href: "#about",
    dropdown: [
      { name: "Our Story", href: "#about" },
      { name: "Why Choose Jade", href: "#why-us" },
      { name: "Our Process", href: "#process" },
    ]
  },
  { 
    name: "Services", 
    href: "#services",
    dropdown: [
      { name: "Air Ticket Booking", href: "#services" },
      { name: "International Tours", href: "#services" },
      { name: "Visa Assistance", href: "#services" },
      { name: "Hotel Bookings", href: "#services" },
    ]
  },
  { 
    name: "Destinations", 
    href: "#destinations",
    dropdown: [
      { name: "Dubai", href: "#destinations" },
      { name: "Bali", href: "#destinations" },
      { name: "Thailand", href: "#destinations" },
      { name: "Singapore", href: "#destinations" },
    ]
  },
  { name: "Packages", href: "#destinations" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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
    setHoveredLink(null);
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
      const scrollPos = window.scrollY + 150;

      const sectionPositions = ids.map(id => {
        const element = document.getElementById(id);
        if (element) {
          return { id, top: element.offsetTop };
        }
        return null;
      }).filter(Boolean) as { id: string, top: number }[];

      sectionPositions.sort((a, b) => b.top - a.top);

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
    const message = encodeURIComponent("Hello Jade Tours & Travel! I want to plan a trip.");
    window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl py-3 lg:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100" 
            : "bg-transparent py-4 lg:py-10"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          
          {/* Elite Branding */}
          <Link 
            href="#home" 
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group"
          >
            <div className={`transition-colors duration-500 ${isScrolled ? "text-primary" : "text-white"}`}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5C20 5 10 15 10 25C10 35 20 35 20 35C20 35 30 35 30 25C30 15 20 5 20 5Z" fill="currentColor" opacity="0.2"/>
                <path d="M20 10C20 10 15 18 15 25C15 32 20 32 20 32C20 32 25 32 25 25C25 18 20 10 20 10Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl lg:text-3xl font-serif font-bold tracking-tight leading-none transition-colors duration-500 ${isScrolled ? "text-gray-900" : "text-white"}`}>Jade</span>
              <span className={`text-[7px] font-black uppercase tracking-[0.1em] leading-none mt-1 transition-colors duration-500 ${isScrolled ? "text-gray-500" : "text-white/80"}`}>
                TOURS & TRAVELS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                
                return (
                  <div 
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Link 
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`font-sans text-[13px] font-bold transition-all flex items-center gap-1.5 group ${isScrolled ? "text-gray-900" : "text-white"}`}
                    >
                      <span>{link.name}</span>
                      {link.dropdown && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredLink === link.name ? "rotate-180" : ""}`} />
                      )}
                      {isActive && !link.dropdown && (
                        <motion.div 
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-0 w-full h-[2.5px] bg-primary"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {link.dropdown && hoveredLink === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-3 mt-1"
                        >
                          {link.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href)}
                              className="block px-6 py-2.5 text-[13px] font-bold text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={handleContactClick}
              className="flex items-center gap-2 px-6 py-3 font-bold text-[13px] rounded-full transition-all bg-[#25D366] text-white hover:bg-[#128C7E] shadow-lg group active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>WhatsApp Us</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 active:scale-90 ${
                isScrolled 
                  ? "bg-white text-gray-950 shadow-sm border border-gray-100" 
                  : "bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg"
              }`}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[120] bg-white lg:hidden flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-50">
               <div className="flex items-center gap-2">
                 <div className="text-primary">
                    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 5C20 5 10 15 10 25C10 35 20 35 20 35C20 35 30 35 30 25C30 15 20 5 20 5Z" fill="currentColor" opacity="0.2"/>
                      <path d="M20 10C20 10 15 18 15 25C15 32 20 32 20 32C20 32 25 32 25 25C25 18 20 10 20 10Z" fill="currentColor"/>
                    </svg>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-lg font-serif font-bold text-gray-900 leading-none">Jade</span>
                   <span className="text-[5px] font-black uppercase tracking-widest text-primary mt-0.5">TOURS & TRAVELS</span>
                 </div>
               </div>
               <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform"
               >
                <X size={18} />
               </button>
            </div>

            {/* Scrollable Links Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {navLinks.map((link, i) => (
                <div key={link.name} className="flex flex-col border-b border-gray-50/50 pb-3 last:border-0">
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-black text-gray-900 flex items-center justify-between group active:text-primary transition-colors"
                  >
                    {link.name}
                    {!link.dropdown && <ArrowUpRight className="w-3.5 h-3.5 text-primary opacity-30 group-active:opacity-100" />}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {link.dropdown.map(sub => (
                        <Link 
                          key={sub.name} 
                          href={sub.href}
                          onClick={(e) => handleNavClick(e, sub.href)}
                          className="px-3 py-1.5 bg-gray-50 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-500 active:bg-primary/10 active:text-primary transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="p-5 bg-white border-t border-gray-50 pb-8">
              <button 
                onClick={handleContactClick}
                className="w-full py-3.5 bg-[#25D366] text-white font-black rounded-xl flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all uppercase tracking-widest text-[10px]"
              >
                <MessageCircle size={16} />
                WhatsApp Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
