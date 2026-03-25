"use client";
import { Users, MapPin, Tv, Activity } from "lucide-react";
import { useCharactersWithFilters } from "@/hooks/api/useCharactersWithFilters";
import { useLocationsWithFilters } from "@/hooks/api/useLocationsWithFilters";
import { useEpisodesWithFilters } from "@/hooks/api/useEpisodesWithFilters";
import { MetricCard } from "./MetricCard";
import { ActivityFeed } from "./ActivityFeed";
import { SystemDiagnostics } from "./SystemDiagnostics";

export const DashboardSection = () => {
  const { characters } = useCharactersWithFilters();
  const { locations } = useLocationsWithFilters();
  const { episodes } = useEpisodesWithFilters();

  // Calculate total counts from data
  const totalCharacters = characters.length;
  const totalLocations = locations.length;
  const totalEpisodes = episodes.length;

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div>
        <h1 className="font-display text-lg font-bold tracking-[0.2em] text-primary text-glow">
          Citadel Database
        </h1>
        <p className="text-[10px] tracking-[0.15em] text-muted-foreground mt-1 uppercase">
          system overview // real-time monitoring
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Characters"
          value={totalCharacters}
          subtitle="across all dimensions"
          icon={Users}
          accent="primary"
          delay={0}
        />
        <MetricCard
          label="Mapped Locations"
          value={totalLocations}
          subtitle="coordinates indexed"
          icon={MapPin}
          accent="secondary"
          delay={0.1}
        />
        <MetricCard
          label="Episode Records"
          value={totalEpisodes}
          subtitle="chronological entries"
          icon={Tv}
          accent="accent"
          delay={0.2}
        />
        <MetricCard
          label="System Status"
          value="ONLINE"
          subtitle="all systems nominal"
          icon={Activity}
          accent="primary"
          delay={0.3}
        />
      </div>

      {/* Bottom section: Activity Feed + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ActivityFeed />
        <SystemDiagnostics
          totalEpisodes={totalEpisodes}
          totalLocations={totalLocations}
        />
      </div>
    </div>
  );
};

export default DashboardSection;
