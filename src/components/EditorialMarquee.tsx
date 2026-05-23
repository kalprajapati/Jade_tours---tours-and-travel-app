"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const marqueeImages = [
  "https://images.unsplash.com/photo-1544016768-982d1554f0b9?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540910419892-4a39d20b2944?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop",
];

export default function EditorialMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Background Watermark Animation
      gsap.to(watermarkRef.current, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        }
      });

      // Tape 1: Moving Right to Left
      const t1 = gsap.to(".tape-inner-1", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      });

      // Tape 2: Moving Left to Right
      const t2 = gsap.to(".tape-inner-2", {
        xPercent: 50,
        repeat: -1,
        duration: 25,
        ease: "none",
      });

      // Scroll reactive speed
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 400);
          gsap.to([t1, t2], {
            timeScale: 1 + velocity,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative z-20 py-16 md:py-32 overflow-hidden bg-[#0B1310] scroll-mt-24"
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] bg-noise" />

      {/* Massive Background Watermark */}
      <div 
        ref={watermarkRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.02] select-none z-0"
      >
        <span className="font-serif text-[40vw] leading-none italic uppercase">Experience</span>
      </div>

      <div className="flex flex-col gap-10 md:gap-16 relative z-10">
        
        {/* Tape 1: The Narrative */}
        <div className="relative rotate-[-1deg] scale-105">
          <div className="flex whitespace-nowrap py-4 md:py-8 bg-[#C1A67B]/5 border-y border-[#F2EFE9]/10 backdrop-blur-sm overflow-hidden">
            <div className="tape-inner-1 flex items-center gap-10 md:gap-16 px-10 will-change-transform">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-10 md:gap-16">
                  <MarqueeChunk text="Custom Travel" />
                  <MarqueeImage src={marqueeImages[0]} />
                  <MarqueeChunk text="Expert Planning" italic />
                  <MarqueeImage src={marqueeImages[1]} />
                  <MarqueeChunk text="Global Access" />
                  <MarqueeImage src={marqueeImages[2]} />
                  <MarqueeChunk text="Amazing Trips" italic />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tape 2: The Capabilities */}
        <div className="relative rotate-[1deg] scale-105">
          <div className="flex whitespace-nowrap py-4 md:py-8 bg-white/5 border-y border-[#F2EFE9]/10 backdrop-blur-md overflow-hidden">
            <div className="tape-inner-2 flex items-center gap-10 md:gap-16 px-10 -translate-x-1/2 will-change-transform">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-10 md:gap-16">
                  <MarqueeChunk text="Flight Booking" outline />
                  <MarqueeImage src={marqueeImages[3]} rounded />
                  <MarqueeChunk text="Luxury Stays" />
                  <MarqueeImage src={marqueeImages[0]} rounded />
                  <MarqueeChunk text="24/7 Support" outline italic />
                  <MarqueeImage src={marqueeImages[1]} rounded />
                  <MarqueeChunk text="New Adventures" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Decorative Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0B1310] via-transparent to-[#0B1310] z-20" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0B1310] via-transparent to-[#0B1310] z-20 opacity-50" />
    </section>
  );
}

function MarqueeChunk({ text, italic = false, outline = false }: { text: string; italic?: boolean; outline?: boolean }) {
  return (
    <span className={`
      font-serif text-3xl md:text-5xl lg:text-6xl tracking-tightest px-3
      ${italic ? "italic" : ""}
      ${outline 
        ? "text-transparent stroke-text opacity-40" 
        : "text-[#F2EFE9]"
      }
    `}>
      {text}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px #F2EFE9;
        }
      `}</style>
    </span>
  );
}

function MarqueeImage({ src, rounded = false }: { src: string; rounded?: boolean }) {
  return (
    <div className={`
      relative w-16 h-16 md:w-24 md:h-24 overflow-hidden border border-[#F2EFE9]/20 shadow-2xl
      ${rounded ? "rounded-full" : "rounded-2xl rotate-3"}
    `}>
      <Image 
        src={src} 
        alt="Travel Detail" 
        fill 
        className="object-cover"
      />
    </div>
  );
}
