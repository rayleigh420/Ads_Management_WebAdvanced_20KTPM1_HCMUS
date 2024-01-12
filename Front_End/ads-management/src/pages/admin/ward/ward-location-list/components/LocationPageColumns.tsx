import { ADVERTISING_TYPE, LOCATION_TYPE } from '@/core/constants/location-type.contants';
import { EditOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { ColumnsType } from 'antd/es/table';

export type LocationPageColumns = {
  id: number;
  locationType: number;
  advertisingType: number;
  address: string;
  isPlanned: number;
  image1: string;
};

export const columnsAdsLocationPage: ColumnsType<LocationPageColumns> = [
  { title: 'Id', dataIndex: 'id' },
  {
    title: 'Loại vị trí',
    dataIndex: 'locationType',
    render: (text) => {
      return <div>{LOCATION_TYPE[text]}</div>;
    },
  },
  {
    title: 'Loại quảng cáo',
    dataIndex: 'advertisingType',
    render: (text) => {
      return <div>{ADVERTISING_TYPE[text]}</div>;
    },
  },
  { title: 'Địa chỉ', dataIndex: 'address', width: '20%' },
  {
    title: 'Loại đất',
    dataIndex: 'isPlanned',
    render: (text) => {
      return <div>{text == '1' ? 'Đã Quy hoạch' : 'Chưa quy hoạch'}</div>;
    },
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image1',
    render: (text) => {
      return <Image width={100} className='rounded-lg' src={text} />;
    },
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id1',
    render: (text) => (
      <div className='flex flex-col items-center gap-3 justify-center'>
        <div className='flex items-center gap-2 cursor-pointer hover:text-blue-500'>
          <EditOutlined /> Yêu cầu chỉnh sửa
        </div>
      </div>
    ),
  },
];
