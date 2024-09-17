import { useMutate } from '../../hooks/useMutate';
import { commentKeys } from '../queries/keys';
import { commentService } from '../services/comment.service';

export const useAddComment = () => {
  return useMutate(commentService.addComment, {
    autoRefetch: [commentKeys.index],
  });
};

export const useDeleteComment = () => {
  return useMutate(commentService.deleteComment, {
    autoRefetch: [commentKeys.index],
  });
};
