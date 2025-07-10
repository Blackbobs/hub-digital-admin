import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/auth.service';
import { useAuthStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      setUser(data.user, data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      router.push('/');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      router.push('/');
    },
  });
};