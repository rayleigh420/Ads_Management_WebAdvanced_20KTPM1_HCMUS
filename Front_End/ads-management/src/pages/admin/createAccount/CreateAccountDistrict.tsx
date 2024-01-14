import { createAccountDistrictApi } from '@/apis/auth/auth.api';
import { getDistrictApi } from '@/apis/district/district.api';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { handleError } from '@/core/helpers/noti-error.helper';
import { PagingState } from '@/core/models/paging.type';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Divider, Form, Input } from 'antd';
import { toast } from 'react-toastify';
export type DistrictInput = {
  email: string;
  password: string;
  districtId?: string;
};

export default function CreateAccountDistrict() {
  const [form] = Form.useForm<DistrictInput>();
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

  const { mutate: muteCreate } = useMutation({
    mutationFn: (data: any) => createAccountDistrictApi(data),
    onSuccess: (resp) => {
      toast.success('Tạo tài khoản thành công');
      form.resetFields();
    },
    onError: handleError,
  });

  const handleSubmit = (values: DistrictInput) => {
    muteCreate({
      email: values.email,
      password: values.password,
      districtId: values.districtId,
      userType: 1,
    });
  };

  return (
    <div className='w-full '>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-5'>
          Tạo tài khoản cho nhân viên thuộc quận
        </h1>
        <Form
          name='report-form'
          onFinish={handleSubmit}
          autoComplete='off'
          colon={false}
          labelAlign='left'
          form={form}
          className='mt-11 flex justify-center flex-col gap-5'
        >
          <CustomTextInput<DistrictInput>
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

          <CustomSelectInput<DistrictInput>
            name='districtId'
            label='Chọn quận mong muốn'
            rules={[{ required: true, message: 'Please select district!' }]}
            options={dataDistrict?.items.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))}
          />
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
