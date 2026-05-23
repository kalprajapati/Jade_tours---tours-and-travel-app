"use client";
import React, { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ScrollSync() {
  useLenis((lenis) => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger on any major layout changes
    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    ro.observe(document.body);
    
    return () => ro.disconnect();
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.15,
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <ScrollSync />
      {children as any}
    </ReactLenis>
  );
}

