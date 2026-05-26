"use client";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Plane } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-images", 
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".about-images",
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(".about-content", 
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!mounted) return null;

  return (
    <section id="about" ref={containerRef} className="py-16 lg:py-28 bg-[#FAF7F2] overflow-hidden scroll-mt-24 relative">
      {/* Decorative Background Patterns - Watermark Stamp */}
      <div className="absolute top-10 right-10 w-64 h-64 lg:w-80 lg:h-80 opacity-[0.15] pointer-events-none z-0">
         <div className="relative w-full h-full">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_40s_linear_infinite]">
              <path id="circlePath" fill="transparent" d="M 100, 100 m -70, 0 a 70,70 0 1,0 140,0 a 70,70 0 1,0 -140,0" />
              <text className="text-[12px] font-black uppercase tracking-[0.3em] fill-gray-950">
                <textPath href="#circlePath">Jade Tours & Travels • Explore the World • </textPath>
              </text>
            </svg>
            <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 text-gray-950 rotate-45" strokeWidth={1.2} />
         </div>
      </div>

      {/* Dashed Line Decor */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[70%] opacity-[0.08] pointer-events-none z-0 hidden lg:block">
         <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
            <path d="M50 100C100 50 200 150 300 100S350 300 250 350S50 250 50 100Z" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-gray-950" />
            <circle cx="150" cy="200" r="40" stroke="currentColor" strokeWidth="1" className="text-gray-950" />
         </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Images Side */}
          <div className="about-images w-full lg:w-1/2 relative h-[450px] lg:h-[620px]">
            {/* Main Image - Resort Pier */}
            <div className="absolute top-0 left-0 w-[88%] h-[85%] rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-2xl z-0">
              <Image 
                src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop" 
                alt="Luxury Resort" 
                fill 
                unoptimized
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* Overlapping Detail Image - Plane Window */}
            <div className="absolute -bottom-6 right-2 lg:-right-10 w-[55%] h-[68%] rounded-[32px] lg:rounded-[48px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.25)] z-10 border-[8px] lg:border-[15px] border-white -rotate-6 hover:rotate-0 transition-transform duration-1000 group">
              <Image 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop" 
                alt="Travel Detail" 
                fill 
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out" 
              />
            </div>

            {/* Experience Badge - Reference Exact Style */}
            <div className="absolute bottom-12 left-0 -translate-x-1/3 bg-[#0B251B] p-6 lg:p-9 rounded-[24px] lg:rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-20 border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-white/60 text-[9px] lg:text-[11px] font-bold uppercase tracking-widest mb-1.5 lg:mb-2">Trusted by</p>
              <p className="text-4xl lg:text-5xl font-black text-white leading-none mb-1 lg:mb-2">1000+</p>
              <p className="text-white/80 text-[10px] lg:text-[12px] font-bold uppercase tracking-tighter">Travelers</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="about-content w-full lg:w-1/2 space-y-8 lg:space-y-12">
            <div className="space-y-5 lg:space-y-6">
              <span className="text-[#C1A67B] font-sans font-bold uppercase tracking-[0.4em] text-[12px] lg:text-[14px]">
                About Us
              </span>
              <h2 className="text-4xl lg:text-[64px] font-serif font-bold text-gray-900 leading-[1.05] tracking-tight">
                Crafting Journeys, <br />
                Creating Memories
              </h2>
              <p className="text-[16px] lg:text-[19px] text-gray-600 leading-relaxed max-w-xl font-medium">
                At Jade Tours & Travels, we believe every journey should be smooth, memorable, and stress-free. With our personalized approach, competitive prices, and 24/7 support, we turn your travel dreams into reality.
              </p>
            </div>

            <div className="grid gap-4 lg:gap-6">
              {[
                "Customized Holiday Packages",
                "Best Deals on Flights & Hotels",
                "Visa & Documentation Assistance",
                "End-to-End Travel Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 lg:gap-5 group">
                  <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-[#004D31] flex items-center justify-center text-white shrink-0 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[3.5px]" />
                  </div>
                  <span className="text-gray-950 font-bold text-[16px] lg:text-[19px] tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
