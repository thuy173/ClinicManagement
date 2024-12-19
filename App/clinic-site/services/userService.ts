import { LoginResponse } from '@/types/user';
import apiClient from './apiClient';

// Hàm gọi API để login
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', { username, password });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};
