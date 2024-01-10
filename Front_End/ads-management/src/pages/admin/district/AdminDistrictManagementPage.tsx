import { deleteDistrictApi, getDistrictApi } from '@/apis/district/district.api';
import { ButtonPrimary, CustomTableCore } from '@/components/ui';
import ModalConfirm from '@/components/ui/button-primary/ModalConfirm';
import { handleError } from '@/core/helpers/noti-error.helper';
import { initKeys } from '@/core/models/query-key.util';
import { MY_ROUTE } from '@/routes/route.constant';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { columnsDistrictManagement } from './components/DistrictManagementColumns';
import EditDistrictModal from './components/EditDistrictModal';
export const adminDistrictListKeys = initKeys('admin-district');

export default function AdminDistrictManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [value, setValue] = useState<any>({});
  const idRef = useRef<string | null>(null);

  const { data: dataWards, refetch } = useQuery({
    queryKey: adminDistrictListKeys.all,
    queryFn: () => getDistrictApi(),
    select: (resp) => resp.data.data,
    placeholderData: keepPreviousData,
  });

  const { mutate: muteDeleteDistrict } = useMutation({
    mutationFn: (id: string) => deleteDistrictApi(id),
    onSuccess: () => {
      refetch();
      setIsOpenConfirm(false);
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

  const navigate = useNavigate();
  const handleNavigate = (record: any) => {
    navigate(MY_ROUTE.WARD.detail(record.id), {
      state: { name: (record as any).name },
    });
  };

  return (
    <div className='w-[960px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý quận</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary
            icon={<PlusOutlined />}
            title='Thêm Quận'
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <EditDistrictModal isOpen={isOpen} setIsOpen={setIsOpen} initialValue={value} />

      <CustomTableCore
        columns={columnsDistrictManagement(handleDelete, handleEdit, handleNavigate)}
        data={dataWards?.slice().reverse()}
        paging={{ limit: 20, skip: 0, total: 10 }}
      />

      <ModalConfirm
        message='Bạn có chắc chắn muốn xóa quận này?'
        isOpen={isOpenConfirm}
        setIsOpen={setIsOpenConfirm}
        className='mt-5'
        onConfirm={() => {
          muteDeleteDistrict(idRef.current!);
        }}
      />
    </div>
  );
}
