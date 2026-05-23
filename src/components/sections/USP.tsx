"use client";
import { useEffect, useRef } from "react";
import { MessageSquare, ClipboardCheck, CreditCard, Heart, ArrowRight, Globe } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { 
    number: "01", 
    title: "Share Your Requirement", 
    desc: "Tell us where you want to go and what you need. A quick message is all it takes to start.",
    shortDesc: "Tell us your plans",
    icon: MessageSquare,
  },
  { 
    number: "02", 
    title: "Get Customized Options", 
    desc: "Our experts design multiple travel plans tailored to your style, budget, and preferences.",
    shortDesc: "We design your trip",
    icon: ClipboardCheck,
  },
  { 
    number: "03", 
    title: "Confirm Your Booking", 
    desc: "Pick the plan you love. We handle all the ticketing, hotels, and documentation for you.",
    shortDesc: "Secure your spot",
    icon: CreditCard,
  },
  { 
    number: "04", 
    title: "Travel Stress-Free", 
    desc: "Enjoy your journey with our 24/7 support. We manage every detail while you make memories.",
    shortDesc: "Experience the world",
    icon: Heart,
  },
];

export default function USP() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline Reveal
      gsap.fromTo(".usp-headline-line", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".usp-header",
            start: "top 90%",
          }
        }
      );

      // Journey Connector Animation
      gsap.fromTo(".journey-path", 
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".usp-steps-grid",
            start: "top 80%",
          }
        }
      );

      // Step Cards Reveal
      gsap.fromTo(".usp-step-card", 
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".usp-steps-grid",
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
      className="relative bg-white py-12 lg:py-32 overflow-hidden scroll-mt-24 border-t border-gray-100"
    >
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_10%,rgba(56,142,60,0.03),transparent_50%)] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        
        {/* Header Section */}
        <div className="usp-header flex flex-col items-center text-center mb-12 lg:mb-24 space-y-6 lg:space-y-8">
          <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.6em] text-[10px] lg:text-[11px] mb-2">
            <span className="w-8 h-[1px] bg-primary/30" />
            Organized & Professional
            <span className="w-8 h-[1px] bg-primary/30" />
          </div>
          <h2 className="text-[34px] md:text-[52px] lg:text-[68px] xl:text-[80px] font-sans font-black text-gray-950 leading-[0.95] lg:leading-[1] tracking-tightest uppercase max-w-5xl">
            <span className="block usp-headline-line">How It</span>
            <span className="block usp-headline-line text-primary italic font-serif font-light lowercase normal-case py-1">works</span>
            <span className="block usp-headline-line">Simply.</span>
          </h2>
          <p className="text-gray-500 max-w-2xl text-[13px] lg:text-xl leading-relaxed font-medium tracking-tight px-4 opacity-90">
            A simple, transparent 4-step process designed to make your travel planning completely effortless.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Animated Journey Path (Desktop) */}
          <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gray-100 hidden lg:block overflow-hidden">
            <div className="journey-path w-full h-full bg-primary/20 origin-left" />
          </div>

          <div className="usp-steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mb-16 lg:mb-32">
            {steps.map((step, i) => (
              <div
                key={i}
                className="usp-step-card relative p-6 lg:p-12 rounded-[32px] lg:rounded-[56px] bg-gray-50/50 backdrop-blur-xl border border-gray-100 shadow-sm hover:bg-white hover:shadow-[0_40px_100px_rgba(56,142,60,0.08)] transition-all duration-1000 group text-center flex flex-col items-center overflow-hidden active:scale-[0.98]"
              >
                {/* Background Number */}
                <span className="absolute -top-4 -right-4 font-serif font-black text-6xl lg:text-[120px] text-gray-950/[0.03] group-hover:text-primary/[0.05] transition-all duration-1000 leading-none tracking-tightest pointer-events-none select-none italic">
                  {step.number}
                </span>

                {/* Icon Module */}
                <div className="w-14 h-14 lg:w-24 lg:h-24 rounded-[20px] lg:rounded-[40px] bg-white border border-gray-100 flex items-center justify-center mb-6 lg:mb-12 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 shadow-2xl relative z-10 group-hover:bg-primary group-hover:border-primary">
                  <step.icon className="w-7 h-7 lg:w-12 lg:h-12 text-primary group-hover:text-white transition-all duration-1000" />
                </div>

                <div className="space-y-4 lg:space-y-6 relative z-10">
                  <h3 className="text-xl lg:text-[22px] font-sans font-black text-gray-950 tracking-tightest group-hover:text-primary transition-colors duration-700 uppercase leading-tight">
                    {step.title}
                  </h3>
                  
                  <div className="relative min-h-[80px] lg:min-h-[100px] w-full flex items-center justify-center">
                    {/* Short Description - Desktop Only Hover Exit */}
                    <p className="hidden lg:block text-gray-950 font-black text-[13px] lg:text-base leading-tight transition-all duration-700 lg:group-hover:-translate-y-20 lg:group-hover:opacity-0 uppercase tracking-widest opacity-50">
                      {step.shortDesc}
                    </p>
                    {/* Detailed Content - Mobile Visible, Desktop Hover Reveal */}
                    <p className="lg:absolute lg:inset-0 w-full text-gray-500 text-[11px] lg:text-lg leading-relaxed lg:opacity-0 lg:translate-y-8 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-1000 ease-[0.16,1,0.3,1] flex items-center justify-center text-center font-medium tracking-tight">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Mobile Connector */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-gradient-to-b from-primary/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col items-center">
          <MagneticButton 
            onClick={() => {
                const message = encodeURIComponent("Hello Jade Tours & Travel! I have a travel requirement and would like to start the process.");
                window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
            }}
            className="px-10 py-5 lg:px-20 lg:py-8 bg-[#050807] hover:bg-primary text-white font-black rounded-2xl lg:rounded-[32px] flex items-center gap-4 lg:gap-6 transition-all shadow-3xl group text-[11px] lg:text-sm uppercase tracking-[0.3em] lg:tracking-[0.4em] relative overflow-hidden active:scale-95"
          >
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="relative z-10">Start the Process</span>
            <ArrowRight className="w-4 h-4 lg:w-7 lg:h-7 group-hover:translate-x-3 transition-transform relative z-10" />
          </MagneticButton>
          
          <div className="mt-8 flex items-center gap-3 text-gray-400">
             <Globe className="w-4 h-4" />
             <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.3em]">Global Support • Reliable Planning</p>
          </div>
        </div>
      </div>
    </section>
  );
}
