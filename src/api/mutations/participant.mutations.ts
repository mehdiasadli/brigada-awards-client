import { useMutate } from '../../hooks/useMutate';
import { participantKeys } from '../queries/keys';
import { participantService } from '../services/participant.service';

export const useCreateParticipant = () => {
  return useMutate(participantService.createParticipant, {
    autoRefetch: [participantKeys.list()],
  });
};

export const useDeleteParticipant = () => {
  return useMutate(participantService.deleteParticipant, {
    autoRefetch: [participantKeys.list()],
  });
};

export const useToggleParticipantVoting = () => {
  return useMutate(participantService.toggleParticipantVoting, {
    autoRefetch: [participantKeys.list()],
  });
};
