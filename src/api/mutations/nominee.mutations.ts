import { useMutate } from '../../hooks/useMutate';
import { categoryKeys, nomineeKeys, participantKeys } from '../queries/keys';
import { nomineeService } from '../services/nominee.service';

export const useDeleteNominee = () => {
  return useMutate(nomineeService.deleteNominee, {
    autoRefetch: [nomineeKeys.list(), categoryKeys.list(), participantKeys.list()],
  });
};

export const useCreateNominee = () => {
  return useMutate(nomineeService.createNominee, {
    autoRefetch: [nomineeKeys.list(), categoryKeys.list(), participantKeys.list()],
  });
};
