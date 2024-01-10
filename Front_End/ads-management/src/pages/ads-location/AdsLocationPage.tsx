// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getBoardByOfficerApi } from '@/apis/location/location.api';
import { ButtonPrimary } from '@/components/ui';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AdsManagementPageColumns,
  columnsAdsLocationPage,
} from './components/AdsLocationPageColumns';

export const adminAdsKey = initKeys('admin-ads');

export default function AdsLocationListPage() {
  const [searchParams] = useSearchParams();

  const { initialPaging } = useMemo(() => {
    const initialPaging: PagingState = {
      limit: +(searchParams.get('limit') || initialPagingState.limit!),
      skip: +(searchParams.get('skip') || initialPagingState.skip!),
    };
    return { initialPaging };
  }, [searchParams]);

  const { filter, handlePageChange, handleFilterChange } = usePaging<any>({
    initialPaging,
  });

  const adminAds = useQuery({
    queryKey: adminAdsKey.list(filter),
    queryFn: () => getBoardByOfficerApi(filter),
    select: (resp) => {
      const items: AdsManagementPageColumns[] = [];
      for (let i = 0; i < resp.data.data?.items.length; i++) {
        items.push({
          id: resp.data.data?.items[i].id,
          boardType: resp.data.data?.items[i].boardType,
          address: resp.data.data?.items[i].location.address,
          quantity: resp.data.data?.items[i].quantity,
          image1: resp.data.data?.items[i].image1,
          expireDate: resp.data.data?.items[i].expireDate,
          size: `${resp.data.data?.items[i].width}m x ${resp.data.data?.items[i].height}m`,
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
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý điểm đặt quảng cáo</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary icon={<PlusOutlined />} title='Thêm quảng cáo' />
        </div>
      </div>

      <CustomTableCore<AdsManagementPageColumns>
        columns={columnsAdsLocationPage}
        data={adminAds.data?.items!}
        paging={adminAds.data?.pageInfo}
        onChange={handlePageChange}
      />
    </div>
  );
}
