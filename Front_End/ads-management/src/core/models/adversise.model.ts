import { ReportInput } from '@/pages/form/ReportForm';
import { Coordinates } from './map.model';

export interface AdvertiseInfoType {
  id: string;
  locationType: string;
  address: string;
  size: string;
  quantity: number;
  advertisingType: string;
  name: string;
  image: string;
  locationId: string;
  isPlanned: boolean;
  expirationDate: string;
}
export interface AdsOrReportLocationInfo {
  report?: ReportInput;
  advertisingLocation?: AdvertiseInfoType;
  coordinates: Coordinates;
}

export type ReportTypeLocal = {
  reportId: number;
  locationId?: number;
  boardId?: number;
};
