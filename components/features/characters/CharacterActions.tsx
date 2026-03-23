import { Character } from "@/types";
import { cn } from "@/lib/utils";

interface CharacterActionsProps {
  character: Character;
  onViewDossier: (character: Character) => void;
  isHovered: boolean;
  className?: string;
}

export const CharacterActions = ({ 
  character, 
  onViewDossier, 
  isHovered, 
  className 
}: CharacterActionsProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0",
        className
      )}
    >
      <div className="text-[8px] text-muted-foreground font-mono">
        ID: #{String(character.id).padStart(3, "0")}
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewDossier(character);
        }}
        className="px-3 py-1 text-[9px] tracking-wider font-mono rounded-sm transition-all duration-200 text-primary-foreground"
        style={{
          background: "hsl(var(--primary) / 0.9)",
          boxShadow: "0 0 15px hsl(120 100% 50% / 0.3)",
        }}
      >
        View Dossier
      </button>
    </div>
  );
};
