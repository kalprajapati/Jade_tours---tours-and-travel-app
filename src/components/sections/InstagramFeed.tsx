"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Sparkles, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import { Instagram } from "@/components/ui/InstagramIcon";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const journalEntries = [
  { 
    id: 1,
    title: "Alpine Sanctuary", 
    hook: "Sunrise over the Swiss peaks.",
    location: "Zermatt, Switzerland",
    category: "Seasonal", 
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop", 
    date: "Dec 2025",
    featured: true
  },
  { 
    id: 2,
    title: "Kyoto Rhythms", 
    hook: "Finding peace in ancient alleys.",
    location: "Kyoto, Japan",
    category: "Culture", 
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop", 
    date: "Nov 2025",
    featured: false
  },
  { 
    id: 3,
    title: "Azure Secrets", 
    hook: "Hidden coves you won't find on maps.",
    location: "Amalfi Coast, Italy",
    category: "Coastal", 
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", 
    date: "Oct 2025",
    featured: false
  },
  { 
    id: 4,
    title: "Wild Majesty", 
    hook: "A close encounter with the kings.",
    location: "Maasai Mara, Kenya",
    category: "Adventure", 
    src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop", 
    date: "Sept 2025",
    featured: false
  },
];

export default function InstagramFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline Reveal
      gsap.fromTo(".journal-headline-line", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".journal-header",
            start: "top 85%",
          }
        }
      );

      // Mosaic Reveal
      gsap.fromTo(".journal-item", 
        { scale: 0.9, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".journal-grid",
            start: "top 75%",
          }
        }
      );

      // Parallax Background
      gsap.to(".journal-bg-glow", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stories" ref={containerRef} className="relative py-12 lg:py-28 bg-white overflow-hidden scroll-mt-24">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,rgba(56,142,60,0.02),transparent_60%)] pointer-events-none" />
      <div className="journal-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/[0.01] rounded-full blur-[180px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Editorial Header */}
        <div className="journal-header flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-20 gap-8 lg:gap-12">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.6em] text-[10px] lg:text-[11px] mb-4">
              <span className="w-8 h-[1px] bg-primary/30" />
              Travel Stories
            </div>
            <h2 className="text-[34px] md:text-[52px] lg:text-[68px] xl:text-[80px] font-sans font-black text-gray-950 leading-[0.95] lg:leading-[1] tracking-tightest uppercase">
              <span className="block journal-headline-line">Moments From</span>
              <span className="block journal-headline-line text-primary italic font-serif font-light lowercase normal-case py-1">our</span>
              <span className="block journal-headline-line">Journeys.</span>
            </h2>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-5">
            <div className="flex items-center gap-4 px-6 py-3 bg-white rounded-[24px] border border-gray-100 shadow-lg backdrop-blur-xl">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl lg:text-3xl font-sans font-black text-gray-950 leading-none tracking-tightest">50K+</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Explorers</span>
              </div>
              <div className="w-[1px] h-8 bg-gray-100" />
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xl lg:text-3xl font-sans font-black text-gray-950 leading-none tracking-tightest">4.8</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">ENGAGEMENT</span>
              </div>
            </div>
            <p className="text-[9px] lg:text-[11px] font-bold text-gray-400 uppercase tracking-[0.4em] lg:text-right text-center max-w-[280px]">
              Daily photos from the most beautiful places we visit.
            </p>
            </div>
            </div>
        {/* Mosaic Editorial Grid */}
        <div className="journal-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          
          {/* Master Entry */}
          {journalEntries.filter(e => e.featured).map((item) => (
            <div
              key={item.id}
              className="journal-item lg:col-span-8 group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[700px] rounded-[32px] lg:rounded-[64px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.1)] cursor-pointer active:scale-[0.98]"
            >
              <Image 
                src={item.src} 
                alt={item.title} 
                fill 
                className="object-cover transition-all duration-[4s] ease-out lg:group-hover:scale-105 duration-700"
              />
              
              {/* Complex Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-1000" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[32px] lg:rounded-[64px] z-20 pointer-events-none" />

              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 lg:p-20 z-30 space-y-6 lg:space-y-12">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="h-[1px] w-10 lg:w-20 bg-primary" />
                  <span className="text-white text-[9px] lg:text-[12px] font-black uppercase tracking-[0.4em]">The Cover Story</span>
                </div>
                
                <h3 className="text-2xl lg:text-[64px] font-sans font-black text-white leading-[0.9] tracking-tightest uppercase group-hover:translate-x-4 transition-all duration-1000">
                  {item.title}
                </h3>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-8 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-8 lg:group-hover:translate-y-0 transition-all duration-1000 delay-200">
                  <p className="text-[15px] lg:text-2xl text-white/80 max-w-xl leading-relaxed font-medium tracking-tight italic font-serif">
                    &ldquo;{item.hook}&rdquo;
                  </p>
                  
                  <div className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-950 font-black rounded-full transition-all shadow-3xl lg:hover:bg-primary lg:hover:text-white shrink-0 uppercase tracking-[0.25em] text-[10px]">
                    <span>Read Stories</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Interaction Indicators */}
              <div className="absolute top-6 right-6 lg:top-10 lg:right-10 flex flex-col gap-3 lg:gap-4 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-x-8 group-hover:translate-x-0">
                <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                  <Instagram className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all">
                  <Heart className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
              </div>
            </div>
          ))}

          {/* Supporting Stories Column */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-12">
            {journalEntries.filter(e => !e.featured).map((item) => (
              <div
                key={item.id}
                className="journal-item group relative h-[180px] lg:h-[240px] rounded-[24px] lg:rounded-[48px] overflow-hidden shadow-xl cursor-pointer active:scale-[0.98]"
              >
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-all duration-[3s] ease-out lg:group-hover:scale-110 duration-700"
                />
                
                {/* Compact Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-transparent to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-1000" />
                
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 text-white z-30 space-y-2 lg:space-y-4">
                  <div className="flex items-center gap-2 text-primary text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-700">
                    <MapPin className="w-3 h-3" />
                    {item.location.split(',')[0]}
                  </div>
                  <h4 className="text-[15px] lg:text-3xl font-sans font-black leading-none tracking-tightest uppercase lg:group-hover:text-primary transition-colors duration-700">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Global Social Action */}
        <div className="mt-16 lg:mt-32 flex flex-col items-center text-center space-y-10 lg:space-y-12">
          <div className="relative p-1.5 lg:p-2 bg-gray-50 rounded-[32px] border border-gray-100 shadow-inner">
            <MagneticButton className="px-10 py-5 lg:px-20 lg:py-8 bg-[#050807] hover:bg-primary text-white font-black rounded-[28px] lg:rounded-[40px] flex items-center gap-6 lg:gap-8 transition-all shadow-3xl group text-[11px] lg:text-lg uppercase tracking-[0.2em] relative overflow-hidden active:scale-95">
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10">Get Inspired</span>
              <div className="flex items-center justify-center w-10 h-10 lg:w-16 lg:h-16 rounded-xl lg:rounded-[24px] bg-white/10 group-hover:bg-white/20 transition-all relative z-10">
                <Instagram className="w-5 h-5 lg:w-10 lg:h-10 text-accent-gold" />
              </div>
            </MagneticButton>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] lg:text-[13px] font-black uppercase tracking-[0.5em] text-gray-400">
              Join The Journey <span className="text-primary tracking-[0.2em]">@jade.travels</span>
            </p>
            <div className="flex items-center gap-3 opacity-20">
               {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-950" />)}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
