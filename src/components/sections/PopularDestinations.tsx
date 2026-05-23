"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, MapPin, ArrowRight, Star, Plane, Globe } from "lucide-react";
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
    location: "UAE", 
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    desc: "Luxury shopping, ultramodern architecture and a lively nightlife scene.",
    tag: "Modernist",
    duration: "5-6 Days",
    rating: "4.9",
    code: "JADE-DXB"
  },
  { 
    name: "Bali", 
    location: "Indonesia", 
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    desc: "Tropical paradise known for its forested volcanic mountains and iconic rice paddies.",
    tag: "Tropical",
    duration: "6-8 Days",
    rating: "4.8",
    code: "JADE-DPS"
  },
  { 
    name: "Thailand", 
    location: "Southeast Asia", 
    image: "/assets/thailand.png",
    desc: "Vibrant culture, beautiful beaches, and world-renowned street food.",
    tag: "Exotic",
    duration: "7-10 Days",
    rating: "4.7",
    code: "JADE-BKK"
  },
  { 
    name: "Singapore", 
    location: "Southeast Asia", 
    image: "/assets/singapore.png",
    desc: "A global financial center with a tropical climate and multicultural population.",
    tag: "Urban",
    duration: "4-5 Days",
    rating: "4.9",
    code: "JADE-SIN"
  },
  { 
    name: "Maldives", 
    location: "Indian Ocean", 
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
    desc: "Pristine white-sand beaches and crystal-clear turquoise waters.",
    tag: "Exclusive",
    duration: "5-7 Days",
    rating: "5.0",
    code: "JADE-MLE"
  },
  { 
    name: "Kashmir", 
    location: "India", 
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop",
    desc: "Heaven on earth with stunning landscapes and serene dal lake houseboats.",
    tag: "Serene",
    duration: "6-7 Days",
    rating: "4.9",
    code: "JADE-SXR"
  },
  { 
    name: "Europe", 
    location: "Various Cities", 
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
    desc: "Rich history, iconic landmarks, and a diverse range of cultures and cuisines.",
    tag: "Classic",
    duration: "10-15 Days",
    rating: "4.8",
    code: "JADE-EUR"
  },
];

export default function PopularDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline Reveal
      gsap.fromTo(".dest-headline-line", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dest-header",
            start: "top 90%",
          }
        }
      );

      // Cards Fan-In Animation
      gsap.fromTo(".dest-card", 
        { x: 60, opacity: 0, rotateY: 15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          stagger: 0.1,
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top 85%",
          }
        }
      );

      // Parallax Background
      gsap.to(".dest-bg-glow", {
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const currentProgress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setProgress(currentProgress);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleDestinationClick = (dest: typeof destinations[0]) => {
    const message = `Hello Jade Tours & Travel! I am interested in the ${dest.name} package.\n\n` +
      `🌍 DESTINATION: ${dest.name}, ${dest.location}\n` +
      `⏱️ DURATION: ${dest.duration}\n` +
      `🏷️ CATEGORY: ${dest.tag}\n\n` +
      `Please provide more details on this journey.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919825438324?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="destinations" ref={containerRef} className="relative py-12 lg:py-32 bg-[#020504] overflow-hidden scroll-mt-24">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="dest-bg-glow absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/[0.08] rounded-full blur-[160px] -translate-y-1/2 translate-x-1/3" />
        <div className="dest-bg-glow absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/[0.04] rounded-full blur-[140px] translate-y-1/2 -translate-x-1/3" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container-custom relative z-10">
        
        {/* Header Section */}
        <div className="dest-header flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-24 gap-8 lg:gap-12">
          <div className="max-w-4xl space-y-6 lg:space-y-8">
            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.6em] text-[10px] lg:text-[11px] mb-2 lg:mb-4">
              <span className="w-8 h-[1px] bg-primary/30" />
              Popular Destinations
            </div>
            
            <h2 className="text-[34px] md:text-[52px] lg:text-[68px] xl:text-[84px] font-sans font-black text-white leading-[0.95] lg:leading-[1] tracking-tightest uppercase">
              <span className="block dest-headline-line">The World&apos;s</span>
              <span className="block dest-headline-line text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/40 italic font-serif font-light lowercase normal-case py-1">Best</span>
              <span className="block dest-headline-line">Experiences.</span>
            </h2>
            
            <p className="text-gray-500 text-[14px] lg:text-xl leading-relaxed max-w-2xl font-medium tracking-tight opacity-90">
              Hand-picked escapes for every kind of traveler. From the modern skylines of Dubai to the serene dal lakes of Kashmir.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex gap-4 lg:gap-6">
              <button 
                onClick={() => scroll("left")}
                className="w-14 h-14 lg:w-20 lg:h-20 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] text-white hover:bg-primary hover:border-primary transition-all duration-700 shadow-2xl active:scale-90"
              >
                <ChevronLeft className="w-6 h-6 lg:w-10 lg:h-10 relative z-10" />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="w-14 h-14 lg:w-20 lg:h-20 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] text-white hover:bg-primary hover:border-primary transition-all duration-700 shadow-2xl active:scale-90"
              >
                <ChevronRight className="w-6 h-6 lg:w-10 lg:h-10 relative z-10" />
              </button>
            </div>
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-0 bg-primary origin-left"
                style={{ scaleX: progress / 100 }}
              />
            </div>
          </div>
        </div>

        {/* Anthology Slider */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 lg:gap-12 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory"
        >
          {destinations.map((dest, i) => (
            <div
              key={i}
              onClick={() => handleDestinationClick(dest)}
              className="dest-card min-w-[300px] md:min-w-[450px] lg:min-w-[600px] group snap-start relative h-[400px] lg:h-[650px] rounded-[32px] lg:rounded-[56px] overflow-hidden cursor-pointer shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/5 bg-gray-950 transition-all duration-1000 active:scale-[0.98]"
            >
              <Image 
                src={dest.image} 
                alt={dest.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-[6s] lg:group-hover:scale-110 ease-out brightness-[0.7] group-hover:brightness-90 transition-all duration-700" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#020504] via-transparent to-[#020504]/40 opacity-90" />
              
              {/* Info Overlay */}
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-30">
                <div className="flex justify-between items-start">
                  <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{dest.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                    <Star className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" />
                    <span className="text-[11px] font-black text-white">{dest.rating}</span>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl lg:text-6xl font-sans font-black text-white uppercase tracking-tightest leading-none">
                      {dest.name}
                    </h3>
                    <p className="text-gray-300 text-sm lg:text-lg font-medium leading-relaxed max-w-sm line-clamp-2">
                      {dest.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Starting At</span>
                      <span className="text-xl lg:text-2xl font-black text-primary tracking-tight">Best Price</span>
                    </div>
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary text-white flex items-center justify-center transition-all duration-700 hover:scale-110">
                      <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Action Footer */}
        <div className="mt-16 lg:mt-24 text-center">
          <MagneticButton 
            onClick={() => {
                const message = encodeURIComponent("Hello Jade Tours & Travel! I want to explore more destinations.");
                window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
            }}
            className="px-12 py-5 lg:px-20 lg:py-7 bg-white text-gray-950 font-black rounded-full transition-all shadow-3xl group inline-flex items-center gap-4 uppercase tracking-[0.3em] text-[11px] lg:text-sm active:scale-95"
          >
            <span>Explore All Packages</span>
            <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
