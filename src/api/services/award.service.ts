import {
  TCreateAwardInput,
  TDeleteAwardInput,
  TGetAwardInput,
  TGetAwardsInput,
  TUpdateAwardInput,
} from '../../types/inputs';
import {
  TCreateAwardResponse,
  TDeleteAwardResponse,
  TGetAwardResponse,
  TGetAwardsResponse,
  TUpdateAwardResponse,
} from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/awards');

export const awardService = {
  getAwards: async (input: TGetAwardsInput) =>
    await api.get<TGetAwardsResponse>('/' + convertQuery(input.query)),
  getAward: async (input: TGetAwardInput) => await api.get<TGetAwardResponse>('/' + input.id),
  createAward: async (input: TCreateAwardInput) => await api.post<TCreateAwardResponse>('/', input),
  updateAward: async (input: TUpdateAwardInput) =>
    await api.put<TUpdateAwardResponse>('/' + input.id, input.data),
  deleteAward: async (input: TDeleteAwardInput) =>
    await api.delete<TDeleteAwardResponse>('/' + input.id),
};
