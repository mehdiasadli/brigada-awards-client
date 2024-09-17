import { ActionIcon, Text, Title } from '@mantine/core';
import { TAward } from '../../types/models';
import { useDeleteAward } from '../../api/mutations/award.mutations';
import DashboardCard from './dashboard-card';
import DashboardCardInfo from './dashboard-card-info';
import ContestChip from './contest-chip';
import { IconTrophy } from '@tabler/icons-react';
import { useModal } from '../../hooks/useModal';

interface AwardCardProps {
  award: TAward;
  dashboard?: boolean;
}

export default function AwardCard({ award, dashboard = false }: AwardCardProps) {
  const mutation = useDeleteAward();
  const modal = useModal();

  return (
    <>
      <DashboardCard
        item={award}
        mutation={mutation}
        onEditModalClick={(modal) => modal.openUpdateAward({ award })}
        deleteModalTitle='Bu mükafatı silirsiniz'
        renderDelete={dashboard}
        renderEdit={dashboard}
        actions={
          <ActionIcon variant='subtle' onClick={() => modal.getAwardRanks({ award })}>
            <IconTrophy size={20} />
          </ActionIcon>
        }
      >
        {!!award.description && (
          <Text fz='sm' c='dimmed'>
            {award.description}
          </Text>
        )}
        <Title c={award.isNegative ? 'red.7' : undefined} order={4}>
          {award.name}
        </Title>
        <DashboardCardInfo count={award.categories.length}>
          {award.categories.filter(c => dashboard ? true : c.contest.status !== "Upcoming").map((category) => (
            <ContestChip
              contest={category.contest}
              link={
                dashboard
                  ? '/dashboard/contests/' + category.contestId
                  : '/contests/' + category.contestId
              }
            />
          ))}
        </DashboardCardInfo>
      </DashboardCard>
    </>
  );
}
