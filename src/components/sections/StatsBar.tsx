"use client";
import { useEffect, useRef } from "react";
import { Plane, Globe, Clock, Users, Headphones } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: "Years of Experience", value: "5+", icon: Clock },
  { label: "Happy Travelers", value: "1000+", icon: Users },
  { label: "Domestic & International Tours", value: "", icon: Globe },
  { label: "Fast & Reliable Flight Bookings", value: "", icon: Plane },
  { label: "Personalized Travel Assistance", value: "", icon: Headphones },
];

export default function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".stat-item", 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-30 py-6 lg:py-10 bg-white overflow-hidden border-b border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 lg:gap-y-8 gap-x-2 sm:gap-x-4 items-start justify-items-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item flex flex-col items-center text-center group w-full px-1 relative"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 mb-3 lg:mb-5 flex items-center justify-center text-[#2E7D32] bg-[#2E7D32]/5 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:bg-[#2E7D32] group-hover:text-white shadow-sm border border-[#2E7D32]/10">
                <stat.icon className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col space-y-1.5">
                {stat.value && (
                  <span className="text-2xl lg:text-3xl font-black text-gray-900 leading-none tracking-tight">
                    {stat.value}
                  </span>
                )}
                <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 max-w-[150px] leading-tight mx-auto">
                  {stat.label.split(' ').map((word, index) => (
                    <span key={index} className="inline-block mx-0.5">{word}</span>
                  ))}
                </span>
              </div>
              
              {/* Vertical Divider for desktop */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1px] h-14 bg-gray-100/60" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
