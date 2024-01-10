import { api } from '@/utils/config/http';

export const getWardApi = async () => {
  return api.get<any>('/admins/wards');
};

export const createDistrictApi = async (body: { name: string }) => {
  return api.post<any>('/admins/districts', body);
};

export const editDistrictApi = async (body: { name: string }, id: string) => {
  return api.put<any>(`/admins/districts/${id}`, body);
};

export const deleteDistrictApi = async (id: string) => {
  return api.delete<any>(`/admins/districts/${id}`);
};
