import { useParams } from 'react-router-dom';
import { useProfile } from '../api/queries/user.queries';
import { Stack } from '@mantine/core';
import { useStatus } from '../hooks/useStatus';
import ProfileCard from '../components/ui/profile-card';
import ProfileBarChart from '../components/ui/profile-barchart';

export default function ProfilePage() {
  const { username } = useParams() as { username: string };
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

        <ProfileBarChart userId={data.body.id} />
      </Stack>
    ))
  );
}
