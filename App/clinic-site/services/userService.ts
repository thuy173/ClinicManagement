import { LoginReq, LoginRes } from '@/types/user';
import apiClient from './apiClient';

export const login = async (credentials: LoginReq): Promise<LoginRes> => {
  try {
    const response = await apiClient.post<LoginRes>('/auth/login', credentials);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};
