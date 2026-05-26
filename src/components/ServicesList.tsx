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
          stagger: 0.1,
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
    <section id="services" ref={containerRef} className="py-24 lg:py-40 bg-[#FDFCF7]/50 scroll-mt-24 border-b border-gray-50">
      <div className="container-custom">
        
        {/* Title */}
        <div className="flex items-center gap-6 mb-24 max-w-5xl">
          <div className="flex items-center gap-4">
            <Sparkles className="w-8 h-8 text-[#FFD700] fill-[#FFD700]/10" />
            <h2 className="text-4xl lg:text-6xl font-sans font-black text-gray-900 tracking-tight whitespace-nowrap">
              Our Services
            </h2>
          </div>
          <div className="flex-1 h-[1.5px] bg-[#FFD700]/20 hidden md:block" />
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {allServices.map((service, i) => (
            <div
              key={i}
              onClick={() => handleServiceClick(service)}
              className="service-card bg-white p-10 lg:p-14 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(46,125,50,0.08)] transition-all duration-700 cursor-pointer group border border-gray-100/50 flex flex-col"
            >
              <div className="w-20 h-20 rounded-[28px] bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] mb-10 group-hover:bg-[#2E7D32] group-hover:text-white transition-all duration-700 shadow-sm">
                <service.icon className="w-10 h-10" strokeWidth={1.2} />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#2E7D32] transition-colors duration-500 tracking-tight leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium text-lg lg:text-xl">
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
