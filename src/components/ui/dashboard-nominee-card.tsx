import { Title } from '@mantine/core';
import { useDeleteNominee } from '../../api/mutations/nominee.mutations';
import { TNominee } from '../../types/models';
import DashboardCard from './dashboard-card';
import UserPanel from './user-panel';

interface DashboardNomineeCardProps {
  nominee: TNominee;
}

export default function DashboardNomineeCard({ nominee }: DashboardNomineeCardProps) {
  const mutation = useDeleteNominee();

  return (
    <DashboardCard
      item={nominee}
      mutation={mutation}
      deleteModalTitle='Nominasiyanı silirsiniz'
      renderEdit={false}
    >
      <Title order={4}>{nominee.category.award.name}</Title>
      <UserPanel user={nominee.participant.user} />
    </DashboardCard>
  );
}
