import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { CustomDateInput } from '@/components/ui/form/CustomDateInput';
import { Button, Divider, Form, Input } from 'antd';

export default function RequireEditForm() {
  const handleSubmit = async (data: any) => {
    console.log('reponse');
  };

  return (
    <div className='w-full flex justify-center items-center p-6'>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-11'>
          Yêu cầu chỉnh sửa điểm đặt hoặc bảng quảng cáo
        </h1>
        <Form
          name='report-form'
          initialValues={{}}
          onFinish={handleSubmit}
          autoComplete='off'
          colon={false}
          labelAlign='left'
          className=''
        >
          <CustomTextInput<any>
            name='ad-news'
            label='Thông tin mới của điểm đặt quảng cáo, bảng quảng cáo'
            rules={[{ required: true, message: 'Please input your ad news!' }]}
          />
          <CustomTextInput<any>
            name='reason'
            label='Lý do chỉnh sửa'
            rules={[{ required: true, message: 'Please input reason!' }]}
          />
          <CustomDateInput<any>
            name='date'
            label='Thời điểm xin chỉnh sửa'
            rules={[{ required: true, message: 'Please input date!' }]}
          />
          <Button
            type='primary'
            htmlType='submit'
            className={`h-[54px] p-[15px] mt-10 bg-cyan-600`}
          >
            Submit
          </Button>
        </Form>

        <Divider />
      </div>
    </div>
  );
}
