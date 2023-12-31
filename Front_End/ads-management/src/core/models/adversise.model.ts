import { ReportInput } from '@/pages/form/ReportForm';
import { Coordinates } from './map.model';

export interface AdvertiseInfo {
  id: string;
  typeString: string;
  type: number;
  address: string;
  size: string;
  quantity: string;
  formOfAdvertising: string;
  name: string;
  image: string;
  expirationDate: string;
}
export interface AdsOrReportLocationInfo {
  report?: ReportInput;
  advertisingLocation?: AdvertiseInfo;
  isZone?: boolean;
  coordinates: Coordinates;
}
