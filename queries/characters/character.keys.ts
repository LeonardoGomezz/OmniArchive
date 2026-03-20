export interface CharacterFilters {
  name?: string;
  status?: string;
  gender?: string;
}

export const characterKeys = {
  all: ["characters"] as const,

  lists: () => [...characterKeys.all, "list"] as const,

  list: (filters?: CharacterFilters) =>
    [...characterKeys.lists(), { ...filters }] as const,

  details: () => [...characterKeys.all, "detail"] as const,
  detail: (id: string | number) =>
    [...characterKeys.details(), id.toString()] as const,
};
