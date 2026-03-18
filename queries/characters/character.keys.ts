interface CharacterFilters {
  name?: string;
  status?: string;
  gender?: string;
}

export const characterKeys = {
  all: ["characters"] as const,
  lists: () => [...characterKeys.all, "list"] as const,
  list: (page: number, pageSize: number, filters?: CharacterFilters) =>
    [...characterKeys.all, "list", { page, pageSize, ...filters }] as const,
  detail: (id: string) => [...characterKeys.all, "detail", id] as const,
};
