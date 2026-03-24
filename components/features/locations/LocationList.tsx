"use client";
import { Location } from "@/types";
import { LocationRow } from "./LocationRow";
import { useInfiniteScroll } from "@/hooks/ui/useInfiniteScroll";

interface LocationListProps {
  locations: Location[];
  isLoading: boolean;
  error: Error | null;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export const LocationList = ({
  locations,
  isLoading,
  error,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: LocationListProps) => {
  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage: hasMore,
    isFetchingNextPage: isLoadingMore,
    fetchNextPage: onLoadMore,
  });
  if (isLoading && locations.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-muted-foreground font-mono text-sm">
          Loading coordinates...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive font-mono mb-4">
          Error loading locations
        </p>
        <button
          onClick={() => globalThis.location.reload()}
          className="px-4 py-2 text-sm font-mono rounded-sm bg-primary text-primary-foreground"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {locations.map((location, index) => (
        <LocationRow
          key={location.id}
          location={location}
          index={index}
          onClick={() => {}} // No action needed for now
        />
      ))}

      {/* Infinite scroll trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isLoadingMore && (
            <div className="text-muted-foreground font-mono text-sm">
              Loading more coordinates...
            </div>
          )}
        </div>
      )}
    </div>
  );
};
