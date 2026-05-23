"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "Do you provide visa assistance?",
    answer: "Yes, we provide comprehensive guidance for visitor and business visas. Our experts help with documentation and processing to ensure a hassle-free experience."
  },
  {
    question: "Can you customize travel packages?",
    answer: "Absolutely! We specialize in tailored itineraries. Whether it's a family trip or a solo adventure, we design every detail based on your preferences and budget."
  },
  {
    question: "Do you book international flights?",
    answer: "Yes, we handle both domestic and international flight bookings. We find the best routes and competitive pricing through our network of 150+ airline partners."
  },
  {
    question: "Can you arrange specialized honeymoon trips?",
    answer: "Honeymoons are our specialty. From the Maldives to Bali, we create romantic, well-organized experiences including private transfers and handpicked stays."
  },
  {
    question: "How do I get pricing for my trip?",
    answer: "Getting a quote is simple. Just click any 'Inquire Now' button or message us on WhatsApp with your requirements, and our team will provide customized options quickly."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(".faq-headline-line", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 85%",
          }
        }
      );

      // Accordion items reveal
      gsap.fromTo(".faq-item", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={containerRef} className="py-12 lg:py-32 bg-white overflow-hidden relative border-t border-gray-100 scroll-mt-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,rgba(56,142,60,0.02),transparent_50%)] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Header Side */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32 h-fit">
            <div className="faq-header space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] lg:text-[11px]">
                <span className="w-8 h-[1px] bg-primary/30" />
                Support Center
              </div>
              <h2 className="text-[34px] md:text-[52px] lg:text-[64px] font-sans font-black text-gray-950 leading-[0.95] tracking-tightest uppercase">
                <span className="block faq-headline-line">Common</span>
                <span className="block faq-headline-line text-primary italic font-serif font-light lowercase normal-case py-1">questions</span>
                <span className="block faq-headline-line">Answered.</span>
              </h2>
              <p className="text-[14px] lg:text-[18px] text-gray-500 leading-relaxed max-w-md font-medium tracking-tight">
                Everything you need to know about planning your next journey with Jade Tours & Travel.
              </p>
            </div>

            <div className="pt-4">
               <div className="p-6 lg:p-8 rounded-[32px] bg-gray-50 border border-gray-100 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <HelpCircle className="w-6 h-6" />
                     </div>
                     <p className="font-sans font-black text-gray-950 uppercase tracking-widest text-[13px]">Still have doubts?</p>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Our travel experts are available 24/7 to help you with any specific queries.</p>
                  <MagneticButton 
                    onClick={() => window.open('https://wa.me/919825438324', '_blank')}
                    className="w-full py-4 bg-[#050807] text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl active:scale-95"
                  >
                    Chat With Expert
                  </MagneticButton>
               </div>
            </div>
          </div>

          {/* Accordion Side */}
          <div className="lg:col-span-7 faq-list space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`faq-item group rounded-[24px] lg:rounded-[32px] border transition-all duration-700 overflow-hidden ${
                  openIndex === i 
                    ? "bg-white border-primary/20 shadow-[0_20px_50px_rgba(56,142,60,0.06)]" 
                    : "bg-gray-50/50 border-gray-100 hover:border-primary/20 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 lg:px-10 py-6 lg:py-8 flex items-center justify-between text-left transition-all"
                >
                  <span className={`text-base lg:text-xl font-sans font-black uppercase tracking-tight transition-colors duration-500 ${openIndex === i ? "text-primary" : "text-gray-950"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-700 ${openIndex === i ? "bg-primary text-white rotate-180" : "bg-white text-gray-400 group-hover:text-primary shadow-sm"}`}>
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 lg:px-10 pb-8 lg:pb-10">
                        <div className="h-[1px] w-full bg-gray-100 mb-6 lg:mb-8" />
                        <p className="text-[14px] lg:text-lg text-gray-500 leading-relaxed font-medium tracking-tight">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
