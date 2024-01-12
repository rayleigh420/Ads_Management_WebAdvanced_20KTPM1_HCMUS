// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getLocationByOfficerApi } from '@/apis/location/location.api';
import { ButtonPrimary } from '@/components/ui';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocationPageColumns, columnsAdsLocationPage } from './components/LocationPageColumns';

export const adminAdsKey = initKeys('admin-ads');

export default function WardLocationListPage() {
  const [searchParams] = useSearchParams();

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
      const items: LocationPageColumns[] = [];
      for (let i = 0; i < resp.data.data?.items.length; i++) {
        items.push({
          id: +resp.data.data?.items[i].id!,
          locationType: +resp.data.data?.items[i].locationType!,
          advertisingType: resp.data.data?.items[i].advertisingType!,
          address: resp.data.data?.items[i].address!,
          isPlanned: resp.data.data?.items[i].isPlanned!,
          image1: resp.data.data?.items[i].image1!,
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

  return (
    <div className='w-[1200px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý các điểm đặt quảng cáo</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary icon={<PlusOutlined />} title='Thêm quảng cáo' />
        </div>
      </div>

      <CustomTableCore<LocationPageColumns>
        columns={columnsAdsLocationPage}
        data={wardLocationsQuery.data?.items!}
        paging={wardLocationsQuery.data?.pageInfo}
        onChange={handlePageChange}
      />
    </div>
  );
}
