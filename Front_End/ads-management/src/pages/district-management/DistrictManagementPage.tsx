// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { ButtonPrimary } from '@/components/ui';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PlusOutlined } from '@ant-design/icons';
import { columnsDistrictManagement, mockData } from './components/DistrictManagementColumns';

export default function DistrictManagementPage() {
  return (
    <div className='w-full '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý quận</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary icon={<PlusOutlined />} title='Thêm Quận' />
        </div>
      </div>

      <CustomTableCore columns={columnsDistrictManagement} data={mockData} showSelect />
    </div>
  );
}
