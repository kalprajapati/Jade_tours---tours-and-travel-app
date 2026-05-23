"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BookingWidget from "@/components/ui/BookingWidget";
import MagneticButton from "@/components/ui/MagneticButton";
import { 
  ArrowRight, Plane, Star, Users, Globe2, ShieldCheck, 
  CheckCircle2, MessageCircle 
} from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trustChips = [
  { label: "Flight Booking", icon: Plane },
  { label: "Visa Assistance", icon: ShieldCheck },
  { label: "Holiday Packages", icon: Globe2 },
  { label: "24/7 Support", icon: Users },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Snappier entrance animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });
      
      tl.set(".hero-bg-image", { scale: 1.1 })
        .to(".hero-bg-image", {
          scale: 1,
          duration: 2,
          ease: "power2.inOut"
        })
        .fromTo(".hero-title-line", 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            delay: -1.5
          }
        )
        .fromTo(".hero-script", 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 }, "-=1")
        .fromTo(".hero-description", 
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1
          }, "-=0.8")
        .fromTo(".hero-cta-group", 
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8
          }, "-=0.6")
        .fromTo(".hero-trust-chip", 
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8
          }, "-=0.4");

      // Background image parallax & content fade on scroll
      gsap.to(".hero-bg-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".hero-content-inner", {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "20% top",
          end: "80% top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.5 });
    }
  };

  const handleContactClick = () => {
    const message = `Hello Jade Tours & Travel! I want to plan an amazing trip.\n\n` +
      `I'm interested in your services and would like to speak with an expert.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919825438324?text=${encodedMessage}`, '_blank');
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[100svh] lg:min-h-[90vh] flex flex-col pt-16 lg:pt-24 overflow-hidden bg-white"
    >
      {/* Background Image - Cinematic treatment with Multi-layered Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-full hero-bg-image will-change-transform">
          <Image 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2400&auto=format&fit=crop" 
            alt="Jade Tours and Travel - Luxury Global Destinations"
            fill
            className="object-cover object-center opacity-70 lg:opacity-90 brightness-[0.85]"
            priority
          />
        </div>
        {/* Artistic gradients for high-end depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/70 lg:from-white/30 lg:to-white/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:via-white/40 w-full lg:w-[60%] z-10" />
      </div>

      <div className="container-custom relative z-20 flex-1 flex flex-col justify-center py-6 lg:py-6 hero-content-inner">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Left Content Side */}
          <div className="max-w-[750px] text-center lg:text-left">
            <div className="space-y-4 lg:space-y-8">
              <div className="hero-script overflow-hidden">
                <p className="font-script text-lg md:text-2xl lg:text-[32px] text-primary mb-0.5 lg:mb-2 leading-tight drop-shadow-[0_2px_15px_rgba(255,255,255,1)]">
                  Your Trusted Travel Partner
                </p>
              </div>
              
              <div className="overflow-hidden">
                <h1 className="text-[32px] md:text-[54px] lg:text-[64px] xl:text-[72px] font-sans font-black text-gray-950 leading-[1.1] lg:leading-[1] mb-4 lg:mb-6 tracking-tightest uppercase">
                  <span className="block hero-title-line">Your Trusted Travel &</span>
                  <span className="block hero-title-line text-primary italic font-serif lowercase normal-case ml-1 lg:ml-2 drop-shadow-[0_2px_15px_rgba(255,255,255,0.8)]">Air Ticketing</span>
                  <span className="block hero-title-line">Partner</span>
                </h1>
              </div>
              
              <div className="hero-description overflow-hidden">
                <p className="text-[13px] md:text-base lg:text-[20px] text-gray-700 mb-6 lg:mb-10 leading-relaxed font-semibold max-w-[650px] mx-auto lg:mx-0 tracking-tight">
                  Domestic & international tours, flight bookings, visa assistance, and complete travel planning — all in one place.
                </p>
              </div>

              {/* Trust Chips */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3 mb-6 lg:mb-10">
                {trustChips.map((chip, i) => (
                  <div 
                    key={i} 
                    className="hero-trust-chip flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-100 shadow-sm"
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                    <span className="text-[9px] lg:text-[11px] font-black uppercase tracking-widest text-gray-950">{chip.label}</span>
                  </div>
                ))}
              </div>

              <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 lg:gap-5">
                <MagneticButton 
                  onClick={() => handleScrollTo("destinations")}
                  className="w-full sm:w-auto px-10 py-5 lg:px-12 lg:py-5 bg-[#388E3C] text-white font-black rounded-full flex items-center justify-center gap-3 lg:gap-3 transition-all shadow-[0_20px_40px_rgba(56,142,60,0.25)] hover:bg-[#2E7D32] group text-[11px] lg:text-[12px] uppercase tracking-[0.25em] relative overflow-hidden active:scale-95"
                >
                  <span className="relative z-10">Plan Your Trip</span>
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </MagneticButton>
                
                <button 
                  onClick={handleContactClick}
                  className="w-full sm:w-auto px-10 py-5 lg:px-12 lg:py-5 bg-white/80 backdrop-blur-md text-gray-950 font-black rounded-full flex items-center justify-center gap-3 lg:gap-3 transition-all hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-gray-200 group text-[11px] lg:text-[12px] uppercase tracking-[0.25em] active:scale-95 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-[#25D366] fill-[#25D366]/10" />
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>

          {/* Right Widget Side */}
          <div className="flex justify-center lg:justify-end -mt-2 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[580px] perspective-1000"
            >
              <div className="relative group p-1">
                {/* Decorative glow behind the widget */}
                <div className="absolute -inset-4 bg-primary/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative bg-white/95 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.12)] rounded-[32px] lg:rounded-[40px] border border-white overflow-hidden">
                  <BookingWidget />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
