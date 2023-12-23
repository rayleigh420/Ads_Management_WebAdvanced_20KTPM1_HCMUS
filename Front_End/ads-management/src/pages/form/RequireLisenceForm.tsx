import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { CustomDateInput } from '@/components/ui/form/CustomDateInput';
import { Button, Divider, Form, Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useState } from 'react';

export default function RequireLisenceForm() {
  const [fileList, setFileList] = useState([]);
  const handleSubmit = async (data: any) => {
    console.log('reponse');
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
          className=''
        >
          <CustomTextInput<any>
            name='ad-type'
            label='Loại bảng quảng cáo'
            rules={[{ required: true, message: 'Please input your ad type!' }]}
          />
          <CustomTextInput<any>
            name='location'
            label='Điểm đặt bảng quảng cáo'
            rules={[{ required: true, message: 'Please input ad location!' }]}
          />
          <div className='flex justify-between'>
            <CustomTextInput<any>
              name='email'
              label='Email công ty quảng cáo'
              rules={[{ required: true, message: 'Please input your email!' }]}
              classNameInput='w-[250px]'
            />
            <CustomTextInput<any>
              name='phone'
              label='Số điện thoại liên lạc công ty'
              rules={[{ required: true, message: 'Please input your phone!' }]}
              classNameInput='w-[250px]'
            />
            <CustomTextInput<any>
              name='address'
              label='Địa chỉ công ty'
              rules={[{ required: true, message: 'Please input your address!' }]}
              classNameInput='w-[250px]'
            />
          </div>
          <div className='flex justify-between'>
            <CustomDateInput<any>
              name='dateStart'
              label='Ngày bắt đầu hợp đồng'
              rules={[{ required: true, message: 'Please input date start!' }]}
              classNameInput='w-[390px]'
            />
            <CustomDateInput<any>
              name='dateEnd'
              label='Ngày kết thúc hợp đồng'
              rules={[{ required: true, message: 'Please input date end!' }]}
              classNameInput='w-[390px]'
            />
          </div>
          <Form.Item
            label='Nội dung quảng cáo đặt kèm ảnh minh họa'
            name='report-content'
            className='h-[416px] mt-10'
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
          <Form.Item label='Hình ảnh minh họa' name='image'>
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
          <Button
            type='primary'
            htmlType='submit'
            className={`h-[54px] p-[15px] mt-60 bg-cyan-600`}
          >
            Submit
          </Button>
        </Form>

        <Divider />
      </div>
    </div>
  );
}
