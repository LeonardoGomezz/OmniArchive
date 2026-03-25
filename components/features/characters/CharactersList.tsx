import { useEffect, useRef } from "react";
import { Character } from "@/types";
import { CharacterCard } from "./CharacterCard";
import { cn } from "@/lib/utils";

interface CharactersListProps {
  characters: Character[];
  isLoading: boolean;
  error: any;
  onCharacterClick: (character: Character) => void;
  onViewDossier: (character: Character) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  className?: string;
}

export const CharactersList = ({
  characters,
  isLoading,
  error,
  onCharacterClick,
  onViewDossier,
  onLoadMore,
  hasMore,
  isLoadingMore,
  className,
}: CharactersListProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Infinite scrolling with Intersection Observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore();
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
      if (observerRef.current && current) {
        observerRef.current.unobserve(current);
      }
    };
  }, [hasMore, isLoadingMore, onLoadMore]);

  if (isLoading && characters.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="glass-surface rounded-lg overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-muted/20" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted/30 rounded" />
              <div className="h-3 bg-muted/20 rounded w-3/4" />
              <div className="h-3 bg-muted/20 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive font-mono mb-4">
          Error loading characters
        </p>
        <button
          onClick={() => globalThis.location.reload()}
          className="px-4 py-2 text-sm font-mono rounded-sm bg-primary text-primary-foreground"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {characters.length > 0 && (
          <span>Found {characters.length} characters</span>
        )}
      </div>

      {/* Characters grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {characters.map((character, characterIndex) => (
          <CharacterCard
            key={character.id}
            character={character}
            index={characterIndex}
            onClick={onCharacterClick}
            onViewDossier={onViewDossier}
          />
        ))}
      </div>

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="mt-8">
        {isLoadingMore && (
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
