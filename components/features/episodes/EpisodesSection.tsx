"use client";
import { EpisodesFilter } from "./EpisodesFilter";
import { EpisodeEntry } from "./EpisodeEntry";
import { useEpisodesWithFilters } from "@/hooks/api/useEpisodesWithFilters";
import { useEpisodeSelection } from "@/hooks/ui/useEpisodeSelection";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";

export const EpisodesSection = () => {
  // Hook para manejo de filtros y data fetching
  const {
    filters,
    setFilters,
    episodes,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEpisodesWithFilters();

  // Hook para manejo de expansión
  const { expandedId, isExpanded, handleToggle } = useEpisodeSelection();

  // Hook para scroll infinito
  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="space-y-6">
      <EpisodesFilter
        filters={filters}
        onFiltersChange={setFilters}
        episodesCount={episodes.length}
      />

      {/* Timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[52px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

        <div className="space-y-2">
          {episodes.map((episode, index) => (
            <EpisodeEntry
              key={episode.id}
              episode={episode}
              index={index}
              isExpanded={isExpanded(episode.id)}
              onToggle={() => handleToggle(episode.id)}
            />
          ))}

          {/* Infinite scroll trigger */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="flex justify-center py-4">
              {isFetchingNextPage && (
                <div className="text-muted-foreground font-mono text-sm">
                  Loading more episodes...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
