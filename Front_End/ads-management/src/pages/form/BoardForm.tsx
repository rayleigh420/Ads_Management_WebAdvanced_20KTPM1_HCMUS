import { createBoardApi } from '@/apis/board/board.api';
import { CustomDateInput } from '@/components/ui/form/CustomDateInput';
import { CustomNumberInput } from '@/components/ui/form/CustomNumberInput';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { BOARD_TYPE } from '@/core/constants/location-type.contants';
import { RootState } from '@/store';
import { parseDate } from '@/utils/parser/datetime.parser';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Form, Modal, Upload, UploadFile } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export type BoardInput = {
  locationId: string;
  boardType: string;
  file: Array<UploadFile>;
  expireDate: string;
  width: number;
  heigh: number;
};

type ReportFormProps = {
  initialValues?: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  locationId: string;
};

export default function BoardFormModal({
  isOpen,
  setIsOpen: setOpen,
  locationId,
}: ReportFormProps) {
  const [form] = Form.useForm<BoardInput>();
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);

  const { mutate: mutateReport, isPending } = useMutation({
    mutationFn: (data: any) => createBoardApi(data),
    onSuccess: (resp) => {
      // show success
      toast.success('Thêm quảng cáo thành công');

      form.resetFields();
      setOpen && setOpen(false);
    },
  });

  const handleSubmit = (values: BoardInput) => {
    const data = new FormData();

    for (let i = 0; i < values.file.length; i++) {
      data.append(`file`, values.file[i].originFileObj as Blob);
    }
    data.append(`locationId`, locationId);
    data.append(`boardType`, values.boardType);
    data.append(`width`, values.width.toString());
    data.append(`heigh`, values.heigh.toString());
    data.append(`expireDate`, parseDate(values.expireDate) as any);

    mutateReport(data);
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
      {/* modal loading when isPending is true */}
      {isPending && (
        <div className='absolute inset-0 bg-white bg-opacity-50 z-50 flex justify-center items-center'>
          <div className='w-24 h-24 border-t-4 border-b-4 rounded-full animate-spin border-cyan-600'></div>
        </div>
      )}
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
              <CustomNumberInput<BoardInput>
                name='heigh'
                label='Nhập chiều cao bảng'
                rules={[{ required: true, message: 'Please input your name!' }]}
                disabled={!isCreate}
              />
              <CustomNumberInput<BoardInput>
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
