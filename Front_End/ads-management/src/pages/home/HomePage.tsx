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
import { DEFAULT_LON_LAT_LOCTION, MAP_STYLES, REGEX_COORDINATES_GEOCODER } from '@/core/constants/map.constants';
import { Button } from 'antd';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl, { MapLayerMouseEvent } from 'mapbox-gl';
import axios from 'axios';
import LocationPopup from './components/Popup';
import Location from './components/Location';
import Advertise from './components/Advertise';
import Pin from './components/Pin';
import { set } from 'react-hook-form';
import { AdvertisingLocationInfo } from '@/core/models/adversise.model';
import { AdvertisingLocationType } from '@/core/enums/AdvertisingLocationType.enum';
import MarkerCustom from './components/MarkerCustom';

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

  //mock data for test map
  const locations: AdvertisingLocationInfo[] = [
    {
      advertisingLocation: {
        id: "1",
        typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 1',
        address: 'Đồng Khởi - Nguyễn Du',
        type: AdvertisingLocationType.BusStop,
        size: '2.5m x 10m',
        quantity: '1 trụ/ 1 bảng',
        formOfAdvertising: 'cổ động chính trị',
        name: 'Trụ, cụm pano',
        image: '',
        expirationDate: '12/12/2024'
      },
      coordinates: {
        longitude: 106.65920130189151,
        latitude: 10.80456866726492,
      }
    },
    {
      advertisingLocation: {
        id: "2",
        typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 2',
        address: 'Đồng Khởi - Nguyễn Du',
        type: AdvertisingLocationType.ShoppingMall,
        size: '2.5m x 10m',
        quantity: '1 trụ/ 1 bảng',
        formOfAdvertising: 'cổ động chính trị',
        name: 'Trụ, cụm pano',
        image: '',
        expirationDate: '12/12/2024'
      },
      coordinates:
      {
        longitude: 106.65931931910323,
        latitude: 10.804689861576456,
      }
    },
    {
      advertisingLocation: {
        id: "3",
        typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 3',
        address: 'Đồng Khởi - Nguyễn Du',
        type: AdvertisingLocationType.PublicLand,
        size: '2.5m x 10m',
        quantity: '1 trụ/ 1 bảng',
        formOfAdvertising: 'cổ động chính trị',
        name: 'Trụ, cụm pano',
        image: '',
        expirationDate: '12/12/2024'
      },
      coordinates:
      {
        longitude: 106.65957529854192,
        latitude: 10.804592977044063,
      }
    },
    {
      advertisingLocation: {
        id: "3",
        typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 4',
        address: 'Đồng Khởi - Nguyễn Du',
        type: AdvertisingLocationType.GasStation,
        size: '2.5m x 10m',
        quantity: '1 trụ/ 1 bảng',
        formOfAdvertising: 'cổ động chính trị',
        name: 'Trụ, cụm pano',
        image: '',
        expirationDate: '12/12/2024'
      },
      coordinates:
      {
        longitude: 106.66076782699842,
        latitude: 10.803450999515064,
      }
    },
    {
      advertisingLocation: {
        id: "4",
        typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 5',
        address: 'Đồng Khởi - Nguyễn Du',
        type: AdvertisingLocationType.House,
        size: '2.5m x 10m',
        quantity: '1 trụ/ 1 bảng',
        formOfAdvertising: 'cổ động chính trị',
        name: 'Trụ, cụm pano',
        image: '',
        expirationDate: '12/12/2024'
      },
      coordinates:
      {
        longitude: 106.66094109691875,
        latitude: 10.802745704872967,
      }
    },
    {
      advertisingLocation: {
        id: "5",
        typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 5',
        address: 'Đồng Khởi - Nguyễn Du',
        type: AdvertisingLocationType.House,
        size: '2.5m x 10m',
        quantity: '1 trụ/ 1 bảng',
        formOfAdvertising: 'cổ động chính trị',
        name: 'Trụ, cụm pano',
        image: '',
        expirationDate: '12/12/2024'
      },
      coordinates:
      {
        longitude: 107.07597921052809,
        latitude: 10.341370911378078,
      }
    }
  ];

  const getLocationDefault = () => {
    return {
      advertisingLocation: {
        id: "",
        typeString: '',
        type: -1,
        address: '',
        size: '',
        quantity: '',
        formOfAdvertising: '',
        name: '',
        image: '',
        expirationDate: ''
      },
      coordinates:
      {
        longitude: DEFAULT_LON_LAT_LOCTION,
        latitude: DEFAULT_LON_LAT_LOCTION,
      }
    }
  }

  const [selectedMarker, setSelectedMarker] = useState<AdvertisingLocationInfo>(getLocationDefault());
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [showPin, setShowPin] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState({ longitude: 0, latitude: 0 });
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addressExisted, setAddressExisted] = useState(true);

  const handleClickMarker = useCallback((location: AdvertisingLocationInfo) => {
    console.log('location');
    setShowPin(false);
    setSelectedMarker(location);
  }, []);

  useEffect(() => {
    if (
      selectedMarker.coordinates.latitude != DEFAULT_LON_LAT_LOCTION &&
      selectedMarker.coordinates.longitude != DEFAULT_LON_LAT_LOCTION
    ) {
      setShowPin(false);
      setShowPopup(true);
    }
    console.log('selectedMarker', selectedMarker);
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
    const matches = query.match(REGEX_COORDINATES_GEOCODER);
    if (!matches) {
      return null;
    }

    const coordinateFeature = (lng: number, lat: number) => {
      return {
        center: [lng, lat],
        geometry: {
          typeString: 'Point',
          coordinates: [lng, lat],
        },
        place_name: 'Lat: ' + lat + ' Lng: ' + lng,
        place_type: ['coordinate'],
        properties: {},
        typeString: 'Feature',
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
      locations.map((location) => (
        <MarkerCustom location={location} handleClickMarker={handleClickMarker} />
      )),
    [locations],
  );

  const pins = useMemo(
    () => (
      <Marker
        key={clickedCoordinates.longitude}
        longitude={clickedCoordinates.longitude}
        latitude={clickedCoordinates.latitude}
      >
        <Pin />
      </Marker>
    ),
    [clickedCoordinates],
  );
  console.log('popup', showPopup);
  console.log('pin', showPin);

  // get lng, lat, place_name when click random location on map
  const handleMapClick = (event: MapLayerMouseEvent) => {
    const { lngLat } = event;
    const longitude = lngLat.lng;
    const latitude = lngLat.lat;

    if (showPopup === false) {
      setShowPin(true);
      setClickedCoordinates({ longitude, latitude });
      axios
        .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`, {
          params: {
            access_token: publicKey,
          },
        })
        .then((res) => {
          setName(res.data.features[0].text);
          if (res.data.features[0].properties.address === undefined) {
            setAddressExisted(false);
          } else {
            setAddressExisted(true);
            setAddress(
              res.data.features[0].properties.address + ', ' + res.data.features[3].place_name,
            );
          }
        });
    }
  };

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
          onClick={(event) => handleMapClick(event)}
        >
          {markers}
          {showPin && pins}
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
              longitude={selectedMarker.coordinates.longitude}
              latitude={selectedMarker.coordinates.latitude}
              anchor='bottom'
              onClose={handleClosePopup}
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
        </Map>
        <Button size='large' onClick={handleChangeMapStyle} className='bg-blue-400 text-white mt-4'>
          Change Map Style
        </Button>
      </div>
      <div className='ml-6 w-[25%]'>
        {showPopup && (
          <Advertise
            advertisingLocation={selectedMarker.advertisingLocation}
            coordinates={selectedMarker.coordinates}
          />
        )}
        {showPin && <Location name={name} address={address} addressExisted={addressExisted} />}
      </div>
    </div>
  );
};

export default HomePage;
