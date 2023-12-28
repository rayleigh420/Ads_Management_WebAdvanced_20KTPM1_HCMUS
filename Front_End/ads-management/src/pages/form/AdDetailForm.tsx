import { Button, Divider, Form, Input, List } from 'antd';
import './CompanyDetailForm.scss';
import { Link } from 'react-router-dom';
import { CustomDateInput } from '@/components/ui/form/CustomDateInput';
import dayjs, { Dayjs } from 'dayjs';
import { EyeOutlined } from '@ant-design/icons';

export default function AdDetailForm() {
  const fileList = [
    {
      uid: '1',
      name: 'image1.jpg',
      url: 'https://cdn.reatimes.vn/mediav2/upload/userfiles2021/images/phongnt/m%C3%A8o%20anh%201.jpg',
    },
    {
      uid: '2',
      name: 'image1.jpg',
      url: 'https://cdn.reatimes.vn/mediav2/upload/userfiles2021/images/phongnt/m%C3%A8o%20anh%201.jpg',
    },
    {
      uid: '3',
      name: 'image1.jpg',
      url: 'https://cdn.reatimes.vn/mediav2/upload/userfiles2021/images/phongnt/m%C3%A8o%20anh%201.jpg',
    },
  ];

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <div className='w-full flex justify-center items-center p-6'>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-11'>Thông tin chi tiết bảng quảng cáo </h1>
        <Form
          name='report-form'
          initialValues={{}}
          autoComplete='off'
          colon={false}
          labelAlign='left'
          className=''
        >
          <CustomDateInput<any>
            name='companyName'
            label='Ngày hết hạn hợp đồng'
            defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')}
            disabled={true}
          />
          <Form.Item label='Hình ảnh bảng quảng cáo ' name='image' labelCol={{ span: 24 }}>
            <List
              dataSource={fileList}
              renderItem={(item) => (
                <List.Item>
                  <img src={item.url} alt={item.name} style={{ width: '50px', height: '50px' }} />
                  <p className='ml-5'>{item.name}</p>
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => handleDownload(item.url, item.name)}
                  >
                    See image
                  </Button>
                </List.Item>
              )}
            />
          </Form.Item>
        </Form>

        <Divider />
      </div>
    </div>
  );
}
