import { api } from '@/utils/config/http';
import { PagingREQ } from '../report/report.api';

export const getWardApi = async (params: PagingREQ, id: string) => {
  if (id) return api.get<any>(`/admins/wards/${id}`, { params });
};

export const createWardApi = async (body: { name: string; districtId: string }) => {
  return api.post<any>('/admins/wards', body);
};

export const editWardApi = async (body: { name: string; districtId: string }, id: string) => {
  return api.put<any>(`/admins/wards/${id}`, body);
};

export const deleteWardApi = async (id: string) => {
  return api.delete<any>(`/admins/wards/${id}`);
};
