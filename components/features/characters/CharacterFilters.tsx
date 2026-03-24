"use client";
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";

interface CharacterFilters {
  name?: string;
  status?: string;
  gender?: string;
}

interface CharacterFiltersProps {
  filters: CharacterFilters;
  onFiltersChange: (filters: CharacterFilters) => void;
}

const statusOptions = [
  { value: "all", label: "ALL" },
  { value: "alive", label: "ALIVE" },
  { value: "dead", label: "DEAD" },
  { value: "unknown", label: "UNKNOWN" },
];

const genderOptions = [
  { value: "all", label: "ALL" },
  { value: "female", label: "FEMALE" },
  { value: "male", label: "MALE" },
  { value: "genderless", label: "GENDERLESS" },
  { value: "unknown", label: "UNKNOWN" },
];

export const CharacterFilters = ({
  filters,
  onFiltersChange,
}: CharacterFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(filters.name || "");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, name: searchTerm });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, filters, onFiltersChange]);

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status });
  };

  const handleGenderChange = (gender: string) => {
    onFiltersChange({ ...filters, gender });
  };

  const clearFilters = () => {
    setSearchTerm("");
    onFiltersChange({ name: "", status: "all", gender: "all" });
  };

  return (
    <div className="mb-6 p-4 border border-primary/50 rounded-lg bg-background/50 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[300px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60"
            size={16}
          />
          <input
            type="text"
            placeholder="Search subject name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background/80 border border-primary/30 rounded-md focus:outline-none focus:border-primary focus:shadow-[0_0_8px_hsl(120_100%_50%_/0.3)] text-foreground placeholder-primary/40 font-mono text-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-primary text-xs font-bold tracking-wider uppercase">
            STATUS:
          </span>
          <select
            value={filters.status || "all"}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-1 bg-background/80 border border-primary/30 rounded-md focus:outline-none focus:border-primary text-primary text-sm font-mono uppercase tracking-wider"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div className="flex items-center gap-2">
          <span className="text-primary text-xs font-bold tracking-wider uppercase">
            GENDER:
          </span>
          <select
            value={filters.gender || "all"}
            onChange={(e) => handleGenderChange(e.target.value)}
            className="px-3 py-1 bg-background/80 border border-primary/30 rounded-md focus:outline-none focus:border-primary text-primary text-sm font-mono uppercase tracking-wider"
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Icon */}
        <button
          onClick={clearFilters}
          className="p-2 border border-primary/30 rounded-md hover:border-primary transition-colors group"
          title="Clear filters"
        >
          <Filter
            size={16}
            className="text-primary/60 group-hover:text-primary transition-colors"
          />
        </button>
      </div>
    </div>
  );
};
