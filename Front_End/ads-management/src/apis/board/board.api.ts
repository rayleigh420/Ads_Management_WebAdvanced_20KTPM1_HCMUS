import { BoardInput } from '@/pages/form/BoardForm';
import { api } from '@/utils/config/http';
import { BaseResponse } from '@/utils/types/response.type';
import { PagingREQ } from '../report/report.api';
export type LicenseREQ = {
  advertisingBoardId: string;
  emailOfCompany: string;
  phoneNumberOfCompany: string;
  addressOfCompany: string;
  startDate: string;
  endDate: string;
};

export const createLicenseApi = async (body: LicenseREQ) => {
  return api.post<any>('/licenses', body);
};

export const getLicenseListApi = async (params: PagingREQ) => {
  return api.get<any>('/licenses', { params });
};

export const deleteLicenseListApi = async (id: string) => {
  return api.get<any>(`/licenses/${id}`);
};

export const getAdvertisingTypeApi = async (params: PagingREQ) => {
  return await api.get<any>('/admins/advertising-type', {
    params,
  });
};

export const editAdvertisingTypeApi = async (body: { name: string }, id?: string) => {
  return api.put<any>(`/admins/advertising-type/${id}`, body);
};

export const createAdvertisingTypeApi = async (body: { name: string }) => {
  return api.post<any>(`/admins/advertising-type`, body);
};

export const deleteAdvertisingTypeApi = async (id: string) => {
  return api.delete<any>(`/admins/advertising-type/${id}`);
};

export const getReportTypeApi = async (params: PagingREQ) => {
  return await api.get<any>('/admins/report-form', {
    params,
  });
};

export const editReportTypeApi = async (body: { name: string }, id?: string) => {
  return api.put<any>(`/admins/report-form/${id}`, body);
};

export const createReportTypeApi = async (body: { name: string }) => {
  return api.post<any>(`/admins/report-form`, body);
};

export const deleteReportTypeApi = async (id: string) => {
  return api.delete<any>(`/admins/report-form/${id}`);
};

//modify
export const getModifyApi = async (params: PagingREQ) => {
  return api.get<any>('/admins/modification-requests', { params });
};

export const deleteAdminLicenseListApi = async (id: string) => {
  return api.get<any>(`admins/cancel-license/${id}`);
};

export const updateAdminLicenseListApi = async (id: string) => {
  return api.get<any>(`admins/approve-license/${id}`);
};

export const createBoardApi = async (body: BoardInput) => {
  return await api.post<BaseResponse<any>>('//boards', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
