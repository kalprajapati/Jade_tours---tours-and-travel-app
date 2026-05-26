"use client";
import { MessageCircle, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.216 1.36.186 1.872.11.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-2.578l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.149-1.613a11.82 11.82 0 005.895 1.57h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-5 md:bottom-8 right-5 md:right-8 z-[90] flex flex-col gap-3 md:gap-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1],
              // Faster animation for mobile, standard for desktop
            }}
            className="flex flex-col gap-3 md:gap-4"
          >
            {/* WhatsApp */}
            <a
              href={`https://wa.me/919825438324?text=${encodeURIComponent("Hello Jade Tours & Travel! I want to plan a trip and would like to speak with an expert.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white w-14 h-14 rounded-full shadow-[0_20px_40px_rgba(37,211,102,0.3)] transition-all duration-500 hover:scale-110 flex items-center justify-center hover:shadow-[0_25px_50px_rgba(37,211,102,0.5)] active:scale-90"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon />
            </a>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="bg-gray-900 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-110 hover:bg-primary flex items-center justify-center border border-white/5 active:scale-90"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
