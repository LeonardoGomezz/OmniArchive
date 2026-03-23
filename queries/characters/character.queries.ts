import { characterKeys } from "./character.keys";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { getCharacterEpisodes, getCharacters } from "@/lib/services/characters";
import { Character, Episode } from "@/types";

interface CharacterFilters {
  name?: string;
  status?: string;
  gender?: string;
}

export function useCharacters(filters: CharacterFilters = {}) {
  return useInfiniteQuery({
    queryKey: characterKeys.list(filters),
    queryFn: async ({ pageParam = 1 }) => {
      const params: any = {
        page: pageParam,
        ...(filters.name?.trim() && { name: filters.name.trim() }),
        ...(filters.status &&
          filters.status !== "all" && { status: filters.status }),
        ...(filters.gender &&
          filters.gender !== "all" && { gender: filters.gender }),
      };

      return getCharacters(params);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return Number(url.searchParams.get("page"));
    },

    placeholderData: (previousData) => previousData,
  });
}

export function useCharacterEpisodes(character: Character) {
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
}
