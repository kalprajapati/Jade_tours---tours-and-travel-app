"use client";
import { useEffect, useRef } from "react";
import { Plane, Globe, Users, Building, Map, CheckCircle2, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const flightFeatures = [
  { 
    title: "Domestic Flights", 
    desc: "Best fares for all major Indian airlines with instant confirmation.", 
    icon: Plane 
  },
  { 
    title: "International Flights", 
    desc: "Global connectivity with premium carriers and special discounted rates.", 
    icon: Globe 
  },
  { 
    title: "Group Bookings", 
    desc: "Specialized handling for families, friends, or large groups traveling together.", 
    icon: Users 
  },
  { 
    title: "Corporate Travel", 
    desc: "Efficient travel management solutions for businesses and professionals.", 
    icon: Building 
  },
  { 
    title: "Best Route Assistance", 
    desc: "Expert guidance to find the quickest and most comfortable flight paths.", 
    icon: Map 
  }
];

const airlines = [
  "Emirates", "Qatar Airways", "Singapore Airlines", "Air India", "Vistara", "IndiGo"
];

export default function AirTicketing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(".ticketing-headline-line", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".ticketing-header",
            start: "top 85%",
          }
        }
      );

      // Feature items reveal
      gsap.fromTo(".flight-feature-item", 
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".flight-features-list",
            start: "top 80%",
          }
        }
      );

      // Visual element reveal
      gsap.fromTo(".ticketing-visual", 
        { opacity: 0, scale: 0.9, rotate: -5 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".ticketing-visual",
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInquiry = () => {
    const message = encodeURIComponent("Hello Jade Tours & Travel! I am interested in flight booking assistance.");
    window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
  };

  return (
    <section id="air-ticketing" ref={containerRef} className="py-12 lg:py-32 bg-[#F9FBFA] overflow-hidden relative border-t border-gray-100 scroll-mt-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_10%,rgba(56,142,60,0.02),transparent_50%)] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Content Side */}
          <div className="space-y-10 lg:space-y-16">
            <div className="ticketing-header space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] lg:text-[11px]">
                <span className="w-8 h-[1px] bg-primary/30" />
                Specialized Service
              </div>
              <h2 className="text-[34px] md:text-[52px] lg:text-[68px] font-sans font-black text-gray-950 leading-[0.95] tracking-tightest uppercase">
                <span className="block ticketing-headline-line">Fast & Reliable</span>
                <span className="block ticketing-headline-line text-primary italic font-serif font-light lowercase normal-case py-1">flight booking</span>
                <span className="block ticketing-headline-line">Assistance.</span>
              </h2>
              <p className="text-[14px] lg:text-[18px] text-gray-500 leading-relaxed max-w-xl font-medium tracking-tight">
                Skip the complex online portals. Our experts find the best routes and prices for your specific needs, ensuring a seamless booking experience from takeoff to landing.
              </p>
            </div>

            <div className="flight-features-list grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 lg:gap-y-10">
              {flightFeatures.map((feature, i) => (
                <div key={i} className="flight-feature-item flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans font-black text-sm lg:text-base text-gray-950 uppercase leading-none">{feature.title}</h3>
                    <p className="text-[11px] lg:text-sm text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-8">
              <MagneticButton 
                onClick={handleInquiry}
                className="px-10 py-5 lg:px-14 lg:py-6 bg-[#050807] hover:bg-primary text-white font-black rounded-full shadow-2xl transition-all text-[11px] lg:text-xs uppercase tracking-[0.4em] relative overflow-hidden group active:scale-95"
              >
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">Inquire Now</span>
              </MagneticButton>
              
              <div className="flex items-center gap-3">
                 <CheckCircle2 className="w-4 h-4 text-primary" />
                 <span className="text-[9px] lg:text-[11px] font-bold text-gray-400 uppercase tracking-widest">Instant Ticketing Available</span>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div className="ticketing-visual relative aspect-square lg:aspect-[4/5] rounded-[32px] lg:rounded-[64px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white">
              <Image 
                src="/assets/airplane-wings.png" 
                alt="Modern Aircraft Wing" 
                fill 
                className="object-cover brightness-90 transition-transform duration-[6s] hover:scale-110" 
              />
              
              {/* Premium Overlay Info */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white shadow-2xl space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Authorized Partners</p>
                  <div className="grid grid-cols-2 gap-4 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000">
                    {airlines.map((airline) => (
                      <div key={airline} className="text-[11px] lg:text-[13px] font-black text-gray-950 uppercase tracking-tighter">
                        {airline}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gray-100" />
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Global Coverage</span>
                      <span className="text-xl lg:text-2xl font-black text-gray-950 tracking-tightest">150+ Airlines</span>
                   </div>
                   <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Plane className="w-5 h-5 lg:w-6 lg:h-6" />
                   </div>
                </div>
              </div>
            </div>

            {/* Floating Accents */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -z-10 animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-gold/5 rounded-full blur-[80px] -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
