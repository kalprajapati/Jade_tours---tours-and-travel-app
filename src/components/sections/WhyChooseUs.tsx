"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Star, Globe, Shield, CreditCard, Headphones, Calendar, Zap } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  { title: "Personalized Planning", desc: "Every detail tailored to your unique travel style and preferences.", icon: Calendar },
  { title: "Transparent Pricing", desc: "No hidden fees. What you see is exactly what you pay.", icon: CreditCard },
  { title: "Quick Support", desc: "Fast response times and dedicated help whenever you need it.", icon: Headphones },
  { title: "End-to-End Assistance", desc: "From visa guidance to your return home, we handle it all.", icon: Shield },
  { title: "Reliable Bookings", desc: "Trusted relationships with global partners for guaranteed stays.", icon: Globe },
  { title: "Smooth Coordination", desc: "Seamless transfers and itinerary management for zero stress.", icon: Zap },
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Scale Effect
      gsap.fromTo(".why-bg-image", 
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Headline Stagger
      gsap.fromTo(".why-headline-line", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-headline",
            start: "top 90%",
          }
        }
      );

      // Feature Tiles Entrance
      gsap.fromTo(".why-feature-tile", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-features-grid",
            start: "top 85%",
          }
        }
      );

      // Image Parallax Grid
      gsap.to(".why-image-parallax-1", {
        y: -60,
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

  return (
    <section id="why-us" ref={containerRef} className="relative pt-20 pb-12 lg:py-32 overflow-hidden bg-[#050807] scroll-mt-24 border-t border-white/5">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full why-bg-image overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop" 
            alt="Majestic Mountain Peaks"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050807] via-[#050807]/90 to-[#050807]" />
      </div>

      {/* Luxury Atmospheric Orbs */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          
          {/* Left: Narrative Content */}
          <div className="lg:col-span-7 space-y-10 lg:space-y-12">
            <div className="why-headline space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] lg:text-[11px] mb-2">
                <span className="w-8 h-[1px] bg-primary/30" />
                Why Trust Jade Tours & Travel
              </div>
              <h2 className="text-[34px] md:text-[52px] lg:text-[68px] xl:text-[80px] font-sans font-black text-white leading-[0.95] lg:leading-[1] tracking-tightest uppercase">
                <span className="block why-headline-line">Your Journey</span>
                <span className="block why-headline-line text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic font-serif font-light lowercase normal-case py-1">is our</span>
                <span className="block why-headline-line">Priority.</span>
              </h2>
              <p className="text-[13px] lg:text-xl text-gray-400 leading-relaxed max-w-[640px] font-medium tracking-tight opacity-90">
                Planning a trip shouldn&apos;t be stressful. We provide the expertise and reliability you need to travel with absolute peace of mind.
              </p>
            </div>

            <div className="why-features-grid grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className="why-feature-tile p-6 lg:p-8 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md group hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-700"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 lg:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <h3 className="text-white text-[15px] lg:text-[20px] font-black tracking-tight mb-2 uppercase leading-tight">{feature.title}</h3>
                  <p className="text-gray-500 text-[12px] lg:text-base leading-relaxed font-medium group-hover:text-gray-300 transition-colors duration-500">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Focused Visual */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[750px] mt-10 lg:mt-0">
             <div className="why-image-parallax-1 relative h-full rounded-[32px] lg:rounded-[64px] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/5 bg-gray-900">
                <Image 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" 
                  alt="Trusted Travel Excellence"
                  fill
                  className="object-cover lg:group-hover:scale-110 transition-all duration-[6s] ease-out brightness-[0.6] group-hover:brightness-90 duration-700"
                />
                
                {/* Reliability Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 text-center space-y-4 lg:space-y-6">
                  <div className="w-16 h-16 lg:w-28 lg:h-28 bg-primary rounded-full mx-auto flex items-center justify-center shadow-3xl animate-pulse">
                    <Shield className="w-8 h-8 lg:w-14 lg:h-14 text-white" />
                  </div>
                  <div className="space-y-1 lg:space-y-2">
                    <p className="text-xl md:text-2xl lg:text-4xl font-black text-white uppercase tracking-tighter">Reliable Experts</p>
                    <p className="text-[10px] lg:text-xs font-black text-white/60 uppercase tracking-[0.4em]">Jade Tours & Travel</p>
                  </div>
                </div>

                {/* Trust Footer */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800" />)}
                    </div>
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-tight">5,000+ Verified <br />Happy Journeys</p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
