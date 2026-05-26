"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, MapPin, ArrowRight, Star, Plane, Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const destinations = [
  { 
    name: "Dubai", 
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    price: "₹24,999"
  },
  { 
    name: "Bali", 
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    price: "₹29,999"
  },
  { 
    name: "Thailand", 
    image: "/assets/thailand.png",
    price: "₹19,999"
  },
  { 
    name: "Singapore", 
    image: "/assets/singapore.png",
    price: "₹28,999"
  },
  { 
    name: "Maldives", 
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
    price: "₹38,999"
  },
  { 
    name: "Kashmir", 
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop",
    price: "₹15,999"
  },
  { 
    name: "Europe", 
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
    price: "₹69,999"
  },
];

export default function PopularDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".dest-card", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dest-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleDestinationClick = (dest: typeof destinations[0]) => {
    const message = encodeURIComponent(`Hello Jade Tours & Travel! I am interested in the ${dest.name} package.`);
    window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
  };

  return (
    <section id="destinations" ref={containerRef} className="py-16 lg:py-24 bg-[#FDFCF7]/30 scroll-mt-24">
      <div className="container-custom">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 lg:mb-16 gap-6">
          <div className="flex items-center gap-4 lg:gap-6">
            <Sparkles className="w-8 h-8 lg:w-10 lg:h-10 text-[#FFD700] fill-[#FFD700]/10" />
            <h2 className="text-4xl lg:text-7xl font-sans font-black text-gray-900 tracking-tighter leading-tight uppercase">
              Popular Destinations
            </h2>
          </div>
          <MagneticButton 
            onClick={() => window.open('https://wa.me/919825438324', '_blank')}
            className="px-10 py-4 border-2 border-gray-100 hover:border-[#2E7D32] hover:text-[#2E7D32] text-gray-500 font-bold rounded-full transition-all text-xs tracking-[0.2em] uppercase bg-white shadow-sm hover:shadow-xl active:scale-95"
          >
            Explore All Destinations
          </MagneticButton>
        </div>

        {/* Destination Cards */}
        <div className="dest-grid flex lg:grid lg:grid-cols-7 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none no-scrollbar gap-5 lg:gap-8 -mx-5 px-5 lg:mx-0 lg:px-0 pb-8 lg:pb-0">
          {destinations.map((dest, i) => (
            <div
              key={i}
              onClick={() => handleDestinationClick(dest)}
              className="dest-card group cursor-pointer flex flex-col flex-shrink-0 w-[240px] sm:w-[300px] lg:w-auto snap-center"
            >
              <div className="relative aspect-[3/4.2] rounded-[40px] lg:rounded-[48px] overflow-hidden mb-6 lg:mb-8 shadow-[0_15px_35px_rgba(0,0,0,0.04)] group-hover:shadow-[0_40px_80px_rgba(46,125,50,0.15)] lg:group-hover:-translate-y-3 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95">
                <Image 
                  src={dest.image} 
                  alt={dest.name} 
                  fill 
                  unoptimized
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              <div className="text-center space-y-1.5 lg:space-y-2 group-hover:-translate-y-1 transition-transform duration-500">
                <h3 className="text-xl lg:text-3xl font-black text-gray-900 tracking-tight group-hover:text-[#2E7D32] transition-colors duration-500">{dest.name}</h3>
                <p className="text-[9px] lg:text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">Starting from <span className="text-gray-900">{dest.price}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
