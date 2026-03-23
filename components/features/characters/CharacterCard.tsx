import { motion } from "framer-motion";
import { Character } from "@/types";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { CharacterStatusBadge } from "./CharacterStatusBadge";
import { CharacterInfo } from "./CharacterInfo";
import { CharacterActions } from "./CharacterActions";
import { useCardHover } from "@/hooks/ui/useCardHover";

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
  onViewDossier: (character: Character) => void;
}

export const CharacterCard = ({ 
  character, 
  onClick,
  onViewDossier 
}: CharacterCardProps) => {
  const { isHovered, hoverProps } = useCardHover();
  
  return (
    <motion.div
      {...hoverProps}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-surface rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => onClick(character)}
    >
      <div className="relative h-48">
        <ImageWithFallback
          src={character.image}
          alt={character.name}
          fallback="/character-placeholder.png"
          className="w-full h-full"
        />
        <CharacterStatusBadge status={character.status} />
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-mono text-primary text-glow truncate">
          {character.name}
        </h3>
        
        <CharacterInfo character={character} />
        
        <CharacterActions 
          character={character}
          onViewDossier={onViewDossier}
          isHovered={isHovered}
        />
      </div>
    </motion.div>
  );
};
