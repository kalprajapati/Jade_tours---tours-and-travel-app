"use client";
import { useEffect, useRef } from "react";
import { CheckCircle2, Shield, Globe2, Compass, Plane } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  return (
    <section id="about" ref={containerRef} className="py-12 lg:py-24 bg-white overflow-hidden scroll-mt-24">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
          
          {/* Images Side */}
          <div className="about-images w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px]">
            {/* Pier Image */}
            <div className="absolute top-0 left-0 w-[85%] h-[80%] rounded-[40px] overflow-hidden shadow-2xl z-0 border-[12px] border-white">
              <Image 
                src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop" 
                alt="Beautiful Destination" 
                fill 
                unoptimized
                className="object-cover" 
              />
            </div>
            {/* Plane Window Image */}
            <div className="absolute bottom-5 right-5 w-[55%] h-[70%] rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] z-10 border-[12px] border-white rotate-6 hover:rotate-0 transition-transform duration-700">
              <Image 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1200&auto=format&fit=crop" 
                alt="Travel View" 
                fill 
                unoptimized
                className="object-cover" 
              />
            </div>
            
            {/* Decorative Watermark Stamp */}
            <div className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.08] pointer-events-none z-0">
               <div className="relative w-full h-full">
                  <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_20s_linear_infinite]">
                    <path 
                      id="curve" 
                      fill="transparent" 
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                    <text className="text-[10px] font-black uppercase tracking-[0.2em] fill-gray-900">
                      <textPath href="#curve">Explore the World with Jade Tours • </textPath>
                    </text>
                  </svg>
                  <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-gray-900 rotate-45" strokeWidth={1} />
                  {/* Dashed trail */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 200 200">
                     <path 
                       d="M 180,50 Q 220,100 180,150" 
                       stroke="currentColor" 
                       strokeWidth="1" 
                       strokeDasharray="4 4" 
                       fill="none" 
                       className="text-gray-900 opacity-20"
                     />
                  </svg>
               </div>
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-20 left-0 -translate-x-1/2 bg-[#002B1B] p-6 rounded-[24px] shadow-3xl z-20 border border-white/10 hidden md:flex flex-col items-center justify-center text-center">
              <p className="text-white/60 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Trusted by</p>
              <p className="text-4xl font-black text-white leading-none mb-0.5">1000+</p>
              <p className="text-white/80 text-[10px] font-bold uppercase">Travelers</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="about-content w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#2E7D32] font-black uppercase tracking-[0.3em] text-sm">
                <div className="w-12 h-[2px] bg-[#2E7D32]" />
                About Us
              </div>
              <h2 className="text-4xl lg:text-6xl font-sans font-black text-gray-900 leading-[1.1] tracking-tight">
                Crafting Journeys, <br />
                Creating Memories
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-medium">
                At Jade Tours & Travels, we believe every journey should be smooth, memorable, and stress-free. With our personalized approach, competitive prices, and 24/7 support, we turn your travel dreams into reality.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "Customized Holiday Packages",
                "Best Deals on Flights & Hotels",
                "Visa & Documentation Assistance",
                "End-to-End Travel Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32] shrink-0 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-300">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-gray-900 font-bold text-base lg:text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button 
                onClick={() => window.open('https://wa.me/919825438324', '_blank')}
                className="px-12 py-5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-full transition-all shadow-[0_20px_40px_rgba(46,125,50,0.25)] uppercase tracking-[0.2em] text-xs"
              >
                Plan Your Journey
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
