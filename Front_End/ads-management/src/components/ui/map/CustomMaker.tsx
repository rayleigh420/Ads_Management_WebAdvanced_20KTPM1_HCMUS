import { AdvertisingLocationType } from '@/core/enums/AdvertisingLocationType.enum';
import { AdvertisingLocationInfo } from '@/core/models/adversise.model';
import { AimOutlined } from '@ant-design/icons';
import { FC, memo } from 'react';
import { Marker } from 'react-map-gl';
interface CustomMarkerProps {
  location: AdvertisingLocationInfo;
  handleClickMarker: any;
}

const CustomMarker: FC<CustomMarkerProps> = ({ location, handleClickMarker }) => {
  return (
    <Marker
      key={location.coordinates.longitude}
      longitude={location.coordinates.longitude}
      latitude={location.coordinates.latitude}
      onClick={() => handleClickMarker(location)}
      draggable
    >
      {/* currently, we temporarily use that method to change the icon color  */}
      {location.advertisingLocation.type === AdvertisingLocationType.BusStop && (
        <AimOutlined style={{ fontSize: '32px', color: 'red' }} />
      )}
      {location.advertisingLocation.type === AdvertisingLocationType.GasStation && (
        <AimOutlined style={{ fontSize: '32px', color: 'blue' }} />
      )}
      {location.advertisingLocation.type === AdvertisingLocationType.House && (
        <AimOutlined style={{ fontSize: '32px', color: 'green' }} />
      )}
      {location.advertisingLocation.type === AdvertisingLocationType.Market && (
        <AimOutlined style={{ fontSize: '32px', color: 'gray' }} />
      )}
      {location.advertisingLocation.type === AdvertisingLocationType.PrivateLand && (
        <AimOutlined style={{ fontSize: '32px', color: 'pink' }} />
      )}
      {location.advertisingLocation.type === AdvertisingLocationType.PublicLand && (
        <AimOutlined style={{ fontSize: '32px', color: 'purple' }} />
      )}
      {location.advertisingLocation.type === AdvertisingLocationType.ShoppingMall && (
        <AimOutlined style={{ fontSize: '32px', color: 'black' }} />
      )}
    </Marker>
  );
};

export default memo(CustomMarker);
