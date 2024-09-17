import { useMutate } from '../../hooks/useMutate';
import { voteKeys } from '../queries/keys';
import { voteService } from '../services/vote.service';

export const useVote = () => {
  return useMutate(voteService.addVote);
};

export const useDeleteVote = () => {
  return useMutate(voteService.deleteVote, {
    autoRefetch: [voteKeys.index],
    showSuccess(data) {
      return `${data.body.count} vote${data.body.count === 1 ? '' : 's'} deleted`;
    },
  });
};
