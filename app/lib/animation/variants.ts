import type { Variants } from "framer-motion";
import { ease, duration, stagger } from "./easings";

// ── Reveal variants ────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: ease.reveal },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: ease.out },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.reveal },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.reveal },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: ease.reveal },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: duration.cinematic, ease: ease.inOut },
  },
};

// ── Container stagger wrapper ──────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.tight,
      delayChildren: 0.05,
    },
  },
};

// ── Cinematic word/char reveal ─────────────────────────────────────────────────
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "110%", rotateX: -20 },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.7, ease: ease.reveal },
  },
};

// ── Card hover ─────────────────────────────────────────────────────────────────
export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.35, ease: ease.out },
  },
};
