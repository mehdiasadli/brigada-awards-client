import { ActionIcon, Container, SimpleGrid, Space, Stack } from '@mantine/core';
import { TContest } from '../types/models';
import { IconPlus } from '@tabler/icons-react';
import StatCard from '../components/ui/stat-card';
import ContestHeader from '../components/ui/contest-header';

interface DashboardContestOverallPageProps {
  contest: TContest;
}

export default function DashboardContestOverallPage({ contest }: DashboardContestOverallPageProps) {
  return (
    <Stack>
      <SimpleGrid cols={{ xs: 2, md: 4 }}>
        <StatCard
          title='Categories'
          icon={
            <ActionIcon variant='subtle' color='gray' radius='xl'>
              <IconPlus size={20} />
            </ActionIcon>
          }
          info={contest.categories.length}
        />
        <StatCard
          title='Participants'
          icon={
            <ActionIcon variant='subtle' color='gray' radius='xl'>
              <IconPlus size={20} />
            </ActionIcon>
          }
          info={contest.participants.length}
        />
      </SimpleGrid>

      <Space h={20} />
      <Container>
        <ContestHeader dashboard contest={contest} />
      </Container>
    </Stack>
  );
}
