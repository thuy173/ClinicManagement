import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login } from '../services/userService'
import { LoginReq, LoginRes } from '@/types/user'
import useToastStore from './useMessageStore'

interface AuthState {
  user: LoginRes['user'] | null
  token: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null

  login: (credentials: LoginReq) => Promise<boolean>
  logout: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginReq) => {
        set({ isLoading: true, error: null })
        try {
          const data = await login(credentials)
          const token = data.user.verifyToken

          if (typeof window !== 'undefined') {
            document.cookie = `auth-token=${token}; Secure; SameSite=Strict; path=/; max-age=${60 * 60 * 24 * 7}` // 1 week
          }

          set({
            user: data.user,
            token,
            refreshToken: data.refreshToken || null,
            isLoading: false
          })

          useToastStore.getState().addMessage({
            message: 'Đăng nhập thành công!',
            type: 'success',
            duration: 3000
          })
          return true;

        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại';
          set({ error: errorMessage, isLoading: false });

          useToastStore.getState().addMessage({
            message: errorMessage,
            type: 'error',
            duration: 5000
          })
          return false;
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          document.cookie = 'auth-token=; Max-Age=0; path=/'
        }

        set({ user: null, token: null, refreshToken: null }); 

        useToastStore.getState().addMessage({
          message: 'Đăng xuất thành công',
          type: 'info',
          duration: 3000
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore
