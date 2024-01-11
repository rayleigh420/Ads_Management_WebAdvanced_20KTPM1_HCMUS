import { handleReportOfficerApi } from '@/apis/report/report.api';
import { CustomEditorInput } from '@/components/ui/form/CustomEditorInput';
import { handleError } from '@/core/helpers/noti-error.helper';
import { useMutation } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { useRef } from 'react';
import { toast } from 'react-toastify';

export default function ReportHandleForm({
  id,
  setIsConfirm,
}: {
  id: string;
  setIsConfirm: (data: boolean) => void;
}) {
  const [form] = Form.useForm<any>();
  const ref = useRef<any>(null);

  const { mutate: muteDeleteDistrict } = useMutation({
    mutationFn: (data: { id: string; status: 0 | 1; handleMethod: string }) =>
      handleReportOfficerApi(data),
    onSuccess: () => {
      //   refetch();
      setIsConfirm(false);
      toast.success('đã xử lý');
    },
    onError: handleError,
  });

  const handleSubmit = (values: any) => {
    if (ref.current) {
      values.handleMethod = ref.current.currentContent;
    }
    muteDeleteDistrict({ id, status: 1, ...values });
  };
  return (
    <div className='w-full '>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-5'>Xứ lý báo cáo</h1>
        <Form
          name='report-form'
          onFinish={handleSubmit}
          autoComplete='off'
          colon={false}
          form={form}
          labelAlign='left'
          className='mt-11 flex justify-center flex-col gap-5'
        >
          <CustomEditorInput<any>
            label='Nhập nội dung xử lý'
            name='handleMethod'
            refEditor={ref}
            rules={[{ required: true, message: 'Please input your report content!' }]}
            onChange={(value) => {
              console.log('content', typeof value);
              // console.log('content', _);
              form.setFieldValue('handleMethod', value);
              form.validateFields(['handleMethod']);
            }}
          />
          <div className='flex justify-center'>
            <Button
              type='primary'
              htmlType='submit'
              className={`h-[54px] p-[15px] px-[130px] bg-cyan-600`}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
