import type { Variants } from "framer-motion";
import { duration, ease, stagger } from "./easings";

export const leadershipPageReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: ease.reveal },
  },
};

export const leadershipStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.08,
    },
  },
};

export const leadershipCardMotion = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    transition: { duration: duration.fast, ease: ease.out },
  },
} satisfies Variants;
