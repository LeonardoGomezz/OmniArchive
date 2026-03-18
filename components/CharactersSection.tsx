"use client";
import { useState, useEffect, useRef } from "react";
import { useCharacters } from "@/queries/characters/character.queries";
import CharacterCard from "./CharacterCard";
import { CharacterFilters } from "./CharacterFilters";
import { Character } from "@/types";

export const CharactersSection = () => {
  const [filters, setFilters] = useState({
    name: "",
    status: "all",
    gender: "all",
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters({
      name: newFilters.name || "",
      status: newFilters.status || "all",
      gender: newFilters.gender || "all",
    });
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters(filters);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleCharacterClick = (character: Character) => {
    // TODO: Implement modal open logic
    console.log(character);
  };

  // Aplanar todas las páginas de resultados
  const allCharacters = data?.pages.flatMap((page) => page.results) || [];

  // Infinite scroll con Intersection Observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    const current = loadMoreRef.current;
    if (current) {
      observerRef.current.observe(current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading && allCharacters.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-glow mb-4">
          Loading Characters...
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-line h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-glow mb-4">
          Error Loading Characters
        </h1>
        <p className="text-destructive">
          Failed to load characters. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-glow mb-4">Characters Database</h1>

      {/* Filters */}
      <CharacterFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        {allCharacters.length > 0 && (
          <span>Found {allCharacters.length} characters</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allCharacters.map((character, idx) => (
          <CharacterCard
            key={character.id}
            character={character}
            index={idx}
            onClick={handleCharacterClick}
          />
        ))}
      </div>

      {/* Trigger para infinite scroll */}
      <div ref={loadMoreRef} className="mt-8">
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary pulse-dot" />
              <span className="text-sm text-muted-foreground">
                Loading more characters...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
