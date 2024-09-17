import { useAuth } from '../stores/auth.store';
import { TUser } from '../types/models';

export const useUser = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token, resetUser, setUser, ...user } = useAuth();

  if (!token) {
    return {} as TUser;
  }

  return user as TUser;
};
