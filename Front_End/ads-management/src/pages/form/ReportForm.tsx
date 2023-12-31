import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { UploadOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Divider, Form, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';

export type ReportInput = {
  username: string;
  email: string;
  phone: string;
  select: string;
  reportContent: string;
  image: string;
};

type ReportFormProps = {
  initialValues?: ReportInput;
};

export default function ReportForm({ initialValues }: ReportFormProps) {
  const [form] = Form.useForm<ReportInput>();
  const [fileList, setFileList] = useState([]);
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  console.log('initialValues', initialValues);
  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
  }, [token]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <div className='w-full flex justify-center items-center p-6'>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-11'>Báo cáo địa điểm hoặc quảng cáo</h1>
        <Form
          name='report'
          initialValues={{}}
          onFinish={(values) => console.log(values)}
          autoComplete='off'
          colon={false}
          form={form}
          labelAlign='left'
          className='mt-11'
        >
          <CustomTextInput<ReportInput>
            name='username'
            label='Họ tên người gửi báo cáo'
            rules={[{ required: true, message: 'Please input your name!' }]}
          />
          <div className='flex justify-between gap-5'>
            <CustomTextInput<ReportInput>
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            />
            <CustomTextInput<ReportInput>
              name='phone'
              label='Số điện thoại liên lạc'
              rules={[{ required: true, message: 'Please input your phone!' }]}
            />

            <CustomSelectInput<ReportInput>
              name='select'
              label='Chọn hình thức báo cáo'
              options={[
                { value: 'Tố giác sai phạm', label: 'Tố giác sai phạm' },
                { value: 'Đăng ký nội dung', label: 'Đăng ký nội dung' },
                { value: 'Đóng góp ý kiến', label: 'Đóng góp ý kiến' },
                { value: 'Giải đáp thắc mắc', label: 'Giải đáp thắc mắc' },
              ]}
            />
          </div>

          <Form.Item<ReportInput>
            label='Nội dung báo cáo'
            name='reportContent'
            className='h-[250px] '
            labelCol={{ span: 24 }}
          >
            <Editor
              apiKey='t8nah5tn0cpxgd8k8raf0zzt0c4pxf3rl54o1ys4xfto7k0a'
              initialValue='<p>This is the initial content of the editor</p>'
              init={{
                skin: 'snow',
                icons: 'thin',
                height: 200,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image',
                  'charmap print preview anchor help',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline| fontsizeselect| \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help',
              }}
            />
          </Form.Item>
          <Form.Item<ReportInput> label='Hình ảnh báo cáo' name='image' labelCol={{ span: 24 }}>
            <Upload
              action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
              listType='picture'
              defaultFileList={[...fileList]}
              maxCount={3}
              className='upload-container upload-list-inline'
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <br />
          </Form.Item>
          <div className='flex justify-between'>
            <Button type='primary' htmlType='submit' className={`h-[54px] p-[15px] bg-cyan-600`}>
              Submit
            </Button>
            <div className=''>
              <HCaptcha sitekey='d28eb78d-8dfb-4499-a7bb-46f87d8c5553' />
            </div>
          </div>
        </Form>

        <Divider />
      </div>
    </div>
  );
}
