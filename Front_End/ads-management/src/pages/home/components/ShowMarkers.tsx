import { CustomMaker } from '@/components/ui';
import { AdvertisingLocationInfo } from '@/core/models/adversise.model';
import { useCallback, useMemo } from 'react';
import { Popup } from 'react-map-gl';
import LocationPopup from './LocationPopup';
import { mockDataLocations } from './mockDataLocation';

type ShowMarkersProps = {
  selectedMarker?: AdvertisingLocationInfo;
  setSelectedMarker: (location?: AdvertisingLocationInfo) => void;
};

export default function ShowMarkers({ selectedMarker, setSelectedMarker }: ShowMarkersProps) {
  // const [selectedMarker, setSelectedMarker] = useState<AdvertisingLocationInfo>();

  const handleClickMarker = useCallback((location: AdvertisingLocationInfo) => {
    console.log('qwwefdgh');
    setSelectedMarker(location);
  }, []);

  const markers = useMemo(() => {
    return mockDataLocations.map((location) => (
      <CustomMaker location={location} handleClickMarker={handleClickMarker} />
    ));
  }, [mockDataLocations]);

  return (
    <div>
      {markers}
      {selectedMarker && (
        <Popup
          longitude={selectedMarker.coordinates.longitude}
          latitude={selectedMarker.coordinates.latitude}
          anchor='bottom'
          onClose={() => setSelectedMarker(undefined)}
          closeOnClick={false}
          focusAfterOpen
        >
          <LocationPopup
            title='Cổ động chính trị'
            description='Đất công/ Công viên/ Hành lang an toàn giao thông.'
            location='Đồng Khởi, Nguyễn Du'
            status='Đã quy hoạch'
          />
        </Popup>
      )}
    </div>
  );
}
