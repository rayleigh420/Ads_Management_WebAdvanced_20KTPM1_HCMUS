export interface ModificationReqBody {
  advertisingBoardId: number;
  locationId?: number;
  boardType: number;
  width?: number;
  height?: number;
  location?: LocationUpdate;
  reason?: string;
}

export interface LocationUpdate {
  lat: string;
  long: string;
  address: string;
  wardName: string;
  districtName: string;
}
