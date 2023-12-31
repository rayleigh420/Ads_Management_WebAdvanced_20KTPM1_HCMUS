import { AdvertisingLocationType } from '@/core/enums/AdvertisingLocationType.enum';
import { AdsOrReportLocationInfo } from '@/core/models/adversise.model';
import { ICONS } from '@/utils/theme';
import { FC, memo } from 'react';
import { Marker } from 'react-map-gl';
interface CustomMarkerAdvertiseProps {
  location: AdsOrReportLocationInfo;
  handleClickMarker: any;
}

const CustomMarkerAdvertise: FC<CustomMarkerAdvertiseProps> = ({ location, handleClickMarker }) => {
  return (
    <Marker
      key={location.coordinates.longitude}
      longitude={location.coordinates.longitude}
      latitude={location.coordinates.latitude}
      onClick={() => handleClickMarker(location)}
      draggable
    >
      {/* currently, we temporarily use that method to change the icon color  */}
      {location.advertisingLocation?.type === AdvertisingLocationType.BusStop && (
        <img src={ICONS.MARKER_ADS_RED} alt='' />
      )}
      {location.advertisingLocation?.type === AdvertisingLocationType.GasStation && (
        <img src={ICONS.MARKER_ADS_BLUE} alt='' />
      )}
      {location.advertisingLocation?.type === AdvertisingLocationType.House && (
        <img src={ICONS.MARKER_ADS_GREEN} alt='' />
      )}
      {location.advertisingLocation?.type === AdvertisingLocationType.Market && (
        <img src={ICONS.MARKER_ADS_GRAY} alt='' />
      )}
      {location.advertisingLocation?.type === AdvertisingLocationType.PrivateLand && (
        <img src={ICONS.MARKER_ADS_PINK} alt='' />
      )}
      {location.advertisingLocation?.type === AdvertisingLocationType.PublicLand && (
        <img src={ICONS.MARKER_ADS_VIOLET} alt='' />
      )}
      {location.advertisingLocation?.type === AdvertisingLocationType.ShoppingMall && (
        <img src={ICONS.MARKER_ADS_BLACK} alt='' />
      )}
    </Marker>
  );
};

export default memo(CustomMarkerAdvertise);
