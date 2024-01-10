export const initKeys = (key: string) => {
  const keys = {
    all: [key] as const,
    lists: () => [...keys.all, 'list'] as const,
    list: (filter: object) => [...keys.lists(), filter] as const,
    details: () => [...keys.all, 'detail'] as const,
    detail: (id: number) => [...keys.details(), id] as const,
  };
  return keys;
};
