import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

export type DistrictManagementColumns = {
  id: string;
  name: number;
};

export const columnsReportManagement = (
  onDelete: any,
  onEdit: (data: any) => void,
  onNavigate: any,
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
  ];
};
