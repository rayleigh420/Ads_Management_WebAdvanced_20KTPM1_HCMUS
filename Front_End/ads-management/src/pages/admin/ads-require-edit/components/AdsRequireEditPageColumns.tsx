import { parseDate } from '@/utils/parser/datetime.parser';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { RequireList } from '../AdminRequiredEditPage';

export type AdsRequireEditPageColumns = {
  key: React.Key;
  index: number;
  name: string;
  district: string;
  status: string;
  date: string;
};

export const columnsAdsRequireEdit = (onEdit: any): ColumnsType<RequireList> => [
  { title: 'No.', dataIndex: 'id' },
  { title: 'Loại bảng quảng cáo', dataIndex: 'boardType' },
  { title: 'Chiều dài', dataIndex: 'width' },
  { title: 'Chiều cao', dataIndex: 'height' },
  {
    title: 'Thời gian yêu cầu',
    dataIndex: 'requestTime',
    render: (text) => {
      return <span>{parseDate(text)}</span>;
    },
  },
  { title: 'Lý do', dataIndex: 'reason' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => (
      <div className='flex flex-col items-center gap-3 justify-center'>
        <div
          className='flex items-center gap-2 cursor-pointer hover:text-blue-500'
          onClick={() => onEdit(record)}
        >
          <LikeOutlined />
          Đồng ý
        </div>
        <div
          className='flex items-center gap-2 cursor-pointer hover:text-red-500'
          onClick={() => onEdit(record)}
        >
          <DislikeOutlined />
          Từ chối
        </div>
      </div>
    ),
  },
];

export const mockData: AdsRequireEditPageColumns[] = [
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
