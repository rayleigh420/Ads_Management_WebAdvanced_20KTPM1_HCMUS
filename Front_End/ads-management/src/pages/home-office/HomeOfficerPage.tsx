import { LocationRESP } from '@/apis/location/location.api';
import { CustomPin } from '@/components/ui';
import { AdvertiseInfoType } from '@/core/models/adversise.model';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Switch } from 'antd';
import { MapLayerMouseEvent } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useRef, useState } from 'react';
import { MapRef, Marker } from 'react-map-gl';
import AdvertiseInfoComponent from './components/AdvertiseInfo';
import LocationInfo from './components/LocationInfo';
import MapComponent from './components/MapComponent';
import ShowMarkers from './components/ShowMarkers';

const HomeOfficerPage = () => {
  const [selectedMarker, setSelectedMarker] = useState<LocationRESP>();
  const [boardAds, setBoardAds] = useState<AdvertiseInfoType[]>();
  const [isReport, setIsReport] = useState<boolean>(true);
  const [isZone, setIsZone] = useState<boolean>(true);
  const mapRef = useRef<MapRef>(null);
  const [zoom, setZoom] = useState<number>();
  const [pageBoard, setPageBoard] = useState<number>(1);

  const isSelectedMarker = useRef(false);

  const handleSelectedMarker = useCallback(
    (location?: LocationRESP) => {
      if (location) {
        isSelectedMarker.current = true;
      }
      setSelectedMarker(location);
    },
    [selectedMarker],
  );

  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const { lngLat } = event;

    if (!isSelectedMarker.current) {
      setBoardAds(undefined);
      handleSelectedMarker({ long: lngLat.lng, lat: lngLat.lat });
    }
    isSelectedMarker.current = false;
  }, []);

  return (
    <div className='w-full flex flex-col'>
      <div className='flex gap-3 items-center w-3/4 justify-center'>
        <div className='text-xl font-semibold'>Báo cáo</div>
        <Switch
          value={isReport}
          onChange={(e) => {
            setIsReport(e);
          }}
        />
        <div className='text-xl font-semibold'>Quảng cáo</div>
        <Switch
          value={isZone}
          onChange={(e) => {
            setIsZone(e);
          }}
        />
      </div>

      <div className='w-full flex'>
        <MapComponent onMapClick={handleMapClick} mapRef={mapRef} setZoom={setZoom}>
          <div>
            <ShowMarkers
              setSelectedMarker={handleSelectedMarker}
              selectedMarker={selectedMarker}
              isReport={isReport}
              mapRef={mapRef}
              zoom={zoom}
              isRefClick={isSelectedMarker}
              boardAds={boardAds}
              setBoardAds={setBoardAds}
              pageBoard={pageBoard}
              setPageBoard={setPageBoard}
            />

            {selectedMarker && !selectedMarker?.id && (
              <Marker
                key={selectedMarker.lat}
                longitude={selectedMarker.long}
                latitude={selectedMarker.lat}
              >
                <CustomPin />
              </Marker>
            )}
          </div>
        </MapComponent>
        <div className='ml-6 w-[25%]'>
          <div className='flex flex-col gap-5'>
            <AdvertiseInfoComponent
              advertiseInfo={boardAds?.[pageBoard - 1]}
              location={selectedMarker}
            />
            {!selectedMarker?.id && <LocationInfo location={selectedMarker} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOfficerPage;
