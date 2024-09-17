import { Accordion, Badge, Card, Divider, Flex, Space, Stack, Text, Title } from '@mantine/core';
import { useAwardResults } from '../../api/queries/result.queries';
import { useStatus } from '../../hooks/useStatus';
import { TAward, TUser } from '../../types/models';
import UserPanel from '../ui/user-panel';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useModal } from '../../hooks/useModal';
import Medal from '../ui/Medal';

interface AwardRanksModalProps {
  award: TAward;
  dashboard?: boolean;
}

export default function AwardRanksModal({ award, dashboard = false }: AwardRanksModalProps) {
  const { data, refetch, error, status } = useAwardResults(award.id);
  const { Component } = useStatus(status, { error, refetch });
  const modal = useModal();

  useEffect(() => {
    if (data?.body.length === 0) {
      modal.close('AWARD_RANKS_MODAL');
    }
  }, [data, modal]);

  return (
    Component ??
    (data?.body && (
      <Stack gap={25}>
        {data.body.map((item) => (
          <Card key={item.contest.id}>
            <Stack gap={0}>
              <Title order={3}>{item.contest.name}</Title>
              <Text fz='sm' c='dimmed'>
                {item.category.name}
              </Text>
              <Space h={15} />
              {dashboard ? (
                <Accordion chevronPosition='left' variant='contained'>
                  {item.nominees.map((nominee) => (
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
              ) : (
                <Stack>
                  {item.nominees.map((nominee) => (
                    <>
                      <Flex align='center' gap={10} key={nominee.id}>
                        <Medal rank={nominee.rank} />
                        <UserPanel user={nominee.participant.user as TUser} />
                        <Badge ml='auto'>{nominee.totalPoints}</Badge>
                      </Flex>
                      <Divider />
                    </>
                  ))}
                </Stack>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>
    ))
  );
}
