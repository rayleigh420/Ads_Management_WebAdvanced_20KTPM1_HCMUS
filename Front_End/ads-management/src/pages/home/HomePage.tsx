import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  MapEvent,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AimOutlined, ExclamationOutlined, MoreOutlined } from '@ant-design/icons';
import { Coordinates } from '@/core/models/map.model';
import { DEFAULT_LON_LAT_LOCTION, MAP_STYLES } from '@/core/constants/map.constants';
import { Button } from 'antd';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import LocationPopup from './components/Popup';
import Advertise from './components/Advertise';

const HomePage = () => {
  //current public and secret key here
  const publicKey =
    'pk.eyJ1Ijoic3RlcmxpbmdoIiwiYSI6ImNscWNsczljdDAzczQycG1zNzVxeWNsd2wifQ.WAoNdtuaSAiWJjsgzHwAcw';
  const secretKey =
    'sk.eyJ1Ijoic3RlcmxpbmdoIiwiYSI6ImNscWNsdWhkYjAyeGUyaXJxaWJoNXcxMW0ifQ.Xr8UkJ8p6uf7FPfMPoVfvw';

  const mapStyleIndex = useRef<number>(0);
  const [mapStyle, setMapStyle] = useState(MAP_STYLES[mapStyleIndex.current]);
  const mapRef = useRef<MapRef>();
  const geoControlRef = useRef<mapboxgl.GeolocateControl>();

  const locations: Coordinates[] = [
    {
      longitude: 106.65920130189151,
      latitude: 10.80456866726492,
    },
    {
      longitude: 106.65931931910323,
      latitude: 10.804689861576456,
    },
    {
      longitude: 106.65957529854192,
      latitude: 10.804592977044063,
    },
    {
      longitude: 106.66076782699842,
      latitude: 10.803450999515064,
    },
    {
      longitude: 106.66094109691875,
      latitude: 10.802745704872967,
    },
  ];

  const [selectedMarker, setSelectedMarker] = useState<Coordinates>({
    longitude: DEFAULT_LON_LAT_LOCTION,
    latitude: -DEFAULT_LON_LAT_LOCTION,
  });
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleClickMarker = useCallback((location: Coordinates) => {
    setSelectedMarker(location);
  }, []);

  useEffect(() => {
    if (
      selectedMarker.latitude != DEFAULT_LON_LAT_LOCTION &&
      selectedMarker.longitude != DEFAULT_LON_LAT_LOCTION
    )
      setShowPopup(true);
  }, [selectedMarker]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChangeMapStyle = () => {
    if (mapStyleIndex.current === MAP_STYLES.length - 1) {
      mapStyleIndex.current = 0;
    } else mapStyleIndex.current = mapStyleIndex.current + 1;

    setMapStyle(MAP_STYLES[mapStyleIndex.current]);
  };

  const handleLoadMap = (event: MapEvent) => {
    geoControlRef.current?.trigger();
    mapboxgl.accessToken = publicKey;
    // Add the control to the map.
    mapRef.current?.addControl(
      new MapboxGeocoder({
        accessToken: publicKey,
        localGeocoder: coordinatesGeocoder,
        zoom: 14,
        placeholder: 'Search the location',
        mapboxgl: mapboxgl,
        reverseGeocode: true,
        countries: 'VN',
        language: 'vi',
        marker: true,
      }),
    );
  };

  const coordinatesGeocoder = (query: string) => {
    // Match anything which looks like
    // decimal degrees coordinate pair.
    const matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
    if (!matches) {
      return null;
    }

    const coordinateFeature = (lng: number, lat: number) => {
      return {
        center: [lng, lat],
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        place_name: 'Lat: ' + lat + ' Lng: ' + lng,
        place_type: ['coordinate'],
        properties: {},
        type: 'Feature',
      };
    };

    const coord1 = Number(matches[1]);
    const coord2 = Number(matches[2]);
    const geocodes: any = [];

    if (coord1 < -90 || coord1 > 90) {
      // must be lng, lat
      geocodes.push(coordinateFeature(coord1, coord2));
    }

    if (coord2 < -90 || coord2 > 90) {
      // must be lat, lng
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    if (geocodes.length === 0) {
      // else could be either lng, lat or lat, lng
      geocodes.push(coordinateFeature(coord1, coord2));
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    return geocodes;
  };

  const markers = useMemo(
    () =>
      locations.map((location, index) => (
        <Marker
          key={location.longitude}
          longitude={location.longitude}
          latitude={location.latitude}
          onClick={() => handleClickMarker(location)}
        >
          <AimOutlined style={{ fontSize: '32px', color: 'red' }} />
        </Marker>
      )),
    [locations],
  );

  return (
    <div className='w-full flex'>
      <div className='h-[80vh] w-[75%] flex items-center justify-center flex-col'>
        <Map
          mapboxAccessToken={publicKey}
          style={{ width: '100%', height: '100%' }}
          mapStyle={mapStyle}
          trackResize
          ref={mapRef}
          onLoad={handleLoadMap}
        >
          {markers}
          <FullscreenControl />
          <GeolocateControl
            trackUserLocation
            showUserLocation={true}
            showUserHeading={true}
            showAccuracyCircle={true}
            ref={geoControlRef}
          />
          <NavigationControl />
          <ScaleControl style={{ color: 'white', backgroundColor: 'gray' }} />

          {showPopup && (
            <Popup
              longitude={selectedMarker.longitude}
              latitude={selectedMarker.latitude}
              anchor='bottom'
              onClose={handleClosePopup}
              closeOnClick={false}
              focusAfterOpen
            >
              <LocationPopup
                title='Cổ đông chính trị'
                description='Đất công/ Công viên/ Hành lang an toàn giao thông.'
                location='Đồng Khởi, Nguyễn Du'
                status='Đã quy hoạch'
              />
            </Popup>
          )}
        </Map>
        <Button size='large' onClick={handleChangeMapStyle} className='bg-blue-400 text-white mt-4'>
          Change Map Style
        </Button>
      </div>
      <div className='ml-6 w-[25%]'>
        <Advertise
          advertisingLocation={{
            type: 'Đất công/ Công viên/ Hành lang an toàn giao thông',
            address: 'Đồng Khởi - Nguyễn Du',
            size: '2.5m x 10m',
            quantity: '1 trụ/ 1 bảng',
            formOfAdvertising: 'cổ đông chính trị',
            name: 'Trụ, cụm pano',
            image: '',
            expirationDate: '12/12/2024'
          }}
          coordinates={selectedMarker}
        />
      </div>
    </div>
  );
};

export default HomePage;
