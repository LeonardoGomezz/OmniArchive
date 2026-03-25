import { Episode, Location, NavItem } from "@/types";
import { Users, MapPin, Tv, BookOpen, Activity } from "lucide-react";

export const navItems: NavItem[] = [
  { icon: Users, label: "Characters", id: "characters" },
  { icon: MapPin, label: "Locations", id: "locations" },
  { icon: Tv, label: "Episodes", id: "episodes" },
  { icon: BookOpen, label: "Codex", id: "codex" },
  { icon: Activity, label: "Diagnostics", id: "diagnostics" },
];

export const mockLocations: Location[] = [
  {
    id: 1,
    name: "Earth (C-137)",
    type: "Planet",
    dimension: "Dimension C-137",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 2,
    name: "Abadango",
    type: "Cluster",
    dimension: "unknown",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 3,
    name: "Citadel of Ricks",
    type: "Space Station",
    dimension: "unknown",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 4,
    name: "Worldender's lair",
    type: "Planet",
    dimension: "unknown",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 5,
    name: "Anatomy Park",
    type: "Microverse",
    dimension: "Dimension C-137",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 6,
    name: "Interdimensional Cable",
    type: "TV",
    dimension: "unknown",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 7,
    name: "Immortality Field Resort",
    type: "Resort",
    dimension: "unknown",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 8,
    name: "Post-Apocalyptic Earth",
    type: "Planet",
    dimension: "Post-Apocalyptic Dimension",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 9,
    name: "Purge Planet",
    type: "Planet",
    dimension: "Replacement Dimension",
    residents: [],
    url: "",
    created: new Date(),
  },
  {
    id: 10,
    name: "Venzenulon 7",
    type: "Planet",
    dimension: "unknown",
    residents: [],
    url: "",
    created: new Date(),
  },
];

export const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: "Pilot",
    episode: "S01E01",
    airDate: "December 2, 2013",
    characters: ["Rick", "Morty", "Beth", "Jerry", "Summer"],
    summary:
      "Rick moves in with his daughter's family and takes his grandson on dangerous interdimensional adventures. A portal-gun powered first outing sets the stage for multiverse-spanning chaos.",
  },
  {
    id: 2,
    name: "Lawnmower Dog",
    episode: "S01E02",
    airDate: "December 9, 2013",
    characters: ["Rick", "Morty", "Snuffles"],
    summary:
      "Rick and Morty enter people's dreams Inception-style, while the family dog becomes hyper-intelligent through a device Rick created. Reality bends at every layer.",
  },
  {
    id: 3,
    name: "Anatomy Park",
    episode: "S01E03",
    airDate: "December 16, 2013",
    characters: ["Rick", "Morty", "Dr. Xenon Bloom"],
    summary:
      "Rick shrinks Morty and sends him inside a homeless man's body to save a microscopic theme park from disease-themed disasters. Jurassic Park meets inner space.",
  },
  {
    id: 4,
    name: "M. Night Shaym-Aliens!",
    episode: "S01E04",
    airDate: "January 13, 2014",
    characters: ["Rick", "Morty", "Jerry"],
    summary:
      "Rick and Morty are trapped in a series of nested simulations by the Zigerions, who are trying to steal Rick's recipe for concentrated dark matter.",
  },
  {
    id: 5,
    name: "Meeseeks and Destroy",
    episode: "S01E05",
    airDate: "January 20, 2014",
    characters: ["Rick", "Morty", "Mr. Meeseeks"],
    summary:
      "Rick gives the family a Meeseeks Box that spawns helpful beings, but Jerry's request proves impossible. Meanwhile, Rick and Morty go on a Jack-and-the-Beanstalk adventure.",
  },
  {
    id: 6,
    name: "Rick Potion #9",
    episode: "S01E06",
    airDate: "January 27, 2014",
    characters: ["Rick", "Morty", "Beth", "Jerry"],
    summary:
      "A love potion goes horribly wrong, mutating the entire human race into Cronenberg monsters. Rick and Morty abandon their reality for a new dimension.",
  },
  {
    id: 7,
    name: "Raising Gazorpazorp",
    episode: "S01E07",
    airDate: "March 10, 2014",
    characters: ["Rick", "Morty", "Summer"],
    summary:
      "Morty becomes a father when he buys an alien sex robot. Summer and Rick visit Gazorpazorp, discovering a female-dominated society.",
  },
  {
    id: 8,
    name: "Rixty Minutes",
    episode: "S01E08",
    airDate: "March 17, 2014",
    characters: ["Rick", "Morty", "Beth", "Jerry", "Summer"],
    summary:
      "Rick hacks the cable box to show TV from alternate dimensions. The family confronts uncomfortable truths about their lives while watching interdimensional content.",
  },
];

export const activityItems = [
  {
    time: "00:14:32",
    event: "New entity scanned",
    detail: "Rick Sanchez // C-137",
    type: "scan" as const,
  },
  {
    time: "00:13:58",
    event: "Dimension breach detected",
    detail: "Cronenberg Dimension",
    type: "alert" as const,
  },
  {
    time: "00:12:45",
    event: "Location indexed",
    detail: "Citadel of Ricks",
    type: "scan" as const,
  },
  {
    time: "00:11:22",
    event: "Status change recorded",
    detail: "Adjudicator Rick → DEAD",
    type: "alert" as const,
  },
  {
    time: "00:10:07",
    event: "Episode archived",
    detail: "S01E06 // Rick Potion #9",
    type: "scan" as const,
  },
  {
    time: "00:09:33",
    event: "Portal activity spike",
    detail: "Sector 7-G anomaly",
    type: "alert" as const,
  },
  {
    time: "00:08:12",
    event: "New species catalogued",
    detail: "Gazorpian // Hostile",
    type: "scan" as const,
  },
];
