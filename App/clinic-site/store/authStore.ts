import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login } from '../services/userService';
import { LoginResponse } from '@/types/user';
import useToastStore from './useMessageStore';

interface AuthState {
  user: LoginResponse['user'] | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await login(username, password);
          set({ user: data.user, token: data.user.verifyToken, isLoading: false });
          
          useToastStore.getState().addMessage({
            message: 'Đăng nhập thành công!',
            type: 'success',
            position: 'top-right',
            duration: 3000
          });
          
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          
          useToastStore.getState().addMessage({
            message: error.message || 'Đăng nhập thất bại',
            type: 'error',
            position: 'top-right',
            duration: 5000
          });
        }
      },

      logout: () => {
        set({ user: null, token: null });
        
        useToastStore.getState().addMessage({
          message: 'Đăng xuất thành công',
          type: 'info',
          position: 'top-right',
          duration: 3000
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;