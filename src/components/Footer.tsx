"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Mail, Phone, MapPin, Clock,
  ArrowRight, Star, Sparkles, ChevronUp, Globe, Shield, Compass
} from "lucide-react";
import { Instagram } from "@/components/ui/InstagramIcon";
import { Facebook, Twitter, Youtube } from "@/components/ui/SocialIcons";
import MagneticButton from "@/components/ui/MagneticButton";
import { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Why Us", href: "#why-us" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQs", href: "#home" },
];

const serviceLinks = [
  { name: "Flight Booking", href: "#services" },
  { name: "International Tours", href: "#services" },
  { name: "Domestic Tours", href: "#services" },
  { name: "Visa Assistance", href: "#services" },
  { name: "Hotel Bookings", href: "#services" },
  { name: "Travel Planning", href: "#services" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms & Conditions", href: "#" },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-column", 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <footer ref={containerRef} className="bg-[#00110D] text-white pt-12 pb-8 scroll-mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="footer-column lg:col-span-4 space-y-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-white">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 5C20 5 10 15 10 25C10 35 20 35 20 35C20 35 30 35 30 25C30 15 20 5 20 5Z" fill="white" opacity="0.1"/>
                  <path d="M20 10C20 10 15 18 15 25C15 32 20 32 20 32C20 32 25 32 25 25C25 18 20 10 20 10Z" fill="white"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-3xl tracking-tight leading-none text-white">Jade</span>
                <span className="text-[7px] font-black uppercase tracking-[0.3em] text-[#4CAF50] mt-1">TOURS & TRAVELS</span>
              </div>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm font-medium">
              Personalized travel experiences with reliable support.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray-500 hover:bg-[#4CAF50] hover:text-white hover:border-[#4CAF50] transition-all duration-500 shadow-sm active:bg-[#4CAF50] active:text-white active:scale-95"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column lg:col-span-2 space-y-8">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#4CAF50] transition-all text-sm font-bold block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-column lg:col-span-3 space-y-8">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Our Services</h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#4CAF50] transition-all text-sm font-bold block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-column lg:col-span-3 space-y-10">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#4CAF50] group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-500">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Call Us</span>
                  <span className="text-base font-bold text-white tracking-tight">+91 98765 43210</span>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#4CAF50] group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Email</span>
                  <span className="text-base font-bold text-white tracking-tight">info@jadetours.com</span>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-[#4CAF50] group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Location</span>
                  <span className="text-base font-bold leading-snug text-white tracking-tight">123, MG Road, Indore,<br />Madhya Pradesh, India</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 space-y-5 border-t border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Working Hours</span>
                  <div className="flex flex-col text-[13px] font-bold text-gray-300 gap-0.5">
                    <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                    <span>Sunday: 11:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] text-gray-600 text-center">© 2024 Jade Tours & Travels. All Rights Reserved.</p>
          <div className="flex items-center gap-6 lg:gap-10">
            {legalLinks.map(link => (
              <Link key={link.name} href={link.href} className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] text-gray-600 hover:text-white transition-all active:text-white">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
