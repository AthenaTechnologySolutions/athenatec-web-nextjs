"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { fadeUp } from "@/app/lib/animation/variants";

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  const visibleTransition =
    variants.visible && typeof variants.visible === "object" && "transition" in variants.visible
      ? (variants.visible as Record<string, unknown>).transition
      : {};

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as Record<string, unknown>),
          transition: {
            ...(visibleTransition as Record<string, unknown>),
            ...(delay > 0 ? { delay } : {}),
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
