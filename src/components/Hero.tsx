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
      className="relative min-h-screen lg:min-h-screen h-auto flex flex-col justify-start lg:justify-center pt-32 lg:pt-28 overflow-hidden text-white"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2400&auto=format&fit=crop" 
          alt="Airport Lounge"
          fill
          className="hero-bg object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      <div className="container-custom relative z-10 pt-10 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 items-center">
          
          {/* Left Side Content */}
          <div className="max-w-3xl">
            <p className="hero-script font-script text-xl md:text-2xl text-[#FFD700] mb-4 drop-shadow-md">
              Your Journey, Our Priority
            </p>
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-sans font-black leading-[1.1] mb-6 drop-shadow-lg">
              Your Trusted Partner for <br className="hidden md:block" />
              Flights, Holidays & <br className="hidden md:block" />
              Seamless Travel
            </h1>
            <div className="w-16 h-1 bg-[#FFD700] mb-6" />
            <p className="hero-desc text-base lg:text-lg text-white/90 mb-8 max-w-xl leading-relaxed font-medium">
              From air ticketing and visa assistance to customized domestic and international tours — Jade Tours & Travels makes every journey smooth, affordable, and stress-free.
            </p>
            
            <div className="hero-btns flex flex-wrap gap-4 sm:gap-6">
              <button 
                onClick={() => handleScrollTo("destinations")}
                className="px-10 py-5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] uppercase tracking-widest text-[11px] active:scale-95 group"
              >
                Plan Your Trip <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => window.open('https://wa.me/919825438324', '_blank')}
                className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-black rounded-full transition-all active:scale-95 uppercase tracking-widest text-[11px]"
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

      {/* Floating Service Bar */}
      <div className="hero-floating-bar relative lg:absolute bottom-0 lg:bottom-6 left-0 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 z-20 mt-4 lg:mt-0">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] sm:rounded-[32px] p-4 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
          {[
            { label: "Air Ticketing", icon: Plane },
            { label: "International Tours", icon: Globe },
            { label: "Visa Assistance", icon: FileText },
            { label: "24/7 Travel Support", icon: Headphones },
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 text-center md:text-left group cursor-default">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-inner">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-[10px] sm:text-base font-bold uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
