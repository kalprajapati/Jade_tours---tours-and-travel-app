"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "Jade Tours handled our Dubai trip perfectly. Flights, hotel, and visa process were seamless. The coordination was truly smooth.",
    highlight: "Dubai trip perfectly",
    author: "Amit S.",
    role: "Family Traveler",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    location: "Ahmedabad, India"
  },
  {
    quote: "Booked a last-minute flight to Singapore. The team was incredibly quick and got me the best price compared to online portals.",
    highlight: "best price",
    author: "Rahul M.",
    role: "Business Trip",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    location: "Mumbai, India"
  },
  {
    quote: "Our Bali honeymoon was unforgettable. Everything from transfers to tours was well-organized. We didn't have to worry about a thing.",
    highlight: "well-organized",
    author: "Priya D.",
    role: "Honeymoon Trip",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    location: "Pune, India"
  },
  {
    quote: "Reliable visa assistance. They guided us through every step for our Europe tour documentation. Highly recommend their services!",
    highlight: "Reliable visa assistance",
    author: "Sneha K.",
    role: "Group Traveler",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
    location: "Delhi, India"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline Reveal
      gsap.fromTo(".testimonials-headline-line", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".testimonials-header",
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={containerRef} className="py-12 lg:py-32 bg-white overflow-hidden relative scroll-mt-24 border-t border-gray-100">
      {/* Subtle Background Atmosphere */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,rgba(56,142,60,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="testimonials-header flex flex-col items-center text-center mb-12 lg:mb-24 space-y-6">
          <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] lg:text-[11px] mb-2">
            <span className="w-8 h-[1px] bg-primary/30" />
            Social Proof
            <span className="w-8 h-[1px] bg-primary/30" />
          </div>
          <h2 className="text-[34px] md:text-[52px] lg:text-[68px] xl:text-[80px] font-sans font-black text-gray-950 leading-[0.95] lg:leading-[1] tracking-tightest uppercase max-w-5xl">
            <span className="block testimonials-headline-line">What Our</span>
            <span className="block testimonials-headline-line text-primary italic font-serif font-light lowercase normal-case py-1">happy</span>
            <span className="block testimonials-headline-line">Clients Say.</span>
          </h2>
        </div>

        {/* Carousel Layout */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Image Side */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square rounded-[32px] lg:rounded-[64px] overflow-hidden shadow-2xl border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].author} 
                      fill 
                      className="object-cover" 
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
              </div>
              
              {/* Controls (Mobile) */}
              <div className="flex lg:hidden justify-center gap-4 mt-8">
                <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right: Content Side */}
            <div className="lg:col-span-7 lg:pl-12">
              <div className="space-y-8 lg:space-y-12">
                <div className="relative">
                  <Quote className="w-16 h-16 lg:w-24 lg:h-24 text-primary/10 absolute -top-8 -left-8 lg:-top-12 lg:-left-12 -z-10" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                      className="space-y-8"
                    >
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-accent-gold text-accent-gold" />
                        ))}
                      </div>
                      <blockquote className="text-xl md:text-3xl lg:text-[38px] font-sans font-black text-gray-950 leading-[1.3] tracking-tightest">
                        &ldquo;{testimonials[activeIndex].quote.split(testimonials[activeIndex].highlight)[0]}
                        <span className="text-primary border-b-2 border-primary/20">{testimonials[activeIndex].highlight}</span>
                        {testimonials[activeIndex].quote.split(testimonials[activeIndex].highlight)[1]}&rdquo;
                      </blockquote>
                      <div className="flex flex-col">
                        <span className="text-xl lg:text-3xl font-sans font-black text-gray-950 uppercase tracking-tighter">{testimonials[activeIndex].author}</span>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[10px] lg:text-[12px] font-black text-primary uppercase tracking-widest">{testimonials[activeIndex].role}</span>
                          <div className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-[10px] lg:text-[12px] font-bold text-gray-400 uppercase tracking-widest">{testimonials[activeIndex].location}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Controls (Desktop) */}
                <div className="hidden lg:flex items-center gap-8 pt-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={prevTestimonial}
                      className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all active:scale-90 group"
                    >
                      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all active:scale-90 group"
                    >
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="h-[1px] flex-1 bg-gray-100 relative">
                    <motion.div 
                      className="absolute inset-0 bg-primary origin-left"
                      animate={{ scaleX: (activeIndex + 1) / testimonials.length }}
                    />
                  </div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Trusted By Bar */}
        <div className="mt-16 lg:mt-32 pt-12 border-t border-gray-100 flex flex-wrap justify-center items-center gap-10 lg:gap-24 opacity-60">
           <div className="flex items-center gap-3">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-[10px] lg:text-[11px] font-black text-gray-950 uppercase tracking-[0.4em]">GOOGLE VERIFIED</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-2xl lg:text-3xl font-black text-gray-950">4.9/5</span>
              <span className="text-[10px] lg:text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">AVG RATING</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="text-2xl lg:text-3xl font-black text-gray-950">2300+</span>
              <span className="text-[10px] lg:text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">REVIEWS</span>
           </div>
        </div>
      </div>
    </section>
  );
}
