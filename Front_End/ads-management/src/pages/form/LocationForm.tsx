import { getDistrictApi } from '@/apis/district/district.api';
import { createLocationApi } from '@/apis/location/location.api';
import { getWardApi } from '@/apis/ward/ward.api';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { LOCATION_TYPE } from '@/core/constants/location-type.contants';
import { PagingState } from '@/core/models/paging.type';
import { RootState } from '@/store';
import { UploadOutlined } from '@ant-design/icons';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Form, Modal, Upload, UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useSearchMap } from '../../hooks/useSearchMap';
import { adminLocationListKey } from '../admin/location/AdminLocationListPage';

export type LocationInput = {
  locationType: string;
  file: Array<UploadFile>;
  lat: string;
  long: string;
  districtId: string;
  isPlanned: 0 | 1;
  address: string;
  wardId: string;
};

type LocationFormProps = {
  initialValues?: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function LocationFormModal({ isOpen, setIsOpen: setOpen }: LocationFormProps) {
  const [form] = Form.useForm<LocationInput>();
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const [address, setAddress] = useState<{
    address: string;
    lat: string;
    long: string;
  }>({ address: '', lat: '', long: '' });

  const [idDistrict, setIdDistrict] = useState<any>(null);
  const [listWard, setListWard] = useState<any[]>([]);
  const { data: dataDistrict } = useQuery({
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
    },
  });

  useEffect(() => {
    if (idDistrict) muteWard(+idDistrict);
  }, [idDistrict]);

  const queryClient = useQueryClient();
  const { mutate: mutateLocation, isPending } = useMutation({
    mutationFn: (data: any) => createLocationApi(data),
    onSuccess: (resp) => {
      // show success
      toast.success('Thêm điểm đặt thành công');

      form.resetFields();
      queryClient.invalidateQueries({ queryKey: adminLocationListKey.lists() });
      setOpen && setOpen(false);
    },
  });

  const handleSubmit = (values: LocationInput) => {
    const data = new FormData();

    for (let i = 0; i < values.file.length; i++) {
      data.append(`file`, values.file[i].originFileObj as Blob);
    }
    data.append(`locationType`, values.locationType);
    data.append(`lat`, address.lat);
    data.append(`long`, address.long);
    data.append(`isPlanned`, '0');
    data.append(`address`, address.address);
    data.append(`wardId`, values.wardId);

    mutateLocation(data);
  };

  const x = useSearchMap('quan 1');
  console.log('x ne cho de', x);

  function suggestionSelect(result: any, lat: any, long: any, text: any) {
    setAddress({ address: result, lat: lat, long: long });
  }

  return (
    <Modal
      // centered
      centered
      open={isOpen}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      className='my-3'
      footer={null}
      // style={{ top: 20 }}
    >
      {/* modal loading when isPending is true */}
      {isPending && (
        <div className='absolute inset-0 bg-white bg-opacity-50 z-50 flex justify-center items-center'>
          <div className='w-24 h-24 border-t-4 border-b-4 rounded-full animate-spin border-cyan-600'></div>
        </div>
      )}
      <div className='w-full '>
        <div className='w-[800px] m-auto'>
          <h1 className='text-3xl font-bold text-center mb-5'>Thêm điểm đặt quảng cáo</h1>
          <Form
            name='report-form'
            onFinish={handleSubmit}
            autoComplete='off'
            colon={false}
            form={form}
            labelAlign='left'
            className='mt-11 flex justify-center flex-col gap-5'
          >
            <div className='flex justify-between gap-5'>
              <CustomSelectInput<LocationInput>
                name='districtId'
                label='Chọn quận'
                classNameForm='w-full'
                onChange={(e) => {
                  setIdDistrict(e);
                }}
                rules={[{ required: true, message: 'Please select your report type!' }]}
                options={dataDistrict?.items?.map((item: any) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
              <CustomSelectInput<LocationInput>
                name='wardId'
                label='Chọn phường'
                classNameForm='w-full'
                rules={[{ required: true, message: 'Please select your report type!' }]}
                options={listWard?.map((item: any) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </div>
            <CustomSelectInput<LocationInput>
              name='locationType'
              label='Chọn Loại loại vị trí'
              rules={[{ required: true, message: 'Vui lòng chọn loại vị trí' }]}
              disabled={!isCreate}
              options={LOCATION_TYPE.map((item, index) => ({
                value: index,
                label: item,
              }))}
            />
            <MapboxAutocomplete
              publicKey={import.meta.env.VITE_MAP_BOX_PUBLIC_TOKEN as string}
              inputClass='w-full h-[39px]'
              onSuggestionSelect={suggestionSelect}
              countries='VN'
              placeholder='Tìm kiếm địa điểm'
              language='vi'
            />

            <Form.Item<LocationInput>
              label='Hình ảnh điểm đặt '
              name='file'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please input your image!' }]}
            >
              <Upload
                listType='picture'
                maxCount={2}
                className='upload-container upload-list-inline'
                accept='.jpg, .txt, .pdf, .bmp, .png, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .pdf, .hwp, .svg'
                onChange={(info) => {
                  form.setFieldValue('file', info.fileList);
                  form.validateFields(['file']);
                }}
                multiple
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>

              <br />
            </Form.Item>
            {isCreate && (
              <div className='flex justify-center'>
                <Button
                  type='primary'
                  htmlType='submit'
                  className={`h-[54px] px-[130px] bg-cyan-600`}
                >
                  Submit
                </Button>
              </div>
            )}
          </Form>

          <Divider />
        </div>
      </div>
    </Modal>
  );
}
