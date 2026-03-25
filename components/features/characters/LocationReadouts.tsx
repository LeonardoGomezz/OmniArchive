"use client";
import { motion } from "framer-motion";
import { MapPin, Globe } from "lucide-react";
import { Character } from "@/types";

interface ReadoutCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}

const ReadoutCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: ReadoutCardProps) => (
  <div className="glass-surface rounded-sm p-4 space-y-3 card-glow-hover cursor-pointer group">
    <div className="flex items-center gap-2">
      <Icon
        size={14}
        className={`text-${accent} group-hover:icon-glow transition-all`}
      />
      <span className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
        {label}
      </span>
    </div>
    <p
      className={`text-sm font-mono font-bold tracking-wider text-${accent} ${accent === "primary" ? "text-glow" : "text-glow-blue"}`}
    >
      {value}
    </p>
  </div>
);

interface LocationReadoutsProps {
  character: Character;
}

export const LocationReadouts = ({ character }: LocationReadoutsProps) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.15 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
  >
    <ReadoutCard
      icon={Globe}
      label="Origin Point"
      value={character.origin.name}
      accent="primary"
    />
    <ReadoutCard
      icon={MapPin}
      label="Current Location"
      value={character.location.name}
      accent="secondary"
    />
  </motion.div>
);

export default LocationReadouts;
