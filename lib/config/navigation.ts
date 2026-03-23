import { Users, MapPin, Tv, BookOpen, Activity } from "lucide-react";
import { NavItem } from "@/types";

export const NAVIGATION_CONFIG = {
  ITEMS: [
    { icon: Users, label: "Characters", id: "characters", href: "/" },
    { icon: MapPin, label: "Locations", id: "locations", href: "/locations" },
    { icon: Tv, label: "Episodes", id: "episodes", href: "/episodes" },
    { icon: BookOpen, label: "Codex", id: "codex", href: "/codex" },
    { icon: Activity, label: "Diagnostics", id: "diagnostics", href: "/diagnostics" },
  ] as NavItem[],
  SIDEBAR: {
    COLLAPSED_WIDTH: 64,
    EXPANDED_WIDTH: 224,
    TRANSITION_DURATION: 300,
  },
} as const;
