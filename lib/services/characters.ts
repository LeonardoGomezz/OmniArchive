import { ApiResponse, Character } from "@/types";
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
        `Error in the galactic database (${error.response?.status}):`,
        error.message,
      );
    }
    throw error;
  }
};
