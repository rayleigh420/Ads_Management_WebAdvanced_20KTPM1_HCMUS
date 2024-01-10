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
  reports?: any[];
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

export const getBoardByIdLocationApi = async (locationId: String) => {
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
  expireDate: string;
  width: string;
  height: string;
};

export const getBoardByOfficerApi = async (params: PagingREQ) => {
  return api.get<PagingResponse<AdsManagementPagRESP>>('/boards/officer', {
    params,
  });
};

export const deleteDistrictApi = async (id: any) => {
  return api.delete<BaseResponse<LocationRESP[]>>(`/admins/districts/${id}`);
};

export const convertLocationBoardsRESPToAdvertiseInfo = (
  locationBoardsRESP: LocationBoardsRESP,
): AdvertiseInfoType[] => {
  console.log(locationBoardsRESP, 'locationBoardsRESP');
  const { locationType, address, advertisingType } = locationBoardsRESP;
  return locationBoardsRESP.advertisingBoards.map((advertisingBoard) => {
    const { expireDate, boardType, quantity, width, height, image1, id } = advertisingBoard;
    const size = `${width}m x ${height}m`;
    return {
      id,
      locationType: LOCATION_TYPE[locationType],
      address,
      size,
      quantity,
      advertisingType: ADVERTISING_TYPE[advertisingType],
      name: BOARD_TYPE[boardType],
      image: image1,
      expirationDate: expireDate,
      locationId: advertisingBoard.locationId,
      isPlanned: locationBoardsRESP.isPlanned === 1 ? true : false,
    };
  });
};
