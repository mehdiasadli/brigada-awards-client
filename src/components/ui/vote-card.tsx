import { ActionIcon, Divider, Group, rem, Text, Title, useMantineTheme } from '@mantine/core';
import { useDeleteVote } from '../../api/mutations/vote.mutations';
import { TCategory, TVote } from '../../types/models';
import DashboardCard from './dashboard-card';
import UserPanel from './user-panel';
import { IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useModal } from '../../hooks/useModal';

interface VoteCardProps {
  vote: TVote;
  categoryId: string | null;
  categories: TCategory[];
}

export default function VoteCard({ vote, categoryId, categories }: VoteCardProps) {
  const mutation = useDeleteVote();
  const modal = useModal();
  const { colors } = useMantineTheme();

  const title = categories.find((c) => c.id === vote.nominee.categoryId)?.award.name;

  return (
    <DashboardCard
      renderEdit={false}
      item={vote}
      renderDelete={
        <ActionIcon
          variant='subtle'
          color='gray'
          loading={mutation.isPending}
          onClick={() =>
            modal.confirmDelete('You are deleting this vote', () => {
              mutation.mutate({
                voterId: vote.voterId,
                categoryId: vote.nominee.categoryId,
              });
            })
          }
        >
          <IconTrash
            style={{ width: rem(18), height: rem(18) }}
            color={colors.red[6]}
            stroke={1.5}
          />
        </ActionIcon>
      }
      footer={
        <Text fz='xs' c='dimmed' ta='right'>
          {dayjs(vote.createdAt).format('HH:mm, DD.MM.YYYY')}
        </Text>
      }
    >
      {!!title && !categoryId && (
        <Title ta='center' order={5}>
          {title}
        </Title>
      )}
      <UserPanel
        user={vote.voter.user}
        description={
          <Text c='dimmed' fz='xs'>
            Voter
          </Text>
        }
      />

      <Divider
        label={
          <Group mx='auto'>
            <Text fz='sm'>{vote.point} Xal</Text>
          </Group>
        }
      />

      <UserPanel
        user={vote.nominee.participant.user}
        description={
          <Text c='dimmed' fz='xs'>
            Nominee
          </Text>
        }
      />
    </DashboardCard>
  );
}
