import {
  ActionIcon,
  Flex,
  List,
  Mark,
  Paper,
  Popover,
  Space,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { TGetUserResponse } from '../../types/responses';
import UserAvatar from './user-avatar';
import dayjs from 'dayjs';
import { CategoryInfo, ContestInfo } from '../../types/models';
import { rankColors } from '../../resources/constants';
import Medal from './Medal';
import { formatNumber } from '../../utils/format-number';
import { IconInfoCircle } from '@tabler/icons-react';

interface ProfileCardProps {
  user: TGetUserResponse['body'];
}

const getRankData = (
  rank: number,
  ranks: {
    contest: ContestInfo;
    category: CategoryInfo;
    rank: number;
  }[]
) => {
  const count = ranks.reduce((sum, r) => (r.rank === rank ? sum + 1 : sum), 0);
  const list = ranks
    .filter((r) => r.rank === rank)
    .map((r) => (
      <List.Item>
        <Text fz='sm'>{r.category.name}</Text>
        <Text c='dimmed' fz='xs'>
          {r.contest.name}
        </Text>
      </List.Item>
    ));

  return (
    <Stack gap={0} align='center' flex={1}>
      <Popover>
        <Popover.Target>
          <ActionIcon color={rankColors[rank as keyof typeof rankColors]} variant='light' size='lg'>
            <Medal rank={rank ?? 0} size={28} />
          </ActionIcon>
        </Popover.Target>
        {count !== 0 && (
          <Popover.Dropdown>
            <List>{list}</List>
          </Popover.Dropdown>
        )}
      </Popover>
      <Text fz='sm' c='dimmed'>
        {count}
      </Text>
    </Stack>
  );
};

export default function ProfileCard({ user }: ProfileCardProps) {
  const counts = {
    participation: user._count.participations,
    nominations: user.participations.reduce(
      (t, participation) => participation._count.nominations + t,
      0
    ),
    wins: user.ranks.filter((r) => r.rank === 1).length,
  };

  const totalPoints = user.ranks.reduce(
    (r, { rank }) => (rank === 1 ? r + 4 : rank === 2 ? r + 2 : rank === 3 ? r + 1 : r),
    0
  );

  return (
    <Paper
      w='min(100%, 40rem)'
      mx='auto'
      radius='md'
      withBorder
      p='lg'
      bg='var(--mantine-color-body)'
    >
      <UserAvatar user={user} size={120} radius={120} mx='auto' />
      <Text ta='center' fz='lg' fw={500} mt='md'>
        {user.name}
      </Text>
      <Text ta='center' c='dimmed' fz='sm'>
        @{user.username} • {dayjs(user.createdAt).format('D.MM.YYYY')}
      </Text>

      <Space h={30} />

      <Flex align='center'>
        <Stack gap={0} align='center' flex={1}>
          <Text fz='xl' fw='bold'>
            {counts.participation}
          </Text>
          <Text fz='sm' c='dimmed'>
            İştirak
          </Text>
        </Stack>
        <Stack gap={0} align='center' flex={1}>
          <Text fz='xl' fw='bold'>
            {counts.nominations}
          </Text>
          <Text fz='sm' c='dimmed'>
            Nominasiya
          </Text>
        </Stack>
        <Stack gap={0} align='center' flex={1}>
          <Text fz='xl' fw='bold'>
            {counts.wins}
          </Text>
          <Text fz='sm' c='dimmed'>
            Qalibiyyət
          </Text>
        </Stack>
      </Flex>
      <Space h={15} />
      <Flex align='center'>
        {getRankData(1, user.ranks)}
        {getRankData(2, user.ranks)}
        {getRankData(3, user.ranks)}
      </Flex>
      <Space h={15} />
      {counts.participation === 0 || counts.nominations === 0 ? null : (
        <Stack>
          <List
            center
            spacing='xs'
            icon={
              <ThemeIcon variant='transparent' size='sm' color='gray.5'>
                <IconInfoCircle />
              </ThemeIcon>
            }
          >
            <List.Item>
              <Text c='dimmed'>
                Hər iştiraka görə ortalama{' '}
                <Mark>{formatNumber(counts.nominations / counts.participation)}</Mark> nominasiya
              </Text>
            </List.Item>
            <List.Item>
              <Text c='dimmed'>
                Hər nominasiyaya görə ortalama{' '}
                <Mark>{formatNumber(counts.wins / counts.nominations)}</Mark> qalibiyyət
              </Text>
            </List.Item>
            <List.Item>
              <Text c='dimmed'>
                Hər iştiraka görə ortalama{' '}
                <Mark>{formatNumber(counts.wins / counts.participation)}</Mark> qalibiyyət
              </Text>
            </List.Item>
            <List.Item>
              <Text c='dimmed'>
                <Mark>{totalPoints}</Mark> ümumi medal xalı
              </Text>
            </List.Item>
            {user.stats && (
              <>
                <List.Item>
                  <Text c='dimmed'>
                    Ümumi verdiyi xalların cəmi - <Mark>{user.stats.totalPoints}</Mark>
                  </Text>
                </List.Item>
              </>
            )}
          </List>
        </Stack>
      )}
    </Paper>
  );
}
