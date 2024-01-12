import { modififyApi } from '@/apis/location/location.api';
import { CustomNumberInput } from '@/components/ui/form/CustomNumberInput';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { BOARD_TYPE } from '@/core/constants/location-type.contants';
import { handleError } from '@/core/helpers/noti-error.helper';
import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Form } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type RequireEditInput = {
  reportForm: string;
  boardType: string;
  width: number;
  height: number;
  advertisingBoardId: string;
  locationId: string;
  reason: string;
};

export default function RequireEditForm() {
  const location = useLocation();
  const [form] = Form.useForm<RequireEditInput>();
  const { id } = useParams();
  const navigate = useNavigate();

  const memoizedData = useMemo(() => {
    console.log('location.state.data212', location.state);
    if (location.state) {
      console.log('location.state.data', location.state);
      const cleanedSizeString = location.state.size.replace(/[m]/g, '');
      const sizeArray = cleanedSizeString.split('x');

      const width = sizeArray[0].trim();
      const height = sizeArray[1].trim();
      console.log('width', width);
      form.setFieldsValue({
        boardType: location.state.boardType,
        width: +width,
        height: +height,
        advertisingBoardId: id,
        locationId: location.state.locationId,
      });
      return location.state;
    }
    return null;
  }, [location.state]);

  const { mutate: muteData } = useMutation({
    mutationFn: (id: string) => modififyApi(id),
    onSuccess: () => {
      toast.success('Xóa quận thành công');
      navigate(-1);
    },
    onError: handleError,
  });

  const handleSubmit = async (data: any) => {
    console.log('data', data);
    muteData(data);
  };

  return (
    <div className='w-full flex justify-center items-center p-6'>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-11'>
          Yêu cầu chỉnh sửa điểm đặt hoặc bảng quảng cáo
        </h1>
        <Form
          name='report-form'
          initialValues={{}}
          onFinish={handleSubmit}
          autoComplete='off'
          colon={false}
          form={form}
          labelAlign='left'
          className=''
        >
          <CustomSelectInput
            name='boardType'
            label='Chọn hình thức báo cáo'
            rules={[{ required: true, message: 'Please select your report type!' }]}
            options={
              BOARD_TYPE.map((item, index) => ({
                label: item,
                value: index,
              })) || []
            }
          />
          {/* <CustomTextInput<any>
            name='boardType'
            label='Bảng quảng cáo'
            rules={[{ required: true, message: 'Please input your ad news!' }]}
          /> */}
          <CustomNumberInput<any>
            name='width'
            label='Chiều dài bảng quảng cáo'
            rules={[{ required: true, message: 'Please input reason!' }]}
          />
          <CustomNumberInput<any>
            name='height'
            label='Chiều cao bảng quảng cáo'
            rules={[{ required: true, message: 'Please input reason!' }]}
          />
          <CustomTextInput<any>
            name='reason'
            label='Lý do chỉnh sửa'
            rules={[{ required: true, message: 'Please input reason!' }]}
          />

          <Button
            type='primary'
            htmlType='submit'
            className={`h-[54px] p-[15px] mt-10 bg-cyan-600`}
          >
            Submit
          </Button>
        </Form>

        <Divider />
      </div>
    </div>
  );
}
