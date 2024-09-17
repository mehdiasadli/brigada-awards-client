import {
  TCreateVoteInput,
  TDeleteVoteInput,
  TGetVotesInput,
  TGetVotesOfParticipantInput,
} from '../../types/inputs';
import {
  TCreateVoteResponse,
  TDeleteVoteResponse,
  TGetVotesOfParticipantResponse,
  TGetVotesResponse,
} from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/votes');

export const voteService = {
  addVote: async (input: TCreateVoteInput) => await api.post<TCreateVoteResponse>('/', input),
  getVotes: async (input: TGetVotesInput) =>
    await api.get<TGetVotesResponse>('/list/' + input.contestId + convertQuery(input.query)),
  getVotesOfParticipant: async (input: TGetVotesOfParticipantInput) =>
    await api.get<TGetVotesOfParticipantResponse>('/participant/' + input.id),
  deleteVote: async (input: TDeleteVoteInput) =>
    await api.delete<TDeleteVoteResponse>('/delete/' + input.voterId + '/' + input.categoryId),
};
