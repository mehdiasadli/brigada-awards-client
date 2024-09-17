import {
  TCreateParticipantInput,
  TDeleteParticipantInput,
  TGetParticipantsInput,
  TGetParticipationInput,
} from '../../types/inputs';
import {
  TCreateParticipantResponse,
  TDeleteParticipantResponse,
  TGetParticipantsResponse,
  TGetParticipationResponse,
} from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/participants');

export const participantService = {
  getParticipation: async (input: TGetParticipationInput) =>
    await api.get<TGetParticipationResponse>('/participation/' + input.contestId),
  getParticipants: async (input: TGetParticipantsInput) =>
    await api.get<TGetParticipantsResponse>('/list' + convertQuery(input.query)),
  createParticipant: async (input: TCreateParticipantInput) =>
    await api.post<TCreateParticipantResponse>('/add', input),
  deleteParticipant: async (input: TDeleteParticipantInput) =>
    await api.delete<TDeleteParticipantResponse>('/' + input.id),
  toggleParticipantVoting: async (input: TDeleteParticipantInput) =>
    await api.put<TCreateParticipantResponse>('/' + input.id),
};
