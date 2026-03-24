import { apiClient } from "@/lib/api/client";
import { ApiResponse, Location, LocationFilters } from "@/types";

export class LocationsService {
  constructor(private api: typeof apiClient) {}

  async getLocations(
    params: LocationFilters = {},
  ): Promise<ApiResponse<Location>> {
    const filteredParams = this.filterParams(params);
    return this.api.get<ApiResponse<Location>>("/location", filteredParams);
  }

  async getLocationById(id: string): Promise<Location> {
    if (!id) throw new Error("Location ID is required");
    return this.api.get<Location>(`/location/${id}`);
  }

  private filterParams(params: LocationFilters): Record<string, any> {
    return Object.entries(params)
      .filter(([_, value]) => value && value !== "all")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }
}

export const locationsService = new LocationsService(apiClient);
