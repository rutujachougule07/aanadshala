import React, { memo } from "react";
import { motion, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function MagneticButton({
  children = "पूर्ण प्रवास पहा",
  className = "",
  onClick,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const move = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x, y }}
      onMouseMove={move}
      onMouseLeave={reset}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className || "relative overflow-hidden rounded-full bg-gradient-to-r from-pink-400 to-blue-500 text-white font-bold text-lg px-9 py-4 shadow-xl transition-shadow duration-300 hover:shadow-pink-400/25 cursor-pointer z-10"}
    >
      {children}
    </motion.button>
  );
}

export default memo(MagneticButton);
