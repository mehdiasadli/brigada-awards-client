import {
  TCreateContestInput,
  TDeleteContestInput,
  TGetContestInput,
  TGetContestsInput,
  TUpdateContestInput,
} from '../../types/inputs';
import {
  TCreateContestResponse,
  TDeleteContestResponse,
  TGetContestResponse,
  TGetContestsResponse,
  TGetOngoingContestResponse,
  TUpdateContestResponse,
} from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/contests');

export const contestService = {
  getOngoingContest: async () => await api.get<TGetOngoingContestResponse>('/ongoing'),
  getContest: async (input: TGetContestInput) => await api.get<TGetContestResponse>('/' + input.id),
  getContests: async (input: TGetContestsInput) =>
    await api.get<TGetContestsResponse>('/' + convertQuery(input.query)),
  createContest: async (input: TCreateContestInput) =>
    await api.post<TCreateContestResponse>('/', input),
  updateContest: async (input: TUpdateContestInput) =>
    await api.put<TUpdateContestResponse>('/' + input.id, input.data),
  deleteContest: async (input: TDeleteContestInput) =>
    await api.delete<TDeleteContestResponse>('/' + input.id),
};
