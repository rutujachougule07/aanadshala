import { memo } from "react";
import { motion } from "framer-motion";
import { TimelineItem } from "@/data/journey";
import TimelineCard from "./TimelineCard";
import TimelineNode from "./TimelineNode";

interface MobileTimelineProps {
  items: TimelineItem[];
}

function MobileTimeline({ items }: MobileTimelineProps) {
  return (
    <div className="block lg:hidden mt-16 space-y-12">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <TimelineNode color={item.color} icon={item.icon} />
          <TimelineCard
            title={item.title}
            description={item.description}
            date={item.date}
            icon={item.icon}
            side="right"
            color={item.color}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default memo(MobileTimeline);
