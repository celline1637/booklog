export const QUERY_KEY = {
  root: ["reviews"],
  list: () => [...QUERY_KEY.root],
  detail: (id: number) => [...QUERY_KEY.root, id],
} as const;
