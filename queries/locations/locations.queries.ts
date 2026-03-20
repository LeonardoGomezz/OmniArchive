import { Location } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { locationKeys } from "./locations.keys";
import { getLocationById } from "@/lib/services/locations";

export function useLocationById(id: string) {
  return useQuery<Location>({
    queryKey: locationKeys.detail(id),
    queryFn: () => getLocationById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
