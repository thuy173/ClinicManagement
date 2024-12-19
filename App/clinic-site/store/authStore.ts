import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login } from '../services/userService';
import { LoginResponse } from '@/types/user';

// Định nghĩa kiểu dữ liệu cho trạng thái Auth
interface AuthState {
  user: LoginResponse['user'] | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Tạo Zustand store
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
          set({ user: data.user, token: data.token, isLoading: false });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // Lưu trạng thái vào localStorage
    //   getStorage: () => localStorage, // Định nghĩa bộ lưu trữ
    }
  )
);

export default useAuthStore;
