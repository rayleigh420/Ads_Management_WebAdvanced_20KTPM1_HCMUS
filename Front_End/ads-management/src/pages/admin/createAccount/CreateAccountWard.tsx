import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { Button, Divider, Form, Input, Select, Space } from 'antd';
export type Input = {
  id?: string;
  email: string;
  password: string[];
  districtName?: string;
  wardName?: string;
  area: { districtName: any; wardName: any };
};

export default function CreateAccountWard() {
  const { Option } = Select;
  const handleSubmit = (values: Input) => {
    console.log(values);
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

          <Form.Item labelCol={{ span: 24 }} label='Management area' wrapperCol={{ span: 24 }}>
            <Space.Compact>
              <Form.Item
                name={['area', 'district']}
                rules={[{ required: true, message: 'District is required' }]}
                noStyle
              >
                <Select
                  placeholder='Select district'
                  className='h-[39px]'
                  style={{ width: '500px' }}
                >
                  <Option value='Quận 1'>Quận 1</Option>
                  <Option value='Quận 2'>Quận 2</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={['area', 'ward']}
                noStyle
                rules={[{ required: true, message: 'Ward is required' }]}
              >
                <Select placeholder='Select ward' className='h-[39px]' style={{ width: '300px' }}>
                  <Option value='Phường 1'>Phường 1</Option>
                  <Option value='Phường 2'>Phường 2</Option>
                </Select>
              </Form.Item>
            </Space.Compact>
          </Form.Item>
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
