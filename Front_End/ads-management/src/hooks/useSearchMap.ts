import { REGEX_COORDINATES_GEOCODER } from '@/core/constants/map.constants';
import { Result } from '@mapbox/mapbox-gl-geocoder';

export const useSearchMap = (query: string): Result[] => {
  // Match anything which looks like
  // decimal degrees coordinate pair.
  const matches = query.match(REGEX_COORDINATES_GEOCODER);
  if (!matches) {
    return [];
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
  const geocodes: Result[] = [];

  if (coord1 < -90 || coord1 > 90) {
    // must be lng, lat
    geocodes.push(coordinateFeature(coord1, coord2) as any);
  }

  if (coord2 < -90 || coord2 > 90) {
    // must be lat, lng
    geocodes.push(coordinateFeature(coord2, coord1) as any);
  }

  if (geocodes.length === 0) {
    // else could be either lng, lat or lat, lng
    geocodes.push(coordinateFeature(coord1, coord2) as any);
    geocodes.push(coordinateFeature(coord2, coord1) as any);
  }

  return geocodes;
};
