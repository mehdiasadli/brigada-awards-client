import {
  Accordion,
  Badge,
  Card,
  Flex,
  Progress,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useContestResults } from '../api/queries/result.queries';
import { useStatus } from '../hooks/useStatus';
import { RankedNominee, TContest, TUser } from '../types/models';
import UserPanel from '../components/ui/user-panel';
import dayjs from 'dayjs';

interface DashboardResultsPageProps {
  contest: TContest;
}

export default function DashboardResultsPage({ contest }: DashboardResultsPageProps) {
  const { data, error, refetch, status } = useContestResults(contest.id);
  const { Component } = useStatus(status, { error, refetch });

  const pointCount = contest.config.pointing.split(',').length;
  const participantCount = contest.participants.length;

  const totalVotesForCategory = pointCount * participantCount;

  const progress = (nominees: RankedNominee[]) => {
    const votes = nominees.reduce((sum, n) => n.votes + sum, 0);
    const percentage = (100 * votes) / totalVotesForCategory;

    return (
      <Progress
        value={percentage}
        color={percentage === 100 ? 'green' : 'orange'}
        animated={contest.status === 'Ongoing'}
      />
    );
  };

  return (
    Component ??
    (data?.body && (
      <Stack>
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }}>
          {data.body.map((value) => (
            <Card withBorder>
              {progress(value.nominees)}
              <Space h={20} />
              <Title ta='center' order={5}>
                {value.category.name}
              </Title>
              <Space h={20} />
              <Stack>
                {value.nominees.length === 0 ? (
                  <Text ta='center' fw='bold'>
                    No votes yet
                  </Text>
                ) : (
                  <Accordion chevronPosition='left' variant='contained'>
                    {value.nominees.map((nominee) => (
                      <Accordion.Item key={nominee.id} value={nominee.id}>
                        <Accordion.Control>
                          <Flex align='center' gap={10}>
                            <UserPanel user={nominee.participant.user as TUser} />
                            <Badge ml='auto'>{nominee.totalPoints}</Badge>
                          </Flex>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Stack>
                            {nominee.voters.map((vote) => (
                              <Flex>
                                <UserPanel
                                  user={vote.voter.user}
                                  description={
                                    <Text c='dimmed' fz='xs'>
                                      {dayjs(vote.createdAt).format('HH:mm, DD.MM.YYYY')}
                                    </Text>
                                  }
                                />
                                <Badge color='blue' ml='auto'>
                                  {vote.point}
                                </Badge>
                              </Flex>
                            ))}
                          </Stack>
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                )}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    ))
  );
}
