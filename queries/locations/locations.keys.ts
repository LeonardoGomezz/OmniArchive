export const locationKeys = {
  all: ["locations"] as const,
  lists: () => [...locationKeys.all, "list"] as const,
  list: (page: number, pageSize: number, filters?: any) =>
    [...locationKeys.all, "list", { page, pageSize, ...filters }] as const,
  detail: (id: string) => [...locationKeys.all, "detail", id] as const,
};
