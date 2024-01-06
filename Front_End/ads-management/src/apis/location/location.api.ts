import { api } from '@/utils/config/http';
import { BaseResponse } from '@/utils/types/response.type';

export type LocationRESP = {
  id: number;
  lat: number;
  long: number;
};

export const getLocationApi = async () => {
  return api.get<BaseResponse<LocationRESP[]>>('/locations/anonymous');
};
