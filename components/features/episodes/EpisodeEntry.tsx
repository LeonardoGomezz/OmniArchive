"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Episode } from "@/types";
import { useCharactersByEpisode } from "@/hooks/api/useCharactersByEpisode";

interface EpisodeEntryProps {
  episode: Episode;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export const EpisodeEntry = ({
  episode,
  index,
  isExpanded,
  onToggle,
}: EpisodeEntryProps) => {
  const { data: characters } = useCharactersByEpisode(episode.id.toString());
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      {/* Main row */}
      <button
        onClick={onToggle}
        className="w-full glass-surface rounded-sm flex items-center gap-4 px-5 py-4 cursor-pointer group text-left transition-all duration-200 hover:border-primary/50"
      >
        {/* Episode code badge - acts as timeline node */}
        <div className="shrink-0 relative z-10">
          <div
            className="px-2.5 py-1.5 rounded-sm font-mono text-[11px] font-bold tracking-wider border"
            style={{
              background: isExpanded
                ? "hsla(120, 100%, 50%, 0.15)"
                : "hsla(0, 0%, 0%, 0.6)",
              borderColor: isExpanded
                ? "hsl(120 100% 50% / 0.5)"
                : "hsl(120 100% 50% / 0.2)",
              color: isExpanded
                ? "hsl(120 100% 50%)"
                : "hsl(120 100% 50% / 0.7)",
              boxShadow: isExpanded
                ? "0 0 12px hsl(120 100% 50% / 0.3)"
                : "none",
            }}
          >
            [{episode.episode}]
          </div>
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary glitch-hover truncate">
            {episode.name}
          </h3>
          <div className="flex items-center gap-4 mt-1">
            <span className="flex items-center gap-1.5 text-[9px] tracking-[0.1em] text-muted-foreground uppercase">
              <Calendar size={10} />
              {episode.airDate}
            </span>
            <span className="flex items-center gap-1.5 text-[9px] tracking-[0.1em] text-accent/60 uppercase">
              <Users size={10} />
              {episode.characters.length} subjects
            </span>
          </div>
        </div>

        {/* Character avatars */}
        <div className="shrink-0 hidden sm:flex items-center -space-x-2">
          {episode.characters.slice(0, 4).map((char, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border border-border/50 flex items-center justify-center text-[8px] font-mono font-bold text-muted-foreground"
              style={{ background: "hsla(0, 0%, 8%, 0.9)" }}
            >
              {char[0]}
            </div>
          ))}
          {episode.characters.length > 4 && (
            <div
              className="w-6 h-6 rounded-full border border-border/50 flex items-center justify-center text-[8px] font-mono text-muted-foreground"
              style={{ background: "hsla(0, 0%, 8%, 0.9)" }}
            >
              +{episode.characters.length - 4}
            </div>
          )}
        </div>

        {/* Expand chevron */}
        <ChevronDown
          size={14}
          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
            isExpanded ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Expandable panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="ml-[72px] mt-1 p-4 glass-surface rounded-sm border-l-2 border-primary/30 space-y-3">
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
                Transmission Summary
              </p>

              {/* Geometric divider */}
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-8 bg-primary/30" />
                <div className="w-1 h-1 rotate-45 bg-primary/30" />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
              </div>

              <TypewriterText text={episode.summary} />

              {/* Featured characters */}
              <div className="pt-2 border-t border-border/20">
                <p className="text-[8px] tracking-[0.15em] text-muted-foreground uppercase mb-2">
                  Featured Subjects
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {characters?.map((character, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[9px] tracking-wider font-mono text-accent/70 rounded-sm"
                      style={{
                        background: "hsla(174, 100%, 40%, 0.08)",
                        border: "1px solid hsla(174, 100%, 40%, 0.2)",
                      }}
                    >
                      {character.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedChars(0);
    setIsComplete(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedChars(i);
      if (i >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p
      className={`text-[11px] leading-relaxed tracking-wide text-muted-foreground font-mono ${!isComplete ? "typewriter-cursor" : ""}`}
    >
      {text.slice(0, displayedChars)}
    </p>
  );
};
