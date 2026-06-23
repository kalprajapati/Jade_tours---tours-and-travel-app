"use client";

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from "@/components/Hero";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}
import ServicesList from "@/components/ServicesList";
import USP from "@/components/sections/USP";
import ValuesSection from "@/components/sections/ValuesSection";
import TrustSection from "@/components/sections/TrustSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import StatsBar from "@/components/sections/StatsBar";

const PopularDestinations = dynamic(() => import("@/components/sections/PopularDestinations"), { ssr: false });
const TravelCurrencyGuide = dynamic(() => import("@/components/sections/TravelCurrencyGuide"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/luxury/Testimonials"), { ssr: false });
const AirTicketing = dynamic(() => import("@/components/sections/AirTicketing"), { ssr: false });
const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: false });
const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: false });
const InstagramFeed = dynamic(() => import("@/components/sections/InstagramFeed"), { ssr: false });

export default function Home() {
    useEffect(() => {
        // Optimized ScrollTrigger refresh logic
        const handleRefresh = () => ScrollTrigger.refresh();

        const timer = setTimeout(() => {
            handleRefresh();
        }, 1200);

        // Listen for image loads to recalculate heights only when needed
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', handleRefresh);
            }
        });

        return () => {
            clearTimeout(timer);
            images.forEach(img => img.removeEventListener('load', handleRefresh));
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Jade Tours & Travel",
      "description": "Expert travel agency in Ahmedabad providing domestic and international tours, air ticketing, and visa assistance with 15+ years of experience.",
      "image": "https://jadetravels.co.in/assets/image.png",
      "@id": "https://jadetravels.co.in",
      "url": "https://jadetravels.co.in",
      "telephone": "+919825438324",
      "priceRange": "$$ - $$$",
      "areaServed": ["Ahmedabad", "Gujarat", "India"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1st Floor, City Center, MG Road",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "380001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.0225,
        "longitude": 72.5714
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "19:00"
      },
      "sameAs": [
        "https://www.instagram.com/jade.travels/"
      ]
    };

    return (
        <main className="bg-white min-h-screen relative font-sans">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="relative z-30 bg-white">
                {/* 1. Hero Section */}
                <Hero />

                {/* 2. Trust Strip (Stats) */}
                <StatsBar />

                {/* 3. About Section (Values) */}
                <ValuesSection />

                {/* 4. Services Section */}
                <ServicesList />

                {/* 5. Destinations Section */}
                <PopularDestinations />

                {/* 6. Travel Currency Guide */}
                <TravelCurrencyGuide />

                {/* 7. Why Choose Us */}
                <WhyChooseUs />

                {/* 8. Process Section */}
                <USP />

                {/* 9. Testimonials */}
                <Testimonials />

                {/* 10. Special Air Ticketing */}
                <AirTicketing />

                {/* 11. FAQ Section */}
                <FAQ />

                {/* 12. CTA Section */}
                <CTASection />
            </div>
        </main>
    );
}
