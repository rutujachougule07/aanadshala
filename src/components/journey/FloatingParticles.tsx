import { memo } from "react";
import { motion } from "framer-motion";

const particles = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 10 + 4,
  duration: Math.random() * 8 + 8,
  delay: Math.random() * 5,
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 0.5, 0.2, 0],
            scale: [0.5, 1, 1.2, 0.8],
            y: [0, -80, -150],
            x: [0, 30, -20, 10],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full transform-gpu"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: "linear-gradient(135deg, #ffffff, #dbeafe)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
          }}
        />
      ))}
    </div>
  );
}

export default memo(FloatingParticles);
