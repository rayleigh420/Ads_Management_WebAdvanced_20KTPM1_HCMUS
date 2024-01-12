// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getBoardByOfficerApi } from '@/apis/location/location.api';
import CustomTableCore from '@/components/ui/table/CustomTableBlue';
import { PagingState, initialPagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { usePaging } from '@/hooks/usePaging';
import { MY_ROUTE } from '@/routes/route.constant';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import RequireLicenseForm from '../../../form/RequireLisenceForm';
import {
  AdsManagementPageColumns,
  columnsAdsLocationPage,
} from './components/WardBoardListPageColumns';

export const adminAdsKey = initKeys('admin-ads');

export default function WardBoardListPage() {
  const [searchParams] = useSearchParams();
  const [modal1Open, setModal1Open] = useState(false);
  const [idBoard, setIdBoard] = useState<any>();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const memoizedData = useMemo(() => {
    if (location.state && location.state.data) {
      return location.state.data;
    }
    return null;
  }, [location.state]);

  const { initialPaging } = useMemo(() => {
    const initialPaging: PagingState = {
      limit: +(searchParams.get('limit') || initialPagingState.limit!),
      skip: +(searchParams.get('skip') || initialPagingState.skip!),
    };
    return { initialPaging };
  }, [searchParams]);

  const { filter, handlePageChange, handleFilterChange } = usePaging<any>({
    initialPaging,
  });

  const handleEdit = (data: any) => {
    navigate(MY_ROUTE.WARD.REQUIRE_EDIT(data.id), { state: { ...data, ...memoizedData } });
  };

  const adminAds = useQuery({
    queryKey: adminAdsKey.list(filter),
    queryFn: () => getBoardByOfficerApi(filter, id as string),
    select: (resp) => {
      const items: AdsManagementPageColumns[] = [];
      for (let i = 0; i < resp.data.data?.items.length; i++) {
        items.push({
          id: resp.data.data?.items[i].id,
          boardType: resp.data.data?.items[i].boardType,
          address: resp.data.data?.items[i].location.address,
          quantity: resp.data.data?.items[i].quantity,
          image1: resp.data.data?.items[i].image1,
          expireDate: resp.data.data?.items[i].expireDate,
          size: `${resp.data.data?.items[i].width}m x ${resp.data.data?.items[i].height}m`,
        });
      }
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

  const handleLicense = (data: String) => {
    setIdBoard(data);
    setModal1Open(true);
  };

  return (
    <div className='w-[1200px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>Quản lý các bảng quảng cáo</h1>
      </div>

      <CustomTableCore<AdsManagementPageColumns>
        columns={columnsAdsLocationPage(handleLicense, handleEdit)}
        data={adminAds.data?.items!}
        paging={adminAds.data?.pageInfo}
        onPageNumberChange={handlePageChange}
      />
      <Modal
        // centered
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        width={1000}
        className='my-3'
        footer={null}
        // style={{ top: 20 }}
      >
        <RequireLicenseForm id={idBoard} setIsOpen={setModal1Open} />
      </Modal>
    </div>
  );
}
