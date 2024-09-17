import { Navigate, useParams } from 'react-router-dom';
import { useContest } from '../api/queries/contest.queries';
import { useStatus } from '../hooks/useStatus';
import Contest from '../components/ui/contest';
import { useUser } from '../hooks/useUser';
import VotePage from './vote.page';

export default function ContestPage() {
  const { id } = useParams() as { id: string };
  const { id: userId, admin } = useUser();
  const { data, status, error, refetch } = useContest(id);
  const { Component } = useStatus(status, { error, refetch });

  if (data?.body.status === 'Upcoming') {
    const prt = data.body.participants.find((p) => p.userId === userId);

    if (prt?.allowEarlyVote) {
      return <VotePage data={data} status={status} />;
    }

    if (!admin) {
      return <Navigate to='..' replace />;
    }
  }

  return Component ?? (data?.body ? <Contest contest={data.body} /> : null);
}
