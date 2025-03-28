import Message from '@/types/chat';
import apiClient from './apiClient';

export const getAll = async (room: string): Promise<Message[]> => {
  try {
    const response = await apiClient.get<Message[]>(`/chat/messages/${room}`);
    return response.data;
  }  catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to get chat messages');
    }
    throw new Error('Failed to get chat messages due to an unknown error');
  }
};
