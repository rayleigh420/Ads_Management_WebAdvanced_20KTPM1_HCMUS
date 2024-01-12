import { PagingREQ, PagingState, initialPagingState } from '@/core/models/paging.type';
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

export type CustomTableCoreProps<T> = {
  columns: ColumnsType<T>;
  data: T[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  onPageNumberChange?: ({ limit, skip }: PagingREQ) => void;
  showSelect?: boolean;
  paging?: PagingState;
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
  onPageNumberChange,
  showSelect,
  className,
  isBlue = true,
  paging,
  ...rest
}: CustomTableCoreProps<T>) {
  const handlePageChange = (page: number, limit: number) => {
    onPageNumberChange && onPageNumberChange({ skip: page, limit });
  };

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
          onChange: handlePageChange,
          pageSize: paging?.limit || initialPagingState.limit,
          total: paging?.total || 1,
          current: paging?.skip || initialPagingState.skip,
        }}
        className={`${className} ${!isBlue && 'no-blue'}`}
        bordered
        {...rest}
      />
    </div>
  );
}
