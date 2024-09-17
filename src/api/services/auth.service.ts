import { TLoginInput } from '../../types/inputs';
import { TLoginResponse } from '../../types/responses';
import { create } from '../config';

const api = create('/auth');

export const authService = {
  login: async (input: TLoginInput) => await api.post<TLoginResponse, TLoginInput>('/login', input),
};
