import { Coordinates } from '@/core/models/map.model';
import { apiMap } from '@/utils/config/http-map';

export const addressMapDetailApi = async (data: Coordinates) => {
  const params = {
    access_token: import.meta.env.VITE_MAP_BOX_PUBLIC_TOKEN,
  };
  return await apiMap.get(`/mapbox.places/${data.longitude},${data.latitude}.json`, { params });
};