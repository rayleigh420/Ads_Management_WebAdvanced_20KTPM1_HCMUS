import { STATUS_REPORT } from '@/core/constants/location-type.contants';
import { MY_ROUTE } from '@/routes/route.constant';
import { parseDate } from '@/utils/parser/datetime.parser';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Image, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

export type ReportColumns = {
  id: React.Key;
  fullnameOfReporter: string;
  emailOfReporter: string;
  phoneNumberOfReporter: string;
  image1: string;
  image2: string;
  createdAt: string;
  status: string;
};

export const columnsAdsLocationPage: ColumnsType<ReportColumns> = [
  { title: 'Id', dataIndex: 'id' },
  { title: 'Tên người báo cáo', dataIndex: 'fullnameOfReporter' },
  { title: 'Email', dataIndex: 'emailOfReporter' },
  { title: 'Số điện thoại', dataIndex: 'phoneNumberOfReporter' },
  {
    title: 'Hình ảnh',
    dataIndex: 'image1',
    render: (text) => {
      return <Image width={100} className='rounded-lg' src={text} />;
    },
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    render: (text) => {
      return <div>{parseDate(text)}</div>;
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (status) => {
      return (
        <Space wrap>
          <Tag color={status === 0 ? 'red' : 'cyan'} className='text-lg px-3 rounded-lg'>
            {STATUS_REPORT[status]}
          </Tag>
        </Space>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id',
    render: (status) => (
      <div className='flex flex-col items-center gap-3 justify-center'>
        <div className='flex items-center gap-2 cursor-pointer hover:text-blue-500'>
          <EditOutlined /> Xử lý
        </div>
        <Link to={`${MY_ROUTE.WARD.REPORT_DETAIL(status)}`}>
          <div className='flex items-center gap-2  cursor-pointer hover:text-red-500'>
            <EyeOutlined /> Xem chi tiết
          </div>
        </Link>
      </div>
    ),
  },
];
