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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Scale-In
      gsap.fromTo(cardRef.current, 
        { scale: 0.95, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
          }
        }
      );

      // Headline Reveal
      gsap.fromTo(".cta-headline-line", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          }
        }
      );

      // Background Zoom
      gsap.fromTo(".cta-bg-image", 
        { scale: 1.1 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Icons Entrance
      gsap.fromTo(".cta-icon-module", 
        { scale: 0, rotate: -90 },
        {
          scale: 1,
          rotate: 0,
          stagger: 0.08,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Jade Tours & Travel! I am ready to plan my next journey.");
    window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
  };

  const handleCallbackClick = () => {
    const message = encodeURIComponent("Hello Jade Tours & Travel! I would like to request a callback to discuss my travel plans.");
    window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
  };

  return (
    <section id="contact" ref={containerRef} className="py-12 lg:py-32 bg-white overflow-hidden scroll-mt-24">
      <div className="container-custom">
        <div 
          ref={cardRef}
          className="relative bg-[#050807] rounded-[48px] lg:rounded-[80px] overflow-hidden p-6 lg:p-16 text-center text-white shadow-[0_80px_160px_rgba(0,0,0,0.6)] group border border-white/5"
        >
          
          {/* Cinematic Immersive Background */}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full cta-bg-image">
              <Image 
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2400&auto=format&fit=crop" 
                alt="Beautiful Horizon"
                fill
                className="object-cover opacity-30 mix-blend-luminosity"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-transparent to-[#050807]/60" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          <div className="cta-content relative z-10 flex flex-col items-center space-y-12 lg:space-y-16">
            
            {/* Icon Triptych */}
            <div className="flex items-center gap-8 lg:gap-12">
               <div className="cta-icon-module w-12 h-12 lg:w-16 lg:h-16 rounded-[18px] lg:rounded-[24px] bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-2xl">
                  <Globe className="w-5 h-5 lg:w-7 lg:h-7 text-primary" />
               </div>
               <div className="cta-icon-module w-16 h-16 lg:w-24 lg:h-24 rounded-[24px] lg:rounded-[36px] bg-primary text-white flex items-center justify-center shadow-3xl scale-110 z-20 relative">
                  <Sparkles className="w-8 h-8 lg:w-12 lg:h-12" />
               </div>
               <div className="cta-icon-module w-12 h-12 lg:w-16 lg:h-16 rounded-[18px] lg:rounded-[24px] bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-2xl">
                  <Compass className="w-5 h-5 lg:w-7 lg:h-7 text-accent-gold" />
               </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-center gap-4 text-primary font-black uppercase tracking-[0.6em] text-[10px] lg:text-[11px] mb-4">
                <span className="w-8 h-[1px] bg-primary/30" />
                Plan Your Journey
                <span className="w-8 h-[1px] bg-primary/30" />
              </div>
              
              <h2 className="text-[34px] md:text-[56px] lg:text-[76px] xl:text-[92px] font-sans font-black leading-[0.95] lg:leading-[1] tracking-tightest uppercase max-w-6xl">
                <span className="block cta-headline-line">Let&apos;s Plan Your</span>
                <span className="block cta-headline-line text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/40 italic font-serif font-light lowercase normal-case py-1">next</span>
                <span className="block cta-headline-line">Journey.</span>
              </h2>
              
              <p className="text-gray-400 text-[13px] lg:text-xl max-w-2xl mx-auto leading-relaxed font-medium tracking-tight opacity-90">
                Whether it&apos;s a holiday, honeymoon, family trip, or business travel — we&apos;re here to make it seamless.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-12 w-full max-w-3xl mx-auto">
              <MagneticButton 
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto px-10 py-5 lg:px-20 lg:py-8 bg-primary text-white font-black rounded-2xl lg:rounded-[32px] flex items-center justify-center gap-4 lg:gap-6 transition-all shadow-[0_30px_70px_rgba(56,142,60,0.4)] group text-[11px] lg:text-sm uppercase tracking-[0.3em] relative overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">WhatsApp Now</span>
                <MessageCircle className="w-5 h-5 lg:w-8 lg:h-8 relative z-10 group-hover:scale-110 transition-transform duration-700" />
              </MagneticButton>

              <MagneticButton 
                onClick={handleCallbackClick}
                className="w-full sm:w-auto px-10 py-5 lg:px-20 lg:py-8 bg-white/5 backdrop-blur-3xl text-white font-black rounded-2xl lg:rounded-[32px] border border-white/10 flex items-center justify-center gap-4 lg:gap-6 transition-all hover:bg-white/10 hover:border-primary/40 text-[11px] lg:text-sm uppercase tracking-[0.3em] shadow-3xl active:scale-95"
              >
                <span className="relative z-10">Request Callback</span>
                <Phone className="w-4 h-4 lg:w-7 lg:h-7 text-accent-gold group-hover:rotate-12 transition-transform" />
              </MagneticButton>
            </div>

            <div className="pt-8 lg:pt-20 flex flex-wrap justify-center items-center gap-6 lg:gap-20 opacity-40 group-hover:opacity-70 transition-opacity duration-1000">
              {[
                { label: "Holiday", icon: Sparkles },
                { label: "Business", icon: Globe },
                { label: "Family", icon: Compass }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-primary" />
                  <span className="text-[8px] lg:text-[11px] font-bold uppercase tracking-[0.3em] lg:tracking-[0.4em] whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
