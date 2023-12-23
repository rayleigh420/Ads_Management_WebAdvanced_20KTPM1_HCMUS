// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { ButtonPrimary } from '@/components/ui';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PlusOutlined } from '@ant-design/icons';
import { columnsAdsManagement, mockData } from './components/AdsManagementPageColumns';

export default function AdsManagementPage() {
  return (
    <div className='w-full '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Các yêu cầu chỉnh sửa bảng quảng cáo</h1>
        <div className='flex justify-end my-3'>
          <ButtonPrimary icon={<PlusOutlined />} title='Thêm quảng cáo' />
        </div>
      </div>

      <CustomTableCore columns={columnsAdsManagement} data={mockData} showSelect />
    </div>
  );
}
