import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import { TContest } from '../../types/models';
import dayjs from 'dayjs';

interface ContestHeaderProps {
  contest: TContest;
  dashboard?: boolean;
}

export default function ContestHeader({ contest, dashboard }: ContestHeaderProps) {
  return (
    <Stack align='center' gap={10}>
      {dashboard && <Badge>{contest.status}</Badge>}
      <Title ta='center'>{contest.name}</Title>
      <Group gap={5}>
        <Text c='dimmed' fz='sm'>
          başladı {dayjs(contest.startDate).format('D MMM YYYY')}
        </Text>
        {!!contest.endDate && (
          <>
            <Text c='dimmed'>•</Text>
            <Text c='dimmed' fz='sm'>
              bitdi {dayjs(contest.endDate).format('D MMM YYYY')}
            </Text>
          </>
        )}
      </Group>
      {!!contest.description && (
        <Text ta='center' bg='gray.0' p={30}>
          {contest.description}
        </Text>
      )}
    </Stack>
  );
}
