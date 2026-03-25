"use client";
import { motion } from "framer-motion";

export const DimensionalActivity = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.25 }}
    className="glass-surface rounded-sm p-5 space-y-4"
  >
    <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
      Dimensional Activity
    </span>
    <div className="flex items-end gap-1 h-20">
      {Array.from({ length: 32 }).map((_, i) => {
        const h = 15 + Math.random() * 85;
        return (
          <motion.div
            key={`activity-${i}`}
            className="flex-1 rounded-t-[1px]"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.02,
              ease: "easeOut",
            }}
            style={{
              background:
                h > 70
                  ? "hsl(var(--primary))"
                  : h > 40
                    ? "hsl(var(--primary) / 0.4)"
                    : "hsl(var(--primary) / 0.15)",
            }}
          />
        );
      })}
    </div>
  </motion.div>
);

export default DimensionalActivity;
