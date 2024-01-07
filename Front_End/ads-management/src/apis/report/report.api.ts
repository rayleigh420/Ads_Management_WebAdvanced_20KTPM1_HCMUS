import { ReportInput } from '@/pages/form/ReportForm';
import { api } from '@/utils/config/http';
import { BaseResponse } from '@/utils/types/response.type';

type ReportRESP = {
  locationId?: number;
  boardId?: number;
  id: number;
};

export const createReportApi = async (body: ReportInput) => {
  return await api.post<BaseResponse<ReportRESP>>('/reports/anonymous', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export type ReportREQ = {
  locationId?: number;
  boardId?: number;
  reportId: number;
  reportType: 'board' | 'location';
};
export const getReportApi = async (params: ReportREQ) => {
  return await api.get<any>('/reports/anonymous', {
    params,
  });
};
