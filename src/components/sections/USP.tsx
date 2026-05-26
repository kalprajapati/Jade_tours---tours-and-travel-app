"use client";
import { useEffect, useRef } from "react";
import { User, Search, CalendarCheck, Plane, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { 
    number: "01", 
    title: "Share Your Requirement", 
    desc: "Tell us your travel plan and preferences.",
    icon: User,
  },
  { 
    number: "02", 
    title: "Get Customized Options", 
    desc: "We provide the best options for you.",
    icon: Search,
  },
  { 
    number: "03", 
    title: "Confirm Your Booking", 
    desc: "Confirm and relax, we'll handle the rest.",
    icon: CalendarCheck,
  },
  { 
    number: "04", 
    title: "Travel Stress-Free", 
    desc: "Enjoy your journey while we take care of everything.",
    icon: Plane,
  },
];

export default function USP() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".usp-step", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".usp-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="process" 
      className="py-12 lg:py-24 bg-white scroll-mt-24 relative overflow-hidden"
    >
      {/* Connecting Line (Desktop) */}
      <div className="absolute top-[45%] left-0 w-full hidden lg:block px-60 pointer-events-none">
         <div className="relative w-full h-[100px]">
            <svg width="100%" height="100" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0 50C150 50 250 10 400 10C550 10 650 90 800 90C950 90 1050 50 1200 50" stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.15"/>
            </svg>
            <div className="absolute right-[-20px] top-[40px] opacity-20">
              <Plane className="w-5 h-5 text-primary rotate-[30deg]" />
            </div>
         </div>
      </div>

      <div className="container-custom relative z-10">

        {/* Title */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="flex items-center justify-center gap-6 lg:gap-12">
            <div className="hidden md:block h-[1px] flex-1 max-w-[150px] bg-gray-100" />
            <h2 className="text-4xl lg:text-6xl font-sans font-black text-gray-900 tracking-tight leading-tight">
              How We Plan Your Journey
            </h2>
            <div className="hidden md:block h-[1px] flex-1 max-w-[150px] bg-gray-100" />
          </div>
        </div>

        {/* Steps Grid */}
        <div className="usp-grid grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 relative z-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="usp-step flex flex-col items-center text-center space-y-6 lg:space-y-8 group active:scale-[0.98] transition-transform"
            >
              <div className="relative">
                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-[32px] lg:rounded-[40px] bg-[#F1F8F1] flex items-center justify-center text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_10px_30px_rgba(0,0,0,0.02)] group-hover:shadow-[0_20px_40px_rgba(46,125,50,0.15)] lg:group-hover:-translate-y-3">
                  <step.icon className="w-10 h-10 lg:w-12 lg:h-12 stroke-[1.5px]" />
                </div>
                <div className="absolute top-1/2 -left-2 lg:-left-3 -translate-y-1/2 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-[9px] lg:text-[10px] tracking-tighter shadow-xl z-20 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
              </div>

              <div className="space-y-3 lg:space-y-4 group-hover:-translate-y-1 transition-transform duration-500">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight leading-tight group-hover:text-[#2E7D32] transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-500 font-medium leading-relaxed max-w-[200px] lg:max-w-[220px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
