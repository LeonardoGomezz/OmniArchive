import { ApiResponse, Character } from "@/types";
import { apiClient } from "@/lib/api/client";
import { APP_CONFIG } from "@/lib/config/constants";

export interface CharacterFilters {
  name?: string;
  status?: string;
  gender?: string;
}

export class CharactersService {
  constructor(private api: typeof apiClient) {}

  async getCharacters(params: CharacterFilters): Promise<ApiResponse<Character>> {
    const filteredParams = this.filterParams(params);
    return this.api.get<ApiResponse<Character>>("/character", filteredParams);
  }

  async getCharacterById(id: string): Promise<Character> {
    if (!id) throw new Error("Character ID is required");
    return this.api.get<Character>(`/character/${id}`);
  }

  private filterParams(params: CharacterFilters): Record<string, any> {
    return Object.entries(params)
      .filter(([_, value]) => value && value !== "all")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }
}

export const charactersService = new CharactersService(apiClient);
