import { useMutate } from '../../hooks/useMutate';
import { logKeys } from '../queries/keys';
import { logService } from '../services/log.service';

export const useDeleteLogs = () => {
  return useMutate(logService.deleteLogs, {
    autoRefetch: [logKeys.index],
  });
};
