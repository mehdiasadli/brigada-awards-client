import { Anchor, Flex, Stack, Switch, Text } from '@mantine/core';
import { TParticipant } from '../../types/models';
import DashboardCard from './dashboard-card';
import { Link } from 'react-router-dom';
import UserPanel from './user-panel';
import DashboardCardInfo from './dashboard-card-info';
import {
  useDeleteParticipant,
  useToggleParticipantVoting,
} from '../../api/mutations/participant.mutations';
import { useModal } from '../../hooks/useModal';

interface DashboardParticipantCardProps {
  participant: TParticipant;
}

export default function DashboardParticipantCard({ participant }: DashboardParticipantCardProps) {
  const modal = useModal();
  const mutation = useDeleteParticipant();
  const { mutate, isPending } = useToggleParticipantVoting();

  return (
    <DashboardCard
      item={participant}
      mutation={mutation}
      deleteModalTitle='İştirakçını silirsiniz'
      renderEdit={false}
      stackProps={{
        gap: 10,
      }}
    >
      <Stack gap={5}>
        <Flex align='center' justify='space-between'>
          <Anchor onClick={() => modal.getInfoParticipant({ participant, dashboard: true })}>
            <UserPanel
              user={participant.user}
              descriptionProps={{
                fz: 'xs',
                c: 'dimmed',
              }}
              description={
                <Text c='dimmed' fz='xs'>
                  Ümumi {participant.nominations.length} nominasiyada
                </Text>
              }
            />
          </Anchor>
          <Switch
            checked={participant.allowEarlyVote}
            onChange={() => {
              mutate({ id: participant.id });
            }}
            disabled={isPending}
          />
        </Flex>
      </Stack>
      <DashboardCardInfo count={participant.nominations.length}>
        {participant.nominations.map((nomination) => (
          <Anchor
            fz='sm'
            component={Link}
            to={'/dashboard/categories/' + nomination.category.contestId}
          >
            {nomination.category.award.name}
          </Anchor>
        ))}
      </DashboardCardInfo>
    </DashboardCard>
  );
}
