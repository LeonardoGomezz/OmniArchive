import { cn } from "@/lib/utils";

interface CharacterStatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig = {
  Alive: {
    color: "text-primary",
    bg: "bg-primary/20",
    border: "border-primary/50",
    label: "ACTIVE",
  },
  Dead: {
    color: "text-destructive",
    bg: "bg-destructive/20",
    border: "border-destructive/50",
    label: "TERMINATED",
  },
  unknown: {
    color: "text-muted-foreground",
    bg: "bg-muted/20",
    border: "border-muted/50",
    label: "UNKNOWN",
  },
};

export const CharacterStatusBadge = ({ status, className }: CharacterStatusBadgeProps) => {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.unknown;

  return (
    <div
      className={cn(
        "absolute top-2 right-2 px-2 py-1 rounded-sm border text-[8px] font-mono tracking-wider uppercase",
        config.bg,
        config.border,
        config.color,
        className
      )}
    >
      <div className="flex items-center gap-1">
        <div className={cn("w-1.5 h-1.5 rounded-full", config.bg)} />
        {config.label}
      </div>
    </div>
  );
};
