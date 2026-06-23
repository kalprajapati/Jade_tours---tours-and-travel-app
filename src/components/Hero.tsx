"use client";
import { useEffect, useRef } from "react";
import { 
  ArrowRight, ArrowUpRight, Plane, Globe, FileText, Headphones 
} from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";

import BookingWidget from "@/components/ui/BookingWidget";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
      
      tl.fromTo(".hero-script", { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.5 })
        .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=0.7")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.7")
        .fromTo(".hero-btns", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.7")
        .fromTo(".hero-widget", { opacity: 0, x: 40 }, { opacity: 1, x: 0 }, "-=0.8")
        .fromTo(".hero-floating-bar", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, "-=0.5");

      gsap.to(".hero-bg", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.5 });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen lg:min-h-screen h-auto flex flex-col justify-start lg:justify-center pt-32 lg:pt-28 overflow-hidden text-white mb-12 lg:mb-24"
    >
      {/* Cinematic Background - Reference Exact Aesthetic */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2400&auto=format&fit=crop" 
          alt="Travel Silhouettes"
          fill
          className="hero-bg object-cover brightness-[0.55]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="container-custom relative z-10 pt-10 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center">
          
          {/* Left Side Content */}
          <div className="max-w-3xl">
            <p className="hero-script font-serif italic text-2xl md:text-3xl text-[#C1A67B] mb-5 drop-shadow-md">
              Your Journey, Our Priority
            </p>
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-sans font-black leading-[1.05] mb-8 drop-shadow-lg tracking-tight">
              Your Trusted Partner for <br className="hidden md:block" />
              Flights, Holidays & <br className="hidden md:block" />
              Seamless Travel
            </h1>
            <div className="w-16 h-1 bg-[#C1A67B] mb-8" />
            <p className="hero-desc text-[16px] lg:text-xl text-white/90 mb-10 max-w-xl leading-relaxed font-medium">
              From air ticketing and visa assistance to customized domestic and international tours — Jade Tours & Travels makes every journey smooth, affordable, and stress-free.
            </p>
            
            <div className="hero-btns flex flex-wrap gap-4 sm:gap-6">
              <button 
                onClick={() => handleScrollTo("destinations")}
                className="px-10 py-5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(46,125,50,0.3)] uppercase tracking-widest text-xs active:scale-95 group"
              >
                Plan Your Trip <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => window.open('https://wa.me/919825438324', '_blank')}
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white font-black rounded-full transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                Get Flight Assistance
              </button>
            </div>
          </div>

          {/* Right Side Widget */}
          <div className="hero-widget hidden lg:block">
            <BookingWidget />
          </div>
        </div>
      </div>

      {/* Mobile Widget - Visible only on mobile below content */}
      <div className="container-custom lg:hidden relative z-10 pb-12">
         <BookingWidget />
      </div>

      {/* Floating Service Bar - High Fidelity Pill Design */}
      <div className="hero-floating-bar relative lg:mt-0 bottom-0 lg:bottom-10 left-0  lg:-translate-x-1/2 w-full lg:w-[95%] max-w-[1600px] px-4 sm:px-6 lg:px-12 z-20 mt-12 lg:mt-0">
        <div className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-4xl lg:rounded-full p-4 lg:p-7  lg:flex lg:items-center lg:justify-between gap-12 lg:gap-4 shadow-2xl flex-col lg:flex-row ">
          {[
            { label: "Air Ticketing", icon: Plane },
            { label: "International Tours", icon: Globe },
            { label: "Visa Assistance", icon: FileText },
            { label: "24/7 Travel Support", icon: Headphones },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 lg:gap-5 px-2 lg:px-0 group cursor-default lg:flex-1 lg:justify-center">
              <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-inner shrink-0">
                <item.icon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              </div>
              <span className="text-[10px] lg:text-[14px] font-black uppercase tracking-[0.15em] lg:tracking-[0.2em] text-white/90 group-hover:text-white transition-colors whitespace-nowrap">{item.label}</span>
              
              {/* Vertical Divider for desktop (excluding last item) */}
              {i < 3 && <div className="hidden lg:block h-10 w-[1px] bg-white/10 ml-auto" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
