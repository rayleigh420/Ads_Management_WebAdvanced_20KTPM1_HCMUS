import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { Button, Divider, Form, Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function ReportForm() {
  const [fileList, setFileList] = useState([]);
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  // const onLoad = () => {
  //   // this reaches out to the hCaptcha JS API and runs the
  //   // execute function on it. you can use other functions as
  //   // documented here:
  //   // https://docs.hcaptcha.com/configuration#jsapi
  //   captchaRef.current.execute();
  // };
  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
  }, [token]);

  const handleSubmit = async (data: any) => {
    console.log('reponse');
  };

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
          labelAlign='left'
          className='mt-11'
        >
          <CustomTextInput<any>
            name='username'
            label='Họ tên người gửi báo cáo'
            rules={[{ required: true, message: 'Please input your name!' }]}
          />
          <div className='flex justify-between gap-5'>
            <CustomTextInput<any>
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            />
            <CustomTextInput<any>
              name='phone'
              label='Số điện thoại liên lạc'
              rules={[{ required: true, message: 'Please input your phone!' }]}
            />

            <CustomSelectInput<any>
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

          <Form.Item
            label='Nội dung báo cáo'
            name='report-content'
            className='h-[416px] '
            labelCol={{ span: 24 }}
          >
            <Editor
              apiKey='t8nah5tn0cpxgd8k8raf0zzt0c4pxf3rl54o1ys4xfto7k0a'
              initialValue='<p>This is the initial content of the editor</p>'
              init={{
                skin: 'snow',
                icons: 'thin',
                height: 400,
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
          <Form.Item
            label='Hình ảnh báo cáo'
            name='report-image'
            className='mt-12'
            labelCol={{ span: 24 }}
          >
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
