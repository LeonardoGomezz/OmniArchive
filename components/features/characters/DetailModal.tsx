import { Character } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Dna, Globe, Radio } from "lucide-react";

interface DetailModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDossier?: (character: Character) => void;
}

const statusColor = (status: string) => {
  switch (status) {
    case "Alive":
      return "text-primary";
    case "Dead":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

const DetailModal = ({
  character,
  isOpen,
  onClose,
  onViewDossier,
}: DetailModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && character && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-surface rounded-sm"
            style={{
              boxShadow:
                "0 0 40px hsla(120, 100%, 50%, 0.1), 0 0 80px hsla(120, 100%, 50%, 0.05)",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <X size={16} />
            </button>

            {/* Top section */}
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="sm:w-56 shrink-0">
                <div className="clip-geometric">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-56 sm:h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-6 space-y-4">
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                    Subject Dossier // #{String(character.id).padStart(3, "0")}
                  </p>
                  <h2 className="font-mono text-xl font-bold uppercase italic tracking-wider text-primary text-glow">
                    {character.name}
                  </h2>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  <div className="w-1 h-1 rotate-45 bg-primary/50" />
                  <div className="h-[1px] w-8 bg-primary/30" />
                </div>

                {/* Data fields */}
                <div className="grid grid-cols-2 gap-3">
                  <DataField
                    icon={Radio}
                    label="Status"
                    value={character.status}
                    valueClass={statusColor(character.status)}
                  />
                  <DataField
                    icon={Dna}
                    label="Species"
                    value={character.species}
                    valueClass="text-secondary"
                  />
                  <DataField
                    icon={Globe}
                    label="Origin"
                    value={character.origin.name}
                  />
                  <DataField
                    icon={MapPin}
                    label="Location"
                    value={character.location.name}
                  />
                </div>

                {character.type && (
                  <DataField icon={Dna} label="Type" value={character.type} />
                )}

                <DataField
                  icon={Radio}
                  label="Gender"
                  value={character.gender}
                />
              </div>
            </div>

            {/* Bottom section */}
            <div className="p-6 border-t border-border/30 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
                  Dimensional Activity Log
                </p>
                {onViewDossier && (
                  <button
                    onClick={() => onViewDossier(character)}
                    className="px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-mono rounded-sm transition-all duration-200 text-primary-foreground"
                    style={{
                      background: "hsl(var(--primary) / 0.9)",
                      boxShadow: "0 0 15px hsl(120 100% 50% / 0.3)",
                    }}
                  >
                    View Full Dossier
                  </button>
                )}
              </div>

              {/* Mock chart bars */}
              <div className="flex items-end gap-1 h-16">
                {Array.from({ length: 24 }).map((_, i) => {
                  const height = Math.random() * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t-[1px]"
                      style={{
                        height: `${height}%`,
                        background:
                          height > 70
                            ? "hsl(120, 100%, 50%)"
                            : height > 40
                              ? "hsla(120, 100%, 50%, 0.4)"
                              : "hsla(120, 100%, 50%, 0.15)",
                      }}
                    />
                  );
                })}
              </div>

              {/* Geometric divider */}
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-12 bg-primary/30" />
                <div className="w-1.5 h-1.5 rotate-45 border border-primary/40" />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <StatBlock
                  label="Appearances"
                  value={character.episode.length.toString()}
                />
                <StatBlock
                  label="Dimension"
                  value={character.location.name || "Unknown"}
                />
                <StatBlock label="Threat Level" value="OMEGA" accent />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DataField = ({
  icon: Icon,
  label,
  value,
  valueClass = "text-foreground/80",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex items-start gap-2">
    <Icon size={12} className="text-primary/50 mt-0.5 shrink-0" />
    <div>
      <p className="text-[8px] tracking-[0.15em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className={`text-[11px] tracking-wider font-mono ${valueClass}`}>
        {value}
      </p>
    </div>
  </div>
);

const StatBlock = ({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className="glass-surface p-3 rounded-sm text-center">
    <p
      className={`text-lg font-mono font-bold ${accent ? "text-destructive" : "text-primary text-glow"}`}
    >
      {value}
    </p>
    <p className="text-[8px] tracking-[0.15em] text-muted-foreground uppercase mt-1">
      {label}
    </p>
  </div>
);

export default DetailModal;
