// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getLocationByOfficerApi } from '@/apis/location/location.api';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { MY_ROUTE } from '@/routes/route.constant';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LocationPageColumns, columnsAdsLocationPage } from './components/LocationPageColumns';

export const adminAdsKey = initKeys('admin-ads');

export default function WardLocationListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { initialPaging } = useMemo(() => {
    const initialPaging: PagingState = {
      limit: +(searchParams.get('limit') || initialPagingState.limit!),
      skip: +(searchParams.get('skip') || initialPagingState.skip!),
    };
    return { initialPaging };
  }, [searchParams]);

  const { filter, handlePageChange } = usePaging<any>({
    initialPaging,
  });

  const wardLocationsQuery = useQuery({
    queryKey: adminAdsKey.list(filter),
    queryFn: () => getLocationByOfficerApi(filter),
    select: (resp) => {
      const items: any = [];
      for (const item of resp.data.data.items) {
        items.push({
          id: +item.id!,
          locationType: +item.locationType!,
          advertisingType: item.advertisingType!,
          address: item.address!,
          isPlanned: item.isPlanned!,
          image1: item.image1!,
        });
      }
      const pageInfo: PagingState = resp.data.data
        ? {
            limit: resp.data.data?.pageSize,
            skip: resp.data.data?.pageNumber,
            total: resp.data.data?.totalRecords,
          }
        : {};
      return { items, pageInfo };
    },
    placeholderData: keepPreviousData,
  });

  const handleNavigate = (data: any) => {
    navigate(`/${MY_ROUTE.WARD.BOARD_DETAIL(data.id)}`, { state: { data } });
  };

  return (
    <div className='w-[1200px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý các điểm đặt quảng cáo</h1>
        <div className='flex justify-end my-3'></div>
      </div>

      <CustomTableCore<LocationPageColumns>
        columns={columnsAdsLocationPage(handleNavigate)}
        data={wardLocationsQuery.data?.items}
        paging={wardLocationsQuery.data?.pageInfo}
        onPageNumberChange={handlePageChange}
      />
    </div>
  );
}
