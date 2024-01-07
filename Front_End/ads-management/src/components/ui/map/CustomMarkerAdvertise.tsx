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
      key={location.coordinates.long}
      longitude={location.coordinates.long}
      latitude={location.coordinates.lat}
      onClick={() => handleClickMarker(location)}
      draggable
    >
      {/* currently, we temporarily use that method to change the icon color  */}
      {/* {location.advertisingLocation?.type === AdvertisingLocationType.BusStop && ( */}
      <img src={ICONS.MARKER_ADS_RED} alt='' />
    </Marker>
  );
};

export default memo(CustomMarkerAdvertise);
