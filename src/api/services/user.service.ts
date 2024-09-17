import {
  TCreateUserInput,
  TDeleteUserInput,
  TGetUserInput,
  TGetUsersInput,
  TUpdateUserInput,
} from '../../types/inputs';
import {
  TCreateUserResponse,
  TDeleteUserResponse,
  TGetUserResponse,
  TGetUsersResponse,
  TUpdateUserResponse,
} from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/users');

export const userService = {
  getUsers: async (input: TGetUsersInput) =>
    await api.get<TGetUsersResponse>('/' + convertQuery(input.query)),
  getUser: async (input: TGetUserInput) =>
    await api.get<TGetUserResponse>('/profile/' + input.username),
  createUser: async (input: TCreateUserInput) => await api.post<TCreateUserResponse>('/', input),
  updateUser: async (input: TUpdateUserInput) =>
    await api.put<TUpdateUserResponse>('/' + input.id, input.data),
  deleteUser: async (input: TDeleteUserInput) =>
    await api.delete<TDeleteUserResponse>('/' + input.id),
};
