import { BOARD_TYPE } from '@/core/constants/location-type.contants';
import { parseDate } from '@/utils/parser/datetime.parser';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { ColumnsType } from 'antd/es/table';

export type AdminBoardLocationColumns = {
  id: number;
  boardType: number;

  address: string;

  quantity: number;
  image1: string;
  expireDate: string;
  size: string;
};

export const columnsAdminLocationPage = (
  onEdit: any,
  onDelete: any,
): ColumnsType<AdminBoardLocationColumns> => [
  { title: 'Id', dataIndex: 'id' },
  {
    title: 'Loại bảng quảng cáo',
    dataIndex: 'boardType',
    render: (text) => {
      return <div>{BOARD_TYPE[text]}</div>;
    },
  },
  { title: 'Kích thước', dataIndex: 'size' },
  { title: 'Địa chỉ', dataIndex: 'address', width: '20%' },
  {
    title: 'Hình ảnh',
    dataIndex: 'image1',
    width: '20%',
    render: (text) => {
      const [variable1, variable2] = text.split(', ');
      console.log('variable1', variable1);
      console.log('variable2', variable2);

      return (
        <div className='flex flex-wrap gap-2 justify-center'>
          {variable1 !== 'null' && <Image width={100} className='rounded-lg' src={variable1} />}
          {variable2 !== 'null' && <Image width={100} className='rounded-lg' src={variable2} />}
        </div>
      );
    },
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'expireDate',
    render: (text) => {
      return <div>{parseDate(text)}</div>;
    },
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id1',
    render: (text, record) => (
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
