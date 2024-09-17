import {
  Accordion,
  Anchor,
  Badge,
  Card,
  Divider,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { TParticipant } from '../../types/models';
import UserAvatar from '../ui/user-avatar';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import CategoryCard from '../ui/category-card';
import { useParticipantResults } from '../../api/queries/result.queries';
import { useStatus } from '../../hooks/useStatus';
import UserPanel from '../ui/user-panel';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import Medal from '../ui/Medal';

interface InfoParticipantModalProps {
  participant: TParticipant;
  dashboard?: boolean;
}

export default function InfoParticipantModal({
  participant,
  dashboard = false,
}: InfoParticipantModalProps) {
  const modal = useModal();
  const navigate = useNavigate();
  const { data, error, refetch, status } = useParticipantResults(participant.id, dashboard);
  const { Component } = useStatus(status, { error, refetch });

  const onGoProfile = () => {
    modal.close('PARTICIPANT_INFO_MODAL');
    navigate('/users/' + participant.user.username);
  };

  const info = useCallback(
    (categoryId: string) => {
      return data?.body?.find((item) => item.category.id === categoryId);
    },
    [data]
  );

  return (
    <Stack>
      <Stack align='center'>
        <UserAvatar size='xl' user={participant.user} />
        <Title ta='center'>{participant.user.name}</Title>
        <Anchor onClick={onGoProfile}>Profilinə daxil olun</Anchor>
      </Stack>
      <Divider />
      <Title ta='center' order={5}>
        Nominasiyalar
      </Title>
      <Text mt={-10} fz='sm' c='dimmed' ta='center'>
        Ümumi {participant.nominations.length} nominasiyada{' '}
      </Text>
      {dashboard && data?.body && (
        <Badge mx={'auto'} variant='outline'>
          ümumi{' '}
          {data.body
            .flat()
            .reduce((result, v) => result + v.votes.reduce((s, { point }) => s + point, 0), 0)}{' '}
          Xal
        </Badge>
      )}
      <SimpleGrid
        cols={{
          xl: 4,
          lg: 3,
          md: 2,
          sm: 2,
          xs: 1,
        }}
      >
        {participant.nominations.map((nomination) => {
          const item = info(nomination.categoryId);
          const total = item?.votes.reduce((r, { point }) => r + point, 0);

          return !dashboard ? (
            <CategoryCard
              dashboard={false}
              isModal
              participant={participant}
              category={nomination.category}
              contestId={nomination.category.contestId}
            />
          ) : !item ? (
            Component
          ) : (
            <Stack gap={5}>
              {data?.body && (
                <Card withBorder>
                  <Flex align='center' justify='space-between'>
                    <Medal rank={item.rank} showRank />
                    <Badge>{total} Xal</Badge>
                  </Flex>
                  <Accordion
                    variant='contained'
                    w='min(100%, 30rem)'
                    chevron={null}
                    styles={{
                      chevron: {
                        display: 'none',
                      },
                      item: {
                        border: 'none',
                      },
                      label: {
                        padding: 0,
                      },
                    }}
                  >
                    <Accordion.Item key={item.category.id} value={item.category.id}>
                      <Accordion.Control pr={0} sx={{ padding: 0 }}>
                        <CategoryCard
                          withBorder={false}
                          dashboard={false}
                          isModal
                          category={nomination.category}
                          contestId={nomination.category.contestId}
                        />
                      </Accordion.Control>
                      {item.votes.length > 0 && (
                        <Accordion.Panel mt={15}>
                          <Stack>
                            {item.votes.map((vote) => (
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
                      )}
                    </Accordion.Item>
                  </Accordion>
                </Card>
              )}
            </Stack>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
