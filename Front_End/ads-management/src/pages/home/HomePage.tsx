import { CustomPin } from '@/components/ui';
import { AdsOrReportLocationInfo } from '@/core/models/adversise.model';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Switch } from 'antd';
import { MapLayerMouseEvent } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useRef, useState } from 'react';
import { Marker } from 'react-map-gl';
import AdvertiseInfo from './components/AdvertiseInfo';
import LocationInfo from './components/LocationInfo';
import MapComponent from './components/MapComponent';
import ShowMarkers from './components/ShowMarkers';

const HomePage = () => {
  const [selectedMarker, setSelectedMarker] = useState<AdsOrReportLocationInfo>();
  const [isReport, setIsReport] = useState<boolean>(true);
  const [isZone, setIsZone] = useState<boolean>(true);

  const isSelectedMarker = useRef(false);

  const handleSelectedMarker = useCallback(
    (location?: AdsOrReportLocationInfo) => {
      if (location) {
        isSelectedMarker.current = true;
      }
      console.log('location', location);
      setSelectedMarker(location);
    },
    [selectedMarker],
  );

  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const { lngLat } = event;

    if (!isSelectedMarker.current) {
      handleSelectedMarker({
        coordinates: { longitude: lngLat.lng, latitude: lngLat.lat },
      });
    }
    isSelectedMarker.current = false;
  }, []);

  return (
    <div className='w-full flex'>
      <MapComponent onMapClick={handleMapClick}>
        <div>
          <ShowMarkers
            setSelectedMarker={handleSelectedMarker}
            selectedMarker={selectedMarker}
            isReport={isReport}
            isZone={isZone}
          />

          {selectedMarker && !selectedMarker?.advertisingLocation && !selectedMarker?.report && (
            <Marker
              key={selectedMarker.coordinates.longitude}
              longitude={selectedMarker.coordinates.longitude}
              latitude={selectedMarker.coordinates.latitude}
            >
              <CustomPin />
            </Marker>
          )}
        </div>
      </MapComponent>
      <div className='ml-6 w-[25%]'>
        <div className='flex justify-between'>
          <div className='text-xl font-semibold'>Báo cáo</div>
          <Switch
            value={isReport}
            onChange={(e) => {
              setIsReport(e);
            }}
          />
        </div>
        <div className='flex justify-between'>
          <div className='text-xl font-semibold'>Quy hoạch</div>
          <Switch
            value={isZone}
            onChange={(e) => {
              setIsZone(e);
            }}
          />
        </div>
        {selectedMarker?.advertisingLocation && (
          <AdvertiseInfo
            advertisingLocation={selectedMarker.advertisingLocation}
            coordinates={selectedMarker.coordinates}
            report={selectedMarker.report}
          />
        )}
        {!selectedMarker?.advertisingLocation && (
          <LocationInfo
            location={selectedMarker?.coordinates}
            reportInfo={selectedMarker?.report}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
