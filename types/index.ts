export interface Character {
  id: number;
  name: string;
  status: StatusOptions;
  species: string;
  type: string;
  gender: GenderOptions;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type StatusOptions = "Alive" | "Dead" | "unknown";
export type GenderOptions = "Female" | "Male" | "Genderless" | "unknown";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
}

export interface LocationFilters {
  type?: string;
  name?: string;
}

export interface Episode {
  id: number;
  name: string;
  episode: string;
  airDate: string;
  characters: string[];
  summary: string;
}

export interface EpisodeFilters {
  season?: string;
  name?: string;
}

export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
  href?: string;
}
