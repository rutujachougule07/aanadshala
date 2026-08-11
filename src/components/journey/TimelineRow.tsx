import { memo } from "react";
import { motion } from "framer-motion";
import { TimelineItem } from "@/data/journey";
import TimelineCard from "./TimelineCard";
import TimelineNode from "./TimelineNode";

interface TimelineRowProps {
  item: TimelineItem;
  index: number;
}

function TimelineRow({ item, index }: TimelineRowProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.3,
        duration: 0.8,
      }}
      viewport={{
        once: true,
      }}
      className="transform-gpu will-change-transform"
    >
      <div className="grid grid-cols-12 items-center min-h-[340px]">
        {/* Left Card Slot */}
        <div className="col-span-5 flex justify-end">
          {item.side === "left" && (
            <TimelineCard
              title={item.title}
              description={item.description}
              date={item.date}
              year={item.year}
              icon={item.icon}
              side={item.side}
              color={item.color}
            />
          )}
        </div>

        {/* Center Node Slot */}
        <div className="col-span-2 flex justify-center z-20">
          <TimelineNode color={item.color} icon={item.icon} />
        </div>

        {/* Right Card Slot */}
        <div className="col-span-5 flex justify-start">
          {item.side === "right" && (
            <TimelineCard
              title={item.title}
              description={item.description}
              date={item.date}
              year={item.year}
              icon={item.icon}
              side={item.side}
              color={item.color}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default memo(TimelineRow);
