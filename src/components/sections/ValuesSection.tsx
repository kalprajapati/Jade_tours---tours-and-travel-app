"use client";
import { useEffect, useRef } from "react";
import { CheckCircle2, Shield, Globe2, Compass } from "lucide-react";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline Stagger
      gsap.fromTo(".about-headline-line", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 90%",
          }
        }
      );

      // Image Reveal
      gsap.fromTo(imageRef.current, 
        { opacity: 0, x: 30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          }
        }
      );

      // Mission points reveal
      gsap.fromTo(".mission-point", 
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mission-list",
            start: "top 90%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-12 lg:py-32 bg-white overflow-hidden relative border-t border-gray-100 scroll-mt-24">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,rgba(56,142,60,0.03),transparent_60%)] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Content Side */}
          <div className="w-full lg:w-3/5 space-y-8 lg:space-y-12">
            <div className="about-header space-y-4 lg:space-y-8">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] lg:text-[11px] mb-2 lg:mb-4">
                <span className="w-8 h-[1px] bg-primary/30" />
                About Jade Tours & Travel
              </div>
              <h2 className="text-[34px] md:text-[52px] lg:text-[68px] xl:text-[76px] font-sans font-black text-gray-950 leading-[0.95] lg:leading-[1] tracking-tightest uppercase">
                <span className="block about-headline-line">Your Trusted</span>
                <span className="block about-headline-line text-primary italic font-serif font-light lowercase normal-case py-1">travel</span>
                <span className="block about-headline-line">Consultant.</span>
              </h2>
              <div className="space-y-6">
                <p className="text-[15px] lg:text-2xl text-gray-700 leading-relaxed font-semibold tracking-tight">
                  At Jade Tours & Travels, we believe every journey should be smooth, memorable, and stress-free.
                </p>
                <p className="text-[14px] lg:text-[18px] text-gray-500 leading-relaxed max-w-[640px] font-medium tracking-tight">
                  From expert air ticketing to customized holiday planning, we provide reliable travel assistance tailored exactly to your needs. With over 15 years of industry experience, our team is dedicated to making your travel dreams a reality.
                </p>
              </div>
            </div>

            <div className="mission-list space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-12 bg-primary/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Our Mission</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  { title: "Smooth Journeys", desc: "Handling every detail so you don't have to.", icon: Compass },
                  { title: "Personalized Plans", desc: "Trips designed around your style and budget.", icon: Globe2 },
                  { title: "Total Reliability", desc: "Trusted by thousands for transparent service.", icon: Shield },
                  { title: "24/7 Assistance", desc: "We are always here when you need us.", icon: CheckCircle2 }
                ].map((point, i) => (
                  <div key={i} className="mission-point group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-500">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <point.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans font-black text-[13px] lg:text-base text-gray-950 uppercase mb-1">{point.title}</h3>
                      <p className="text-[11px] lg:text-sm text-gray-500 font-medium">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 lg:gap-10">
              <MagneticButton 
                onClick={() => {
                  const message = encodeURIComponent("Hello Jade Tours & Travel! I want to plan an amazing journey.");
                  window.open(`https://wa.me/919825438324?text=${message}`, '_blank');
                }}
                className="w-full sm:w-auto px-10 py-5 lg:px-14 lg:py-6 bg-primary text-white font-black rounded-full shadow-[0_20px_60px_rgba(56,142,60,0.3)] hover:bg-primary-dark transition-all text-[11px] lg:text-xs uppercase tracking-[0.4em] relative overflow-hidden group active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">Start Your Journey</span>
              </MagneticButton>
              <button 
                onClick={() => {
                  const element = document.getElementById('services');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] lg:text-[11px] hover:text-primary transition-all flex items-center justify-center sm:justify-start gap-4 group"
              >
                <span>Our Services</span>
                <div className="w-12 h-[1px] bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                </div>
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div ref={imageRef} className="w-full lg:w-2/5 relative">
            <div className="relative aspect-[4/5] rounded-[32px] lg:rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 group">
              <Image 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop" 
                alt="Jade Tours Travel Expert Desk" 
                fill 
                className="object-cover transition-all duration-[4s] ease-out group-hover:scale-110 duration-700" 
              />              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              {/* Experience Badge */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white max-w-[200px]">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Experience</p>
                <p className="text-3xl font-black text-gray-950 leading-none mb-2 tracking-tighter">15+ Years</p>
                <p className="text-[11px] text-gray-500 font-bold leading-tight">Serving travelers with absolute excellence since 2011.</p>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] -z-10 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
