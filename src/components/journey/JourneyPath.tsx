import { memo } from "react";
import { motion } from "framer-motion";

const pathD = `M130 40 C230 180 40 320 130 520 C220 700 60 900 130 1120 C210 1320 50 1520 130 1750 C220 1920 70 2050 130 2160`;

function JourneyPath() {
  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[260px] pointer-events-none z-0">
      <svg
        width="260"
        height="2200"
        viewBox="0 0 260 2200"
        fill="none"
        className="overflow-visible"
      >
        {/* Glow */}
        <motion.path
          d={pathD}
          stroke="url(#glow)"
          strokeWidth="22"
          strokeLinecap="round"
          opacity=".15"
          filter="url(#blur)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{
            duration: 2.5,
          }}
        />

        {/* Main */}
        <motion.path
          d={pathD}
          stroke="url(#line)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          whileInView={{
            pathLength: 1,
          }}
          transition={{
            duration: 2,
          }}
        />

        <defs>
          <linearGradient
            id="line"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="35%" stopColor="#2563EB" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          <linearGradient
            id="glow"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          <filter id="blur">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default memo(JourneyPath);
