import { ADVERTISING_TYPE, LOCATION_TYPE } from '@/core/constants/location-type.contants';
import { MY_ROUTE } from '@/routes/route.constant';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

export type LocationPageColumns = {
  id: number;
  locationType: number;
  advertisingType: number;
  address: string;
  isPlanned: number;
  image1: string;
};

export const columnsAdminLocationPage = (
  onEdit: any,
  onDelete: any,
): ColumnsType<LocationPageColumns> => [
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
  {
    title: 'danh sách board',
    dataIndex: 'operation',
    key: 'operation',
    render: (_, record: any) => {
      // const navigate = useNavigate();
      // const handleNavigate = () => {
      //   navigate(MY_ROUTE.WARD.detail(record.id), {
      //     state: { name: record.name },
      //   });
      // };
      return (
        <Link to={`/admin/${MY_ROUTE.ADS.BOARD_DETAIL(record.id)}`}>
          <div className='flex items-center gap-3 justify-center'>
            <div className='flex items-center gap-2 cursor-pointer hover:text-red-500'>
              <EyeOutlined /> Chi tiết
            </div>
          </div>
        </Link>
      );
    },
  },
];
