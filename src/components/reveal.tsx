"use client";

import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

const compactQuery = "(max-width: 1023px)";

function subscribeToCompact(callback: () => void) {
  const media = window.matchMedia(compactQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getCompactSnapshot() {
  return window.matchMedia(compactQuery).matches;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const compact = useSyncExternalStore(subscribeToCompact, getCompactSnapshot, () => true);
  const shouldReduce = reduceMotion || compact;

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.58, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
