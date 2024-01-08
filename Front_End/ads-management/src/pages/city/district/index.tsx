// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { ButtonPrimary } from '@/components/ui';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PlusOutlined } from '@ant-design/icons';
import {
  columnsDistrictManagement,
  mockData,
} from '@/pages/district-management/components/DistrictManagementColumns';
import { columnsAdsLocationPage } from '@/pages/ads-location/components/AdsLocationPageColumns';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDistrictApi } from '@/apis/location/location.api';

export default function CityDistrictManagementPage() {
  const [data, setData] = useState([]);

  const { data: dataWards } = useQuery({
    queryKey: ['city-Ward'],
    queryFn: () => getDistrictApi(),
    select: (resp) => resp.data.data,
    placeholderData: keepPreviousData,
  });

  const handleDelete = (id: any) => {
    //handle delete district by id
    console.log(id);
  };

  return (
    <div className='w-full '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý quận</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary icon={<PlusOutlined />} title='Thêm Quận' />
        </div>
      </div>

      <CustomTableCore
        columns={columnsDistrictManagement(handleDelete)}
        data={dataWards as any}
        showSelect
      />
    </div>
  );
}
