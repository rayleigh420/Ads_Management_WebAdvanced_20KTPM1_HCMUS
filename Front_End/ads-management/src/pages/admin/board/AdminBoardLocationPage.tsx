// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getBoardByAdminApi } from '@/apis/location/location.api';
import { ButtonPrimary } from '@/components/ui';
import ModalConfirm from '@/components/ui/button-primary/ModalConfirm';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import BoardFormModal from '@/pages/form/BoardForm';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  AdminBoardLocationColumns,
  columnsAdminLocationPage,
} from './components/AdminBoardLocationColumns';

export const adminAdsKey = initKeys('admin-ads');

export default function AdminBoardLocationPage() {
  const [searchParams] = useSearchParams();
  const [modal1Open, setModal1Open] = useState(false);
  const { id } = useParams();
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const idRef = useRef<string | null>(null);
  const [value, setValue] = useState<any>({});

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
    queryFn: () => getBoardByAdminApi(filter, id as string),
    select: (resp) => {
      const items: AdminBoardLocationColumns[] = [];
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
  const navigator = useNavigate();
  useEffect(() => {
    if (adminAds && adminAds.data?.items?.length === 0) {
      toast.error('Vị trí này chưa có điểm quảng cáo');
      navigator(-1);
    }
  }, [adminAds]);

  const handleDelete = (id: any) => {
    idRef.current = id;
    setIsOpenConfirm(true);
  };

  const handleEdit = (data: any) => {
    console.log('data', data);
    setValue(data);
    // setIsOpen(true);
  };

  return (
    <div className='w-[1200px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>
          Quản lý các bảng quảng cáo của location id: {id}
        </h1>
        <ButtonPrimary
          icon={<PlusOutlined />}
          title='Thêm quảng cáo'
          onClick={() => setModal1Open(true)}
        />
      </div>

      <CustomTableCore<AdminBoardLocationColumns>
        columns={columnsAdminLocationPage(handleEdit, handleDelete)}
        data={adminAds.data?.items || []}
        paging={adminAds.data?.pageInfo}
        onPageNumberChange={handlePageChange}
      />
      <ModalConfirm
        message='Bạn có chắc chắn muốn xóa quận này?'
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        className='mt-5'
        onConfirm={() => {
          // muteDeleteWard(idRef.current!);
        }}
      />
      <BoardFormModal isOpen={modal1Open} setIsOpen={setModal1Open} locationId={id as string} />
    </div>
  );
}
