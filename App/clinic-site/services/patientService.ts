import { SystemUser } from '@/types/chat';
import apiClient from './apiClient';

export const getAll = async (): Promise<SystemUser[]> => {
  try {
    const response = await apiClient.get<SystemUser[]>('/admin/patient');
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get all patients');
  }
};
