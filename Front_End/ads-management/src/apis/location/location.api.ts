import {
  ADVERTISING_TYPE,
  BOARD_TYPE,
  LOCATION_TYPE,
} from '@/core/constants/location-type.contants';
import { AdvertiseInfoType } from '@/core/models/adversise.model';
import { api } from '@/utils/config/http';
import { BaseResponse, PagingResponse } from '@/utils/types/response.type';
import { PagingREQ } from '../report/report.api';
import { LocationBoardsRESP } from './location.response';

export type LocationRESP = {
  id?: string;
  lat: number;
  long: number;
  isPlanned?: number;
  locationType?: number;
  advertisingType?: number;
  address?: string;
  reports?: any[];
  image1?: string;
  advertisingBoards?: any[];
};

export const getLocationByResidentApi = async () => {
  return api.get<BaseResponse<LocationRESP[]>>('/locations/anonymous');
};
export type ReportOfficerREQ = {
  limit?: number;
  skip?: number;
};

export const getLocationByOfficerApi = async (params?: ReportOfficerREQ) => {
  if (!params) {
    params = {
      limit: 0,
      skip: 0,
    };
  }
  return api.get<PagingResponse<LocationRESP>>('/locations/officer', { params });
};

export const getLocationByOfficerLisApi = async (params?: ReportOfficerREQ) => {
  if (!params) {
    params = {
      limit: 0,
      skip: 0,
    };
  }
  return api.get<PagingResponse<LocationRESP>>('/locations/officer/license', { params });
};

export const getLocationByAdminApi = async (params?: ReportOfficerREQ) => {
  if (!params) {
    params = {
      limit: 0,
      skip: 0,
    };
  }
  return api.get<PagingResponse<LocationRESP>>('/admins/locations', { params });
};

export const getBoardByIdLocationApi = async (locationId: string) => {
  return api.get<BaseResponse<LocationBoardsRESP>>('/locations/anonymous/boards', {
    params: { locationId },
  });
};

export type AdsManagementPagRESP = {
  id: number;
  boardType: number;
  location: {
    address: string;
  };
  quantity: number;
  image1: string;
  image2?: string;
  expireDate: string;
  width: string;
  height: string;
};

export const getBoardByOfficerApi = async (params: PagingREQ, id: string) => {
  return api.get<PagingResponse<AdsManagementPagRESP>>(`/boards/ward/${id}`, {
    params,
  });
};

export const getBoardByAdminApi = async (params: PagingREQ, id: string) => {
  return api.get<PagingResponse<AdsManagementPagRESP>>(`/admins/boards/${id}`, {
    params,
  });
};

export const deleteDistrictApi = async (id: any) => {
  return api.delete<BaseResponse<LocationRESP[]>>(`/admins/districts/${id}`);
};

export const modififyApi = async (body: any) => {
  return api.post<any>(`/modifications`, body);
};

export const convertLocationBoardsRESPToAdvertiseInfo = (
  locationBoardsRESP: LocationBoardsRESP,
): AdvertiseInfoType[] => {
  console.log(locationBoardsRESP, 'locationBoardsRESP');
  const { locationType, address, advertisingType } = locationBoardsRESP;
  const output: AdvertiseInfoType[] = [];
  for (const item of locationBoardsRESP.advertisingBoards) {
    console.log('locationBoardsRESP in nha');
    const { expireDate, boardType, quantity, width, height, image1, id } = item;
    const size = `${width}m x ${height}m`;
    output.push({
      id,
      locationType: LOCATION_TYPE[locationType],
      address,
      size,
      quantity,
      advertisingType: ADVERTISING_TYPE[advertisingType],
      name: BOARD_TYPE[boardType],
      reports: item.reports,
      image: image1,
      expirationDate: expireDate,
      locationId: item.locationId,
      isPlanned: locationBoardsRESP.isPlanned === 1 ? true : false,
    });
    console.log(output, 'locationBoardsRESP');
  }
  return output;
};

export const createLocationApi = async (body: any) => {
  return await api.post<BaseResponse<any>>('admins/locations', body);
};
