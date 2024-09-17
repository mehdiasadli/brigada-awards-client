import { useMutate } from '../../hooks/useMutate';
import { userKeys } from '../queries/keys';
import { userService } from '../services/user.service';

export const useCreateUser = () => {
  return useMutate(userService.createUser, {
    autoRefetch: [userKeys.list()],
  });
};

export const useUpdateUser = () => {
  return useMutate(userService.updateUser, {
    autoRefetch: [userKeys.list()],
  });
};

export const useDeleteUser = () => {
  return useMutate(userService.deleteUser, {
    autoRefetch: [userKeys.list()],
  });
};
