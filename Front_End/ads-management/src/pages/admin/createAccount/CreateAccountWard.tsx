import { createAccountWardApi } from '@/apis/auth/auth.api';
import { getDistrictApi } from '@/apis/district/district.api';
import { getWardApi } from '@/apis/ward/ward.api';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { handleError } from '@/core/helpers/noti-error.helper';
import { PagingState } from '@/core/models/paging.type';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Divider, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export type WardInput = {
  email: string;
  password: string;
  wardId?: string;
  districtId: string;
};

export default function CreateAccountWard() {
  const [form] = Form.useForm<WardInput>();

  const [idDistrict, setIdDistrict] = useState<any>(null);
  const [listWard, setListWard] = useState<any[]>([]);
  const { data: dataDistrict, refetch } = useQuery({
    queryKey: ['district'],
    queryFn: () =>
      getDistrictApi({
        limit: 0,
        skip: 0,
      }),
    select: (resp) => {
      const items: any = resp.data.data.items || [];
      const pageInfo: PagingState = resp.data.data
        ? {
            limit: resp.data.data?.pageSize,
            skip: resp.data.data?.pageNumber,
            total: resp.data.data?.totalRecords,
          }
        : {};
      return { items, pageInfo };
    },
    placeholderData: keepPreviousData,
  });

  const { mutate: muteWard } = useMutation({
    mutationFn: (id: any) => getWardApi({ skip: 0, limit: 0 }, id),
    onSuccess: (resp) => {
      const items: any = [];

      setListWard(resp.data.data.items || []);
    },
    onError: handleError,
  });

  useEffect(() => {
    if (idDistrict) muteWard(+idDistrict);
  }, [idDistrict]);

  const { mutate: muteCreate } = useMutation({
    mutationFn: (data: any) => createAccountWardApi(data),
    onSuccess: (resp) => {
      toast.success('Tạo tài khoản thành công');
      form.resetFields();
    },
    onError: handleError,
  });

  const handleSubmit = (values: WardInput) => {
    muteCreate({
      userType: 2,
      email: values.email,
      password: values.password,
      wardId: values.wardId,
    });
  };
  return (
    <div className='w-full '>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-5'>
          Tạo tài khoản cho nhân viên thuộc phường
        </h1>
        <Form
          name='report-form'
          onFinish={handleSubmit}
          form={form}
          autoComplete='off'
          colon={false}
          labelAlign='left'
          className='mt-11 flex justify-center flex-col gap-5'
        >
          <CustomTextInput<WardInput>
            name='email'
            label='Email'
            rules={[{ required: true, message: 'Please input email!' }, { type: 'email' }]}
          />

          <Form.Item
            name='password'
            labelCol={{ span: 24 }}
            label='Password'
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input type='password' placeholder='Password' className='h-[39px]' />
          </Form.Item>

          <div className='flex justify-between gap-5'>
            <CustomSelectInput<WardInput>
              name='districtId'
              label='Chọn quận'
              classNameForm='w-full'
              onChange={(e) => {
                setIdDistrict(e);
              }}
              rules={[{ required: true, message: 'Please select your report type!' }]}
              options={dataDistrict?.items?.map((item: any) => ({
                value: item.id,
                label: item.name,
              }))}
            />
            <CustomSelectInput<WardInput>
              name='wardId'
              label='Chọn phường'
              classNameForm='w-full'
              rules={[{ required: true, message: 'Please select your report type!' }]}
              options={listWard?.map((item: any) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Divider />
      </div>
    </div>
  );
}
