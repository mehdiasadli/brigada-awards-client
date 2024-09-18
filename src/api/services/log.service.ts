import { TGetLogsInput } from '../../types/inputs';
import { TGetLogsResponse } from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/logs');

export const logService = {
  getLogs: async (input: TGetLogsInput) =>
    await api.get<TGetLogsResponse>('/' + convertQuery(input.query)),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteLogs: async () => await api.delete<any>('/'),
};
