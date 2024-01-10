import { isUndefined } from 'lodash';

export function objectToFormData(data: any) {
  if (typeof data != 'object') return null;
  const formData = new FormData();
  for (const key in data) {
    if (!isUndefined(data[key])) formData.append(key, data[key]);
  }
  return formData;
}
