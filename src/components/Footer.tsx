"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Mail, Phone, MapPin, Clock,
  ArrowRight, Star, Sparkles, ChevronUp, Globe, Shield, Compass
} from "lucide-react";
import { Instagram } from "@/components/ui/InstagramIcon";
import { Facebook, Twitter, Youtube } from "@/components/ui/SocialIcons";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Why Us", href: "#why-us" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQs", href: "#faq" },
];

const serviceLinks = [
  { name: "Flight Booking", href: "#air-ticketing" },
  { name: "International Tours", href: "#destinations" },
  { name: "Domestic Tours", href: "#destinations" },
  { name: "Visa Assistance", href: "#services" },
  { name: "Hotel Bookings", href: "#services" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookies", href: "#" },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content Reveal
      gsap.fromTo(".footer-reveal", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  
  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer ref={containerRef} className="bg-[#020504] text-white pt-12 lg:pt-32 pb-8 lg:pb-12 relative overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(56,142,60,0.08),transparent_60%)]" />
        <div className="absolute -bottom-48 -left-48 w-[1000px] h-[1000px] bg-primary/[0.05] rounded-full blur-[180px]" />
      </div>

      <div className="container-custom relative z-10">
        
        {/* Top Section: Brand & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 lg:mb-32">
          
          {/* Logo & Philosophy */}
          <div className="footer-reveal lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-4 group">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center text-white transition-all duration-1000 group-hover:bg-primary group-hover:rotate-12 shadow-3xl">
                  <Globe className="w-6 h-6 lg:w-9 lg:h-9" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-black text-2xl lg:text-4xl tracking-tightest leading-none text-white">JADE</span>
                  <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.5em] text-primary leading-none mt-1.5 lg:mt-2">Tours & Travel</span>
                </div>
              </Link>
              <p className="text-gray-500 text-[14px] lg:text-lg leading-relaxed font-medium max-w-sm tracking-tight opacity-90">
                Jade Tours & Travel is your dedicated partner for smooth, memorable, and stress-free global exploration.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-[#020504] transition-all duration-500 active:scale-90"
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12">
            
            <div className="footer-reveal space-y-6">
              <h4 className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">Quick Links</h4>
              <ul className="space-y-3.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 hover:text-white transition-all text-[13px] lg:text-base flex items-center gap-0 group font-bold tracking-tight uppercase">
                      <span className="w-0 h-[1px] bg-primary group-hover:w-4 group-hover:mr-3 transition-all duration-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-reveal space-y-6">
              <h4 className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">Services</h4>
              <ul className="space-y-3.5">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 hover:text-white transition-all text-[13px] lg:text-base flex items-center gap-0 group font-bold tracking-tight uppercase">
                      <span className="w-0 h-[1px] bg-primary group-hover:w-4 group-hover:mr-3 transition-all duration-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-reveal space-y-8">
              <div className="space-y-6">
                <h4 className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">Contact</h4>
                <div className="space-y-4">
                  <button 
                    onClick={() => window.open('https://wa.me/919825438324', '_blank')}
                    className="flex items-center gap-3 text-white hover:text-primary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary border border-white/5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-[13px] lg:text-base font-black tracking-tight">+91 98254 38324</span>
                  </button>
                  <Link href="mailto:hello@jadetravels.co.in" className="flex items-center gap-3 text-white hover:text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary border border-white/5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-[13px] lg:text-base font-black tracking-tight">hello@jadetravels.co.in</span>
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">Business Hours</h4>
                <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-primary border border-white/5">
                      <Clock className="w-4 h-4" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[13px] lg:text-base font-black tracking-tight">Mon - Sat</span>
                      <span className="text-[11px] lg:text-sm text-gray-500 font-bold">10:00 AM - 7:00 PM</span>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Middle Section: Address */}
        <div className="footer-reveal border-t border-white/5 py-10 flex flex-col md:flex-row justify-between items-start gap-8">
           <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                 <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-primary/60">Registered Office</h4>
                 <p className="text-gray-400 text-[13px] lg:text-lg leading-relaxed font-bold tracking-tight">
                    1st Floor, City Center, MG Road, Ahmedabad, Gujarat, India 380001
                 </p>
              </div>
           </div>
           
           <div className="hidden lg:flex items-center gap-4 bg-white/[0.02] px-8 py-5 rounded-3xl border border-white/5">
              <Sparkles className="w-5 h-5 text-accent-gold" />
              <p className="text-[11px] lg:text-[13px] font-black uppercase tracking-[0.3em] text-white/60">
                 Personalized travel experiences <span className="text-white">with reliable support.</span>
              </p>
           </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="footer-reveal pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity duration-1000">
          <div className="flex items-center gap-3">
             <Shield className="w-4 h-4" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em]">
               © 2026 JADE TOURS & TRAVELS.
             </p>
          </div>
          <div className="flex items-center gap-6 lg:gap-10">
            {legalLinks.map(link => (
              <Link key={link.name} href={link.href} className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-primary transition-colors">{link.name}</Link>
            ))}
          </div>
          <MagneticButton 
            onClick={scrollToTop}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-all duration-700 shadow-3xl group active:scale-90"
          >
            <ChevronUp className="w-5 h-5 lg:w-6 lg:h-6 group-hover:-translate-y-1 transition-transform" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
