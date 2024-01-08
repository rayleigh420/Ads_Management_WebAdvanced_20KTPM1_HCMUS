export const removeEmptyParams = <T extends object>(data: any) => {
  const newData: Partial<T> = {};

  for (const key in data) {
    if (
      data[key] !== '' &&
      data[key] !== 'null' &&
      data[key] !== null &&
      data[key] !== undefined &&
      data[key] !== 'ALL'
    ) {
      newData[key as keyof T] = data[key];
    }
  }

  return newData;
};
