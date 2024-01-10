import { MY_ROUTE } from '@/routes/route.constant';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

export type DistrictManagementColumns = {
  id: string;
  name: number;
};

export const columnsDistrictManagement = (
  onDelete: any,
  onEdit: (data: any) => void,
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
          <div
            className='flex items-center gap-2 cursor-pointer hover:text-green-500'
            onClick={() => onEdit(record)}
          >
            <EditOutlined /> Edit
          </div>
          <div
            className='flex items-center gap-2 cursor-pointer hover:text-red-500'
            onClick={() => onDelete(record?.id)}
          >
            <DeleteOutlined /> Delete
          </div>
        </div>
      ),
    },
    {
      title: 'xem phường',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record: any) => (
        <Link to={`${MY_ROUTE.WARD.detail(record.id)}`}>
          <div className='flex items-center gap-3 justify-center'>
            <div className='flex items-center gap-2 cursor-pointer hover:text-red-500'>
              <EyeOutlined /> Chi tiết
            </div>
          </div>
        </Link>
      ),
    },
  ];
};
