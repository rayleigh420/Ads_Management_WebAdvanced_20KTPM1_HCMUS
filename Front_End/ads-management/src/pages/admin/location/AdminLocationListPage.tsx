// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getLocationByAdminApi } from '@/apis/location/location.api';
import { ButtonPrimary } from '@/components/ui';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  LocationPageColumns,
  columnsAdminLocationPage,
} from './components/AdminLocationListColumns';

export const adminAdsKey = initKeys('admin-ads');

export default function AdminLocationListPage() {
  const [searchParams] = useSearchParams();
  const idRef = useRef<string | null>(null);
  const [value, setValue] = useState<any>({});

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

  const adminLocationsQuery = useQuery({
    queryKey: adminAdsKey.list(filter),
    queryFn: () => getLocationByAdminApi(filter),
    select: (resp) => {
      const items: LocationPageColumns[] = [];
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
      console.log(resp.data.data?.pageNumber);
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

  const handleDelete = (id: any) => {
    idRef.current = id;
  };

  const handleEdit = (data: any) => {
    console.log('data', data);
    setValue(data);
    // setIsOpen(true);
  };

  return (
    <div className='w-[1200px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý các điểm đặt quảng cáo</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary icon={<PlusOutlined />} title='Thêm quảng cáo' />
        </div>
      </div>

      <CustomTableCore<LocationPageColumns>
        columns={columnsAdminLocationPage(handleEdit, handleDelete)}
        data={adminLocationsQuery.data?.items as any}
        paging={adminLocationsQuery.data?.pageInfo}
        onPageNumberChange={handlePageChange}
      />
    </div>
  );
}
