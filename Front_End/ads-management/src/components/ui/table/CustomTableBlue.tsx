import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

export type CustomTableCoreProps<T> = {
  columns: ColumnsType<T>;
  data: T[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  showSelect?: boolean;
  selectedRowKeys?: React.Key[];
  className?: string;
  isBlue?: boolean;
} & TableProps<T>;

export default function CustomTableCore<T extends object>({
  columns,
  data,
  onChange,
  onSelectAll,
  onSelect,
  size = 'middle',
  selectedRowKeys,
  showSelect,
  className,
  isBlue = true,
  ...rest
}: CustomTableCoreProps<T>) {
  return (
    <div className='table-blue'>
      <Table
        columns={columns}
        size={size}
        dataSource={data}
        rowSelection={
          showSelect
            ? {
                type: 'checkbox',
                onChange,
                onSelect,
                onSelectAll,
                selectedRowKeys,
              }
            : undefined
        }
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: false,
          showQuickJumper: false,
          pageSize: 10,
          total: 1,
          current: 1,
        }}
        className={`${className} ${!isBlue && 'no-blue'}`}
        bordered
        {...rest}
      />
    </div>
  );
}
