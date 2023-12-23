import { ColumnsType } from 'antd/es/table';

export type DistrictManagementColumns = {
  key: React.Key;
  index: number;
  list: string;
  status: string;
  contract: string;
};

export const columnsDistrictManagement: ColumnsType<DistrictManagementColumns> = [
  { title: 'No.', dataIndex: 'index' },
  { title: 'Danh sách quận', dataIndex: 'list' },
  { title: 'Trạng thái', dataIndex: 'status' },
  { title: 'Hợp đồng', dataIndex: 'contract' },
];

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
