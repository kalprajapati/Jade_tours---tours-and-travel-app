"use client";
import { useEffect, useRef } from "react";
import { Plane, Globe, Hotel, Landmark, Sparkles, Compass, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const allServices = [
  { 
    title: "Air Ticket Booking", 
    desc: "Domestic & international flight assistance with the best routes and pricing.", 
    icon: Plane,
    category: "FLIGHTS"
  },
  { 
    title: "International Tours", 
    desc: "Customized international holiday packages designed for unforgettable memories.", 
    icon: Globe,
    category: "GLOBAL"
  },
  { 
    title: "Domestic Tours", 
    desc: "Comfortable and authentic India travel experiences across the country.", 
    icon: Compass,
    category: "INDIA"
  },
  { 
    title: "Visa Assistance", 
    desc: "Expert guidance for hassle-free documentation and visa processing.", 
    icon: Landmark,
    category: "DOCUMENTATION"
  },
  { 
    title: "Hotel Bookings", 
    desc: "Handpicked stays and accommodations that match your style and comfort.", 
    icon: Hotel,
    category: "ACCOMMODATION"
  },
  { 
    title: "Travel Planning", 
    desc: "Complete support including transfers, itinerary management, and 24/7 help.", 
    icon: Sparkles,
    category: "SUPPORT"
  },
];

export default function ServicesList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Stagger
      gsap.fromTo(".services-headline-line", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-header",
            start: "top 90%",
          }
        }
      );

      // Services Stagger
      gsap.fromTo(".service-card", 
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleServiceClick = (service: typeof allServices[0]) => {
    const message = `Hello Jade Tours & Travel! I am interested in ${service.title}.\n\n` +
      `Please provide more details on this service.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919825438324?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="services" ref={containerRef} className="py-16 lg:py-28 bg-white relative overflow-hidden border-t border-gray-100 scroll-mt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/[0.03] rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[140px] -translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="container-custom relative z-10">
        
        {/* Editorial Header */}
        <div className="services-header flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-20 gap-8 lg:gap-12">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] lg:text-[11px] mb-4">
              <span className="w-8 h-[1px] bg-primary/30" />
              What We Offer
            </div>
            <h2 className="text-[34px] md:text-[52px] lg:text-[68px] xl:text-[80px] font-sans font-black text-gray-950 leading-[0.95] lg:leading-[1] tracking-tightest uppercase">
              <span className="block services-headline-line">Expert Travel</span>
              <span className="block services-headline-line text-primary italic font-serif font-light lowercase normal-case py-1">solutions</span>
              <span className="block services-headline-line">for you.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-[13px] lg:text-xl leading-relaxed max-w-[480px] font-medium tracking-tight opacity-90">
            From quick flight bookings to full international tours, we handle everything with care and 15+ years of experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {allServices.map((service, i) => (
            <div
              key={i}
              onClick={() => handleServiceClick(service)}
              className="service-card bg-white p-5 lg:p-12 rounded-[32px] lg:rounded-[48px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.01)] hover:border-primary/20 hover:shadow-[0_40px_100px_rgba(56,142,60,0.06)] transition-all duration-1000 group relative overflow-hidden cursor-pointer active:scale-[0.98]"
            >
              {/* Background Initial Motif */}
              <span className="absolute -top-4 -left-4 font-serif font-black text-6xl lg:text-[120px] text-gray-950/[0.02] group-hover:text-primary/[0.04] transition-all duration-1000 leading-none tracking-tightest pointer-events-none select-none uppercase z-0 italic">
                {service.title[0]}
              </span>

              <div className="flex flex-col gap-6 lg:gap-10 relative z-10">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-[18px] lg:rounded-[24px] bg-gray-50 border border-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-1000 shrink-0 shadow-sm transform group-hover:rotate-12">
                  <service.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] lg:text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">
                      {service.category}
                    </span>
                    <h3 className="text-[18px] lg:text-[24px] font-sans font-black text-gray-950 group-hover:text-primary transition-colors duration-700 leading-tight tracking-tight uppercase">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-[12px] lg:text-lg leading-relaxed font-medium tracking-tight">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
                    Inquire Now <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 lg:mt-24 flex flex-col items-center text-center">
          <MagneticButton 
            onClick={() => {
              const message = encodeURIComponent("Hello Jade Tours & Travel! I would like to talk to an expert about my travel plans.");
              window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
            }}
            className="w-full sm:w-auto px-12 py-5 lg:px-16 lg:py-6 bg-primary text-white font-black rounded-full shadow-[0_20px_60px_rgba(56,142,60,0.3)] hover:bg-primary-dark transition-all text-[11px] lg:text-xs uppercase tracking-[0.4em] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">Plan Your Journey</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
