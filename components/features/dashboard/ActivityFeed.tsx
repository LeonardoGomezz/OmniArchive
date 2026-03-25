"use client";
import { activityItems } from "@/lib/data/data";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ActivityItem {
  time: string;
  event: string;
  detail: string;
  type: "scan" | "alert";
}

export const ActivityFeed = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="lg:col-span-2 glass-surface rounded-sm p-5 space-y-4"
  >
    <div className="flex items-center justify-between">
      <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
        Recent Activity Stream
      </span>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
        <span className="text-[8px] tracking-[0.15em] uppercase text-primary/60 font-mono">
          Live
        </span>
      </div>
    </div>

    {/* Geometric divider */}
    <div className="flex items-center gap-2">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
      <div className="w-1 h-1 rotate-45 bg-primary/30" />
    </div>

    <div className="space-y-1 max-h-[280px] overflow-y-auto">
      {activityItems.map((item, i) => (
        <motion.div
          key={`activity-${i}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
          className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-primary/5 transition-colors group"
        >
          <span className="text-[9px] font-mono text-muted-foreground/60 shrink-0 w-16">
            {item.time}
          </span>
          <div
            className={`w-1 h-1 rounded-full shrink-0 ${item.type === "alert" ? "bg-destructive" : "bg-primary"}`}
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] tracking-wider text-muted-foreground font-mono">
              {item.event}
            </span>
          </div>
          <span className="text-[9px] tracking-wider text-accent/60 font-mono truncate max-w-[180px]">
            {item.detail}
          </span>
          <ArrowUpRight
            size={10}
            className="text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0"
          />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default ActivityFeed;
