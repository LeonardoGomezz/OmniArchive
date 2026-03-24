import { motion } from "framer-motion";

interface SegmentedFilterProps {
  options: string[];
  activeOption: string;
  onOptionChange: (option: string) => void;
}

const SegmentedFilter = ({
  options,
  activeOption,
  onOptionChange,
}: SegmentedFilterProps) => {
  return (
    <div className="flex items-center gap-0.5 p-1 glass-surface rounded-sm">
      {options.map((option) => {
        const isActive = activeOption === option;
        return (
          <button
            key={option}
            onClick={() => onOptionChange(option)}
            className={`relative px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-mono transition-all duration-200 rounded-[2px] ${
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-primary/80"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="segment-active"
                className="absolute inset-0 bg-primary/90 rounded-[2px]"
                style={{ boxShadow: "0 0 12px hsl(120 100% 50% / 0.4)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedFilter;
