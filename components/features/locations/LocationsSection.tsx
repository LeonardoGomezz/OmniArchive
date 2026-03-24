import { LocationsFilter } from "./LocationsFilter";
import { LocationList } from "./LocationList";
import { useLocationsWithFilters } from "@/hooks/api/useLocationsWithFilters";

export const LocationsSection = () => {
  // Hook para manejo de filtros y data fetching
  const {
    filters,
    setFilters,
    locations,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLocationsWithFilters();

  return (
    <div className="space-y-6">
      <LocationsFilter
        coordinatesMapped={locations.length}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <LocationList
        locations={locations}
        isLoading={isLoading}
        error={error}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
      />
    </div>
  );
};
