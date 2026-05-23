"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Sparkles, Globe } from "lucide-react";

export default function Preloader({ onLoadingComplete }: { onLoadingComplete?: () => void }) {
  const [loading, setLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          onLoadingComplete?.();
        }
      });

      tl.fromTo(".loader-logo", 
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".loader-text-line", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" }, "-=0.4"
      )
      .to(".loader-progress", 
        { scaleX: 1, duration: 1, ease: "power2.inOut" }
      )
      .to(".loader-content", {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power3.in"
      }, "+=0.1")
      .to(preloaderRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power4.inOut"
      });
    }, preloaderRef);

    return () => ctx.revert();
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-[2000] bg-[#050807] flex items-center justify-center overflow-hidden"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          {/* Subtle Background Ambience */}
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[160px]" />
          </div>

          <div className="loader-content relative flex flex-col items-center">
            
            {/* Elite Icon Module */}
            <div className="loader-logo mb-12 relative">
               <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-[24px] lg:rounded-[36px] bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary relative overflow-hidden">
                  <Globe className="w-10 h-10 lg:w-14 lg:h-14 animate-spin-slow" strokeWidth={1.2} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
               </div>
               <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-accent-gold animate-pulse" />
            </div>

            <div ref={textRef} className="flex flex-col items-center space-y-6">
              <div className="overflow-hidden">
                <h1 className="loader-text-line font-sans font-black text-4xl md:text-7xl lg:text-[84px] tracking-tightest text-white leading-none uppercase">
                  JADE <span className="text-primary italic font-serif font-light lowercase">Tours & Travel</span>
                </h1>
              </div>
              
              <div className="w-64 lg:w-80 h-[1px] bg-white/5 relative overflow-hidden mt-4">
                <div className="loader-progress absolute inset-0 bg-primary origin-left scale-x-0" />
              </div>
              
              <div className="overflow-hidden">
                <p className="loader-text-line text-[10px] lg:text-[12px] uppercase tracking-[0.8em] text-white/30 font-black font-sans text-center">
                  Perfect Trips Every Time
                </p>
              </div>
            </div>

            {/* Cinematic Overlay Detail */}
            <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 opacity-20 whitespace-nowrap select-none pointer-events-none">
               <span className="font-serif italic text-[180px] lg:text-[240px] text-white/[0.02]">Journeys</span>
            </div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
