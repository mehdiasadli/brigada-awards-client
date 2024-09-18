import { useParams } from 'react-router-dom';
import { useProfile } from '../api/queries/user.queries';
import { Badge, Flex, Paper, Space, Stack, Title } from '@mantine/core';
import { useStatus } from '../hooks/useStatus';
import ProfileCard from '../components/ui/profile-card';
import ProfileBarChart from '../components/ui/profile-barchart';
import UserPanel from '../components/ui/user-panel';
import { useUser } from '../hooks/useUser';
import { formatNumber } from '../utils/format-number';

export default function ProfilePage() {
  const { username } = useParams() as { username: string };
  const { admin, username: currentUserUsername } = useUser();
  const { data, status, error, refetch } = useProfile(username);
  const { Component } = useStatus(status, {
    error,
    refetch,
  });

  return (
    Component ??
    (data?.body && (
      <Stack gap={40} py={40}>
        <ProfileCard user={data.body} />

        {data.body.givenTotals.length > 0 && (
          <Paper
            mx='auto'
            w='min(100%, 40rem)'
            bg='pink.0'
            px={30}
            py={20}
            sx={(theme) => ({ border: '1px solid ' + theme.colors.pink[3] })}
          >
            <Stack>
              <Title c='pink.6' order={5} ta='center'>
                Ən Çox Səs Verdiyi İstifadəçilər
              </Title>
              <Space h={5} />
              {data.body.givenTotals.map(({ total, user }) => (
                <Flex align='center' justify='space-between'>
                  <UserPanel link user={user} titleProps={{ c: 'pink.8' }} />
                  {(admin || currentUserUsername === username) && (
                    <Badge color='pink'>
                      {total} /{' '}
                      {formatNumber(
                        (100 * total) / data.body.givenTotals.reduce((sum, r) => sum + r.total, 0)
                      )}
                      %
                    </Badge>
                  )}
                </Flex>
              ))}
            </Stack>
          </Paper>
        )}

        <ProfileBarChart userId={data.body.id} />
      </Stack>
    ))
  );
}
