"use client";
import { useEffect, useRef } from "react";
import { User, Banknote, Headphones, Shield, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  { title: "Personalized Planning", desc: "Trips designed as per your preferences and budget.", icon: User },
  { title: "Best Price Guarantee", desc: "Competitive prices with no hidden charges.", icon: Banknote },
  { title: "End-To-End Support", desc: "From visas to hotels and transfers, we take care of everything.", icon: Headphones },
  { title: "Trusted & Reliable", desc: "Years of experience and thousands of happy travelers.", icon: Shield },
  { title: "24/7 Assistance", desc: "We're with you before, during and after your journey.", icon: Clock },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".why-feature", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" ref={containerRef} className="py-16 lg:py-24 bg-[#002B1B] text-white scroll-mt-24 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-6 lg:gap-12">
            <div className="hidden md:block h-[1px] flex-1 max-w-[120px] bg-white/10" />
            <h2 className="text-4xl lg:text-6xl font-sans font-black tracking-tight leading-tight">
              Why Choose Jade Tours & Travels?
            </h2>
            <div className="hidden md:block h-[1px] flex-1 max-w-[120px] bg-white/10" />
          </div>
        </div>

        <div className="why-grid grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
          {features.map((feature, i) => (
            <div 
              key={i}
              className="why-feature flex flex-col items-center text-center space-y-6 group"
            >
              <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#4CAF50] group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl group-hover:scale-110 group-hover:-translate-y-2">
                <feature.icon className="w-10 h-10 stroke-[1.5px]" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#4CAF50] transition-colors duration-500">{feature.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[200px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
