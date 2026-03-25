"use client";
import { motion } from "framer-motion";
import { Radio, Dna, Shield, Zap } from "lucide-react";
import { Character } from "@/types";

interface StatBoxProps {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}

const StatBox = ({
  icon: Icon,
  label,
  value,
  accent,
}: StatBoxProps) => (
  <div
    className="text-center p-3 rounded-sm"
    style={{ background: "hsl(var(--muted) / 0.3)" }}
  >
    <Icon size={14} className={`${accent} mx-auto mb-1.5`} />
    <p className={`text-sm font-mono font-bold ${accent}`}>{value}</p>
    <p className="text-[7px] tracking-[0.15em] text-muted-foreground uppercase mt-0.5">
      {label}
    </p>
  </div>
);

interface SubjectAnalysisProps {
  character: Character;
}

export const SubjectAnalysis = ({ character }: SubjectAnalysisProps) => {
  const statusConfig = {
    Alive: { color: "text-primary" },
    Dead: { color: "text-destructive" },
    unknown: { color: "text-muted-foreground" },
  };

  const status = statusConfig[character.status] || statusConfig.unknown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-surface rounded-sm p-5 space-y-4"
    >
      <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
        Subject Analysis
      </span>
      <div className="flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="w-1 h-1 rotate-45 bg-primary/30" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox
          icon={Radio}
          label="Status"
          value={character.status}
          accent={status.color}
        />
        <StatBox
          icon={Dna}
          label="Species"
          value={character.species}
          accent="text-secondary"
        />
        <StatBox
          icon={Shield}
          label="Gender"
          value={character.gender}
          accent="text-accent"
        />
        <StatBox
          icon={Zap}
          label="Encounters"
          value={character.episode.length.toString()}
          accent="text-primary"
        />
      </div>
    </motion.div>
  );
};

export default SubjectAnalysis;
