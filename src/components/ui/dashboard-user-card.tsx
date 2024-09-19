import { TUser } from '../../types/models';
import UserPanel from './user-panel';
import { useDeleteUser } from '../../api/mutations/user.mutations';
import DashboardCard from './dashboard-card';
import DashboardCardInfo from './dashboard-card-info';
import ContestChip from './contest-chip';

interface DashboardUserCardProps {
  user: TUser;
}

export default function DashboardUserCard({ user }: DashboardUserCardProps) {
  const mutation = useDeleteUser();

  return (
    <DashboardCard
      item={user}
      mutation={mutation}
      onEditModalClick={(modal) => modal.openUpdateUser({ user })}
      renderDelete={!user.admin}
      deleteModalTitle='İstifadəçini silirsiniz'
    >
      <UserPanel link withUsername user={user} />
      <DashboardCardInfo count={user.participations.length} innerStackProps={{ gap: 5 }}>
        {user.participations.map((participation) => (
          <ContestChip contest={participation.contest} link />
        ))}
      </DashboardCardInfo>
    </DashboardCard>
  );
}
