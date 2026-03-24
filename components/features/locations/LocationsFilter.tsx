"use client";
import { LocationFilters } from "@/types";
import SegmentedFilter from "./SegmentedFilter";

const typeFilters = [
  "All",
  "Planet",
  "Cluster",
  "Space Station",
  "Microverse",
  "Dimension",
];

interface LocationsFilterProps {
  coordinatesMapped: number;
  filters: LocationFilters;
  onFiltersChange: (filters: Partial<LocationFilters>) => void;
}

export const LocationsFilter = ({
  coordinatesMapped,
  filters,
  onFiltersChange,
}: LocationsFilterProps) => {
  const handleTypeChange = (type: string) => {
    onFiltersChange({ type: type.toLowerCase() === "all" ? undefined : type });
  };

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-lg font-bold tracking-[0.2em] text-primary text-glow">
            Galactic Map
          </h1>
          <p className="text-[10px] tracking-[0.15em] text-muted-foreground mt-1 uppercase">
            {coordinatesMapped} coordinates mapped // Star-chart active
          </p>
        </div>
        <SegmentedFilter
          options={typeFilters}
          activeOption={filters.type === undefined ? "All" : filters.type}
          onOptionChange={handleTypeChange}
        />
      </div>
    </div>
  );
};
