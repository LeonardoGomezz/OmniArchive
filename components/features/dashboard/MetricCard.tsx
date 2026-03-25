"use client";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  accent?: "primary" | "destructive" | "secondary" | "accent";
  delay?: number;
}

const accentClasses = {
  primary: "text-primary text-glow",
  destructive: "text-destructive",
  secondary: "text-secondary text-glow-blue",
  accent: "text-accent",
};

export const MetricCard = ({
  label,
  value,
  subtitle,
  icon: Icon,
  accent = "primary",
  delay = 0,
}: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-surface rounded-sm p-5 space-y-4 card-glow-hover cursor-default"
  >
    <div className="flex items-center justify-between">
      <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
        {label}
      </span>
      <Icon size={14} className={accentClasses[accent]} />
    </div>
    <div>
      <p className={`text-3xl font-mono font-bold ${accentClasses[accent]}`}>
        {value}
      </p>
      <p className="text-[9px] tracking-[0.12em] text-muted-foreground mt-1 uppercase font-mono">
        {subtitle}
      </p>
    </div>
    {/* Mini sparkline */}
    <div className="flex items-end gap-[2px] h-8">
      {[30, 55, 40, 70, 45, 80, 60, 90, 50, 75, 65, 85].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-[1px]"
          style={{
            height: `${h}%`,
            background: `hsl(var(--${accent === "primary" ? "primary" : accent === "destructive" ? "destructive" : accent === "secondary" ? "secondary" : "accent"}) / ${0.15 + (h / 100) * 0.5})`,
          }}
        />
      ))}
    </div>
  </motion.div>
);

export default MetricCard;
