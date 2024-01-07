import { ReportREQ, createReportApi, getReportApi } from '@/apis/report/report.api';
import { CustomEditorInput } from '@/components/ui/form/CustomEditorInput';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { STORAGE } from '@/core/constants/share.constants';
import { UploadOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Form, Image, Upload } from 'antd';
import Cookie from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
export type ReportInput = {
  id?: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  select: string;
  content: Object;
  file: File;
  reportForm: string;
  reportType?: 0 | 1;
  locationId?: string;
  boardId?: string;
  lat?: number;
  long?: number;
  address?: string;
  wardName?: string;
  districtName?: string;
  status?: number;
};

type ReportFormProps = {
  initialValues?: any;
  setOpen?: (value: boolean) => void;
};

function isVietnamesePhoneNumber(number: string) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

export default function ReportForm({ initialValues, setOpen }: ReportFormProps) {
  const [form] = Form.useForm<ReportInput>();
  const [fileList, setFileList] = useState([]);
  const ref = useRef<any>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [image, setImage] = useState<string>('');
  const { mutate: mutateReport } = useMutation({
    mutationFn: (data: ReportInput) => createReportApi(data),
    onSuccess: (resp) => {
      // save local storage
      const k = Cookie.get(STORAGE.REPORT);
      const localReport = {
        key: [
          {
            locationId: resp.data.data?.locationId,
            reportId: resp.data.data?.id!,
            boardId: resp.data.data?.boardId,
          },
        ],
      };

      const updatedReport = k ? { key: [...JSON.parse(k).key, ...localReport.key] } : localReport;

      Cookie.set(STORAGE.REPORT, JSON.stringify(updatedReport), {
        path: '/',
      });

      // show success
      toast.success('Báo cáo thành công');
      form.resetFields();
      setOpen && setOpen(false);
    },
  });
  const { mutate: mutateGetReport } = useMutation({
    mutationFn: (data: ReportREQ) => getReportApi(data),
    onSuccess: (resp) => {
      console.log('resp', resp.data.data[0]);
      if (resp.data.data) {
        form.setFieldsValue({
          id: resp.data.data[0].id,
          fullname: resp.data.data[0].fullnameOfReporter,
          email: resp.data.data[0].emailOfReporter,
          phoneNumber: resp.data.data[0].phoneNumberOfReporter,
          reportForm: resp.data.data[0].reportForm,
          content: resp.data.data[0].content,
          status: resp.data.data[0].status,
        });
        setImage(resp.data.data[0].image1);
        setIsCreate(false);
      }
    },
  });
  useEffect(() => {
    if (initialValues) {
      const k = Cookie.get(STORAGE.REPORT);
      const localReport = k ? JSON.parse(k) : undefined;
      if (localReport) {
        const board = localReport.key.filter((item: any) => {
          if (initialValues.boardId) return item.boardId == initialValues.boardId;
          if (initialValues.locationId) return item.locationId == initialValues.locationId;
        });
        if (initialValues.reportType === 1) {
          mutateGetReport({
            reportType: 'board',
            ...board[0],
          });
        } else if (initialValues.reportType === 0) {
          mutateGetReport({
            reportType: 'location',
            ...board[0],
          });
        }
      }
    }
  }, [initialValues]);

  const handleSubmit = (values: ReportInput) => {
    if (ref.current) {
      values.content = ref.current.currentContent;
    }

    const formData: ReportInput = { ...values, ...initialValues };
    if (!values.reportType) values.reportType = 0;

    mutateReport(formData);
  };

  return (
    <div className='w-full '>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-5'>Báo cáo địa điểm hoặc quảng cáo</h1>
        <Form
          name='report-form'
          onFinish={handleSubmit}
          autoComplete='off'
          colon={false}
          form={form}
          labelAlign='left'
          className='mt-11'
        >
          <CustomTextInput<ReportInput>
            name='fullname'
            label='Họ tên người gửi báo cáo'
            rules={[{ required: true, message: 'Please input your name!' }]}
            disabled={!isCreate}
          />
          <div className='flex justify-between gap-5'>
            <CustomTextInput<ReportInput>
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Please input your email!' }, { type: 'email' }]}
              disabled={!isCreate}
            />
            <CustomTextInput<ReportInput>
              name='phoneNumber'
              label='Số điện thoại liên lạc'
              disabled={!isCreate}
              rules={[
                { required: true, message: 'Please input your phone!' },
                {
                  validator: (_, value) => {
                    if (isVietnamesePhoneNumber(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The phone number is not valid!'));
                  },
                },
              ]}
            />

            <CustomSelectInput<ReportInput>
              name='reportForm'
              label='Chọn hình thức báo cáo'
              rules={[{ required: true, message: 'Please select your report type!' }]}
              disabled={!isCreate}
              options={[
                { value: 0, label: 'Tố giác sai phạm' },
                { value: 1, label: 'Đăng ký nội dung' },
                { value: 2, label: 'Đóng góp ý kiến' },
                { value: 3, label: 'Giải đáp thắc mắc' },
              ]}
            />
          </div>
          <CustomEditorInput<ReportInput>
            label='Nội dung báo cáo'
            name='content'
            refEditor={ref}
            rules={[{ required: true, message: 'Please input your report content!' }]}
            disabled={!isCreate}
            onChange={(value) => {
              // console.log('editor', editor.getContent());
              console.log('content', typeof value);
              // console.log('content', _);
              form.setFieldValue('content', value);
              form.validateFields(['content']);
            }}
          />

          <Form.Item<ReportInput>
            label='Hình ảnh báo cáo'
            name='file'
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'Please input your image!' }]}
          >
            {isCreate ? (
              <Upload
                listType='picture'
                defaultFileList={[...fileList]}
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
            ) : (
              <Image width={200} src={image} />
            )}
            <br />
          </Form.Item>
          {isCreate && (
            <div className='flex justify-between'>
              <Button type='primary' htmlType='submit' className={`h-[54px] p-[15px] bg-cyan-600`}>
                Submit
              </Button>
              <div className=''>
                <HCaptcha sitekey='d28eb78d-8dfb-4499-a7bb-46f87d8c5553' />
              </div>
            </div>
          )}
        </Form>

        <Divider />
      </div>
    </div>
  );
}
