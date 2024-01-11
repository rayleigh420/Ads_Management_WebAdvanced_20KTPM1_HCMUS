import { api } from '@/utils/config/http';
import { PagingREQ } from '../report/report.api';
export type LicenseREQ = {
  advertisingBoardId: String;
  emailOfCompany: String;
  phoneNumberOfCompany: String;
  addressOfCompany: String;
  startDate: String;
  endDate: String;
};

export const createLicenseApi = async (body: LicenseREQ) => {
  return api.post<any>('/licenses', body);
};

export const getLicenseListApi = async (params: PagingREQ) => {
  return api.get<any>('/licenses', { params });
};
