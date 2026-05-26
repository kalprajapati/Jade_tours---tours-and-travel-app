"use client";
import { useEffect, useRef } from "react";
import { Plane, Globe, Mountain, FileText, Hotel, Car, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const allServices = [
  { 
    title: "Air Ticket Booking", 
    desc: "Domestic & international flight bookings with the best routes and fares.", 
    icon: Plane,
  },
  { 
    title: "International Tours", 
    desc: "Curated experiences for couples, families, groups and corporate travelers.", 
    icon: Globe,
  },
  { 
    title: "Domestic Tours", 
    desc: "Explore the beauty of India with comfortable and affordable packages.", 
    icon: Mountain,
  },
  { 
    title: "Visa Assistance", 
    desc: "Hassle-free visa guidance and documentation support.", 
    icon: FileText,
  },
  { 
    title: "Hotel Bookings", 
    desc: "Handpicked hotels for your comfort, luxury and convenience.", 
    icon: Hotel,
  },
  { 
    title: "Travel Planning", 
    desc: "Airport transfers, itinerary planning & complete support.", 
    icon: Car,
  },
];

export default function ServicesList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-card", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
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
    const message = encodeURIComponent(`Hello Jade Tours & Travel! I am interested in ${service.title}.`);
    window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
  };

  return (
    <section id="services" ref={containerRef} className="py-16 lg:py-24 bg-white scroll-mt-24 border-b border-gray-50">
      <div className="container-custom">
        
        {/* Title Section - Reference Style */}
        <div className="flex items-center justify-center gap-4 lg:gap-6 mb-16 lg:mb-20">
          <div className="flex items-center gap-3">
             <span className="text-[#C1A67B] text-xl lg:text-2xl">★</span>
             <h2 className="text-3xl lg:text-[40px] font-serif font-bold text-gray-900 tracking-tight">
               Our Services
             </h2>
          </div>
          <div className="w-16 lg:w-24 h-[1px] bg-[#C1A67B]/40" />
        </div>

        {/* Services Grid - High Density 6 Column */}
        <div className="services-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {allServices.map((service, i) => (
            <div
              key={i}
              onClick={() => handleServiceClick(service)}
              className="service-card bg-white p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-primary/20 transition-all duration-700 cursor-pointer group flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center text-[#004D31] mb-6 group-hover:scale-110 transition-transform duration-500">
                <service.icon className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1} />
              </div>
              <div className="space-y-3">
                <h3 className="text-base lg:text-lg font-black text-gray-950 group-hover:text-primary transition-colors duration-500 tracking-tight leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-tight font-medium text-[11px] lg:text-[13px] opacity-80 group-hover:opacity-100 transition-opacity">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
