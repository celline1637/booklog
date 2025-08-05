export const QUERY_KEY = {
  root: ["books"],
  list: () => [...QUERY_KEY.root],
} as const;
