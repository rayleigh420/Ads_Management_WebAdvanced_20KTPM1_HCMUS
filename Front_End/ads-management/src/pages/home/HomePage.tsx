import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AimOutlined } from '@ant-design/icons';
import LocationInfo from '@/core/models/map.model';
import mapboxgl from 'mapbox-gl';

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

  const locations: LocationInfo[] = [
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
    },
    {
      longitude: 106.66094109691875,
      latitude: 10.802745704872967
    }
  ]

  const [selectedMarker, setSelectedMarker] = useState<LocationInfo>({ longitude: -1, latitude: -1 })
  const [showPopup, setShowPopup] = useState<boolean>(true);


  const markerRef = useRef<mapboxgl.Marker>();

  const handleClickMarker = useCallback((location: LocationInfo) => {
    console.log(location);

    setSelectedMarker(location)
    markerRef.current?.setLngLat({
      lng: location.longitude,
      lat: location.latitude
    })
    markerRef.current?.togglePopup();
  }, []);


  const markers = useMemo(() => locations.map((location, index) => (
    <Marker key={location.longitude}
      longitude={location.longitude}
      latitude={location.latitude}
      ref={markerRef}
      onClick={() => handleClickMarker(location)}
    >
      <AimOutlined style={{ fontSize: '32px', color: 'red' }} />
    </Marker>)
  ), [locations]);


  return (
    <div className='w-full flex  items-center justify-center flex-col'>
      <Map
        mapboxAccessToken={publicKey}
        initialViewState={viewState}
        style={{ width: 600, height: 400 }}
        onMove={onMove}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {markers}
        <FullscreenControl />
        <GeolocateControl trackUserLocation />
        <NavigationControl />
        {showPopup && (
          <Popup longitude={106.66094109691875} latitude={10.802745704872967}
            anchor="bottom"
            onClose={() => setShowPopup(false)}>
            You are here
          </Popup>)}
      </Map>
    </div>
  );
};

export default HomePage;
