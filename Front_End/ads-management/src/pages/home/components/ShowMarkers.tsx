import { CustomMarkerAdvertise } from '@/components/ui';
import { AdsOrReportLocationInfo } from '@/core/models/adversise.model';
import { ICONS } from '@/utils/theme';
import { memo, useCallback, useMemo } from 'react';
import { Marker, Popup } from 'react-map-gl';
import LocationPopup from './LocationPopup';
import { mockDataLocations } from './mockDataLocation';

type ShowMarkersProps = {
  selectedMarker?: AdsOrReportLocationInfo;
  setSelectedMarker: (location?: AdsOrReportLocationInfo) => void;
  isZone?: boolean;
  isReport?: boolean;
};

function ShowMarkers({ selectedMarker, setSelectedMarker, isReport, isZone }: ShowMarkersProps) {
  const handleClickMarker = useCallback((location: AdsOrReportLocationInfo) => {
    setSelectedMarker(location);
  }, []);

  const markers = useMemo(() => {
    return mockDataLocations.map((location) => {
      if (!location.isZone) location.isZone = false;

      const isAdvertisingLocation = location.advertisingLocation && location.isZone === isZone;
      const isMarkerForReport = !location.advertisingLocation && isReport;

      return isAdvertisingLocation ? (
        <CustomMarkerAdvertise location={location} handleClickMarker={handleClickMarker} />
      ) : (
        isMarkerForReport && (
          <Marker
            key={location.coordinates.longitude}
            longitude={location.coordinates.longitude}
            latitude={location.coordinates.latitude}
            onClick={() => handleClickMarker(location)}
            draggable
          >
            <img src={ICONS.MARKER_REPORT} alt='' width={40} height={40} />
          </Marker>
        )
      );
    });
  }, [mockDataLocations, isReport, isZone]);

  return (
    <div>
      {markers}
      {selectedMarker?.advertisingLocation && (
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
export default memo(ShowMarkers);
