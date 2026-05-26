"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Compass, Map, Home } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "01",
    title: "Custom Trip Planning",
    tagline: "Personalized Plans",
    desc: "We don't just book tickets; we create amazing travel experiences tailored to your style and interests.",
    details: ["VIP Sightseeing", "Exclusive Dining", "Special Activities"],
    icon: Map,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Seamless Travel",
    tagline: "Easy Logistics",
    desc: "From flights to local transport, we handle everything so you can just enjoy your trip.",
    details: ["Fast-track Airport help", "Private Transfers", "Expert Support"],
    icon: Compass,
    image: "https://images.unsplash.com/photo-1544016768-982d1554f0b9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Luxury Stays",
    tagline: "Hand-picked Hotels",
    desc: "We find the best places for you to stay, from boutique hotels to luxury resorts.",
    details: ["Vetted Villas", "Luxury Resorts", "Unique Stays"],
    icon: Home,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "24/7 Support",
    tagline: "Expert Help",
    desc: "Our team is available anytime to help with your requests and ensure a smooth journey.",
    details: ["Instant Assistance", "Local Expertise", "Full Care"],
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".service-image-block") as HTMLElement[];
      
      items.forEach((item: HTMLElement, i: number) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        });

        // Parallax for images
        const img = item.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, [mounted]);

  const handleInquiryClick = (service: typeof services[0]) => {
    const message = `Hello Jade Tours & Travel! I'm interested in the ${service.title} service.\n\n` +
      `I would like to know more about the details including: ${service.details.join(", ")}.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919825438324?text=${encodedMessage}`, '_blank');
  };

  const handleConsultClick = () => {
    const message = `Hello Jade Tours & Travel! I would like to talk to an expert about my next trip.\n\n` +
      `I am interested in your custom travel planning and support services.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919825438324?text=${encodedMessage}`, '_blank');
  };

  if (!mounted) return <section className="min-h-screen bg-[#0B1310]" />;

  return (
    <section id="services-grid" ref={containerRef} className="relative bg-[#0B1310] py-12 md:py-24 lg:py-32 scroll-mt-24">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-[#C1A67B]/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 px-6 max-w-[1400px] mx-auto">
        {/* Section Header - Mobile Friendly */}
        <div className="flex items-center gap-3 mb-6 md:mb-12 overflow-hidden">
          <div className="w-8 h-[1px] bg-[#C1A67B]" />
          <span className="text-[#C1A67B] font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">
            Expert Travel Services
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20 lg:gap-32">
          
          {/* Left Side: Sticky Information - Desktop Only */}
          <div className="hidden md:block md:w-1/2 md:sticky md:top-32 h-fit self-start">
            <div className="max-w-lg">
              <div className="relative md:min-h-[450px] lg:min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="absolute inset-0"
                  >
                    <span className="block font-serif text-[64px] lg:text-[80px] text-[#F2EFE9]/[0.03] leading-none mb-2">
                      {services[activeIndex].id}
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-[60px] text-[#F2EFE9] leading-[1] tracking-tighter mb-8">
                      {services[activeIndex].title}
                    </h2>
                    <p className="font-sans text-[#F2EFE9]/60 text-base md:text-lg lg:text-xl leading-relaxed mb-8">
                      {services[activeIndex].desc}
                    </p>

                    <div className="grid grid-cols-1 gap-y-3">
                      {services[activeIndex].details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-3 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C1A67B] group-hover:scale-150 transition-transform" />
                          <span className="text-[#F2EFE9]/40 font-sans text-[10px] font-bold uppercase tracking-widest group-hover:text-[#C1A67B] transition-colors">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-16 flex items-center gap-10 relative z-20">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#F2EFE9]/20 text-[9px] font-bold uppercase tracking-widest">
                    SERVICE {services[activeIndex].id}
                  </span>
                  <div className="w-40 h-[1px] bg-[#0B1310]/10 relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-[#C1A67B] origin-left"
                      animate={{ scaleX: (activeIndex + 1) / services.length }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => handleInquiryClick(services[activeIndex])}
                  className="group flex items-center gap-4"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#F2EFE9]/10 flex items-center justify-center group-hover:bg-[#C1A67B] group-hover:border-[#C1A67B] transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-[#C1A67B] group-hover:text-[#0B1310]" />
                  </div>
                  <span className="text-[#F2EFE9] text-[9px] font-bold uppercase tracking-[0.3em] group-hover:translate-x-1.5 transition-transform">
                    Inquire Now
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Media Stream */}
          <div className="w-full md:w-1/2 space-y-10 md:space-y-32 lg:space-y-40 pb-4 md:pb-16">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="service-image-block relative group"
              >
                <div className="relative aspect-[4/5] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0B1310]/5">
                  <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2421]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="absolute top-5 md:top-8 left-5 md:left-8 z-10">
                    <div className="px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-[#0B1310]/40 backdrop-blur-xl border border-[#F2EFE9]/10 text-[#F2EFE9] font-sans text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em]">
                      {service.tagline}
                    </div>
                  </div>

                  <div className="absolute bottom-5 md:bottom-8 right-5 md:right-8 z-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#C1A67B]/90 backdrop-blur-xl flex items-center justify-center text-[#F2EFE9] transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                      <service.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                  </div>
                </div>

                {/* Mobile Service Details */}
                <div className="mt-6 md:hidden space-y-4 px-1">
                  <div className="relative">
                    <span className="block font-serif text-5xl text-[#F2EFE9]/5 leading-none absolute -top-5 -left-1">
                      {service.id}
                    </span>
                    <h3 className="relative z-10 font-serif text-2xl text-[#F2EFE9] leading-tight tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-[#F2EFE9]/60 font-sans text-sm leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="grid grid-cols-1 gap-2 py-1">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3 group">
                        <div className="w-1 h-1 rounded-full bg-[#C1A67B]" />
                        <span className="text-[#F2EFE9]/40 font-sans text-[8px] font-black uppercase tracking-[0.15em]">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleInquiryClick(service)}
                    className="w-full group flex items-center justify-between p-4 rounded-xl border border-[#F2EFE9]/10 bg-[#F2EFE9]/[0.02] active:bg-[#F2EFE9]/5 transition-colors"
                  >
                    <span className="text-[#F2EFE9] text-[8px] font-black uppercase tracking-[0.3em]">
                      Inquire Now
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#F2EFE9]/10 flex items-center justify-center bg-[#C1A67B]">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0B1310]" />
                    </div>
                  </button>
                </div>
              </div>
            ))}

            <div className="relative p-8 md:p-14 rounded-[2rem] md:rounded-[3.5rem] bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl border border-[#F2EFE9]/10 overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-[#C1A67B] font-sans text-[8px] font-black uppercase tracking-[0.4em] mb-3 md:mb-6 block">
                  Expert Planning
                </span>
                <h3 className="font-serif text-2xl md:text-5xl text-[#F2EFE9] mb-6 md:mb-8 leading-tight tracking-tighter text-center">
                  Your Journey Starts <br />
                  <span className="italic font-light text-[#C1A67B]">with one simple talk.</span>
                </h3>
                <button 
                  onClick={handleConsultClick}
                  className="group relative px-10 py-4 md:px-14 md:py-6 bg-[#C1A67B] text-[#0B1310] font-sans text-[10px] font-bold uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all duration-700 active:scale-95"
                >
                  <span className="relative z-10">Talk to an Expert</span>
                </button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C1A67B]/5 blur-[80px] rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
