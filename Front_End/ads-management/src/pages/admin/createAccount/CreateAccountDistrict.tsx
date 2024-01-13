import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { Button, Divider, Form, Input } from 'antd';
export type Input = {
  id?: string;
  email: string;
  password: string[];
  districtName?: string;
};

export default function CreateAccountDistrict() {
  const handleSubmit = (values: Input) => {
    console.log(values);
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
          className='mt-11 flex justify-center flex-col gap-5'
        >
          <CustomTextInput<Input>
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

          <CustomSelectInput<Input>
            name='districtName'
            label='Chọn quận mong muốn'
            rules={[{ required: true, message: 'Please select district!' }]}
            options={[
              { value: 0, label: 'Quận 1' },
              { value: 1, label: 'Quận 2' },
              { value: 2, label: 'Quận 3' },
              { value: 3, label: 'Quận 4' },
            ]}
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
