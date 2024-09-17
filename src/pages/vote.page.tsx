import { Link, Navigate } from 'react-router-dom';
import { useOngoingContest } from '../api/queries/contest.queries';
import { useStatus } from '../hooks/useStatus';
import { Badge, SimpleGrid, Stack, Title } from '@mantine/core';
import { Text } from '@mantine/core';
import { TContest } from '../types/models';
import dayjs from 'dayjs';
import CategoryCard from '../components/ui/category-card';
import { useVotesOfParticipant } from '../api/queries/vote.queries';
import { useParticipation } from '../api/queries/participant.queries';
import { SuccessResponseWithoutPagination } from '../types/server';

interface VotePageProps {
  data?: SuccessResponseWithoutPagination<TContest | null> | undefined;
  status?: 'pending' | 'error' | 'success';
}

export default function VotePage({ data: earlyData, status: earlyStatus }: VotePageProps) {
  const earlyDataBody = earlyData?.body;

  const { data, status } = useOngoingContest();
  const { data: participation } = useParticipation(
    earlyDataBody ? earlyDataBody.id : data?.body?.id
  );
  const { data: votesOfParticipant, status: votesStatus } = useVotesOfParticipant(
    participation?.body?.id
  );
  const { Component } = useStatus([earlyStatus !== undefined ? earlyStatus : status, votesStatus]);

  const hasVoted = (categoryId: string) => {
    return votesOfParticipant?.body?.some((vote) => vote.nominee.categoryId === categoryId);
  };

  if (status === 'success' && data.body === null && !earlyDataBody) {
    return <Navigate replace to='/' />;
  }

  const contest = earlyDataBody ? earlyDataBody : (data?.body as TContest);

  return (
    Component ?? (
      <Stack>
        <Stack gap={0}>
          <Title ta='center'>SƏS VERİN</Title>
          {!!contest.endDate && (
            <Text c='dimmed' ta='center'>
              Səsvermə {dayjs(contest.endDate).format('D MMMM YYYY')} tarixində bitir
            </Text>
          )}
        </Stack>
        <SimpleGrid
          cols={{
            xl: 4,
            lg: 4,
            md: 3,
            sm: 2,
            xs: 1,
          }}
        >
          {[...contest.categories]
            .sort((c1, c2) => {
              return hasVoted(c1.id) ? 1 : hasVoted(c2.id) ? -1 : 0;
            })
            .filter((category) => category.nominees.length > 2)
            .map((category) => (
              <Stack
                sx={{ cursor: 'pointer' }}
                key={category.id}
                component={Link}
                renderRoot={(p) =>
                  votesOfParticipant === undefined ? (
                    <Stack {...p} />
                  ) : (
                    <Link {...p} to={'/vote/' + category.id} />
                  )
                }
              >
                <CategoryCard
                  badge={
                    !votesOfParticipant ? undefined : hasVoted(category.id) ? (
                      <Badge variant='dot' color='green' size='md'>
                        Hazırdır
                      </Badge>
                    ) : (
                      <Badge variant='dot' color='red' size='md'>
                        Səs Ver
                      </Badge>
                    )
                  }
                  category={category}
                  contestId={contest.id}
                  dashboard={false}
                  isModal={true}
                />
              </Stack>
            ))}
        </SimpleGrid>
      </Stack>
    )
  );
}
