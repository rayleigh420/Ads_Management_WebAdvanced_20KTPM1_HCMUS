import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useState } from 'react';
import { AimOutlined } from '@ant-design/icons';
import MapInfo from '@/core/models/map.model';

const HomePage = () => {
  //current public and secret key here
  const publicKey =
    'pk.eyJ1Ijoic3RlcmxpbmdoIiwiYSI6ImNscWNsczljdDAzczQycG1zNzVxeWNsd2wifQ.WAoNdtuaSAiWJjsgzHwAcw';
  const secretKey =
    'sk.eyJ1Ijoic3RlcmxpbmdoIiwiYSI6ImNscWNsdWhkYjAyeGUyaXJxaWJoNXcxMW0ifQ.Xr8UkJ8p6uf7FPfMPoVfvw';

  const [viewState, setViewState] = useState({
    longitude: 106.65920130189151,
    latitude: 10.804600283178255,
    zoom: 14
  });

  const onMove = useCallback((evt: any) => {
    setViewState(evt.viewState);
  }, []);

  const locations: MapInfo[] = [
    {
      longitude: 106.65920130189151,
      latitude: 10.80456866726492
    },
    {
      longitude: 106.65931931910323,
      latitude: 10.804689861576456,
    },
    {
      longitude: 106.65957529854192,
      latitude: 10.804592977044063
    },
    {
      longitude: 106.66076782699842,
      latitude: 10.803450999515064
    }
  ]

  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <Map
        mapboxAccessToken={publicKey}
        initialViewState={viewState}
        style={{ width: 600, height: 400 }}
        onMove={onMove}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {locations.map(location => (
          <Marker key={location.longitude}
            longitude={location.longitude}
            latitude={location.latitude}>
            <AimOutlined style={{ fontSize: '32px', color: 'red' }} />
          </Marker>)
        )}
      </Map>
    </div>
  );
};

export default HomePage;
