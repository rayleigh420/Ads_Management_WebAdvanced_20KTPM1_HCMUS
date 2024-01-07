export type LocationBoardsRESP = {
  id: string;
  lat: number;
  long: number;
  locationType: number;
  advertisingType: number;
  image1: string;
  isPlanned: number;
  wardId: number;
  address: string;
  image2: string;
  advertisingBoards: AdvertisingBoard[];
};

export type AdvertisingBoard = {
  id: string;
  locationId: string;
  quantity: number;
  boardType: number;
  image1: string;
  expireDate: string;
  width: number;
  height: number;
  image2: string;
};
