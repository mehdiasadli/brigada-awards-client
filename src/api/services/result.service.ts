import { TGetResultsInput } from '../../types/inputs';
import {
  TGetAwardResultsResponse,
  TGetCategoryResultsResponse,
  TGetContestResultsResponse,
  TGetParticipantResultsResponse,
  TGetUserResultsResponse,
} from '../../types/responses';
import { create } from '../config';

const api = create('/results');

export const resultService = {
  getCategoryRanks: async (input: TGetResultsInput) =>
    await api.get<TGetCategoryResultsResponse>('/by-category/' + input.id),
  getParticipantRanks: async (input: TGetResultsInput) =>
    await api.get<TGetParticipantResultsResponse>('/by-participant/' + input.id),
  getUserRanks: async (input: TGetResultsInput) =>
    await api.get<TGetUserResultsResponse>('/by-user/' + input.id),
  getAwardRanks: async (input: TGetResultsInput) =>
    await api.get<TGetAwardResultsResponse>('/by-award/' + input.id),
  getContestRanks: async (input: TGetResultsInput) =>
    await api.get<TGetContestResultsResponse>('/by-contest/' + input.id),
};
