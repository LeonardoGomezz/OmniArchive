"use client";
import { EpisodeFilters } from "@/types";
import SegmentedFilter from "../locations/SegmentedFilter";

const seasonFilters = ["All", "S01", "S02", "S03", "S04", "S05"];

interface EpisodesFilterProps {
  filters: EpisodeFilters;
  onFiltersChange: (filters: Partial<EpisodeFilters>) => void;
  episodesCount: number;
}

export const EpisodesFilter = ({
  filters,
  onFiltersChange,
  episodesCount,
}: EpisodesFilterProps) => {
  const handleSeasonChange = (season: string) => {
    onFiltersChange({
      season: season.toLowerCase() === "all" ? undefined : season,
    });
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="font-display text-lg font-bold tracking-[0.2em] text-primary text-glow">
          Episode Archives
        </h1>
        <p className="text-[10px] tracking-[0.15em] text-muted-foreground mt-1 uppercase">
          {episodesCount} transmissions logged // chronological order
        </p>
      </div>
      <SegmentedFilter
        options={seasonFilters}
        activeOption={filters.season === undefined ? "All" : filters.season}
        onOptionChange={handleSeasonChange}
      />
    </div>
  );
};
