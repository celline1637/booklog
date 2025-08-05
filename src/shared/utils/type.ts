export const typedEntries = <T extends GenericObj>(obj: T) =>
  Object.entries(obj) as Entries<T>;

export const typedKeys = <T extends GenericObj>(obj: T) =>
  Object.keys(obj) as Array<keyof typeof obj>;

export const typedValues = <T extends GenericObj>(obj: T) =>
  Object.values(obj) as Array<ValueOf<typeof obj>>;

export type ValueOf<T> = T[keyof T];

export type GenericObj = Record<string, any>;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
