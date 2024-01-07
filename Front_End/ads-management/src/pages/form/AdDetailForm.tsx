import { CustomDateInput } from '@/components/ui/form/CustomDateInput';
import { Divider, Form, Image } from 'antd';
import dayjs from 'dayjs';
import './CompanyDetailForm.scss';

export default function AdDetailForm({ urlImage, date }: { urlImage: string; date: string }) {
  return (
    <div className='w-full '>
      <h1 className='text-3xl font-bold text-center mb-11'>Thông tin chi tiết bảng quảng cáo </h1>

      <CustomDateInput<any>
        name='companyName'
        label='Ngày hết hạn hợp đồng'
        defaultValue={dayjs(date, 'YYYY-MM-DD')}
        disabled={true}
      />
      <Form.Item label='Hình ảnh bảng quảng cáo ' name='image' labelCol={{ span: 24 }}>
        <Image width={150} className='rounded-lg' src={urlImage} />
      </Form.Item>

      <Divider />
    </div>
  );
}
