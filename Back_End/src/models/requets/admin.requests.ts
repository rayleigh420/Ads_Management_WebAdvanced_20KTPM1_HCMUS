export interface WardReqBody {
  name: string;
  districtId: number;
}

export interface FindWardOption {
  id?: number;
  name?: string;
  districtId?: number;
}

export interface DistrictReqBody {
  name: string;
}

export interface FindDistrictOption {
  id?: number;
  name?: string;
}
