import { Coordinates } from "./map.model";

export interface AdvertiseInfo {
    type: string,
    address: string,
    size: string,
    quantity: string,
    formOfAdvertising: string,
    name: string,
    image: string,
    expirationDate: string,
}
export interface AdvertisingLocationInfo {
    advertisingLocation: AdvertiseInfo,
    coordinates: Coordinates
}
