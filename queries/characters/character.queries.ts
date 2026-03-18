import { characterKeys } from "./character.keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { ApiResponse, Character } from "@/types";

interface CharacterFilters {
  name?: string;
  status?: string;
  gender?: string;
}

export function useCharacters(filters: CharacterFilters = {}) {
  return useInfiniteQuery({
    queryKey: characterKeys.list(1, 20, filters),
    queryFn: async ({ pageParam = 1 }) => {
      const params: any = { page: pageParam };

      // Solo añadir parámetros si tienen valor
      if (filters.name?.trim()) params.name = filters.name.trim();
      if (filters.status && filters.status !== "all")
        params.status = filters.status;
      if (filters.gender && filters.gender !== "all")
        params.gender = filters.gender;

      const { data } = await api.get<ApiResponse<Character>>("/character", {
        params,
      });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return Number(url.searchParams.get("page"));
    },
  });
}
