import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

export type AdsManagementPageColumns = {
  key: React.Key;
  index: number;
  name: string;
  district: string;
  status: string;
  date: string;
};

const items: MenuProps['items'] = [
  {
    label: (
      <Link to=''>
        <div className='flex items-center gap-2'>
          <EditOutlined /> Edit
        </div>
      </Link>
    ),
    key: 'send',
  },
  {
    label: (
      <div className='flex items-center gap-2'>
        <DeleteOutlined /> Delete
      </div>
    ),
    key: 'delete',
  },
];

export const columnsAdsManagement: ColumnsType<AdsManagementPageColumns> = [
  { title: 'No.', dataIndex: 'index' },
  { title: 'Tên yêu cầu', dataIndex: 'name' },
  { title: 'Quận', dataIndex: 'district' },
  { title: 'Trạng thái', dataIndex: 'status' },
  { title: 'Thời gian', dataIndex: 'date' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    render: () => (
      <Dropdown menu={{ items }} trigger={['click']} placement='bottomRight'>
        <div className='flex justify-center'>
          <MoreOutlined />
        </div>
      </Dropdown>
    ),
  },
];

export const mockData: AdsManagementPageColumns[] = [
  {
    key: 1,
    index: 1,
    name: '1234',
    district: '1',
    status: '1234',
    date: '1234',
  },
  {
    key: 2,
    index: 2,
    name: '1234',
    district: '1',
    status: '1234',
    date: '1234',
  },
  {
    key: 3,
    index: 3,
    name: '1234',
    district: '1',
    status: '1234',
    date: '1234',
  },
];
