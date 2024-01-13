import { createBoardApi } from '@/apis/board/board.api';
import { CustomDateInput } from '@/components/ui/form/CustomDateInput';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { BOARD_TYPE } from '@/core/constants/location-type.contants';
import { RootState } from '@/store';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Form, Modal, Upload } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

/**
 * convert to typeScript
 *  locationId: {
      isNumeric: true,
      notEmpty: true,
      errorMessage: 'Invalid location id',
    },
    boardType: {
      isNumeric: true,
      notEmpty: true,
      errorMessage: 'Invalid board type',
    },
    quantity: {
      isNumeric: true,
      notEmpty: true,
      errorMessage: 'Invalid quantity',
    },
    image1: {
      isString: true,
      errorMessage: 'Invalid image',
    },
    expireDate: {
      notEmpty: true,
      isISO8601: true,
      errorMessage: 'Invalid date',
    },
    width: {
      isFloat: true,
      errorMessage: 'Invalid width',
    },
    heigh: {
      isFloat: true,
      errorMessage: 'Invalid height',
    },
 */
export type BoardInput = {
  locationId: string;
  boardType: string;
  quantity: string;
  file: File;
  expireDate: string;
  width: string;
  heigh: string;
};

type ReportFormProps = {
  initialValues?: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  locationId: string;
};

function isVietnamesePhoneNumber(number: string) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

export default function BoardFormModal({
  isOpen,
  setIsOpen: setOpen,
  locationId,
}: ReportFormProps) {
  const [form] = Form.useForm<BoardInput>();
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);

  const { mutate: mutateReport } = useMutation({
    mutationFn: (data: BoardInput) => createBoardApi(data),
    onSuccess: (resp) => {
      // show success
      toast.success('Thêm quảng cáo thành công');

      form.resetFields();
      setOpen && setOpen(false);
    },
  });

  const handleSubmit = (values: BoardInput) => {
    const formData: any = { ...values, locationId: locationId };
    mutateReport(formData);
    // mutateReport(formData);
  };

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
      <div className='w-full '>
        <div className='w-[800px] m-auto'>
          <h1 className='text-3xl font-bold text-center mb-5'>Thêm bảng quảng cáo</h1>
          <Form
            name='report-form'
            onFinish={handleSubmit}
            autoComplete='off'
            colon={false}
            form={form}
            labelAlign='left'
            className='mt-11 flex justify-center flex-col gap-5'
          >
            <CustomSelectInput<BoardInput>
              name='boardType'
              label='Chọn Loại bảng quảng cáo'
              rules={[{ required: true, message: 'Please select your report type!' }]}
              disabled={!isCreate}
              options={BOARD_TYPE.map((item, index) => ({
                value: index,
                label: item,
              }))}
            />

            <div className='flex justify-between gap-5'>
              <CustomTextInput<BoardInput>
                name='heigh'
                label='Nhập chiều cao bảng'
                rules={[{ required: true, message: 'Please input your name!' }]}
                disabled={!isCreate}
              />
              <CustomTextInput<BoardInput>
                name='width'
                label='Nhập chiều dài bảng'
                rules={[{ required: true, message: 'Please input your name!' }]}
                disabled={!isCreate}
              />
              <CustomDateInput<BoardInput>
                name='expireDate'
                label='Chọn ngày hết hạn'
                rules={[{ required: true, message: 'Please select your report type!' }]}
                disabled={!isCreate}
              />
            </div>

            <Form.Item<BoardInput>
              label='Hình ảnh quảng cáo'
              name='file'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'Please input your image!' }]}
            >
              <Upload
                listType='picture'
                maxCount={1}
                className='upload-container upload-list-inline'
                accept='.jpg, .txt, .pdf, .bmp, .png, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .pdf, .hwp, .svg'
                onChange={(info) => {
                  form.setFieldValue('file', info.file);
                  form.validateFields(['file']);
                }}
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
