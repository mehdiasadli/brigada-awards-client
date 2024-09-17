import { TCreateCommentInput, TDeleteCommentInput, TGetCommentsInput } from '../../types/inputs';
import {
  TCreateCommentResponse,
  TDeleteCommentResponse,
  TGetCommentsResponse,
} from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/comments');

export const commentService = {
  addComment: async (input: TCreateCommentInput) =>
    await api.post<TCreateCommentResponse>('/', input),
  getCommentsQueryDto: async (input: TGetCommentsInput) =>
    await api.get<TGetCommentsResponse>('/list' + convertQuery(input.query)),
  deleteComment: async (input: TDeleteCommentInput) =>
    await api.delete<TDeleteCommentResponse>('/' + input.id),
};
