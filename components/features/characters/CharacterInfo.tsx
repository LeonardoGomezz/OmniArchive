import { Character } from "@/types";
import { cn } from "@/lib/utils";

interface CharacterInfoProps {
  character: Character;
  className?: string;
}

export const CharacterInfo = ({ character, className }: CharacterInfoProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 text-[9px] tracking-wider font-mono text-secondary rounded-sm"
          style={{ background: "hsl(var(--secondary) / 0.1)", border: "1px solid hsl(var(--secondary) / 0.25)" }}>
          {character.species}
        </span>
        {character.type && (
          <span className="px-2 py-0.5 text-[9px] tracking-wider font-mono text-accent/70 rounded-sm"
            style={{ background: "hsl(var(--accent) / 0.08)", border: "1px solid hsl(var(--accent) / 0.2)" }}>
            {character.type}
          </span>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground font-mono">
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>
      </div>
    </div>
  );
};
