import { characterKeys } from "./character.keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "@/lib/services/characters";

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
