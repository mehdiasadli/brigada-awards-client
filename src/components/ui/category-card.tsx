import {
  Accordion,
  Anchor,
  Avatar,
  Flex,
  Space,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDeleteCategory } from '../../api/mutations/category.mutations';
import { TCategory, TParticipant, TUser } from '../../types/models';
import DashboardCard, { DashboardCardProps } from './dashboard-card';
import { Link } from 'react-router-dom';
import DashboardCardInfo from './dashboard-card-info';
import UserAvatar from './user-avatar';
import { useModal } from '../../hooks/useModal';
import { IconPlus } from '@tabler/icons-react';
import { useDeleteNominee } from '../../api/mutations/nominee.mutations';
import { useCategoryResults } from '../../api/queries/result.queries';
import { useStatus } from '../../hooks/useStatus';
import UserPanel from './user-panel';
import Medal from './Medal';

const ordinals = {
  1: '1-ci',
  2: '2-ci',
  3: '3-cü',
};

interface CategoryCardProps
  extends Omit<
    DashboardCardProps<never>,
    'children' | 'item' | 'renderEdit' | 'renderDelete' | 'footer'
  > {
  contestId: string;
  category: TCategory;
  withActions?: boolean;
  dashboard?: boolean;
  isModal?: boolean;
  badge?: React.ReactNode;
  completed?: boolean;
  participant?: TParticipant;
}

export default function CategoryCard({
  contestId,
  category,
  dashboard = false,
  isModal = false,
  badge,
  completed,
  participant,
  ...props
}: CategoryCardProps) {
  const mutation = useDeleteCategory();
  const nomineeMutation = useDeleteNominee();
  const { data, refetch, error, status } = useCategoryResults(category.id, completed);
  const { Component } = useStatus(status, { error, refetch });

  const modal = useModal();

  const onAddNominee = () => {
    modal.openCreateNominee({ contestId, categoryId: category.id });
  };

  return (
    <DashboardCard
      item={category}
      mutation={mutation}
      deleteModalTitle={`"${category.award.name}" kateqoriyasını bu müsabiqədən silirsiniz`}
      renderEdit={false}
      withActions={dashboard}
      {...props}
    >
      <Stack gap={0} align='center'>
        {badge ? (
          <>
            {badge}
            <Space h={20} />
          </>
        ) : null}

        <Title order={6} ta='center'>
          {category.award.name}
        </Title>
        {/* {!isModal && (
          <Flex gap={10} justify='center'>
            <Anchor component={Link} to={'/comments/' + category.id}>
              Kommentlər
            </Anchor>
          </Flex>
        )} */}
      </Stack>
      <DashboardCardInfo
        count={category.nominees.length}
        onAdd={dashboard ? onAddNominee : () => {}}
      >
        <Avatar.Group>
          {category.nominees.map((nominee) =>
            !dashboard ? (
              <Tooltip
                withArrow
                label={nominee.participant.user.name}
                transitionProps={{ transition: 'slide-up' }}
              >
                <Anchor fz='sm' component={Link} to={'/users/' + nominee.participant.user.username}>
                  <UserAvatar user={nominee.participant.user} />
                </Anchor>
              </Tooltip>
            ) : (
              <UnstyledButton
                onClick={() => {
                  modal.confirmDelete(
                    `${nominee.participant.user.name} adlı nominasiyanı "${category.award.name}" kateqoriyasından silirsiniz`,
                    () => {
                      nomineeMutation.mutate({ id: nominee.id });
                    }
                  );
                }}
              >
                <UserAvatar user={nominee.participant.user} />
              </UnstyledButton>
            )
          )}
          {dashboard && (
            <Avatar
              color='green'
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ':hover': {
                  transform: 'scale(1.2) translateY(-10px)',
                },
              }}
              onClick={onAddNominee}
            >
              <IconPlus />
            </Avatar>
          )}
        </Avatar.Group>
      </DashboardCardInfo>
      {!dashboard && data?.body && !isModal
        ? (Component ?? (
            <Accordion variant='contained'>
              <Accordion.Item value={category.id}>
                <Accordion.Control>Nəticələr</Accordion.Control>
                <Accordion.Panel>
                  <Stack w='100%'>
                    {data.body.nominees.map((nominee) => (
                      <>
                        <Flex key={nominee.id} align='center' gap={10}>
                          <Medal rank={nominee.rank} />
                          <UserPanel
                            titleProps={{
                              fz: 12,
                            }}
                            withFirstName
                            avatarProps={{ size: 'sm' }}
                            w='100%'
                            user={nominee.participant.user as TUser}
                            description={
                              <Text fz='sm' c='dimmed'>
                                {nominee.totalPoints} Xal
                              </Text>
                            }
                          />
                        </Flex>
                      </>
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ))
        : !dashboard &&
          data?.body &&
          isModal &&
          (Component ??
            (data?.body && data.body.nominees.find((n) => n.participant.id === participant?.id) && (
              <Stack w='100%' align='center'>
                <Flex align='center' gap={10}>
                  <Medal
                    rank={
                      data.body.nominees.find((n) => n.participant.id === participant?.id)!.rank
                    }
                  />
                  <Title ta='center' order={6}>
                    {
                      data.body.nominees.find((n) => n.participant.id === participant?.id)!
                        .totalPoints
                    }{' '}
                    xal ilə{' '}
                    {![1, 2, 3].includes(
                      data.body.nominees.find((n) => n.participant.id === participant?.id)!.rank
                    )
                      ? 'yer tutmadı'
                      : `${
                          ordinals[
                            data.body.nominees.find((n) => n.participant.id === participant?.id)!
                              .rank as keyof typeof ordinals
                          ]
                        } yer`}
                  </Title>
                </Flex>
              </Stack>
            )))}
    </DashboardCard>
  );
}
