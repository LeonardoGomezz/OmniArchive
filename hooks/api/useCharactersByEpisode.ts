"use client";
import { useQuery } from "@tanstack/react-query";
import { characterKeys } from "@/queries/characters/character.keys";
import { charactersService } from "@/services/api/characters.service";

export const useCharactersByEpisode = (episodeId: string) => {
  return useQuery({
    queryKey: characterKeys.episodes.byEpisode(episodeId),
    queryFn: async () => {
      // Get episode details first
      const episodeResponse = await fetch(
        `https://rickandmortyapi.com/api/episode/${episodeId}`,
      );
      const episodeData = await episodeResponse.json();

      // Extract character URLs from episode
      const characterUrls = episodeData.characters;

      // Fetch each character
      const characterPromises = characterUrls.map(async (url: string) => {
        const characterId = url.split("/").pop() || "";
        return charactersService.getCharacterById(characterId);
      });

      const characters = await Promise.all(characterPromises);
      return characters;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!episodeId,
  });
};
