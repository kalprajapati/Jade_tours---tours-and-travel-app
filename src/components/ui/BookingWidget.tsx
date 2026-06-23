"use client";
import { useState, useRef, useEffect } from "react";
import { Plane, Hotel, Package, Landmark, Search, Calendar, MapPin, Users, ArrowLeftRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const tabs = [
  { id: "flights", label: "FLIGHTS", icon: Plane },
  { id: "hotels", label: "HOTELS", icon: Hotel },
  { id: "packages", label: "PACKAGES", icon: Package },
  { id: "visa", label: "VISA", icon: Landmark },
];

const subTypeOptions: Record<string, string[]> = {
  hotels: ["Luxury Resort", "Boutique Hotel", "Private Villa"],
  visa: ["Visitor Visa", "Business Visa", "Study Visa"],
  packages: ["Custom Tour", "Group Package", "Family Trip"],
};

export default function BookingWidget() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("flights");
  const [tripType, setTripType] = useState("one-way");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    travellers: "1 Traveler",
    subType: "" 
  });
  
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!widgetRef.current) return;
      const { left, top, width, height } = widgetRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(widgetRef.current, {
        rotateX: -y * 6,
        rotateY: x * 6,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(widgetRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const widget = widgetRef.current;
    if (widget) {
      widget.addEventListener("mousemove", handleMouseMove);
      widget.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (widget) {
        widget.removeEventListener("mousemove", handleMouseMove);
        widget.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const defaults: Record<string, string> = {
      hotels: subTypeOptions.hotels[0],
      visa: subTypeOptions.visa[0],
      packages: subTypeOptions.packages[0]
    };
    setFormData(prev => ({ ...prev, subType: defaults[tabId] || "" }));
  };

  const isReturnDisabled = mounted && activeTab === "flights" && tripType === "one-way";

  const handleSearch = () => {
    const { from, to, departure, returnDate, travellers, subType } = formData;
    let message = `Hello Jade Tours & Travel! I want to plan a trip.\n\n`;
    
    if (activeTab === "flights") {
      message += `✈️ FLIGHT BOOKING\n` +
        `• Type: ${tripType}\n` +
        `• From: ${from}\n` +
        `• To: ${to}\n` +
        `• Date: ${departure}\n` +
        (tripType !== 'one-way' ? `• Return: ${returnDate}\n` : '') +
        `• Travelers: ${travellers}`;
    } else if (activeTab === "hotels") {
      message += `🏨 HOTEL BOOKING\n` +
        `• Stay Type: ${subType}\n` +
        `• Location: ${to}\n` +
        `• Check-in: ${departure}\n` +
        `• Check-out: ${returnDate}\n` +
        `• Travelers: ${travellers}`;
    } else if (activeTab === "packages") {
      message += `📦 TOUR PACKAGE\n` +
        `• Trip Type: ${subType}\n` +
        `• Destination: ${to}\n` +
        `• Date: ${departure}\n` +
        `• Travelers: ${travellers}`;
    } else if (activeTab === "visa") {
      message += `🛂 VISA ASSISTANCE\n` +
        `• Visa Type: ${subType}\n` +
        `• Country: ${to}\n` +
        `• Date: ${departure}\n` +
        `• Travelers: ${travellers}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919825438324?text=${encodedMessage}`, '_blank');
  };

  return (
    <div 
      ref={widgetRef}
      className="z-100 bg-white/95 backdrop-blur-2xl rounded-[28px] lg:rounded-[32px] p-4 lg:p-6 w-full max-w-[520px] mx-auto relative border border-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] perspective-2000 transition-all duration-700"
    >
      {/* Precision Detail Elements */}
      <div className="absolute top-4 left-5 right-5 flex justify-between opacity-10 pointer-events-none">
         <div className="w-1 h-1 rounded-full bg-primary" />
         <div className="w-1 h-1 rounded-full bg-primary" />
      </div>
      
      {/* Header Info */}
      <div className="flex items-center gap-1.5 mb-3 lg:mb-4 justify-center">
         <Sparkles className="w-2.5 h-2.5 text-primary" />
         <span className="text-[7px] lg:text-[8px] font-black text-primary uppercase tracking-[0.4em] lg:tracking-[0.5em]">Plan Your Trip</span>
      </div>

      {/* Modern High-End Tabs */}
      <div className="flex items-center justify-between mb-4 lg:mb-5 pb-0.5 relative gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 flex-1 transition-all relative group ${
              activeTab === tab.id
                ? "text-gray-950"
                : "text-gray-500/60 hover:text-gray-700"
            }`}
          >
            <div className={`w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-700 ${activeTab === tab.id ? "bg-[#050807] text-white shadow-md" : "bg-gray-50/50 border border-gray-100 group-hover:bg-white text-gray-400"}`}>
              <tab.icon className="w-3.5 lg:w-5 lg:h-5" strokeWidth={activeTab === tab.id ? 2 : 1.5} />
            </div>
            <span className="text-[6px] lg:text-[7px] font-black uppercase tracking-[0.1em] whitespace-nowrap">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeGlow"
                className="absolute -bottom-1 lg:-bottom-1.5 w-1 lg:w-1 h-1 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      {/* Flight Type Options */}
      <AnimatePresence mode="wait">
        {activeTab === "flights" && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center justify-center gap-4 lg:gap-5 mb-3 lg:mb-4"
          >
            {[
              { id: "one-way", label: "One Way" },
              { id: "round-trip", label: "Round Trip" },
              { id: "multi-city", label: "Multi City" },
            ].map((type) => (
              <button 
                key={type.id}
                onClick={() => setTripType(type.id)}
                className={`text-[6px] lg:text-[7px] font-black uppercase tracking-[0.1em] lg:tracking-[0.15em] transition-all relative py-1 ${tripType === type.id ? "text-primary" : "text-gray-400 hover:text-gray-600"}`}
              >
                {type.label}
                {tripType === type.id && (
                  <motion.div layoutId="typeLine" className="absolute bottom-0 left-0 w-full h-[1px] bg-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Fields - Editorial Grid */}
      <div className="space-y-2 lg:space-y-3">
        <div className={`relative flex flex-col ${activeTab === "flights" ? "sm:grid sm:grid-cols-2" : ""} gap-2.5`}>
          {activeTab === "flights" && (
            <div className="space-y-0.5 lg:space-y-1">
              <label htmlFor="from-input" className="text-[6px] lg:text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 font-serif italic leading-none">From</label>
              <div className="relative group">
                <input 
                  id="from-input"
                  name="from"
                  type="text" 
                  placeholder="Departure city"
                  value={formData.from}
                  onChange={(e) => setFormData({...formData, from: e.target.value})}
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-[10px] lg:rounded-[12px] h-9 lg:h-11 px-3 lg:px-4 text-[9px] lg:text-[10px] font-black text-gray-950 focus:outline-none focus:border-primary/30 focus:bg-white transition-all placeholder:text-gray-400 uppercase tracking-tight"
                />
              </div>
            </div>
          )}
          
          {activeTab === "flights" && (
            <button 
              onClick={() => setFormData({ ...formData, from: formData.to, to: formData.from })}
              aria-label="Swap locations"
              className="absolute left-[85%] sm:left-1/2 top-[32px] sm:top-[34px] -translate-x-1/2 w-6 h-6 rounded-lg bg-[#050807] text-white flex items-center justify-center transition-all shadow-md z-10 hover:rotate-180 duration-700 active:scale-90 border border-white/20"
            >
              <ArrowLeftRight className="w-2.5 h-2.5" />
            </button>
          )}

          <div className="space-y-0.5 lg:space-y-1">
            <label htmlFor="to-input" className="text-[6px] lg:text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 font-serif italic leading-none">
              {activeTab === "flights" ? "To" : activeTab === "hotels" ? "Location" : "Destination"}
            </label>
            <div className="relative group">
              <input 
                id="to-input"
                name="to"
                type="text" 
                placeholder={activeTab === "visa" ? "Country name" : "Where to go?"}
                value={formData.to}
                onChange={(e) => setFormData({...formData, to: e.target.value})}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[10px] lg:rounded-[12px] h-9 lg:h-11 px-3 lg:px-4 text-[9px] lg:text-[10px] font-black text-gray-950 focus:outline-none focus:border-primary/30 focus:bg-white transition-all placeholder:text-gray-400 uppercase tracking-tight"
              />
            </div>
          </div>
        </div>

        <div className={`grid ${activeTab === "visa" || activeTab === "packages" ? "grid-cols-1" : "grid-cols-2"} gap-2.5`}>
          <div className="space-y-0.5 lg:space-y-1">
            <label htmlFor="departure-input" className="text-[6px] lg:text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 font-serif italic leading-none">
              {activeTab === "hotels" ? "Check-in" : "Date"}
            </label>
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-primary opacity-30" />
              <input 
                id="departure-input"
                name="departure"
                type="text" 
                placeholder="Select date"
                value={formData.departure}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(e) => setFormData({...formData, departure: e.target.value})}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[10px] lg:rounded-[12px] h-9 lg:h-11 pl-8 lg:pl-9 pr-3 text-[8px] lg:text-[9px] font-black text-gray-950 focus:outline-none focus:border-primary/30 transition-all cursor-pointer uppercase"
              />
            </div>
          </div>
          
          {(activeTab === "flights" || activeTab === "hotels") && (
            <div className="space-y-0.5 lg:space-y-1">
              <label htmlFor="return-input" className="text-[6px] lg:text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 font-serif italic leading-none">
                {activeTab === "hotels" ? "Check-out" : "Return Date"}
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-primary opacity-30" />
                <input 
                  id="return-input"
                  name="return"
                  type="text" 
                  placeholder="Select date"
                  value={formData.returnDate}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                  disabled={isReturnDisabled}
                  className={`w-full bg-gray-50/50 border border-gray-100 rounded-[10px] lg:rounded-[12px] h-9 lg:h-11 pl-8 lg:pl-9 pr-3 text-[8px] lg:text-[9px] font-black text-gray-950 focus:outline-none focus:border-primary/30 transition-all cursor-pointer uppercase ${isReturnDisabled ? "opacity-20 grayscale cursor-not-allowed" : ""}`}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-0.5 lg:space-y-1">
          <label htmlFor="travelers-select" className="text-[6px] lg:text-[7px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 font-serif italic leading-none">
            Travelers
          </label>
          <div className="relative group">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-primary opacity-30" />
            <select 
              id="travelers-select"
              name="travelers"
              value={formData.travellers}
              onChange={(e) => setFormData({...formData, travellers: e.target.value})}
              className="w-full bg-gray-50/50 border border-gray-100 rounded-[10px] lg:rounded-[12px] h-9 lg:h-11 pl-8 lg:pl-9 pr-7 text-[8px] lg:text-[9px] font-black text-gray-950 appearance-none focus:outline-none focus:border-primary/30 transition-all cursor-pointer uppercase"
            >
              <option>1 Traveler</option>
              <option>2 Travelers</option>
              <option>Family (2+2)</option>
              <option>Group (5+)</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black h-10 lg:h-12 rounded-[12px] lg:rounded-[14px] flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-[0.98] group mt-2 lg:mt-3 relative overflow-hidden"
        >
          <span className="uppercase tracking-[0.1em] lg:tracking-[0.15em] text-[9px] lg:text-[10px] font-black">Enquire on WhatsApp</span>
          <div className="absolute right-2.5 lg:right-3 w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Search className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
          </div>
        </button>
        
        <p className="text-center text-[5px] lg:text-[7px] font-bold text-gray-300 uppercase tracking-[0.15em] pt-0.5 leading-none">
          Trusted by thousands of travelers
        </p>
      </div>
    </div>
  );
}
