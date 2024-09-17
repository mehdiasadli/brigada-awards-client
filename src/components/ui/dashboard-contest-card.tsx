import { Anchor, Title } from '@mantine/core';
import { useDeleteContest } from '../../api/mutations/contest.mutations';
import { TContest } from '../../types/models';
import DashboardCard from './dashboard-card';
import DashboardCardInfo from './dashboard-card-info';
import { Link } from 'react-router-dom';

interface DashboardContestProps {
  contest: TContest;
}

export default function DashboardContest({ contest }: DashboardContestProps) {
  const mutation = useDeleteContest();

  return (
    <DashboardCard
      item={contest}
      mutation={mutation}
      deleteModalTitle='You are deleting this contest'
      renderEdit={false}
    >
      <Title order={4}>{contest.name}</Title>
      <DashboardCardInfo count={contest.categories.length}>
        {contest.categories.map((category) => (
          <Anchor component={Link} to={'/dashboard/categories/' + contest.id}>
            {category.award.name}
          </Anchor>
        ))}
      </DashboardCardInfo>
    </DashboardCard>
  );
}
