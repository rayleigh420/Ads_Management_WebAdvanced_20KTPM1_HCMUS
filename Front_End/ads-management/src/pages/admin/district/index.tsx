// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getDistrictApi } from '@/apis/location/location.api';
import { ButtonPrimary } from '@/components/ui';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { columnsDistrictManagement } from '@/pages/district-management/components/DistrictManagementColumns';
import { PlusOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EditDistrictModal from './components/EditDistrictModal';

export default function CityDistrictManagementPage() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data: dataWards } = useQuery({
    queryKey: ['city-management-district'],
    queryFn: () => getDistrictApi(),
    select: (resp) => resp.data.data,
    placeholderData: keepPreviousData,
  });

  const handleDelete = (id: any) => {
    //handle delete district by id
    console.log(id);
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
      <EditDistrictModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <CustomTableCore columns={columnsDistrictManagement(handleDelete)} data={dataWards as any} />
    </div>
  );
}
