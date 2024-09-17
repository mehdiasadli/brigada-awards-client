import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useVote } from '../api/mutations/vote.mutations';
import { useNominees } from '../api/queries/nominee.queries';
import { flatList } from '../utils/flat-list';
import {
  Badge,
  Button,
  Card,
  Flex,
  Mark,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import UserPanel from '../components/ui/user-panel';
import { useStatus } from '../hooks/useStatus';
import { useCategory } from '../api/queries/category.queries';
import { Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '../hooks/useToast';
import { useParticipation } from '../api/queries/participant.queries';
import { AddVotesDto } from '../dtos/vote.dto';
import { useVotesOfParticipant } from '../api/queries/vote.queries';
import { TVote } from '../types/models';
import dayjs from 'dayjs';

export default function VoteCategoryPage() {
  const { category: categoryId } = useParams() as { category: string };
  const { data: category, status: categoryStatus } = useCategory(categoryId);
  const { mutate, isPending } = useVote();
  const { data, status, error, refetch } = useNominees(categoryId, null, {
    take: 200,
  });
  const { data: participation, status: participationStatus } = useParticipation(
    category?.body.contestId
  );
  const { data: votesOfParticipant, status: votesOfParticipantStatus } = useVotesOfParticipant(
    participation?.body?.id
  );

  const { Component } = useStatus(
    [status, categoryStatus, participationStatus, votesOfParticipantStatus],
    {
      error,
      refetch,
    }
  );
  const nominees = useMemo(() => flatList(data) ?? [], [data]);

  const hasVoted = (categoryId: string) => {
    return votesOfParticipant?.body?.some((vote) => vote.nominee.categoryId === categoryId);
  };

  const points = useMemo(
    () =>
      category?.body.contest.config.pointing
        .split(',')
        .map(Number)
        .sort((a, b) => a - b) ?? [],
    [category]
  );
  const navigate = useNavigate();
  const [assignedPoints, setAssignedPoints] = useState<Record<string, number>>({});
  const [givenVotes, setGivenVotes] = useState<TVote[]>([]);
  const toast = useToast();

  useEffect(() => {
    if (votesOfParticipant?.body && participation?.body && participation.body.id) {
      const givenVotes = votesOfParticipant.body.filter(
        (vote) =>
          vote.voterId === participation.body?.id && nominees.some((n) => n.id === vote.nomineeId)
      );

      setGivenVotes(givenVotes);

      setAssignedPoints(
        givenVotes.reduce<Record<string, number>>((result, vote) => {
          result[vote.nomineeId] = vote.point;

          return result;
        }, {})
      );
    }
  }, [nominees, participation?.body, votesOfParticipant?.body]);

  if (participation?.body === null) {
    return <Navigate replace to='/' />;
  }

  const availablePoints = points.filter((p) => !Object.values(assignedPoints).includes(p));

  const onVote = () => {
    if (availablePoints.length > 0) {
      toast.error('You have not completed voting. Use all the points');
      return;
    }

    const voterId = participation?.body?.id;

    if (!voterId) {
      toast.error('Participation in this contest not found');
      return;
    }

    const result: AddVotesDto = {
      votes: Object.entries(assignedPoints)
        .filter(([, p]) => p > 0)
        .map(([nomineeId, point]) => ({
          nomineeId,
          point,
          voterId,
        })),
    };

    mutate(result, {
      onSuccess() {
        navigate(-1);
      },
    });
  };

  const handlePointAssignment = (nomineeId: string, point: number | null) => {
    const updatedAssignedPoints = { ...assignedPoints };

    Object.entries(updatedAssignedPoints).forEach(([key, value]) => {
      if (key === nomineeId || value === point) {
        delete updatedAssignedPoints[key];
      }
    });

    if (point !== null) {
      updatedAssignedPoints[nomineeId] = point;
    }

    setAssignedPoints(updatedAssignedPoints);
  };

  return (
    Component ??
    (category?.body && (
      <Stack>
        <Title ta='center'>{category.body.award.name}</Title>
        <Text ta='center' c='dimmed'>
          {category.body.contest.name}
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          {nominees.map((nominee) => (
            <Card withBorder key={nominee.id}>
              <Stack>
                <Flex align='center' justify='space-between'>
                  <UserPanel user={nominee.participant.user} />
                  {assignedPoints[nominee.id] && (
                    <Badge size='xl'>{assignedPoints[nominee.id]}</Badge>
                  )}
                </Flex>
                {!hasVoted(categoryId) && (
                  <>
                    <SegmentedControl
                      radius='xl'
                      disabled={nominee.participantId === participation?.body?.id}
                      data={[
                        { value: '', label: '0' },
                        ...points.map((p) => ({ value: p.toString(), label: p.toString() })),
                      ]}
                      value={assignedPoints[nominee.id]?.toString() || ''}
                      onChange={(value) =>
                        handlePointAssignment(nominee.id, value ? Number(value) : null)
                      }
                    />
                    {nominee.participantId === participation?.body?.id && (
                      <Text ta='center' fz='xs' c='dimmed'>
                        Özünüzə səs verə bilməzsiniz
                      </Text>
                    )}
                  </>
                )}
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        {hasVoted(categoryId) && givenVotes[0]?.createdAt && (
          <Title ta='center' order={4} c='dimmed'>
            <Mark>{dayjs(givenVotes[0].createdAt).format('HH:mm, D MMMM YYYY')}</Mark> tarixində səs
            veribsiniz
          </Title>
        )}

        {availablePoints.length === 0 && !hasVoted(categoryId) && (
          <Button
            mb={30}
            mt={10}
            variant='gradient'
            sx={(t) => ({ boxShadow: t.shadows.lg })}
            w='min(95%, 20rem)'
            mx='auto'
            radius='xl'
            h={50}
            onClick={onVote}
            loading={isPending}
          >
            SƏSVER
          </Button>
        )}
      </Stack>
    ))
  );
}
