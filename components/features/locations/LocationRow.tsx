import { Location } from "@/types";
import { motion } from "framer-motion";
import { BarChart3, Scan } from "lucide-react";

export const LocationRow = ({
  location,
  index,
  onClick,
}: {
  location: Location;
  index: number;
  onClick: (location: Location) => void;
}) => {
  const bars = [35, 60, 45, 80, 55];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass-surface row-glow-hover rounded-sm flex items-center gap-5 px-5 py-4 cursor-pointer group"
      onClick={() => onClick(location)}
    >
      {/* Hex type badge */}
      <div className="shrink-0 relative">
        <div
          className="hex-badge w-14 h-14 flex items-center justify-center"
          style={{
            background: "hsl(var(--primary) / 0.08)",
            boxShadow: "0 0 15px hsl(var(--primary) / 0.1)",
          }}
        >
          <span className="text-[7px] tracking-[0.1em] uppercase font-mono text-primary text-glow font-bold leading-tight text-center px-1">
            {location.type}
          </span>
        </div>
      </div>

      {/* Name + Dimension */}
      <div className="flex-1 min-w-0">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary text-glow truncate group-hover:text-glow-blue transition-all duration-300">
          {location.name}
        </h3>
        <p className="text-[10px] tracking-[0.12em] text-accent/70 mt-0.5 font-mono truncate">
          {location.dimension}
        </p>
      </div>

      {/* Mini bar chart */}
      <div className="shrink-0 flex items-end gap-[2px] h-6 hidden sm:flex">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-t-[1px] transition-all duration-300 group-hover:bg-secondary"
            style={{
              height: `${h}%`,
              background: `hsl(var(--primary) / ${0.2 + (h / 100) * 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Population count */}
      <div className="shrink-0 flex items-center gap-2 min-w-[80px] justify-end">
        <BarChart3 size={12} className="text-muted-foreground/50" />
        <div className="text-right">
          <p className="text-[9px] tracking-[0.1em] text-muted-foreground uppercase">
            Population
          </p>
          <p className="text-sm font-mono font-bold text-secondary text-glow-blue">
            {location.residents.length}
          </p>
        </div>
      </div>

      {/* Scan button */}
      <button
        className="shrink-0 hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[9px] tracking-[0.12em] uppercase font-mono text-primary/60 rounded-sm transition-all duration-200 hover:text-primary hover:border-primary/40 group-hover:opacity-100 opacity-0"
        style={{ border: "1px solid hsl(var(--primary) / 0.2)" }}
      >
        <Scan size={10} />
        Scan
      </button>
    </motion.div>
  );
};
