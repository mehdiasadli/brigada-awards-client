import {
  TCreateNomineeInput,
  TDeleteNomineeInput,
  TGetNomineeInput,
  TGetNomineesInput,
} from '../../types/inputs';
import {
  TCreateNomineeResponse,
  TDeleteNomineeResponse,
  TGetNomineeResponse,
  TGetNomineesResponse,
} from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/nominees');

export const nomineeService = {
  getNominees: async (input: TGetNomineesInput) =>
    await api.get<TGetNomineesResponse>('/list' + convertQuery(input.query)),
  getNominee: async (input: TGetNomineeInput) => await api.get<TGetNomineeResponse>('/' + input.id),
  createNominee: async (input: TCreateNomineeInput) =>
    await api.post<TCreateNomineeResponse>('/add', input),
  deleteNominee: async (input: TDeleteNomineeInput) =>
    await api.delete<TDeleteNomineeResponse>('/' + input.id),
};
