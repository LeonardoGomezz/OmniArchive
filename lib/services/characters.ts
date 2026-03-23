import { ApiResponse, Character, Episode } from "@/types";
import { api } from "../api/api";
import { AxiosError } from "axios";

export const getCharacters = async (
  params: any,
): Promise<ApiResponse<Character>> => {
  try {
    const { data } = await api.get<ApiResponse<Character>>("/character", {
      params,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `Error in galactic database (${error.response?.status}):`,
        error.message,
      );
    }
    throw error;
  }
};

export const getCharacterById = async (
  id: string | number,
): Promise<Character> => {
  if (!id) {
    throw new Error("Character ID is required");
  }

  try {
    const { data } = await api.get<Character>(`/character/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `Error in galactic database (${error.response?.status}):`,
        error.message,
      );
    }
    throw error;
  }
};

export const getCharacterEpisodes = async (url: string): Promise<Episode> => {
  try {
    const { data } = await api.get<Episode>(url);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        `Error in galactic database (${error.response?.status}):`,
        error.message,
      );
    }
    throw error;
  }
};
