import { LoginFormData } from '@/pages/login/LoginPage';
import { api } from '@/utils/config/http';
import { BaseResponse } from '@/utils/types/response.type';

type LoginRESP = {
  userType: number;
  newAccessToken: string;
  newRefreshToken: string;
};

export const loginApi = async (data: LoginFormData) => {
  return api.post<BaseResponse<LoginRESP>>('/users/login', data);
};

export const forgotPasswordApi = async (data: LoginFormData) => {
  return api.post<any>('/users/forgot', data);
};

export const changePasswordApi = async (data: { newPassword: string }) => {
  return api.post<any>('/users/change-password', data);
};
