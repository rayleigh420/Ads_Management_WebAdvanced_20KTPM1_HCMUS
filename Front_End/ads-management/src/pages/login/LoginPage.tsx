import { loginApi } from '@/apis/auth/auth.api';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { STORAGE, USER_TYPE_ARRAY } from '@/core/constants/share.constants';
import { UserType } from '@/core/enums/user-type.enum';
import { getEnum } from '@/core/parser/enum.parser';
import { RootState } from '@/store';
import { loginSuccess } from '@/store/auth/auth.slice';
import { BaseHTTP } from '@/utils/config/http';
import Icon from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import Cookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form] = Form.useForm<LoginFormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const { mutate: mutateLogin } = useMutation({
    mutationFn: (data: any) => loginApi(data),
    onSuccess: (resp) => {
      if (resp.data.data) {
        Cookie.set(STORAGE.ACCESS_TOKEN, resp.data.data.newAccessToken!, {
          path: '/',
        });
        Cookie.set(STORAGE.REFRESH_TOKEN, resp.data.data.newRefreshToken!, {
          path: '/',
        });
        Cookie.set(
          STORAGE.USER_TYPE,
          getEnum<UserType>(USER_TYPE_ARRAY[resp.data.data.userType!], UserType) ||
            UserType.resident,
          {
            path: '/',
          },
        );
        BaseHTTP.getInstance().config({
          accessToken: resp.data.data.newAccessToken!,
        });

        dispatch(
          loginSuccess({
            userToken: resp.data.data.newAccessToken!,
            type:
              getEnum<UserType>(USER_TYPE_ARRAY[resp.data.data.userType!], UserType) ||
              UserType.resident,
          }),
        );
        navigate('/');
      }
    },
  });

  const handleSubmit = (e: any) => {
    e.fcmToken = auth.fcmToken;
    mutateLogin(e);
  };

  return (
    <div className='relative flex flex-col justify-center min-h-[600px] overflow-hidden w-full'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-blue-600 lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-blue-700 underline uppercase decoration-wavy'>
          Sign in
        </h1>
        <Form
          onFinish={handleSubmit}
          form={form}
          autoComplete='off'
          name='login-form'
          className='login-form flex flex-col gap-5'
        >
          <CustomTextInput
            name='email'
            placeholder='email'
            rules={[{ required: true, message: 'Please input your username!' }]}
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <CustomTextInput
            name='password'
            type='password'
            placeholder='Password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
