import { Location } from "@/types";
import { api } from "../api/api";
import { AxiosError } from "axios";

export const getLocationById = async (
  id: string | number,
): Promise<Location> => {
  if (!id) {
    throw new Error("El ID de localización es requerido.");
  }

  try {
    const response = await api.get<Location>(`/location/${id}`);
    return response.data;
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
