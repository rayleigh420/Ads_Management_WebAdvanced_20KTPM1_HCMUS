import { deleteDistrictApi } from '@/apis/district/district.api';
import { getWardApi } from '@/apis/ward/ward.api';
import { ButtonPrimary } from '@/components/ui';
import ModalConfirm from '@/components/ui/button-primary/ModalConfirm';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { handleError } from '@/core/helpers/noti-error.helper';
import { initKeys } from '@/core/models/query-key.util';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { columnsWardManagement } from './components/DistrictManagementColumns';
import EditWardModal from './components/EditDistrictModal';
export const adminWardListKeys = initKeys('admin-ward');

export default function AdminWardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [value, setValue] = useState<any>({});
  const idRef = useRef<string | null>(null);
  const { id } = useParams();

  const { data: dataWards, refetch } = useQuery({
    queryKey: adminWardListKeys.all,
    queryFn: () => getWardApi(),
    select: (resp) => {
      return resp.data.data.filter((item: any) => item.districtId === id);
    },
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

  // console.log('dataWards', dataWards?.reverse());

  return (
    <div className='w-[960px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý phường</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary
            icon={<PlusOutlined />}
            title='Thêm Quận'
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <EditWardModal isOpen={isOpen} setIsOpen={setIsOpen} initialValue={value} />

      <CustomTableCore
        columns={columnsWardManagement(handleDelete, handleEdit)}
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
