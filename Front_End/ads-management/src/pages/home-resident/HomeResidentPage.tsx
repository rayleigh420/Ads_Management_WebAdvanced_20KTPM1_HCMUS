import { LocationRESP } from '@/apis/location/location.api';
import { CustomPin } from '@/components/ui';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { AdvertiseInfoType } from '@/core/models/adversise.model';
import { OptionItems } from '@/utils/types/option.type';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Switch } from 'antd';
import { MapLayerMouseEvent } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useRef, useState } from 'react';
import { MapRef, Marker } from 'react-map-gl';
import AdvertiseInfoComponent from './components/AdvertiseInfo';
import LocationInfo from './components/LocationInfo';
import MapComponent from './components/MapComponent';
import NoteInfo from './components/NoteInfo';
import ShowMarkers from './components/ShowMarkers';

const optionsReport: OptionItems = [
  {
    label: 'Đã Báo cáo',
    value: true,
  },

  {
    label: 'Tất cả',
    value: null,
  },
];

const optionsAds: OptionItems = [
  {
    label: 'Chưa quy hoạch',
    value: 1,
  },
  {
    label: 'Đã quy hoạch',
    value: 0,
  },
  {
    label: 'Tất cả',
    value: 3,
  },
];

const HomeResidentPage = () => {
  const [selectedMarker, setSelectedMarker] = useState<LocationRESP>();
  const [boardAds, setBoardAds] = useState<AdvertiseInfoType[]>();
  const [isReport, setIsReport] = useState<boolean>(true);
  const [isZone, setIsZone] = useState<number>(3);
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
  const handleChange = (value: number) => {
    console.log('value', value);
    setIsZone(value);
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='flex gap-3 items-center w-full mb-5'>
        <div className='text-xl font-semibold'>Báo cáo</div>

        <Switch
          value={isReport}
          onChange={(e) => {
            setIsReport(e);
          }}
        />

        <div className='text-xl font-semibold'>Bảng quảng cáo</div>
        <CustomSelectInput
          classNameForm='w-[200px]'
          options={optionsAds}
          onChange={handleChange}
          defaultValue={3}
        />
      </div>

      <div className='w-full flex'>
        <MapComponent onMapClick={handleMapClick} mapRef={mapRef} setZoom={setZoom}>
          <div>
            <ShowMarkers
              setSelectedMarker={handleSelectedMarker}
              selectedMarker={selectedMarker}
              isReport={isReport}
              isPlanned={isZone}
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
          <NoteInfo />
        </div>
      </div>
    </div>
  );
};

export default HomeResidentPage;
