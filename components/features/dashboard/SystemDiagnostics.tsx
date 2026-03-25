"use client";
import { motion } from "framer-motion";

interface DiagnosticBarProps {
  label: string;
  value: number;
  accent: string;
}

const DiagnosticBar = ({ label, value, accent }: DiagnosticBarProps) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground font-mono">
        {label}
      </span>
      <span className={`text-[10px] font-mono font-bold text-${accent}`}>
        {value}%
      </span>
    </div>
    <div className="h-1 w-full rounded-full bg-muted/50 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `hsl(var(--${accent}))`,
          boxShadow: `0 0 8px hsl(var(--${accent}) / 0.5)`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      />
    </div>
  </div>
);

interface SystemDiagnosticsProps {
  totalEpisodes: number;
  totalLocations: number;
}

export const SystemDiagnostics = ({ totalEpisodes, totalLocations }: SystemDiagnosticsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="glass-surface rounded-sm p-5 space-y-4"
  >
    <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
      System Diagnostics
    </span>

    <div className="space-y-3">
      <DiagnosticBar label="Portal Fluid" value={87} accent="primary" />
      <DiagnosticBar label="Memory Banks" value={64} accent="secondary" />
      <DiagnosticBar label="Threat Level" value={42} accent="destructive" />
      <DiagnosticBar label="Network Load" value={91} accent="accent" />
    </div>

    {/* Geometric divider */}
    <div className="flex items-center gap-2">
      <div className="h-[1px] w-8 bg-primary/30" />
      <div className="w-1 h-1 rotate-45 border border-primary/30" />
      <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div
        className="text-center p-3 rounded-sm"
        style={{ background: "hsl(var(--muted) / 0.3)" }}
      >
        <p className="text-lg font-mono font-bold text-primary text-glow">
          {totalEpisodes}
        </p>
        <p className="text-[7px] tracking-[0.15em] text-muted-foreground uppercase mt-0.5">
          Episodes
        </p>
      </div>
      <div
        className="text-center p-3 rounded-sm"
        style={{ background: "hsl(var(--muted) / 0.3)" }}
      >
        <p className="text-lg font-mono font-bold text-secondary text-glow-blue">
          {totalLocations}
        </p>
        <p className="text-[7px] tracking-[0.15em] text-muted-foreground uppercase mt-0.5">
          Locations
        </p>
      </div>
    </div>
  </motion.div>
);

export default SystemDiagnostics;
