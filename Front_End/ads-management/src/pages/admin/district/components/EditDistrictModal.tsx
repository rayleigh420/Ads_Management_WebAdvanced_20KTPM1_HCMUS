import { createDistrictApi, editDistrictApi } from '@/apis/district/district.api';
import ButtonBig from '@/components/ui/button-primary/ButtonBig';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { handleError } from '@/core/helpers/noti-error.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminDistrictListKeys } from '../AdminDistrictManagementPage';

type EditDistrictModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValue?: {
    name: string;
    id: string;
  };
};

// type CompanyFieldType = {
//   label: string;
//   name: keyof AdminSettingClientCreateInput;
//   type: 'text' | 'number';
// };

// const clientFields: CompanyFieldType[] = [
//   { label: '고객사명', name: 'customerMissionName', type: 'text' },
//   { label: '국가', name: 'nation', type: 'text' },
//   { label: '주소', name: 'address', type: 'text' },
//   { label: '담당자', name: 'manager', type: 'text' },
//   { label: '포지션', name: 'position', type: 'text' },
//   { label: '소속팀', name: 'team', type: 'text' },
//   { label: '전화번호', name: 'phoneNumber', type: 'text' },
//   { label: '메일주소', name: 'emailAddress', type: 'text' },
//   { label: 'Invoice 메일주소', name: 'emailInvoice', type: 'text' },
// ];

export type EditDistrictInput = {
  name: string;
};

export default function EditDistrictModal({
  isOpen,
  setIsOpen,
  initialValue,
}: EditDistrictModalProps) {
  const [form] = Form.useForm<EditDistrictInput>();

  const queryClient = useQueryClient();
  const { mutate: muteAddDistrict } = useMutation({
    mutationFn: (data: EditDistrictInput) => createDistrictApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminDistrictListKeys.lists() });
      setIsOpen(false);
      form.resetFields();
      toast.success('Thêm quận thành công');
    },
    onError: handleError,
  });

  const { mutate: muteEditDistrict } = useMutation({
    mutationFn: (data: EditDistrictInput) => editDistrictApi(data, initialValue?.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminDistrictListKeys.lists() });
      setIsOpen(false);
      form.resetFields();
      toast.success('Sửa quận thành công');
    },
    onError: handleError,
  });

  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue(initialValue);
    }
  }, [initialValue]);
  //   const handleCreateClient = async (values: EditDistrictInput) => {
  //     mutateClientRegistration(adminSettingClientCreateInputToReq(values));
  //   };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      open={isOpen}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      onCancel={handleCancel}
      maskClosable={false}
      width={537}
    >
      <Form
        name='setting-security'
        onFinish={(data) => {
          if (initialValue) muteEditDistrict(data);
          else muteAddDistrict(data);
        }}
        autoComplete='off'
        colon={false}
        form={form}
        labelAlign='left'
        labelCol={{ flex: '120px' }}
        wrapperCol={{ flex: 'auto' }}
        className='flex flex-col items-center w-full py-3 pt-[23px]'
      >
        <div
          className={`w-full flex justify-between items-center py-4`}
          style={{ borderBottom: '1px solid #d9d9d9' }}
        >
          <h1 className={`font-bold text-2xl my-0 `}>Tên</h1>
        </div>
        <CustomTextInput<EditDistrictInput>
          name='name'
          placeholder='Vui lòng nhập tên quận'
          rules={[{ required: true, message: 'Please input name ' }]}
          classNameForm='w-full my-5'
        />
        <ButtonBig htmlType='submit' className='px-[130px] py-4 items-center '>
          Lưu
        </ButtonBig>
      </Form>
    </Modal>
  );
}
