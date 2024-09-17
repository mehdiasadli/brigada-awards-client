import { useMutate } from '../../hooks/useMutate';
import { useAuth } from '../../stores/auth.store';
import { authService } from '../services/auth.service';

export const useLogin = () => {
  const { setUser } = useAuth();

  return useMutate(authService.login, {
    onSuccess({ body }) {
      setUser(body);
    },
  });
};
