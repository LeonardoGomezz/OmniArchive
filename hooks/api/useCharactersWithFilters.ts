import { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Character } from "@/types";
import {
  charactersService,
  CharacterFilters,
} from "@/services/api/characters.service";
import { characterKeys } from "@/queries/characters/character.keys";

export const useCharactersWithFilters = () => {
  const [filters, setFilters] = useState<CharacterFilters>({
    name: "",
    status: "all",
    gender: "all",
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: characterKeys.list(filters),
    queryFn: async ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        ...(filters.name?.trim() && { name: filters.name.trim() }),
        ...(filters.status &&
          filters.status !== "all" && { status: filters.status }),
        ...(filters.gender &&
          filters.gender !== "all" && { gender: filters.gender }),
      };

      return charactersService.getCharacters(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return Number(url.searchParams.get("page"));
    },
    placeholderData: (previousData) => previousData,
  });

  const handleFiltersChange = useCallback(
    (newFilters: Partial<CharacterFilters>) => {
      setFilters((prev: CharacterFilters) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  return {
    filters,
    setFilters: handleFiltersChange,
    characters: data?.pages.flatMap((page) => page.results) || [],
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
