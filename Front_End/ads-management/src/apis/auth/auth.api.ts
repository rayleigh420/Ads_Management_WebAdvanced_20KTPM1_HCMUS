import { LoginFormData } from '@/pages/login/LoginPage';
import { api } from '@/utils/config/http';

export const loginApi = async (data: LoginFormData) => {
  return api.post<any>('/users/login', data);
};
