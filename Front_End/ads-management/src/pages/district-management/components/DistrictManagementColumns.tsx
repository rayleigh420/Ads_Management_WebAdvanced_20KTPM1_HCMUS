import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

export type DistrictManagementColumns = {
  key: React.Key;
  index: number;
  list: string;
  status: string;
  contract: string;
};

const items = (): any => {
  return [
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
};

export const columnsDistrictManagement = (
  onDelete: any,
): ColumnsType<DistrictManagementColumns> => {
  return [
    { title: 'No.', dataIndex: 'id' },
    { title: 'Danh sách quận', dataIndex: 'name' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record: any) => (
        <div className='flex items-center gap-3 justify-center'>
          <Link to={`${record?.id}`}>
            <div className='flex items-center gap-2'>
              <EditOutlined /> Edit
            </div>
          </Link>
          <div className='flex items-center gap-2' onClick={() => onDelete(record?.id)}>
            <DeleteOutlined /> Delete
          </div>
        </div>
      ),
    },
  ];
};

export const mockData: DistrictManagementColumns[] = [
  {
    key: 1,
    index: 1,
    list: '1234',
    status: '1234',
    contract: '1234',
  },
  {
    key: 2,
    index: 2,
    list: '1234',
    status: '1234',
    contract: '1234',
  },
  {
    key: 3,
    index: 3,
    list: '1234',
    status: '1234',
    contract: '1234',
  },
];
