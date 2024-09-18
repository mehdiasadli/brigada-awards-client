import { GetLogsDto } from '../../dtos/log.dto';
import { useInfinite } from '../../hooks/useInfinite';
import { InputQueryWithoutPage } from '../../types/query';
import { logService } from '../services/log.service';
import { logKeys } from './keys';

export const useLogs = (query: InputQueryWithoutPage & GetLogsDto) => {
  return useInfinite(logKeys.withQuery(query), {
    queryFn: ({ pageParam }) => logService.getLogs({ query: { ...query, page: pageParam } }),
  });
};
