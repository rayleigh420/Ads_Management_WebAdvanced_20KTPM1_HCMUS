import {
  ADVERTISING_TYPE,
  BOARD_TYPE,
  LOCATION_TYPE,
} from '@/core/constants/location-type.contants';
import { AdvertiseInfoType } from '@/core/models/adversise.model';
import { api } from '@/utils/config/http';
import { BaseResponse } from '@/utils/types/response.type';
import { LocationBoardsRESP } from './location.response';

export type LocationRESP = {
  id?: string;
  lat: number;
  long: number;
  isPlanned?: number;
};

export const getLocationApi = async () => {
  return api.get<BaseResponse<LocationRESP[]>>('/locations/anonymous');
};

export const getBoardByIdLocationApi = async (locationId: String) => {
  return api.get<BaseResponse<LocationBoardsRESP>>('/locations/anonymous/boards', {
    params: { locationId },
  });
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
