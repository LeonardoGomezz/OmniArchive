"use client";
import { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { episodeKeys } from "@/queries/episodes/episodes.keys";
import { episodesService } from "@/services/api/episodes.service";
import { EpisodeFilters } from "@/types";
import { APP_CONFIG } from "@/lib/config/constants";

export const useEpisodesWithFilters = () => {
  const [filters, setFilters] = useState<EpisodeFilters>({
    season: undefined, // Estado inicial: "all" (undefined = all)
    name: "",
  });

  const handleFiltersChange = useCallback(
    (newFilters: Partial<EpisodeFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: episodeKeys.list(filters),
    queryFn: async ({ pageParam = 1 }) => {
      const params = { page: pageParam, ...filters };
      return episodesService.getEpisodes(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.info.next ? allPages.length + 1 : undefined;
    },
    staleTime: APP_CONFIG.CACHE.STALE_TIME,
    gcTime: APP_CONFIG.CACHE.CACHE_TIME,
    enabled: true,
  });

  // Flatten all pages for easier consumption and transform to Episode format
  const episodes =
    data?.pages.flatMap((page) =>
      page.results.map((episode) => ({
        id: episode.id,
        name: episode.name,
        episode: episode.episode,
        airDate: episode.airDate,
        characters: episode.characters,
        summary: `Episode ${episode.episode} - ${episode.name}`,
      })),
    ) || [];

  // Apply client-side filtering for season
  const filteredEpisodes = episodes.filter((episode) => {
    if (!filters.season) return true; // undefined = "all"
    return episode.episode
      .toLowerCase()
      .startsWith(filters.season.toLowerCase());
  });

  return {
    filters,
    setFilters: handleFiltersChange,
    episodes: filteredEpisodes,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};
