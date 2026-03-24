"use client";
import { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { locationKeys } from "@/queries/locations/locations.keys";
import { locationsService } from "@/services/api/locations.service";
import { LocationFilters } from "@/types";
import { APP_CONFIG } from "@/lib/config/constants";

export const useLocationsWithFilters = () => {
  const [filters, setFilters] = useState<LocationFilters>({
    type: "all",
    name: "",
  });

  const handleFiltersChange = useCallback(
    (newFilters: Partial<LocationFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: locationKeys.list(filters),
    queryFn: async ({ pageParam = 1 }) => {
      const params = { page: pageParam, ...filters };
      return locationsService.getLocations(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.info.next ? allPages.length + 1 : undefined;
    },
    staleTime: APP_CONFIG.CACHE.STALE_TIME,
    gcTime: APP_CONFIG.CACHE.CACHE_TIME,
  });

  // Flatten all pages for easier consumption
  const locations = data?.pages.flatMap((page) => page.results) || [];

  return {
    filters,
    setFilters: handleFiltersChange,
    locations,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};
