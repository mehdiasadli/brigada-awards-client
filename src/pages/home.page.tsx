import { useOngoingContest } from '../api/queries/contest.queries';
import { useStatus } from '../hooks/useStatus';
import Contest from '../components/ui/contest';
import { Anchor, Center, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { data, status, error, refetch } = useOngoingContest();
  const { Component } = useStatus(status, {
    error,
    refetch,
  });

  return (
    Component ??
    (data?.body ? (
      <Contest contest={data.body} />
    ) : (
      <Center mt={20}>
        <Stack>
          <Title order={3} ta='center'>
            Hal-hazırda davam edən səsvermə yoxdur
          </Title>
          <Anchor ta='center' component={Link} to='/contests'>
            Keçirilmiş səsvermələri görmək üçün klikləyin
          </Anchor>
        </Stack>
      </Center>
    ))
  );
}
