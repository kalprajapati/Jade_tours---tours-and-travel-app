"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, MessageCircle, Sparkles, Globe, Compass } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-content", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-container",
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="py-12 lg:py-24 bg-white scroll-mt-24">
      <div className="container-custom cta-container">
        <div className="relative h-[450px] lg:h-[650px] rounded-[40px] lg:rounded-[80px] overflow-hidden flex flex-col items-center justify-center text-center px-6 lg:px-12 group">
          <Image 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop" 
            alt="Mountains" 
            fill 
            className="object-cover brightness-[0.45] group-hover:scale-105 transition-transform duration-[3s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <div className="cta-content relative z-10 space-y-6 lg:space-y-12 max-w-4xl">
            <h2 className="text-3xl lg:text-8xl font-sans font-black text-white tracking-tighter leading-[1.1]">
              Let&apos;s Plan Your <br className="hidden lg:block" /> Next Journey
            </h2>
            <p className="text-white/80 text-sm lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed tracking-tight px-4 sm:px-0">
              Whether it&apos;s a family holiday, honeymoon, business travel, or international tour — we&apos;re here to make it effortless and memorable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-8 pt-4">
              <MagneticButton 
                onClick={() => window.open('https://wa.me/919825438324', '_blank')}
                className="w-full sm:w-auto px-10 py-4 bg-white text-gray-950 font-black rounded-full flex items-center justify-center gap-3 transition-all hover:bg-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-95 text-[12px] lg:text-sm uppercase tracking-widest"
              >
                <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 fill-[#2E7D32]/20 text-[#2E7D32]" /> 
                <span>WhatsApp Us</span>
              </MagneticButton>
              <MagneticButton 
                onClick={() => window.open('https://wa.me/919825438324', '_blank')}
                className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-xl text-white border border-white/30 font-black rounded-full flex items-center justify-center gap-3 transition-all hover:bg-white/10 hover:border-white/50 active:scale-95 text-[12px] lg:text-sm uppercase tracking-widest shadow-2xl"
              >
                <Phone className="w-4 h-4 lg:w-5 lg:h-5" /> 
                <span>Request a Callback</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
