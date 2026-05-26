"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Award, Globe2, Lock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const partners = [
  { name: "Emirates", code: "EK", location: "Dubai" },
  { name: "Qatar Airways", code: "QR", location: "Doha" },
  { name: "Singapore Air", code: "SQ", location: "Singapore" },
  { name: "Vistara", code: "UK", location: "Delhi" },
  { name: "Air India", code: "AI", location: "Mumbai" },
];

const trustFeatures = [
  {
    title: "Bank-Level Security",
    desc: "Your data is protected with 256-bit encryption and ISO-certified protocols for absolute peace of mind.",
    icon: Lock,
  },
  {
    title: "15+ Years Excellence",
    desc: "Over a decade of orchestrating complex itineraries for the world's most discerning travelers.",
    icon: Award,
  },
  {
    title: "Verified Global Network",
    desc: "Direct relationships with elite sanctuaries and local fixers across 120+ countries.",
    icon: Globe2,
  }
];

export default function TrustSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline Reveal
      gsap.fromTo(".trust-headline-line", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".trust-headline",
            start: "top 80%",
          }
        }
      );

      // Feature Cards Reveal
      gsap.fromTo(".trust-feature-card", 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".trust-features-grid",
            start: "top 75%",
          }
        }
      );

      // Avatars Entrance
      gsap.fromTo(".trust-avatar", 
        { scale: 0, opacity: 0, x: -20 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".trust-social-badge",
            start: "top 85%",
          }
        }
      );

      // Partners Entrance
      gsap.fromTo(".partner-item", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".partners-layer",
            start: "top 90%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="trust" ref={containerRef} className="relative z-20 py-12 lg:py-16 bg-white overflow-hidden scroll-mt-24">
      {/* Refined Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,rgba(56,142,60,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_90%,rgba(56,142,60,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start mb-8 lg:mb-12">
          
          {/* Left Side: Editorial Content */}
          <div className="space-y-6 lg:space-y-8 lg:sticky lg:top-32">
            <div className="trust-headline space-y-3 lg:space-y-4">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] lg:text-[11px] mb-2 lg:mb-4">
                <span className="w-8 h-[1px] bg-primary/30" />
                Reliability & Excellence
              </div>
              <h2 className="text-[34px] md:text-[48px] lg:text-[60px] xl:text-[72px] font-sans font-black text-gray-950 leading-[0.95] lg:leading-[1] tracking-tightest">
                <span className="block trust-headline-line">A Legacy Of</span>
                <span className="block trust-headline-line text-primary italic font-serif font-light lowercase normal-case py-1">uncompromising</span>
                <span className="block trust-headline-line">Trust.</span>
              </h2>
              <p className="text-[13px] lg:text-xl text-gray-600 leading-relaxed max-w-[540px] font-medium tracking-tight opacity-90">
                At Jade Tours and Travels, we don&apos;t just book trips; we safeguard your most precious memories. Experience the gold standard of travel security and curated excellence.
              </p>
            </div>
            
            {/* Social Proof Badge - Premium Re-design */}
            <div className="trust-social-badge inline-flex items-center gap-4 lg:gap-6 p-1.5 rounded-full lg:rounded-[32px] bg-gray-50/50 border border-gray-100 pr-6 lg:pr-8 group cursor-default shadow-sm hover:shadow-xl transition-all duration-700">
              <div className="flex items-center gap-2 bg-white p-2.5 lg:p-5 rounded-full lg:rounded-[28px] shadow-sm">
                <div className="flex -space-x-2.5 lg:-space-x-3">
                  {[
                    "1534528741775-53994a69daeb",
                    "1507003211169-0a1dd7228f2d",
                    "1500648767791-00dcc994a43e",
                    "1494790108377-be9c29b29330"
                  ].map((id, i) => (
                    <div key={i} className="trust-avatar w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative shadow-sm group-hover:translate-y-[-5px] transition-transform duration-500" style={{ transitionDelay: `${i * 50}ms` }}>
                      <Image 
                        src={`https://images.unsplash.com/photo-${id}?q=80&w=100&h=100&auto=format&fit=crop&crop=faces`} 
                        alt="Jade Happy Client"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col ml-1 lg:ml-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 text-accent-gold fill-accent-gold" />
                    ))}
                  </div>
                  <span className="text-[9px] font-black text-gray-900 tracking-tighter mt-0.5">5.0 SCORE</span>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] lg:text-[13px] font-bold text-gray-950 uppercase tracking-[0.15em] lg:tracking-[0.2em] leading-tight">
                  Trusted by 5,000+ <br className="hidden sm:block" /> Global Travelers
                </p>
              </div>
            </div>

            {/* Verification Checkmarks */}
            <div className="flex flex-wrap gap-x-6 lg:gap-x-8 gap-y-3 pt-2 opacity-70">
              {['IATA Certified', 'ASTA Member', 'Safe Travels Protocol'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Luxury Feature Cards */}
          <div className="trust-features-grid grid gap-4 lg:gap-8 w-full">
            {trustFeatures.map((feature, i) => (
              <div
                key={feature.title}
                className={`trust-feature-card p-6 lg:p-10 rounded-[28px] lg:rounded-[48px] border transition-all duration-1000 group flex flex-col sm:flex-row items-start gap-5 lg:gap-10 w-full overflow-hidden relative ${
                  i === 0 
                    ? 'bg-primary text-white shadow-[0_40px_100px_rgba(56,142,60,0.25)] border-primary' 
                    : 'bg-white text-gray-950 border-gray-100 shadow-[0_15px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] hover:border-primary/20'
                }`}
              >
                {/* Decorative background glow for cards */}
                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${i === 0 ? 'bg-white' : 'bg-primary'}`} />
                
                <div className={`w-12 h-12 lg:w-20 lg:h-20 rounded-xl lg:rounded-[32px] flex items-center justify-center shrink-0 shadow-lg group-hover:rotate-6 transition-all duration-1000 group-hover:scale-110 ${
                  i === 0 ? 'bg-white/20 text-white' : 'bg-primary/5 text-primary'
                }`}>
                  <feature.icon className="w-6 h-6 lg:w-10 lg:h-10" />
                </div>
                <div className="space-y-2 lg:space-y-3 relative z-10">
                  <h3 className="text-lg lg:text-2xl font-black tracking-tight leading-none uppercase">
                    {feature.title}
                  </h3>
                  <p className={`text-[13px] lg:text-lg leading-relaxed font-medium tracking-tight ${i === 0 ? 'text-white/80' : 'text-gray-500'}`}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition Layer - Redesigned Logo Garden */}
        <div className="partners-layer pt-12 lg:pt-16 border-t border-gray-100/60 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 lg:px-8">
             <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.4em] lg:tracking-[0.6em] text-gray-400 whitespace-nowrap">
              Authorized Travel Partner
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24 gap-y-10 lg:gap-y-24">
            {partners.map((partner) => (
              <div key={partner.name} className="partner-item flex flex-col items-center group cursor-default min-w-[100px] sm:min-w-auto">
                <div className="relative text-center">
                  <span className="absolute -top-6 lg:-top-10 left-1/2 -translate-x-1/2 font-serif font-black text-3xl lg:text-8xl text-gray-900/[0.03] group-hover:text-primary/[0.05] transition-all duration-1000 tracking-tighter pointer-events-none select-none">
                    {partner.code}
                  </span>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="font-sans font-black text-base lg:text-3xl text-gray-950 tracking-tightest uppercase group-hover:text-primary transition-colors duration-700">
                      {partner.name}
                    </span>
                    <span className="h-[1.5px] lg:h-[2px] w-0 bg-primary transition-all duration-700 group-hover:w-full mt-1 lg:mt-2" />
                    <span className="text-[7px] lg:text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] lg:tracking-[0.3em] mt-2 lg:mt-3 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:translate-y-0 translate-y-2">
                      {partner.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
