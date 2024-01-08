export function getEnum<T>(value: string | number, myEnum: object): T | null {
  const index = Object.values(myEnum).indexOf(value as unknown as T);
  if (index !== -1) return value as T;
  console.error(`Invalid enum value: ${value}`);
  return null;
}

export function getEnumKey<T>(value: string | number, myEnum: object): T | null {
  const index = Object.values(myEnum).indexOf(value as unknown as T);
  if (index === -1) return null;
  return Object.keys(myEnum)[index] as T;
}
