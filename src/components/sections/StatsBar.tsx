"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Happy Travelers", value: "1000+", sub: "Trust & Service" },
  { label: "Global Coverage", value: "Tours", sub: "Domestic & Int'l" },
  { label: "Custom Service", value: "Assistance", sub: "Personalized Care" },
  { label: "Flight Booking", value: "Reliable", sub: "Global Network" },
];

export default function StatsBar() {
  return (
    <section className="relative z-30 py-6 lg:py-10 bg-[#050807] overflow-hidden border-y border-white/5">
      {/* Subtle Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(56,142,60,0.1),transparent)] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-0 items-center justify-items-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group cursor-default relative w-full px-4"
            >
              <div className="flex flex-col items-center">
                <div className="text-xl lg:text-[32px] font-sans font-black text-white tracking-tightest leading-none mb-2 group-hover:text-primary transition-colors duration-500 uppercase">
                  {stat.value}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[7px] lg:text-[8px] text-white/30 uppercase tracking-[0.1em] font-bold">
                    {stat.sub}
                  </span>
                </div>
              </div>
              
              {/* Vertical Divider (Desktop Only) */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute -right-[1px] top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
