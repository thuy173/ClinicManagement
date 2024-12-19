import useAuthStore from "@store/authStore";

export const useAuth = () => {
  const { user, token, isLoading, error, login, logout } = useAuthStore();

  return { user, token, isLoading, error, login, logout };
};
