"use client";
import { useQueries } from "@tanstack/react-query";
import { characterKeys } from "@/queries/characters/character.keys";
import { getCharacterEpisodes } from "@/lib/services/characters";
import { Character, Episode } from "@/types";

export const useCharacterEpisodes = (character: Character) => {
  const episodeResults = useQueries({
    queries: character.episode.map((url: string) => ({
      queryKey: characterKeys.episodes.byUrl(url),
      queryFn: () => getCharacterEpisodes(url),
      staleTime: 1000 * 60 * 60,
    })),
  });

  const episodes = episodeResults
    .map((result) => result.data)
    .filter((data): data is Episode => !!data);

  const isLoading = episodeResults.some((r) => r.isLoading);
  const isError = episodeResults.some((r) => r.isError);

  return {
    episodes,
    isLoading,
    isError,
    results: episodeResults,
  };
};
