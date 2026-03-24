import { EpisodeFilters } from "@/types";

export const episodeKeys = {
  all: ["episodes"] as const,
  lists: () => [...episodeKeys.all, "list"] as const,
  list: (filters: EpisodeFilters) => [...episodeKeys.lists(), filters] as const,
  details: () => [...episodeKeys.all, "detail"] as const,
  detail: (id: string) => [...episodeKeys.details(), id] as const,
};
