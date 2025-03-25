import useAuthStore from '@store/authStore';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu từ response thành công
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh token -> thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, { refreshToken });
          localStorage.setItem('accessToken', data.accessToken);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (err) {
        console.error('Refresh token failed. Please login again.', err);
        // Thực hiện logout nếu cần, hoặc điều hướng về login
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
