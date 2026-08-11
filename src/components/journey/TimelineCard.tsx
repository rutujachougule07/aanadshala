import React, { memo } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

interface TimelineCardProps {
  title: string;
  description: string;
  date?: string;
  year?: string;
  side: "left" | "right";
  color: string;
  icon: React.ReactNode;
}

function TimelineCard({
  title,
  description,
  date,
  year,
  side,
  color,
  icon,
}: TimelineCardProps) {
  const displayDate = year || date || "";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: side === "left" ? -100 : 100,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="relative w-full max-w-[520px] transform-gpu will-change-transform"
    >
      {/* Floating Particles */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          -left-5
          -top-5
          h-8
          w-8
          rounded-full
          blur-md
          pointer-events-none
          z-10
          transform-gpu
        "
        style={{
          background: color,
        }}
      />

      {/* Glass Card */}
      <div
        className="
          group
          relative
          w-full
          lg:w-[520px]
          min-h-[200px]
          p-5
          sm:p-10
          rounded-[24px]
          sm:rounded-[36px]
          border
          border-white/40
          bg-white/70
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,.08)]
          overflow-hidden
          transition-all
          duration-500
          hover:-translate-y-2
          sm:hover:-translate-y-4
          hover:shadow-[0_40px_100px_rgba(0,0,0,.18)]
          transform-gpu
        "
      >
        {/* Card Shine Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          <motion.div
            animate={{
              x: ["-150%", "150%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute top-0 h-full w-40 -skew-x-12 bg-white/30 blur-lg transform-gpu"
          />
        </div>

        {/* Gradient Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none"
          style={{
            background: `linear-gradient(
              135deg,
              ${color}15,
              transparent,
              ${color}10
            )`,
          }}
        />

        {/* Left Gradient Border */}
        <div
          className="
            absolute
            left-0
            top-6
            bottom-6
            w-[4px]
            sm:w-[5px]
            rounded-full
            z-10
          "
          style={{
            background: color,
          }}
        />

        {/* Date / Year Badge */}
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-white shadow-lg text-xs sm:text-base"
            style={{
              background: color,
            }}
          >
            <CalendarDays size={14} className="sm:w-4 sm:h-4" />
            <span className="font-semibold">{displayDate}</span>
          </div>
        </div>

        {/* Title */}
        <h2
          className="
            mt-4
            sm:mt-6
            pr-0
            sm:pr-28
            text-[22px]
            sm:text-[34px]
            font-black
            leading-tight
            text-[#1f2b8d]
            relative
            z-10
          "
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="
            mt-3
            sm:mt-5
            pr-0
            sm:pr-28
            leading-7
            sm:leading-8
            text-gray-600
            text-sm
            sm:text-lg
            relative
            z-10
          "
        >
          {description}
        </p>

        {/* Glass Icon Circle */}
        <div
          className="
            absolute
            top-5
            sm:top-1/2
            sm:-translate-y-1/2
            right-4
            sm:right-8
            z-20
            pointer-events-none
          "
        >
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="
              h-14
              w-14
              sm:h-28
              sm:w-28
              rounded-full
              bg-white/80
              backdrop-blur-xl
              shadow-xl
              flex
              items-center
              justify-center
              transform-gpu
            "
          >
            <div
              className="
                h-10
                w-10
                sm:h-20
                sm:w-20
                rounded-full
                flex
                items-center
                justify-center
                text-2xl
                sm:text-5xl
              "
              style={{
                background: `${color}20`,
              }}
            >
              {icon}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Speech Bubble Pointers */}
      {side === "left" && (
        <div className="absolute top-1/2 right-[-22px] -translate-y-1/2 hidden md:block z-30">
          <div className="h-12 w-12 rotate-45 rounded-lg bg-white border-r border-b border-white/50 shadow-lg" />
        </div>
      )}

      {side === "right" && (
        <div className="absolute top-1/2 left-[-22px] -translate-y-1/2 hidden md:block z-30">
          <div className="h-12 w-12 rotate-45 rounded-lg bg-white border-l border-t border-white/50 shadow-lg" />
        </div>
      )}
    </motion.div>
  );
}

export default memo(TimelineCard);
