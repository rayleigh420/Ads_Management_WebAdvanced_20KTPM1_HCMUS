import { BOARD_TYPE } from '@/core/constants/location-type.contants';
import { parseDate } from '@/utils/parser/datetime.parser';
import { EditOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { ColumnsType } from 'antd/es/table';

export type AdsManagementPageColumns = {
  id: number;
  boardType: number;

  address: string;

  quantity: number;
  image1: string;
  expireDate: string;
  size: string;
};

export const columnsAdsLocationPage = (
  setValue: any,
  onEdit: any,
): ColumnsType<AdsManagementPageColumns> => [
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
    render: (text) => {
      return <Image width={100} className='rounded-lg' src={text} />;
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
          className='flex flex-col items-center gap-3 justify-center'
          onClick={() => setValue(text)}
        >
          <div className='flex items-center gap-2 cursor-pointer hover:text-blue-500'>
            <EditOutlined /> Cấp phép quảng cáo
          </div>
        </div>
        <div
          className='flex items-center gap-2 cursor-pointer hover:text-red-500'
          onClick={() => onEdit(record)}
        >
          <EditOutlined /> Gửi yêu cầu chỉnh sửa
        </div>
      </div>
    ),
  },
];
