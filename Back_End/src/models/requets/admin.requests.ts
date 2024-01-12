export interface WardReqBody {
  name: string
  districtId: number
}

export interface FindWardOption {
  id?: number
  name?: string
  districtId?: number
}

export interface DistrictReqBody {
  name: string
}

export interface FindDistrictOption {
  id?: number
  name?: string
}

export interface BoardReqBody {
  locationId: number
  boardType: number
  quantity: number
  image1?: string
  expireDate: string
  width?: number
  height?: number
  image2?: string
}

export interface OfficerToDistrict {
  userId: number
  districtId: number
}

export interface OfficerToWard {
  userId: number
  wardId: number
}
