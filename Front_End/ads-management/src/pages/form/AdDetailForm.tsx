import { Button, Divider, Form, Input, List } from 'antd';
import './CompanyDetailForm.scss';
import { Link } from 'react-router-dom';
import { CustomDateInput } from '@/components/ui/form/CustomDateInput';
import dayjs, { Dayjs } from 'dayjs';
import { EyeOutlined } from '@ant-design/icons';
import './AdDetailForm.scss';

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
          <Form.Item label='Hình ảnh bảng quảng cáo ' name='image' className='mt-10'>
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

          <Link to='/' className='mt-52 p-5 flex align-middle flex-row-reverse '>
            <p className='text-sm font-semibold mt-1'>Quay về trang trước</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='6'
              height='9'
              viewBox='0 0 6 9'
              fill='none'
              className='mt-2 mr-2 font-semibold'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.80039 0.135232C6.05485 0.324102 6.06775 0.640513 5.82919 0.841974L1.4973 4.50001L5.82919 8.15801C6.06775 8.35951 6.05485 8.67591 5.80039 8.86481C5.54591 9.05361 5.14622 9.04341 4.90766 8.84201L0.17082 4.84198C-0.05694 4.64965 -0.05694 4.35037 0.17082 4.15804L4.90766 0.158032C5.14622 -0.0434286 5.54591 -0.0536286 5.80039 0.135232Z'
                fill='black'
              />
            </svg>
          </Link>
        </Form>

        <Divider />
      </div>
    </div>
  );
}
