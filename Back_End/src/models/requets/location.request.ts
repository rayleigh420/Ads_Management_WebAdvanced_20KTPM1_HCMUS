export interface LocationReqBody {
  lat?: string;
  long?: string;
  address?: string;
  locationType?: number;
  advertisingType?: number;
  wardId: number;
  isPlanned?: number;
  image1?: string;
  image2?: string;
}
