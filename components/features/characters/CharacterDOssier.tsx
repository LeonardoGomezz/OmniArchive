import { useCharacterEpisodes } from "@/hooks/api/useCharacterEpisodes";
import { Character } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Radio,
  Dna,
  Tv,
  Shield,
  Zap,
} from "lucide-react";

interface CharacterDossierProps {
  character: Character;
  onBack: () => void;
}

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

const CharacterDossier = ({ character, onBack }: CharacterDossierProps) => {
  const status = statusConfig[character.status] || statusConfig.unknown;
  const { episodes, isLoading } = useCharacterEpisodes(character);

  console.log("character =>", character);
  console.log("episodes =>", episodes);

  return (
    <div className="space-y-6">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors font-mono group"
      >
        <ArrowLeft size={14} className="group-hover:icon-glow transition-all" />
        Return to Grid
      </motion.button>

      {/* Main split view */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left - Portrait & Scanning Frame */}
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

        {/* Right - Technical Readouts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-3 space-y-4"
        >
          {/* Origin & Location cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          {/* Technical Dossier */}
          <div className="glass-surface rounded-sm p-5 space-y-4">
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
          </div>

          {/* Dimensional Activity Chart */}
          <div className="glass-surface rounded-sm p-5 space-y-4">
            <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              Dimensional Activity
            </span>
            <div className="flex items-end gap-1 h-20">
              {Array.from({ length: 32 }).map((_, i) => {
                const h = 15 + Math.random() * 85;
                return (
                  <motion.div
                    key={i}
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
          </div>
        </motion.div>
      </div>

      {/* Bottom - Appearance Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-surface rounded-sm p-5 space-y-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Appearance Logs
          </span>
          <span className="text-[9px] tracking-[0.12em] text-primary/60 font-mono">
            {episodes.length} entries
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
          <div className="w-1 h-1 rotate-45 bg-primary/30" />
        </div>

        {/* Horizontal scrollable episodes */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {episodes.map((ep, i) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              className="shrink-0 glass-surface rounded-sm px-4 py-3 cursor-pointer hover:border-primary/50 transition-all duration-200 group min-w-[140px]"
            >
              <p className="text-[10px] font-mono font-bold text-primary/70 tracking-wider group-hover:text-primary group-hover:text-glow transition-all">
                [{ep.episode}]
              </p>
              <p className="text-[9px] font-mono text-muted-foreground mt-1 truncate group-hover:text-muted-foreground/80">
                {ep.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ReadoutCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}) => (
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

const StatBox = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent: string;
}) => (
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

export default CharacterDossier;
