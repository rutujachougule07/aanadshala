import { memo } from "react";
import { motion } from "framer-motion";

function BackgroundEffects() {
  return (
    <>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAFF] via-[#F2F7FF] to-white pointer-events-none" />

      {/* Mesh Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none translate-x-[var(--mx)] translate-y-[var(--my)] transition-transform duration-300">
        {/* Pink Floating Background Shape */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="
            absolute
            h-96
            w-96
            rounded-full
            bg-pink-300/20
            blur-[150px]
            transform-gpu
          "
        />

        {/* Blue Floating Background Shape */}
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
          className="
            absolute
            top-[30%]
            right-[-120px]
            h-[520px]
            w-[520px]
            rounded-full
            bg-sky-300/30
            blur-[150px]
            transform-gpu
          "
        />

        {/* Green Floating Background Shape */}
        <motion.div
          animate={{
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="
            absolute
            bottom-[-180px]
            left-[35%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-green-300/20
            blur-[160px]
            transform-gpu
          "
        />
      </div>

      {/* Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none translate-x-[var(--mx)] translate-y-[var(--my)] transition-transform duration-300"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1e3a8a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none translate-x-[var(--mx)] translate-y-[var(--my)] transition-transform duration-300"
        style={{
          backgroundImage: `
            linear-gradient(#999 1px, transparent 1px),
            linear-gradient(90deg, #999 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      {/* Top Light */}
      <motion.div
        animate={{
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          top-0
          left-1/2
          h-96
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-white
          blur-[180px]
          pointer-events-none
          transform-gpu
        "
      />

      {/* Building Sketch */}
      <div className="absolute bottom-0 right-0 z-0 opacity-[0.08] pointer-events-none translate-x-[var(--mx)] translate-y-[var(--my)] transition-transform duration-300">
        <svg
          width="620"
          height="420"
          viewBox="0 0 620 420"
          fill="none"
        >
          {/* Ground */}
          <path
            d="M0 390 H620"
            stroke="#1E3A8A"
            strokeWidth="2"
          />

          {/* Main Building */}
          <rect
            x="180"
            y="120"
            width="180"
            height="230"
            rx="6"
            stroke="#1E3A8A"
            strokeWidth="2"
          />

          {/* Right Wing */}
          <rect
            x="360"
            y="170"
            width="120"
            height="180"
            rx="6"
            stroke="#1E3A8A"
            strokeWidth="2"
          />

          {/* Left Wing */}
          <rect
            x="90"
            y="180"
            width="90"
            height="170"
            rx="6"
            stroke="#1E3A8A"
            strokeWidth="2"
          />

          {/* Windows */}
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={205 + col * 28}
                y={145 + row * 28}
                width="14"
                height="14"
                stroke="#1E3A8A"
                strokeWidth="1"
              />
            ))
          )}
        </svg>
      </div>
    </>
  );
}

export default memo(BackgroundEffects);
