import { LicenseREQ, createLicenseApi } from '@/apis/board/board.api';
import { CustomDateInput } from '@/components/ui/form/CustomDateInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { handleError } from '@/core/helpers/noti-error.helper';
import { initKeys } from '@/core/models/query-key.util';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Form } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
export const licenseListKeys = initKeys('license-list');

export default function RequireLicenseForm({ id, setIsOpen }: { id?: string; setIsOpen?: any }) {
  const [fileList, setFileList] = useState([]);
  const [form, setForm] = useState<any>();

  const queryClient = useQueryClient();
  const { mutate: muteRequest } = useMutation({
    mutationFn: (data: LicenseREQ) => createLicenseApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: licenseListKeys.lists() });
      form.resetFields();
      setIsOpen(false);
      toast.success('Yêu cầu cấp phép thành công');
    },
    onError: handleError,
  });
  const handleSubmit = async (data: any) => {
    if (id) data.advertisingBoardId = id;
    muteRequest(data);
  };

  return (
    <div className='w-full flex justify-center items-center p-6'>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-11'>Yêu cầu cấp phép quảng cáo</h1>
        <Form
          name='report-form'
          initialValues={{}}
          onFinish={handleSubmit}
          autoComplete='off'
          colon={false}
          labelAlign='left'
          form={form}
          className=''
        >
          <CustomTextInput<LicenseREQ>
            name='addressOfCompany'
            label='Địa chỉ công ty quảng cáo'
            rules={[{ required: true, message: 'Please input your address!' }]}
          />
          <CustomTextInput<LicenseREQ>
            name='emailOfCompany'
            label='Email công ty quảng cáo'
            rules={[{ required: true, message: 'Please input ad email!' }, { type: 'email' }]}
          />
          <div className='flex justify-between'>
            <CustomTextInput<LicenseREQ>
              name='phoneNumberOfCompany'
              label='Số điện thoại công ty quảng cáo'
              rules={[{ required: true, message: 'Please input your phone!' }]}
              classNameInput='w-[250px]'
            />
          </div>
          <div className='flex justify-between'>
            <CustomDateInput<LicenseREQ>
              name='startDate'
              label='Ngày bắt đầu hợp đồng'
              rules={[{ required: true, message: 'Please input date start!' }]}
              classNameInput='w-[390px]'
            />
            <CustomDateInput<LicenseREQ>
              name='endDate'
              label='Ngày kết thúc hợp đồng'
              rules={[{ required: true, message: 'Please input date end!' }]}
              classNameInput='w-[390px]'
            />
          </div>

          <div className='flex justify-center'>
            <Button
              type='primary'
              htmlType='submit'
              className={`h-[54px] p-[15px] px-[130px] flex justify-center mt-5 bg-cyan-600`}
            >
              Submit
            </Button>
          </div>
        </Form>

        <Divider />
      </div>
    </div>
  );
}
