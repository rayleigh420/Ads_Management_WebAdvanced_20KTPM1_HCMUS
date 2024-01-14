import {
  LocationRESP,
  convertLocationBoardsRESPToAdvertiseInfo,
  getBoardByIdLocationApi,
  getLocationByOfficerLisApi,
} from '@/apis/location/location.api';
import { AdvertiseInfoType } from '@/core/models/adversise.model';
import { ICONS } from '@/utils/theme';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Pagination } from 'antd';
import { memo, useMemo } from 'react';
import { MapRef, Marker, Popup } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import LocationPopup from './LocationPopup';

type ShowMarkersProps = {
  selectedMarker?: LocationRESP;
  setSelectedMarker: (location?: LocationRESP) => void;
  isReport?: boolean;
  mapRef: React.MutableRefObject<MapRef | null>;
  zoom?: number;
  isRefClick: React.MutableRefObject<boolean>;
  boardAds?: AdvertiseInfoType[];
  setBoardAds: (boardAds?: AdvertiseInfoType[]) => void;
  pageBoard: number;
  setPageBoard: React.Dispatch<React.SetStateAction<number>>;
};

function ShowMarkers({
  selectedMarker,
  setSelectedMarker,
  boardAds,
  setBoardAds,
  mapRef,
  zoom,
  isRefClick,
  pageBoard,
  setPageBoard,
}: ShowMarkersProps) {
  const { data: dataLocation } = useQuery({
    queryKey: ['location-officer'],
    queryFn: () => getLocationByOfficerLisApi(),
    select: (resp) => resp.data.data?.items,
    placeholderData: keepPreviousData,
  });

  const { mutate: mutateBoard } = useMutation({
    mutationFn: (id: string) => getBoardByIdLocationApi(id),
    onSuccess: (resp) => {
      if (resp.data.data) {
        setPageBoard(1);
        setBoardAds(convertLocationBoardsRESPToAdvertiseInfo(resp.data.data));
      }
    },
  });

  const handleClickMarker = (location: LocationRESP) => {
    isRefClick.current = true;
    console.log('location.advertisingBoards', location.advertisingBoards);
    // if (location.advertisingBoards && location.advertisingBoards[0].licenseId)
    location.id && mutateBoard(location.id);
    setSelectedMarker(location);
  };

  // clusters
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
        isPlanned: data.isPlanned,
        advertisingBoards: data.advertisingBoards,
        reports: data.reports,
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
    zoom: zoom || 14,
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
        console.log('isCluster sao the', cluster.reports);
        return (
          <Marker
            key={longitude}
            longitude={longitude}
            latitude={latitude}
            onClick={() =>
              handleClickMarker({
                id: cluster.id,
                lat: latitude,
                long: longitude,
                advertisingBoards: cluster.advertisingBoards,
                reports: cluster.reports,
              })
            }
            draggable
          >
            <img
              src={
                cluster.advertisingBoards.length !== 0
                  ? cluster.reports.length === 0
                    ? cluster.isPlanned === 1
                      ? ICONS.MARKER_ADS_RED
                      : ICONS.MARKER_ADS_VIOLET
                    : ICONS.BOARD_REPORT
                  : cluster.reports.length !== 0
                  ? ICONS.REPORT_ICON
                  : ICONS.LOCATION_ICON
              }
              alt=''
            />
          </Marker>
        );
      })}
      {selectedMarker?.id &&
        boardAds?.[pageBoard - 1]?.name &&
        selectedMarker.advertisingBoards && (
          <Popup
            longitude={selectedMarker.long}
            latitude={selectedMarker.lat}
            anchor='bottom'
            onClose={() => setSelectedMarker(undefined)}
            closeOnClick={false}
            focusAfterOpen
          >
            <LocationPopup
              title={boardAds?.[pageBoard - 1]?.name}
              description={boardAds?.[pageBoard - 1]?.locationType}
              location={boardAds?.[pageBoard - 1]?.address}
              status={boardAds?.[pageBoard - 1]?.isPlanned ? 'Đã quy hoạch' : 'Chưa quy hoạch'}
            />
            <Pagination
              simple
              defaultCurrent={1}
              defaultPageSize={1}
              total={boardAds?.length}
              onChange={(page: number, pageSize: number) => {
                setPageBoard(page);
              }}
            />
          </Popup>
        )}
    </div>
  );
}
export default memo(ShowMarkers);
