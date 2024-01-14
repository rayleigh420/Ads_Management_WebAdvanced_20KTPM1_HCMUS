import {
  PagingREQ,
  ReportREQ,
  createReportApi,
  getReportApi,
  getReportByIdApi,
  getReportOfficerApi,
} from '@/apis/report/report.api';
import { CustomEditorInput } from '@/components/ui/form/CustomEditorInput';
import CustomSelectInput from '@/components/ui/form/CustomSelectInput';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { STATUS_REPORT } from '@/core/constants/location-type.contants';
import { UserType } from '@/core/enums/user-type.enum';
import { RootState } from '@/store';
import { getOrSetDeviceId } from '@/utils/config/diviceId';
import { UploadOutlined } from '@ant-design/icons';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Divider,
  Form,
  Image,
  Modal,
  Pagination,
  Space,
  Tag,
  Upload,
  UploadFile,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReportHandleForm from '../wards/components/ReportHandleForm';

export type ReportInput = {
  id?: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  select: string;
  content: string;
  file: UploadFile[];
  reportForm: string;
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
  checked?: boolean;
  isOpenModal?: boolean;
};

function isVietnamesePhoneNumber(number: string) {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

export default function ReportFormModal({
  initialValues,
  setOpen,
  isOpenModal,
  checked = true,
}: ReportFormProps) {
  const [form] = Form.useForm<ReportInput>();
  const [fileList, setFileList] = useState([]);
  const ref = useRef<any>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [image, setImage] = useState<string>('');
  const [image1, setImage1] = useState<string>('');
  const [content, setContent] = useState();
  const [handleMethod, setHandleMethod] = useState<string>('');
  const auth = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<number>();
  const [pageBoard, setPageBoard] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { id } = useParams();
  const [idReport, setIdReport] = useState<string>('');
  console.log('checked', checked);
  useEffect(() => {
    if (!checked) {
      setIsCreate(true);
      form.resetFields();
    }
  }, [checked]);
  useEffect(() => {
    if (isOpenModal === false) {
      setIsCreate(true);
      form.resetFields();
      // init all state back to default
      setStatus(undefined);
      setImage('');
      setContent(undefined);
      setHandleMethod('');
      setIdReport('');
    }
  }, [isOpenModal]);

  const { mutate: mutateReport } = useMutation({
    mutationFn: (data: ReportInput) => createReportApi(data, auth.fcmToken),
    onSuccess: (resp) => {
      // save local storage
      getOrSetDeviceId();

      // show success
      toast.success('Báo cáo thành công');
      queryClient.invalidateQueries({ queryKey: ['location'] });

      form.resetFields();
      setOpen && setOpen(false);
      setIsCreate(true);
    },
  });

  const handleSetReportForm = (resp: any) => {
    console.log('resp', resp.data.data[0]);
    if (resp.data.data) {
      setData(null);
      form.setFieldsValue({
        id: resp.data.data[0].id,
        fullname: resp.data.data[0].fullnameOfReporter,
        email: resp.data.data[0].emailOfReporter,
        phoneNumber: resp.data.data[0].phoneNumberOfReporter,
        reportForm: resp.data.data[0].reportForm,
        content: resp.data.data[0].content,
        status: resp.data.data[0].status,
      });
      console.log('image status 1', resp.data.data[0].status);

      setHandleMethod(resp.data.data[0].handleMethod);
      setStatus(+resp.data.data[0].status);
      setImage(resp.data.data[0].image1);
      setImage1(resp.data.data[0].image2);
      setContent(resp.data.data[0].content);
      setIsCreate(false);
    }
  };

  const { mutate: mutateGetReport } = useMutation({
    mutationFn: (data: ReportREQ) => getReportApi(data),
    onSuccess: handleSetReportForm,
  });

  const { mutate: mutateGetReportById } = useMutation({
    mutationFn: (id: string) => getReportByIdApi(id),
    onSuccess: (resp) => {
      console.log('resp', resp.data.data);
      if (resp.data.data) {
        setData(null);
        form.setFieldsValue({
          id: resp.data.data.id,
          fullname: resp.data.data.fullnameOfReporter,
          email: resp.data.data.emailOfReporter,
          phoneNumber: resp.data.data.phoneNumberOfReporter,
          reportForm: resp.data.data.reportForm,
          content: resp.data.data.content,
          status: resp.data.data.status,
        });
        setHandleMethod(resp.data.data[0].handleMethod);
        console.log('image status 2');
        setStatus(+resp.data.data.status);
        setImage(resp.data.data.image1);
        setImage1(resp.data.data.image2);
        setContent(resp.data.data.content);
        setIsCreate(false);
      }
    },
  });

  const { mutate: mutateGetReportOfficer } = useMutation({
    mutationFn: (data: ReportREQ & PagingREQ) => getReportOfficerApi(data),
    onSuccess: (resp) => {
      console.log('image', resp.data.data.items);
      if (resp.data.data.items) {
        console.log('image sad');
        setIsCreate(false);
        setData(resp.data.data.items);
        form.setFieldsValue({
          id: resp.data.data.items[0].id,
          fullname: resp.data.data.items[0].fullnameOfReporter,
          email: resp.data.data.items[0].emailOfReporter,
          phoneNumber: resp.data.data.items[0].phoneNumberOfReporter,
          reportForm: resp.data.data.items[0].reportForm,
          content: resp.data.data.items[0].content,
          status: resp.data.data.items[0].status,
        });
        console.log('image status 3', resp.data.data[0].handleMethod);
        setHandleMethod(resp.data.data[0].handleMethod);
        console.log('image status 3');
        setStatus(resp.data.data.items[0].status);
        setImage(resp.data.data[0].image1);
        setImage1(resp.data.data[0].image2);
        setContent(resp.data.data[0].content);
      }
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data[pageBoard - 1].id,
        fullname: data[pageBoard - 1].fullnameOfReporter,
        email: data[pageBoard - 1].emailOfReporter,
        phoneNumber: data[pageBoard - 1].phoneNumberOfReporter,
        reportForm: data[pageBoard - 1].reportForm,
        content: data[pageBoard - 1].content,
        status: data[pageBoard - 1].status,
      });
      setIdReport(data[pageBoard - 1].id);
      setHandleMethod(data[pageBoard - 1].handleMethod);
      console.log('image status 4');
      setStatus(+data[pageBoard - 1].status);
      setImage(data[pageBoard - 1].image1);
      setImage1(data[pageBoard - 1].image2);
      setContent(data[pageBoard - 1].content);
      setIsCreate(false);
    }
  }, [pageBoard, data]);

  useEffect(() => {
    if (id) {
      mutateGetReportById(id);
    } else if (initialValues.boardId || initialValues.locationId) {
      if (auth.type !== UserType.resident) {
        mutateGetReportOfficer({
          limit: 0,
          skip: 0,
          boardId: initialValues?.boardId,
          locationId: initialValues?.locationId,
        });
      } else
        mutateGetReport({
          boardId: initialValues?.boardId,
          locationId: initialValues?.locationId,
        });
    }
  }, [initialValues]);

  const handleSubmit = (values: ReportInput) => {
    if (ref.current) {
      values.content = ref.current.currentContent;
    }

    const formData: ReportInput = { ...values, ...initialValues };
    // help me convert to formdata nay
    const data = new FormData();

    for (let i = 0; i < values.file.length; i++) {
      data.append(`file`, values.file[i].originFileObj as Blob);
    }

    // auto add append to formData with key and value
    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }
    for (const [key, value] of Object.entries(initialValues)) {
      data.append(key, value);
    }

    mutateReport(data);
  };

  console.log('status', status, isCreate);
  return (
    <div className='w-full '>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-5'>Báo cáo địa điểm hoặc quảng cáo</h1>
        <Form
          name='report-form'
          onFinish={handleSubmit}
          //cancel

          autoComplete='off'
          colon={false}
          form={form}
          labelAlign='left'
          className='mt-11 flex justify-center flex-col gap-5'
        >
          {/* status = 0 is đang xử lý =1 đã xử lý */}
          {isCreate == false && status !== undefined && (
            <>
              <Space wrap>
                <Tag color={status === 0 ? 'red' : 'cyan'} className='text-lg px-3 rounded-lg'>
                  {STATUS_REPORT[status]}
                </Tag>
              </Space>
              {status == 1 && handleMethod ? (
                <>
                  <div className='font-bold'>Nội dung xử lý</div>
                  <div className='ml-2' dangerouslySetInnerHTML={{ __html: handleMethod! }} />
                </>
              ) : (
                auth.type !== UserType.resident &&
                status == 0 && (
                  <Button type='primary' onClick={() => setIsOpen(true)}>
                    Xử lý
                  </Button>
                )
              )}
            </>
          )}
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
          {isCreate ? (
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
          ) : (
            <>
              <div> Nội dung báo cáo</div>
              <div dangerouslySetInnerHTML={{ __html: content! }} />
            </>
          )}

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
                maxCount={2}
                multiple
                className='upload-container upload-list-inline'
                accept='.jpg, .txt, .pdf, .bmp, .png, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .pdf, .hwp, .svg'
                onChange={(info) => {
                  form.setFieldValue('file', info.fileList);
                  form.validateFields(['file']);
                }}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            ) : (
              <div className='flex gap-5'>
                <Image width={200} src={image} />
                <Image width={200} src={image1} />
              </div>
            )}
            <br />
          </Form.Item>
          {isCreate && (
            <div className='flex justify-between'>
              <Button type='primary' htmlType='submit' className={`h-[54px] px-[30px] bg-cyan-600`}>
                Submit
              </Button>
              <div className=''>
                <HCaptcha sitekey='d28eb78d-8dfb-4499-a7bb-46f87d8c5553' />
              </div>
            </div>
          )}
          {data !== null && (
            <div className='flex justify-between mt-5 mx-auto'>
              <Pagination
                // simple
                defaultCurrent={1}
                defaultPageSize={1}
                total={data?.length}
                onChange={(page: number, pageSize: number) => {
                  setPageBoard(page);
                }}
              />
            </div>
          )}
        </Form>
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
          <ReportHandleForm setIsConfirm={setIsOpen} id={idReport} />
        </Modal>

        <Divider />
      </div>
    </div>
  );
}
