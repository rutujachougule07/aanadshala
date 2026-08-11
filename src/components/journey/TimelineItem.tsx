import { memo } from "react";
import { motion } from "framer-motion";
import { TimelineItem as TimelineItemType } from "@/data/journey";

interface TimelineItemProps {
  item: TimelineItemType;
  index?: number;
}

function TimelineItem({ item }: TimelineItemProps) {
  const isLeft = item.side === "left";

  return (
    <div className="relative grid grid-cols-12 items-center min-h-[620px] my-6 transform-gpu">

      {/* LEFT CARD */}
      {isLeft && (
        <div className="col-span-5 px-8 flex justify-end">
          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            whileHover={{
              y: -18,
              scale: 1.04,
              rotateX: 6,
              rotateY: -5,
            }}
            className="
            group
            relative
            overflow-hidden
            w-full
            max-w-[520px]
            lg:w-[520px]
            min-h-[220px]
            rounded-[42px]
            border
            border-white/90
            bg-white/88
            backdrop-blur-[18px]
            shadow-[0_60px_180px_rgba(15,23,42,.16)]
            transition-all
            duration-500
            p-12
            transform-gpu
            "
          >
            {/* Card Shine Effect */}
            <motion.div
              animate={{
                x: ["-150%", "150%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="
                absolute
                top-0
                left-0
                h-full
                w-40
                -skew-x-12
                bg-white/30
                blur-lg
                pointer-events-none
                z-10
              "
            />

            {/* Hover Gradient */}
            <div
              className="absolute inset-0 opacity-5 transition duration-700 group-hover:opacity-70 pointer-events-none"
              style={{
                background: `linear-gradient(
                  135deg,
                  ${item.color}18,
                  transparent,
                  ${item.color}10
                )`,
              }}
            />

            {/* Glass Reflection */}
            <motion.div
              animate={{
                x: ["-120%", "220%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
              className="
                absolute
                top-0
                left-0
                h-full
                w-24
                -skew-x-12
                bg-white/25
                blur-xl
                pointer-events-none
                z-10
              "
            />

            {/* Colored Border */}
            <div
              className="absolute left-0 top-10 bottom-10 w-[5px] rounded-full z-10"
              style={{
                background: item.color,
              }}
            />

            <div className="relative z-20 pr-32">
              {/* Date */}
              <span
                className="inline-block rounded-full px-6 py-2.5 text-base font-semibold text-white shadow-md"
                style={{
                  background: item.color,
                }}
              >
                {item.year || item.date}
              </span>

              {/* Title */}
              <h2 className="mt-7 text-4xl lg:text-5xl font-black text-[#1F2B8D] leading-tight">
                {item.title}
              </h2>

              {/* Description */}
              <p className="mt-6 text-lg lg:text-xl leading-10 text-gray-600 font-normal">
                {item.description}
              </p>
            </div>

            {/* Floating Icon */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="
                absolute
                right-8
                top-1/2
                -translate-y-1/2
                z-20
                pointer-events-none
              "
            >
              <div className="relative">
                {/* Icon Background Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    blur-2xl
                    opacity-30
                  "
                  style={{
                    background: item.color,
                  }}
                />

                <div
                  className="
                    relative
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br from-white to-slate-100
                    shadow-2xl
                    text-6xl
                  "
                  style={{
                    border: `4px solid ${item.color}`,
                  }}
                >
                  {item.icon}
                </div>
              </div>
            </motion.div>

            {/* Left Card Color Arrow */}
            <div className="absolute right-[-22px] top-1/2 -translate-y-1/2 hidden md:block z-30 pointer-events-none">
              <div
                style={{
                  borderTop: "18px solid transparent",
                  borderBottom: "18px solid transparent",
                  borderLeft: `24px solid ${item.color}`,
                }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* CENTER NODE */}
      <div className="col-span-2 flex justify-center z-20">
        <motion.div
          initial={{
            scale: 0,
          }}
          whileInView={{
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="relative flex items-center justify-center"
        >
          {/* Ripple */}
          <motion.div
            animate={{
              scale: [1, 2.3],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: `2px solid ${item.color}`,
            }}
          />

          {/* Circle Node */}
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
              shadow-2xl
              text-5xl
              border-[6px]
            "
            style={{
              borderColor: item.color,
            }}
          >
            {item.icon}
          </div>
        </motion.div>
      </div>

      {/* RIGHT CARD */}
      {!isLeft && (
        <div className="col-span-5 col-start-8 px-8 flex justify-start">
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            whileHover={{
              y: -18,
              scale: 1.04,
              rotateX: 6,
              rotateY: 5,
            }}
            className="
              group
              relative
              overflow-hidden
              w-full
              max-w-[520px]
              lg:w-[520px]
              min-h-[220px]
              rounded-[42px]
              border
              border-white/90
              bg-white/88
              backdrop-blur-[18px]
              shadow-[0_60px_180px_rgba(15,23,42,.16)]
              transition-all
              duration-500
              p-12
              transform-gpu
            "
          >
            {/* Card Shine Effect */}
            <motion.div
              animate={{
                x: ["-150%", "150%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="
                absolute
                top-0
                left-0
                h-full
                w-40
                -skew-x-12
                bg-white/30
                blur-lg
                pointer-events-none
                z-10
              "
            />

            {/* Hover Gradient */}
            <div
              className="absolute inset-0 opacity-5 transition duration-700 group-hover:opacity-70 pointer-events-none"
              style={{
                background: `linear-gradient(
                  135deg,
                  ${item.color}18,
                  transparent,
                  ${item.color}10
                )`,
              }}
            />

            {/* Glass Reflection */}
            <motion.div
              animate={{
                x: ["-120%", "220%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
              className="
                absolute
                top-0
                left-0
                h-full
                w-24
                -skew-x-12
                bg-white/25
                blur-xl
                pointer-events-none
                z-10
              "
            />

            {/* Right Colored Border */}
            <div
              className="absolute right-0 top-10 bottom-10 w-[5px] rounded-full z-10"
              style={{
                background: item.color,
              }}
            />

            <div className="relative z-20 pl-32">
              <span
                className="inline-block rounded-full px-6 py-2.5 text-base font-semibold text-white shadow-md"
                style={{
                  background: item.color,
                }}
              >
                {item.year || item.date}
              </span>

              <h2 className="mt-7 text-4xl lg:text-5xl font-black text-[#1F2B8D]">
                {item.title}
              </h2>

              <p className="mt-6 text-lg lg:text-xl leading-10 text-gray-600 font-normal">
                {item.description}
              </p>
            </div>

            {/* Floating Icon */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="relative">
                {/* Icon Background Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    blur-2xl
                    opacity-30
                  "
                  style={{
                    background: item.color,
                  }}
                />

                <div
                  className="
                    relative
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br from-white to-slate-100
                    shadow-2xl
                    text-6xl
                  "
                  style={{
                    border: `4px solid ${item.color}`,
                  }}
                >
                  {item.icon}
                </div>
              </div>
            </motion.div>

            {/* Right Card Color Arrow */}
            <div className="absolute left-[-22px] top-1/2 -translate-y-1/2 hidden md:block z-30 pointer-events-none">
              <div
                style={{
                  borderTop: "18px solid transparent",
                  borderBottom: "18px solid transparent",
                  borderRight: `24px solid ${item.color}`,
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default memo(TimelineItem);
