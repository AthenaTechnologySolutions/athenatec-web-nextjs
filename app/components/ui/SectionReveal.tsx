"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "@/app/lib/animation/variants";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  id?: string;
}

export default function SectionReveal({
  children,
  className,
  delay = 0,
  stagger: useStagger = true,
  id,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      variants={useStagger ? staggerContainer : fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={delay ? { delayChildren: delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
