import { changePasswordApi } from '@/apis/auth/auth.api';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { handleError } from '@/core/helpers/noti-error.helper';
import { RootState } from '@/store';
import { logoutSuccess } from '@/store/auth/auth.slice';
import { IMAGES } from '@/utils/theme';
import { DownOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Dropdown, Form, MenuProps, Modal, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function UserMenu() {
  const items: MenuProps['items'] = [
    {
      label: <div>Đổi mật khẩu</div>,
      onClick: () => {
        setModal1Open(true);
      },
      key: '0',
    },
    {
      label: <div>Đăng xuất</div>,
      onClick: () => {
        dispatch(logoutSuccess());
      },
      key: '1',
    },
  ];
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [modal1Open, setModal1Open] = useState(false);

  const { mutate: muteChange } = useMutation({
    mutationFn: (data: any) => changePasswordApi(data),
    onSuccess: () => {
      setModal1Open(false);

      toast.success('Thay đổi mật khẩu thành công');
    },
    onError: handleError,
  });

  const handleSubmit = async (data: any) => {
    muteChange(data);
  };

  return (
    <div className='flex items-center gap-5'>
      {auth.isLogin ? (
        <Dropdown menu={{ items }} trigger={['click']}>
          <Space>
            <div className='flex items-center gap-1.5 cursor-pointer'>
              <img src={IMAGES.LOGO} alt='user' />
              <div className='text-base font-bold text-white'>Jacky</div>
              <DownOutlined className='text-base text-white' />
            </div>
          </Space>
        </Dropdown>
      ) : (
        <div
          className='h-[36px] py-2 pt-1.5 px-5 font-bold text-base bg-primary-custom-900 text-white rounded-3xl cursor-pointer'
          style={{ border: '1px solid #fff' }}
          onClick={() => {
            dispatch(logoutSuccess());
          }}
        >
          Logout
        </div>
      )}
      <Modal
        // centered
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        width={400}
        footer={null}
      >
        <div className='w-full '>
          <div className=' m-auto'>
            <h1 className='text-3xl font-bold text-center '>Đổi mật khẩu</h1>
            <Form
              name='report-form'
              initialValues={{}}
              onFinish={handleSubmit}
              autoComplete='off'
              colon={false}
              labelAlign='left'
              className=''
            >
              <CustomTextInput<any>
                name='newPassword'
                label='Nhập mật khẩu mới'
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  {
                    pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
                    message:
                      'Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
                  },
                ]}
              />

              <div className='flex justify-center'>
                <Button
                  type='primary'
                  htmlType='submit'
                  className={`h-[54px] p-[15px] px-[130px] flex justify-center mt-5 bg-cyan-600`}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
