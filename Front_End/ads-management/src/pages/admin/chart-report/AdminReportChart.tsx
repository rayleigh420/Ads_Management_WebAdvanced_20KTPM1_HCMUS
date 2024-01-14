// import { ModalConfirm } from '@/components/popup/ModalConfirm';
import { getDistrictApi } from '@/apis/district/district.api';
import { getAllReportApi } from '@/apis/report/report.api';
import { getWardApi } from '@/apis/ward/ward.api';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { handleError } from '@/core/helpers/noti-error.helper';
import { PagingState } from '@/core/models/paging.type';
import { initKeys } from '@/core/models/query-key.util';
import { SearchOutlined } from '@ant-design/icons';
import { StyledEngineProvider } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';

export const adminAdsKey = initKeys('admin-ads');

export default function AdminReportChart() {
  const [listYear, setListYear] = useState<any[]>([]);
  const [year, setYear] = useState<string | null>('2024');
  const [listReport, setListReport] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  const [idDistrict, setIdDistrict] = useState<any>(null);
  const [idWard, setIdWard] = useState<any>(null);
  const [listWard, setListWard] = useState<any[]>([]);
  const { data: dataDistrict, refetch } = useQuery({
    queryKey: ['district'],
    queryFn: () =>
      getDistrictApi({
        limit: 0,
        skip: 0,
      }),
    select: (resp) => {
      const items: any = resp.data.data.items || [];
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

  const { mutate: muteWard } = useMutation({
    mutationFn: (id: any) => getWardApi({ skip: 0, limit: 0 }, id),
    onSuccess: (resp) => {
      const items: any = [];

      setListWard(resp.data.data.items || []);
      setIdWard(resp.data.data.items[9].id);
    },
    onError: handleError,
  });

  const { mutate: muteReport } = useMutation({
    mutationFn: (body?: any) => getAllReportApi(body),
    onSuccess: (resp) => {
      setListYear(resp.data.data.availableYears || []);
      const k: any[] = [];
      for (const item of resp.data.data.monthlyStats) {
        k.push(+item.numberOfReport);
      }

      setListReport(k.length === 0 ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : k);
    },
    onError: handleError,
  });
  useEffect(() => {
    if (dataDistrict?.items) setIdDistrict(dataDistrict?.items[17].id);
    muteWard(dataDistrict?.items[17].id);
  }, [dataDistrict]);
  useEffect(() => {
    if (idDistrict) muteWard(+idDistrict);
  }, [idDistrict]);

  useEffect(() => {
    if (idWard) muteReport({ id: idWard, year });
  }, [idWard, year]);

  return (
    <div className='w-[1200px] mx-auto '>
      <div className='flex justify-between items-center'>
        <h1 className={`font-bold text-2xl my-0 `}>
          Báo cáo và thống kê report và cách thức xử lý
        </h1>
      </div>
      <div className='flex flex-col gap-5'>
        <Form
          name='report-form'
          autoComplete='off'
          colon={false}
          labelAlign='left'
          className='flex w-full gap-5 items-center mt-5'
        >
          <CustomSelectInput
            label='Chọn quận'
            classNameForm='w-1/3'
            value={idDistrict}
            onChange={(e) => {
              setIdDistrict(+e);
            }}
            labelCol={7}
            rules={[{ required: true, message: 'Please select your report type!' }]}
            options={dataDistrict?.items.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))}
          />
          <CustomSelectInput
            label='Chọn phường'
            classNameForm='w-1/3'
            value={idWard}
            onChange={(e) => {
              setIdWard(e);
            }}
            labelCol={7}
            rules={[{ required: true, message: 'Please select your report type!' }]}
            options={
              listWard === undefined
                ? []
                : listWard.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                  }))
            }
          />

          <CustomSelectInput
            label='Chọn năm'
            classNameForm='w-1/3'
            labelCol={7}
            value={year}
            onChange={(e) => {
              setYear(e);
            }}
            rules={[{ required: true, message: 'Please select your report type!' }]}
            options={listYear.map((item: any) => ({
              value: item,
              label: item,
            }))}
          />

          <Button type='primary' htmlType='submit' className={` bg-cyan-600`}>
            <SearchOutlined />
            Search
          </Button>
        </Form>

        <StyledEngineProvider injectFirst>
          <BarChart
            //   help me write 12 months
            xAxis={[
              {
                scaleType: 'band',
                data: [
                  'Tháng 1',
                  'Tháng 2',
                  'Tháng 3',
                  'Tháng 4',
                  'Tháng 5',
                  'Tháng 6',
                  'Tháng 7',
                  'Tháng 8',
                  'Tháng 9',
                  'Tháng 10',
                  'Tháng 11',
                  'Tháng 12',
                ],
              },
            ]}
            series={[{ data: listReport }]}
            //   width={500}
            height={600}
            className='w-full h-[80vh]'
          />
        </StyledEngineProvider>
      </div>
    </div>
  );
}
