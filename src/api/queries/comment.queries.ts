import { GetCommentsQueryDto } from '../../dtos/comment.dto';
import { useInfinite } from '../../hooks/useInfinite';
import { InputQueryWithoutPage } from '../../types/query';
import { commentService } from '../services/comment.service';
import { commentKeys } from './keys';

export const useComments = (query: InputQueryWithoutPage & GetCommentsQueryDto) => {
  return useInfinite(commentKeys.listWithQuery(query), {
    queryFn: ({ pageParam }) => commentService.getCommentsQueryDto({ query: { ...query, page: pageParam } }),
  });
};
