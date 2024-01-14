// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import {
  deleteAdminEditListApi,
  getModifyApi,
  updateAdminEditListApi,
} from '@/apis/board/board.api';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { BOARD_TYPE } from '@/core/constants/location-type.contants';
import { handleError } from '@/core/helpers/noti-error.helper';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { columnsAdsRequireEdit } from './components/AdsRequireEditPageColumns';
export const adminRequiredListKeys = initKeys('admin-required');
export type RequireList = {
  id: string;
  boardType: string;
  width: string;
  height: string;
  requestTime: string;
  reason: string;
};

export default function AdminRequiredEditPage() {
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

  const { data: dataWards, refetch } = useQuery({
    queryKey: adminRequiredListKeys.list(filter),
    queryFn: () => getModifyApi(filter),
    select: (resp) => {
      const items: RequireList[] = [];
      console.log('items', items);
      for (const item of resp.data.data.items) {
        items.push({
          id: item.id,
          boardType: BOARD_TYPE[item.boardType] + ' -> ' + BOARD_TYPE[item.board.boardType],
          width: item.width + ' -> ' + item.board.width,
          height: item.height + ' -> ' + item.board.height,
          requestTime: item.requestTime,
          reason: item.reason || 'Không có lý do',
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
    mutationFn: (id: string) => deleteAdminEditListApi(id),
    onSuccess: () => {
      refetch();
      toast.success('Từ chối thành công');
    },
    onError: handleError,
  });

  const { mutate: muteAccept } = useMutation({
    mutationFn: (id: string) => updateAdminEditListApi(id),
    onSuccess: () => {
      refetch();
      toast.success('Chấp thuận  thành công');
    },
    onError: handleError,
  });

  const handleDelete = (data: any) => {
    muteDelete(data.id);
  };

  const handleAccept = (data: any) => {
    muteAccept(data.id);
  };
  return (
    <div className='w-full '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>
          Các yêu cầu chỉnh sửa điểm đặt và bảng quảng cáo
        </h1>
      </div>

      <CustomTableCore
        columns={columnsAdsRequireEdit(handleAccept, handleDelete)}
        data={dataWards?.items || []}
        paging={dataWards?.pageInfo}
        showSelect
      />
    </div>
  );
}
