import { loginApi } from '@/apis/auth/auth.api';
import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { STORAGE } from '@/core/constants/share.constants';
import { loginSuccess } from '@/store/auth/auth.slice';
import Icon from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form] = Form.useForm<LoginFormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: mutateLogin } = useMutation({
    mutationFn: (data: LoginFormData) => loginApi(data),
    onSuccess: (resp) => {
      Cookie.set(STORAGE.ACCESS_TOKEN, resp.data.data.newAccessToken, {
        path: '/',
      });
      Cookie.set(STORAGE.REFRESH_TOKEN, resp.data.data.newRefreshToken, {
        path: '/',
      });

      dispatch(loginSuccess({ token: resp.data.data.newAccessToken }));
      navigate('/');
    },
  });

  const handleSubmit = (e: LoginFormData) => {
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
