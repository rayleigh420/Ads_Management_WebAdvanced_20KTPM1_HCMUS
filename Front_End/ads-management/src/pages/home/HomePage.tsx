import { CustomPin } from '@/components/ui';
import { AdvertisingLocationInfo } from '@/core/models/adversise.model';
import { Coordinates } from '@/core/models/map.model';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapLayerMouseEvent } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useRef, useState } from 'react';
import { Marker } from 'react-map-gl';
import AdvertiseInfo from './components/AdvertiseInfo';
import LocationInfo from './components/LocationInfo';
import MapComponent from './components/MapComponent';
import ShowMarkers from './components/ShowMarkers';

const HomePage = () => {
  const [selectedMarker, setSelectedMarker] = useState<AdvertisingLocationInfo>();

  const isSelectedMarker = useRef(false);
  const [locationPin, setLocationPin] = useState<Coordinates>();

  const addSelectedMarker = useCallback(
    (location?: AdvertisingLocationInfo) => {
      if (location) {
        setLocationPin(undefined);
        isSelectedMarker.current = true;
      }
      setSelectedMarker(location);
    },
    [selectedMarker],
  );

  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const { lngLat } = event;

    if (!isSelectedMarker.current) {
      addSelectedMarker(undefined);
      setLocationPin({ longitude: lngLat.lng, latitude: lngLat.lat });
    }
    isSelectedMarker.current = false;
  }, []);

  return (
    <div className='w-full flex'>
      <MapComponent onMapClick={handleMapClick}>
        <div>
          <ShowMarkers setSelectedMarker={addSelectedMarker} selectedMarker={selectedMarker} />
          {locationPin && (
            <Marker
              key={locationPin.longitude}
              longitude={locationPin.longitude}
              latitude={locationPin.latitude}
            >
              <CustomPin />
            </Marker>
          )}
        </div>
      </MapComponent>
      <div className='ml-6 w-[25%]'>
        {selectedMarker && (
          <AdvertiseInfo
            advertisingLocation={selectedMarker.advertisingLocation}
            coordinates={selectedMarker.coordinates}
          />
        )}
        {locationPin && <LocationInfo location={locationPin} />}
      </div>
    </div>
  );
};

export default HomePage;
