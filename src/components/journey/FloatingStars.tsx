import { memo } from "react";
import { motion } from "framer-motion";

function FloatingStars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.4, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default memo(FloatingStars);
