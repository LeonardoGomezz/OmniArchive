"use client";
import { CharacterFilters } from "./CharacterFilters";
import { CharactersList } from "./CharactersList";
import DetailModal from "./DetailModal";
import { useCharactersWithFilters } from "@/hooks/api/useCharactersWithFilters";
import { useCharacterSelection } from "@/hooks/ui/useCharacterSelection";
import { useCharacterNavigation } from "@/hooks/ui/useCharacterNavigation";

export const CharactersSection = () => {
  // Hook para manejo de filtros y data fetching
  const {
    filters,
    setFilters,
    characters,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharactersWithFilters();

  // Hook para manejo de selección y modal
  const {
    selectedCharacter,
    isModalOpen,
    handleCharacterClick,
    handleCloseModal,
  } = useCharacterSelection();

  // Hook para navegación
  const { handleViewDossier } = useCharacterNavigation();

  return (
    <div>
      <CharacterFilters filters={filters} onFiltersChange={setFilters} />

      <CharactersList
        characters={characters}
        isLoading={isLoading}
        error={error}
        onCharacterClick={handleCharacterClick}
        onViewDossier={handleViewDossier}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
      />

      <DetailModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onViewDossier={handleViewDossier}
      />
    </div>
  );
};
