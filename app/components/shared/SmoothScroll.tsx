"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { ScrollContext } from "@/app/context/ScrollContext";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    scrollRef.current = new LocomotiveScroll({
      lenisOptions: {
        wrapper: containerRef.current,
        content: containerRef.current,
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
      },
    });

    return () => {
      scrollRef.current?.destroy();
      scrollRef.current = null;
    };
  }, []);

  return (
    <ScrollContext.Provider value={containerRef}>
      <div
        ref={containerRef}
        data-scroll-container
        style={{ height: "100vh", overflowY: "auto" }}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
}
