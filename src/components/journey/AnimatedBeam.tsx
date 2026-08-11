import { memo } from "react";
import { motion } from "framer-motion";

const pathD = `M130 40 C230 170 30 260 130 420 C230 560 30 660 130 820 C230 980 30 1090 130 1260`;

function AnimatedBeam() {
  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[260px] pointer-events-none z-0">
      <svg viewBox="0 0 260 1500" className="w-full h-full" preserveAspectRatio="none">
        <motion.circle
          r="8"
          fill="white"
          style={{
            offsetPath: `path('${pathD}')`,
            filter: "drop-shadow(0 0 10px white)",
          }}
          animate={{
            offsetDistance: ["0%", "100%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}

export default memo(AnimatedBeam);
