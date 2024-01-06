import { getLocationApi } from '@/apis/location/location.api';
import { AdsOrReportLocationInfo } from '@/core/models/adversise.model';
import { ICONS } from '@/utils/theme';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { memo, useMemo } from 'react';
import { MapRef, Marker, Popup } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import LocationPopup from './LocationPopup';

type ShowMarkersProps = {
  selectedMarker?: AdsOrReportLocationInfo;
  setSelectedMarker: (location?: AdsOrReportLocationInfo) => void;
  isZone?: boolean;
  isReport?: boolean;
  mapRef: React.MutableRefObject<MapRef | null>;
  zoom: number;
  setZoom: (zoom: number) => void;
  isRefClick: React.MutableRefObject<boolean>;
};

function ShowMarkers({
  selectedMarker,
  setSelectedMarker,
  isReport,
  mapRef,
  zoom,
  isRefClick,
}: ShowMarkersProps) {
  const { data: dataLocation } = useQuery({
    queryKey: ['location'],
    queryFn: () => getLocationApi(),
    select: (resp) => resp.data.data,
    placeholderData: keepPreviousData,
  });

  const handleClickMarker = (location: AdsOrReportLocationInfo) => {
    setSelectedMarker(location);
  };
  const points = useMemo(() => {
    console.log('dataLocation', dataLocation);
    if (dataLocation) {
      return dataLocation.map((data, index) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          crimeId: index,
          category: index,
        },
        id: data.id,
        geometry: {
          type: 'Point',
          coordinates: [data.long, data.lat],
        },
      }));
    }
    return [];
  }, [dataLocation]);

  const bounds: any = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          return (
            <Marker key={`cluster-${cluster.id}`} latitude={latitude} longitude={longitude}>
              <div
                className='cluster-marker'
                style={{
                  width: `${15 + (pointCount / points.length) * 20}px`,
                  height: `${15 + (pointCount / points.length) * 20}px`,
                }}
                onClick={() => {
                  isRefClick.current = true;
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20,
                  );
                  if (mapRef.current)
                    mapRef.current.easeTo({
                      center: cluster.geometry.coordinates,
                      zoom: expansionZoom,
                      duration: 1000,
                      easing: (t) => t,
                    });
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={longitude}
            longitude={longitude}
            latitude={latitude}
            onClick={() => handleClickMarker(cluster.info)}
            draggable
          >
            <img src={ICONS.MARKER_ADS_RED} alt='' />
          </Marker>
        );
      })}
      {selectedMarker?.advertisingLocation && (
        <Popup
          longitude={selectedMarker.coordinates.longitude}
          latitude={selectedMarker.coordinates.latitude}
          anchor='bottom'
          onClose={() => setSelectedMarker(undefined)}
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
    </div>
  );
}
export default memo(ShowMarkers);
