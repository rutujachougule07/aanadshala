import React, { memo } from "react";
import { motion } from "framer-motion";

interface TimelineNodeProps {
  color: string;
  icon: React.ReactNode;
}

function TimelineNode({ color, icon }: TimelineNodeProps) {
  return (
    <div className="relative flex items-center justify-center transform-gpu">
      {/* Ripple 1 */}
      <motion.div
        animate={{
          scale: [1, 1.8],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute h-32 w-32 rounded-full pointer-events-none transform-gpu"
        style={{
          border: `2px solid ${color}`,
        }}
      />

      {/* Ripple 2 */}
      <motion.div
        animate={{
          scale: [1, 2.3],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 2,
          delay: 1,
          repeat: Infinity,
        }}
        className="absolute h-32 w-32 rounded-full pointer-events-none transform-gpu"
        style={{
          border: `2px solid ${color}`,
        }}
      />

      {/* Glow */}
      <div
        className="absolute h-36 w-36 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          background: color,
        }}
      />

      {/* Floating Motion Container */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 flex items-center justify-center transform-gpu"
      >
        {/* Outer Ring */}
        <div
          className="
            relative
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-[0_20px_50px_rgba(0,0,0,.12)]
            overflow-hidden
          "
        >
          {/* Gradient Ring */}
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: `linear-gradient(
                135deg,
                ${color}25,
                white,
                ${color}15
              )`,
            }}
          />

          {/* Inner Glass Circle */}
          <div
            className="
              relative
              z-20
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-white/80
              backdrop-blur-xl
              shadow-lg
              text-5xl
            "
          >
            {icon}
          </div>

          {/* Center Shine */}
          <div
            className="
              absolute
              top-3
              left-1/2
              -translate-x-1/2
              h-5
              w-14
              rounded-full
              bg-white/70
              blur-md
              z-30
              pointer-events-none
            "
          />
        </div>

        {/* Orbit Dot */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 pointer-events-none transform-gpu"
        >
          <div
            className="
              absolute
              left-1/2
              -top-2
              -translate-x-1/2
              h-4
              w-4
              rounded-full
              shadow-md
            "
            style={{
              background: color,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(TimelineNode);
