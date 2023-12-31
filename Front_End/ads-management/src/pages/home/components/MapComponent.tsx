// MapComponent.tsx
import { MAP_STYLES, REGEX_COORDINATES_GEOCODER } from '@/core/constants/map.constants';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Button } from 'antd';
import mapboxgl, { GeolocateControl, MapLayerMouseEvent } from 'mapbox-gl';
import React, { memo, useRef, useState } from 'react';
import {
  FullscreenControl,
  GeolocateControl as GeoLocationControlReact,
  Map,
  MapEvent,
  MapRef,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';

interface MapComponentProps {
  onMapClick: (event: MapLayerMouseEvent) => void;
  children?: React.ReactNode;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMapClick, children }) => {
  const mapRef = useRef<MapRef>();
  const mapStyleIndex = useRef<number>(0);
  const [mapStyle, setMapStyle] = useState(MAP_STYLES[mapStyleIndex.current]);
  const geoControlRef = useRef<GeolocateControl>(null);

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

  const handleLoadMap = (event: MapEvent) => {
    geoControlRef?.current?.trigger();
    mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_PUBLIC_TOKEN;
    // Add the control to the map.
    mapRef.current?.addControl(
      new MapboxGeocoder({
        accessToken: import.meta.env.VITE_MAP_BOX_PUBLIC_TOKEN,
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

  const handleChangeMapStyle = () => {
    if (mapStyleIndex.current === MAP_STYLES.length - 1) {
      mapStyleIndex.current = 0;
    } else mapStyleIndex.current = mapStyleIndex.current + 1;

    setMapStyle(MAP_STYLES[mapStyleIndex.current]);
  };

  const handleMapClick = (event: MapLayerMouseEvent) => {
    onMapClick(event);
  };

  return (
    <div className='h-[80vh] w-[75%] flex items-center justify-center flex-col'>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAP_BOX_PUBLIC_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        trackResize
        onLoad={handleLoadMap}
        onClick={handleMapClick}
      >
        <FullscreenControl />
        <GeoLocationControlReact
          trackUserLocation
          showUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={true}
          ref={geoControlRef}
        />
        <NavigationControl />
        <ScaleControl style={{ color: 'white', backgroundColor: 'gray' }} />
        {children}
      </Map>
      <Button size='large' onClick={handleChangeMapStyle} className='bg-blue-400 text-white mt-4'>
        Change Map Style
      </Button>
    </div>
  );
};

export default memo(MapComponent);
