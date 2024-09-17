import { Anchor, Badge, Card, SimpleGrid, Stack } from '@mantine/core';
import { useContests } from '../api/queries/contest.queries';
import { useStatus } from '../hooks/useStatus';
import { flatList } from '../utils/flat-list';
import ContestHeader from '../components/ui/contest-header';
import { Link } from 'react-router-dom';
import { trStatus } from '../utils/trStatus';
import { useUser } from '../hooks/useUser';

export default function ContestsPage() {
  const { data, status, error, refetch } = useContests({
    sort_dir: 'desc',
    sort: 'createdAt',
  });
  const { id, admin } = useUser();
  const { Component } = useStatus(status, { error, refetch });
  const contests = flatList(data);

  return (
    Component ?? (
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} py={40}>
        {contests
          .filter((contest) => {
            const prt = contest.participants.find((part) => part.userId === id);

            if ((prt && prt.allowEarlyVote) || admin) {
              return true;
            }

            return contest.status !== 'Upcoming';
          })
          .map((contest) => (
            <Card withBorder>
              <Stack>
                <Badge mx='auto' color={contest.status === 'Ongoing' ? 'green' : 'blue'}>
                  {trStatus(contest.status)}
                </Badge>
                <Anchor ta='center' component={Link} to={'/contests/' + contest.id} variant='light'>
                  Müsabiqəyə daxil olmaq üçün klikləyin
                </Anchor>
                <ContestHeader contest={contest} />
              </Stack>
            </Card>
          ))}
      </SimpleGrid>
    )
  );
}
