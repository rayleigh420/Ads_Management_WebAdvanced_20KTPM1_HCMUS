// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { LicenseREQ, deleteLicenseListApi, getLicenseListApi } from '@/apis/board/board.api';
import { ButtonPrimary } from '@/components/ui';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { handleError } from '@/core/helpers/noti-error.helper';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { columnsLicensePage } from './components/LiscenseListColumns';

export const adminAdsKey = initKeys('admin-ads');

export default function LicensesListPage() {
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

  const adminAds = useQuery({
    queryKey: adminAdsKey.list(filter),
    queryFn: () => getLicenseListApi(filter),
    select: (resp) => {
      const items: ({ status: string } & LicenseREQ)[] = [];
      for (const item of resp.data.data.items) {
        if (item.status === 0)
          items.push({
            advertisingBoardId: item[0]?.advertisingBoardId || 1,
            emailOfCompany: item.emailOfCompany,
            phoneNumberOfCompany: item.phoneNumberOfCompany,
            addressOfCompany: item.addressOfCompany,
            startDate: item.startDate,
            endDate: item.endDate,
            status: item.status,
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

  const { mutate: muteDelete } = useMutation({
    mutationFn: (id: string) => deleteLicenseListApi(id),
    onSuccess: () => {
      adminAds.refetch();
      toast.success('Hủy cấp phép thành công');
    },
    onError: handleError,
  });

  const handleDelete = (data: any) => {
    muteDelete(data.advertisingBoardId);
  };

  return (
    <div className='w-[1200px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Danh sách cấp phép quảng cáo</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary icon={<PlusOutlined />} title='Thêm quảng cáo' />
        </div>
      </div>

      <CustomTableCore
        columns={columnsLicensePage(handleDelete)}
        data={adminAds.data?.items as any}
        paging={adminAds.data?.pageInfo}
        onPageNumberChange={handlePageChange}
      />
    </div>
  );
}
