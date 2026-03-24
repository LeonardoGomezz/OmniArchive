import { apiClient } from "@/lib/api/client";
import { ApiResponse, Episode, EpisodeFilters } from "@/types";

export class EpisodesService {
  constructor(private api: typeof apiClient) {}

  async getEpisodes(params: EpisodeFilters = {}): Promise<ApiResponse<Episode>> {
    const filteredParams = this.filterParams(params);
    return this.api.get<ApiResponse<Episode>>("/episode", filteredParams);
  }

  async getEpisodeById(id: string): Promise<Episode> {
    if (!id) throw new Error("Episode ID is required");
    return this.api.get<Episode>(`/episode/${id}`);
  }

  private filterParams(params: EpisodeFilters): Record<string, any> {
    return Object.entries(params)
      .filter(([_, value]) => value && value !== "all")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }
}

export const episodesService = new EpisodesService(apiClient);
