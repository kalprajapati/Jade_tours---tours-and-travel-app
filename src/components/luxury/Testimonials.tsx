"use client";
import { useEffect, useRef } from "react";
import { Star, Sparkles } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "Jade Tours made our Dubai trip absolutely amazing. Flights, hotel and visa — everything was handled perfectly!",
    author: "Neha & Rohit",
    destination: "Dubai Trip",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
  },
  {
    quote: "Very professional team with excellent support. Best prices and hassle-free service. Highly recommended!",
    author: "Ankit Sharma",
    destination: "Thailand Trip",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    quote: "Our Europe vacation was a dream come true. Thank you Jade Tours for such a wonderful experience!",
    author: "Priya Mehra",
    destination: "Europe Trip",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testi-card", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testi-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={containerRef} className="py-16 lg:py-24 bg-[#FFFFFF] scroll-mt-24">
      <div className="container-custom">

        {/* Title */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-sans font-black text-gray-900 text-center tracking-tight leading-tight">
            What Our Travelers Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="testi-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14">
          {testimonials.map((testi, i) => (
            <div
              key={i}
              className="testi-card bg-white p-8 lg:p-14 rounded-[40px] lg:rounded-[48px] shadow-[0_15px_45px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center text-center space-y-8 lg:space-y-10 hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 group active:scale-[0.98]"
            >
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-xl ring-4 ring-gray-50">
                <Image 
                  src={testi.image} 
                  alt={testi.author} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="space-y-3 lg:space-y-4">
                <div className="space-y-1.5 lg:space-y-2">
                  <h3 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight group-hover:text-[#2E7D32] transition-colors duration-500">{testi.author}</h3>
                  <p className="text-[10px] lg:text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">{testi.destination}</p>
                </div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 font-medium leading-[1.6] lg:leading-[1.8] text-base lg:text-[17px] px-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                &ldquo;{testi.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-10 lg:mt-12">
           <div className="w-2 h-2 rounded-full bg-[#2E7D32]" />
           <div className="w-2 h-2 rounded-full bg-[#2E7D32]/20" />
           <div className="w-2 h-2 rounded-full bg-[#2E7D32]/20" />
        </div>

        {/* Trusted By Bar */}
        <div className="mt-20 lg:mt-32 flex flex-wrap justify-center items-center gap-8 lg:gap-24 px-4">
           <div className="flex items-center gap-3 opacity-40">
              <Star className="w-3.5 h-3.5 fill-gray-950 text-gray-950" />
              <span className="text-[10px] lg:text-[11px] font-black text-gray-950 uppercase tracking-[0.3em]">GOOGLE VERIFIED</span>
           </div>
           <div className="flex items-center gap-3 lg:gap-4">
              <span className="text-2xl lg:text-4xl font-black text-gray-900 tracking-tighter">4.9/5</span>
              <span className="text-[9px] lg:text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none text-left">AVG<br/>RATING</span>
           </div>
           <div className="flex items-center gap-3 lg:gap-4">
              <span className="text-2xl lg:text-4xl font-black text-gray-900 tracking-tighter">2300+</span>
              <span className="text-[9px] lg:text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none text-left">TRUSTED<br/>REVIEWS</span>
           </div>
        </div>
      </div>
    </section>
  );
}
