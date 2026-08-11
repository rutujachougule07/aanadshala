import { useMotionValue } from "framer-motion";
import { useCallback } from "react";

export function useMouseParallax(divider = 30) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      x.set((e.clientX - window.innerWidth / 2) / divider);
      y.set((e.clientY - window.innerHeight / 2) / divider);
    },
    [divider, x, y]
  );

  return { x, y, handleMouseMove };
}
