"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "button",
  href,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const motionProps = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    className,
    animate: { x: offset.x, y: offset.y },
    transition: { type: "spring" as const, stiffness: 350, damping: 20, mass: 0.5 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (as === "a") {
    return (
      <motion.a
        {...(motionProps as unknown as React.ComponentProps<typeof motion.a>)}
        href={href}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
