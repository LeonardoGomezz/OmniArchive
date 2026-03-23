import { useState, useCallback } from "react";
import { Character } from "@/types";

export const useCharacterSelection = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCharacterClick = useCallback((character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCharacter(null), 300);
  }, []);

  return {
    selectedCharacter,
    isModalOpen,
    handleCharacterClick,
    handleCloseModal,
  };
};
