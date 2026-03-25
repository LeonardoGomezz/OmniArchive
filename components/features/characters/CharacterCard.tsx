import { motion } from "framer-motion";
import { Character } from "@/types";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { CharacterActions } from "./CharacterActions";

interface CharacterCardProps {
  character: Character;
  index?: number;
  onClick: (character: Character) => void;
  onViewDossier: (character: Character) => void;
}

const statusColor = (status: string) => {
  switch (status) {
    case "Alive":
      return "text-primary";
    case "Dead":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

export const CharacterCard = ({
  character,
  index = 0,
  onClick,
  onViewDossier,
}: CharacterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={() => onClick(character)}
      className="glass-surface card-glow-hover cursor-pointer group rounded-sm overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="clip-geometric">
          <ImageWithFallback
            src={character.image}
            alt={character.name}
            fallback="/character-placeholder.png"
            className="w-full h-48 object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
          />
        </div>
        {/* ID badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 text-[9px] tracking-[0.2em] font-mono bg-background/80 border border-border/50 rounded-sm text-muted-foreground">
          #{String(character.id).padStart(3, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-mono text-sm font-bold uppercase italic tracking-wider text-primary text-glow truncate">
          {character.name}
        </h3>

        <div className="space-y-1.5">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
              Status:
            </span>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full pulse-dot ${statusColor(character.status)}`}
                style={{ backgroundColor: "currentColor" }}
              />
              <span
                className={`text-[10px] tracking-wider uppercase font-medium ${statusColor(character.status)}`}
              >
                {character.status}
              </span>
            </div>
          </div>

          {/* Species */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
              Species:
            </span>
            <span className="text-[10px] tracking-wider text-secondary text-glow-blue">
              {character.species}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
              Location:
            </span>
            <span className="text-[10px] tracking-wider text-muted-foreground truncate">
              {character.location.name}
            </span>
          </div>
        </div>

        {/* Actions - Visible only on hover */}
        <CharacterActions
          character={character}
          onViewDossier={onViewDossier}
          isHovered={false} // Always visible to preserve the original design
        />
      </div>

      {/* Bottom accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </motion.div>
  );
};
