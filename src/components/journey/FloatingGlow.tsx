import { memo } from "react";
import { motion } from "framer-motion";

function FloatingGlow() {
  return (
    <>
      {/* Pink Glow */}
      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
        }}
        className="
        absolute
        -left-40
        top-20
        h-105
        w-105
        rounded-full
        bg-pink-300/20
        blur-[140px]
        pointer-events-none
        transform-gpu
        "
      />

      {/* Blue Glow */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="
        absolute
        right-[-120px]
        top-[30%]
        h-125
        w-125
        rounded-full
        bg-blue-300/20
        blur-[170px]
        pointer-events-none
        transform-gpu
        "
      />

      {/* Green Glow */}
      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
        }}
        className="
        absolute
        bottom-[-180px]
        left-[35%]
        h-112.5
        w-112.5
        rounded-full
        bg-green-300/20
        blur-[160px]
        pointer-events-none
        transform-gpu
        "
      />
    </>
  );
}

export default memo(FloatingGlow);
