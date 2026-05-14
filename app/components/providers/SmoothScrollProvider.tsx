"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Expose on window so GSAP ScrollTrigger can sync
    (window as unknown as Record<string, unknown>).__lenis__ = lenis;

    let active = true;

    function raf(time: number) {
      if (!active) return;
      lenis.raf(time);
      if (active) {
        frameIdRef.current = requestAnimationFrame(raf);
      }
    }
    frameIdRef.current = requestAnimationFrame(raf);

    return () => {
      active = false;
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      frameIdRef.current = null;
      delete (window as unknown as Record<string, unknown>).__lenis__;
    };
  }, []);

  return <>{children}</>;
}
