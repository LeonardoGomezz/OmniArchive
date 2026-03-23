import { NavItem } from "@/types";
import { Users, MapPin, Tv, BookOpen, Activity } from "lucide-react";

export const navItems: NavItem[] = [
  { icon: Users, label: "Characters", id: "characters" },
  { icon: MapPin, label: "Locations", id: "locations" },
  { icon: Tv, label: "Episodes", id: "episodes" },
  { icon: BookOpen, label: "Codex", id: "codex" },
  { icon: Activity, label: "Diagnostics", id: "diagnostics" },
];
