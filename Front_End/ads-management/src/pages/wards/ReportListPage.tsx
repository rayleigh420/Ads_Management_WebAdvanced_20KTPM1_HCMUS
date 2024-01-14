// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getReportOfficerApi } from '@/apis/report/report.api';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { columnsAdsLocationPage } from './components/ReportColumns';
import ReportHandleForm from './components/ReportHandleForm';

export const adminAdsKey = initKeys('admin-ads');

export default function ReportListPage() {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string>('');

  const { initialPaging } = useMemo(() => {
    const initialPaging: PagingState = {
      limit: +(searchParams.get('limit') || initialPagingState.limit!),
      skip: +(searchParams.get('skip') || initialPagingState.skip!),
    };
    return { initialPaging };
  }, [searchParams]);

  const { filter, handlePageChange } = usePaging<any>({
    initialPaging,
  });

  const wardReports = useQuery({
    queryKey: adminAdsKey.list(filter),
    queryFn: () => getReportOfficerApi(filter),
    select: (resp) => {
      const items = resp.data.data?.items || [];
      const pageInfo: PagingState = resp.data.data
        ? {
            limit: resp.data.data?.pageSize,
            skip: resp.data.data?.pageNumber,
            total: resp.data.data?.totalRecords,
          }
        : {};
      return { items, pageInfo };
    },
    placeholderData: keepPreviousData,
  });

  const handleSetId = (data: any) => {
    setId(data);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      wardReports.refetch();
    }
  });

  return (
    <div className='w-[1000px] mx-auto'>
      <div className='flex justify-center items-center mb-5'>
        <h1 className={`font-bold text-2xl my-0 `}>Danh sách các báo cáo</h1>
        {/* <div className='flex justify-end my-3'>
          <ButtonPrimary icon={<PlusOutlined />} title='Thêm quảng cáo' />
        </div> */}
      </div>
      <CustomTableCore
        columns={columnsAdsLocationPage(handleSetId)}
        data={wardReports.data?.items}
        paging={wardReports.data?.pageInfo}
        onPageNumberChange={handlePageChange}
      />
      <Modal
        // centered
        centered
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        width={1000}
        className='my-3'
        footer={null}
        // style={{ top: 20 }}
      >
        <ReportHandleForm setIsConfirm={setIsOpen} id={id} />
      </Modal>
    </div>
  );
}
