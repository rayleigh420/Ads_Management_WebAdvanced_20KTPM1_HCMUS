import { LicenseREQ } from '@/apis/board/board.api';
import { STATUS_LICENSE } from '@/core/constants/location-type.contants';
import { parseDate } from '@/utils/parser/datetime.parser';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

export const columnsLicensePage = (
  onAccept: any,
  onDelete: any,
): ColumnsType<{ status: string } & LicenseREQ> => [
  {
    title: 'Id ',
    dataIndex: 'id',
    width: '8%',
    render: (text) => {
      return <span className='ml-5'>{text}</span>;
    },
  },
  {
    title: 'Email công ty',
    dataIndex: 'emailOfCompany',
  },
  {
    title: 'Số điện thoại công ty',
    dataIndex: 'phoneNumberOfCompany',
  },
  { title: 'Địa chỉ công ty', dataIndex: 'addressOfCompany', width: '15%' },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startDate',
    render: (text) => {
      return <span>{parseDate(text)}</span>;
    },
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'endDate',
    render: (text) => {
      return <span>{parseDate(text)}</span>;
    },
  },
  {
    title: 'Tranh thái',
    dataIndex: 'status',
    render: (text) => {
      return (
        <Space wrap>
          <Tag color={text === 0 ? 'red' : 'cyan'} className='text-lg px-3 rounded-lg'>
            {STATUS_LICENSE[text]}
          </Tag>
        </Space>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'status',
    key: 'id1',
    render: (text, record) => (
      <div className='flex flex-col items-center gap-3 justify-center'>
        <div
          className='flex items-center gap-2 cursor-pointer hover:text-blue-500'
          onClick={() => onAccept(record)}
        >
          <LikeOutlined />
          Đồng ý
        </div>
        <div
          className='flex items-center gap-2 cursor-pointer hover:text-red-500'
          onClick={() => onDelete(record)}
        >
          <DislikeOutlined />
          Từ chối
        </div>
      </div>
    ),
  },
];
