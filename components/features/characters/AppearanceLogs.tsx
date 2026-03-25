"use client";
import { motion } from "framer-motion";
import { useCharacterEpisodes } from "@/hooks/api/useCharacterEpisodes";
import { Character } from "@/types";

interface EpisodeCardProps {
  episode: {
    id: number;
    episode: string;
    name: string;
  };
  index: number;
}

const EpisodeCard = ({ episode, index }: EpisodeCardProps) => (
  <motion.div
    key={episode.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
    className="shrink-0 glass-surface rounded-sm px-4 py-3 cursor-pointer hover:border-primary/50 transition-all duration-200 group min-w-[140px]"
  >
    <p className="text-[10px] font-mono font-bold text-primary/70 tracking-wider group-hover:text-primary group-hover:text-glow transition-all">
      [{episode.episode}]
    </p>
    <p className="text-[9px] font-mono text-muted-foreground mt-1 truncate group-hover:text-muted-foreground/80">
      {episode.name}
    </p>
  </motion.div>
);

interface AppearanceLogsProps {
  character: Character;
}

export const AppearanceLogs = ({ character }: AppearanceLogsProps) => {
  const { episodes, isLoading } = useCharacterEpisodes(character);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-surface rounded-sm p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          Appearance Logs
        </span>
        <span className="text-[9px] tracking-[0.12em] text-primary/60 font-mono">
          {episodes.length} entries
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="w-1 h-1 rotate-45 bg-primary/30" />
      </div>

      {/* Horizontal scrollable episodes */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {episodes.map((ep, i) => (
          <EpisodeCard key={ep.id} episode={ep} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default AppearanceLogs;
