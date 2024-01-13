import { deleteWardApi, getWardApi } from '@/apis/ward/ward.api';
import { ButtonPrimary } from '@/components/ui';
import ModalConfirm from '@/components/ui/button-primary/ModalConfirm';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { handleError } from '@/core/helpers/noti-error.helper';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { columnsWardManagement } from './components/DistrictManagementColumns';
import EditWardModal from './components/EditWardModal';
export const adminWardListKeys = initKeys('admin-ward');

export default function AdminWardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const idRef = useRef<string | null>(null);
  const [value, setValue] = useState<any>({});
  const [searchParams] = useSearchParams();
  const [nameDistrict, setNameDistrict] = useState<string>('');

  const { id } = useParams();
  const location = useLocation();

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

  useEffect(() => {
    console.log('location', location.state?.name);

    if (location.state?.name) {
      console.log('location333', location.state?.name);

      setNameDistrict(location.state?.name);
    }
  }, [location]);
  // const nameDistrict = useMemo(() => location.state?.name, [location]);

  const { data: dataWards, refetch } = useQuery({
    queryKey: adminWardListKeys.list(filter),
    queryFn: () => getWardApi(filter, id as string),
    select: (resp) => {
      const items: any = [];
      const totalPage = resp.data.data?.totalPages || 1;
      for (const item of resp.data.data.items) {
        items.push(item);
      }

      const pageInfo: PagingState = resp.data.data
        ? {
            limit: resp.data.data?.pageSize,
            skip: resp.data.data?.pageNumber,
            total: items.length !== 0 ? totalPage : 1,
          }
        : {};
      return { items, pageInfo };
    },
    placeholderData: keepPreviousData,
  });

  console.log('dataWards', dataWards?.items);
  const { mutate: muteDeleteWard } = useMutation({
    mutationFn: (id: string) => deleteWardApi(id),
    onSuccess: () => {
      refetch();
      setIsOpenConfirm(false);
      toast.success('Xóa phường thành công');
    },
    onError: handleError,
  });

  const handleDelete = (id: any) => {
    idRef.current = id;
    setIsOpenConfirm(true);
  };

  const handleEdit = (data: any) => {
    console.log('data', data);
    setValue(data);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      refetch();
    }
  }, [isOpen]);

  // console.log('dataWards', dataWards?.reverse());

  return (
    <div className='w-[960px] mx-auto '>
      <h1>{nameDistrict}</h1>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý phường</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary
            icon={<PlusOutlined />}
            title='Thêm Phường'
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <EditWardModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={{ ...value, districtId: id }}
      />
      <CustomTableCore
        columns={columnsWardManagement(handleDelete, handleEdit)}
        data={dataWards?.items?.slice().reverse()}
        paging={dataWards?.pageInfo}
        onPageNumberChange={handlePageChange}
      />

      <ModalConfirm
        message='Bạn có chắc chắn muốn xóa quận này?'
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        className='mt-5'
        onConfirm={() => {
          muteDeleteWard(idRef.current!);
        }}
      />
    </div>
  );
}
