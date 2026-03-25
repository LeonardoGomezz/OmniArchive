"use client";
import { motion } from "framer-motion";
import { Character } from "@/types";

const statusConfig = {
  Alive: { color: "text-primary", bg: "bg-primary", label: "ACTIVE" },
  Dead: {
    color: "text-destructive",
    bg: "bg-destructive",
    label: "TERMINATED",
  },
  unknown: {
    color: "text-muted-foreground",
    bg: "bg-muted-foreground",
    label: "UNKNOWN",
  },
};

interface CharacterPortraitProps {
  character: Character;
}

export const CharacterPortrait = ({ character }: CharacterPortraitProps) => {
  const status = statusConfig[character.status] || statusConfig.unknown;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2 glass-surface rounded-sm overflow-hidden"
    >
      {/* Scanning frame */}
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full aspect-square object-cover"
        />
        {/* Scan overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner brackets */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/60" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/60" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/60" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/60" />
          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            initial={{ top: "10%" }}
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* ID overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[8px] font-mono text-primary/60 tracking-wider">
              SCAN_ID #{String(character.id).padStart(4, "0")}
            </span>
            <span className="text-[8px] font-mono text-primary/60 tracking-wider">
              {character.gender.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Status bar below image */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${status.bg} pulse-dot`} />
          <span
            className={`text-xs font-mono font-bold tracking-[0.2em] ${status.color}`}
          >
            {status.label}
          </span>
        </div>
        <h2 className="font-mono text-xl font-bold uppercase italic tracking-wider text-primary text-glow">
          {character.name}
        </h2>
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-0.5 text-[9px] tracking-wider font-mono text-secondary rounded-sm"
            style={{
              background: "hsl(var(--secondary) / 0.1)",
              border: "1px solid hsl(var(--secondary) / 0.25)",
            }}
          >
            {character.species}
          </span>
          {character.type && (
            <span
              className="px-2 py-0.5 text-[9px] tracking-wider font-mono text-accent/70 rounded-sm"
              style={{
                background: "hsl(var(--accent) / 0.08)",
                border: "1px solid hsl(var(--accent) / 0.2)",
              }}
            >
              {character.type}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterPortrait;
