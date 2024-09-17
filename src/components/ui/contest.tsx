import { Button, Card, Center, SimpleGrid, Space, Stack, Text, Title } from '@mantine/core';
import { TContest } from '../../types/models';
import UserPanel from './user-panel';
import { useModal } from '../../hooks/useModal';
import { Link } from 'react-router-dom';
import CategoryCard from './category-card';
import ContestHeader from './contest-header';

interface ContestProps {
  contest: TContest | null;
  showResults?: boolean;
}

export default function Contest({ contest, showResults }: ContestProps) {
  const modal = useModal();

  return contest === null ? (
    <Center>
      <Text>
        Hal-hazırda davam edən müsabiqə yoxdur. Bitmiş müsabiqələrə keçid edin. {showResults}
      </Text>
    </Center>
  ) : (
    <Stack w='100%' pt={10} pb={35}>
      <ContestHeader contest={contest} />
      <Stack w='100%'>
        {contest.status === 'Ongoing' && (
          <Button
            component={Link}
            to={'/vote'}
            mb={30}
            mt={10}
            variant='gradient'
            sx={(t) => ({ boxShadow: t.shadows.lg })}
            w='min(95%, 20rem)'
            mx='auto'
            radius='xl'
            h={50}
          >
            SƏSVERMƏ
          </Button>
        )}
        <Card withBorder>
          <Title order={3} ta='center'>
            Müsabiqənin iştirakçıları
          </Title>
          <Text fz='sm' ta='center' c='dimmed'>
            Ümumi {contest.participants.length} nəfər iştirak{' '}
            {contest.status === 'Completed' ? 'etdi' : 'edir'}
          </Text>
          <Space h={30} />

          <SimpleGrid
            cols={{
              xl: 5,
              lg: 4,
              md: 3,
              sm: 2,
              xs: 1,
            }}
          >
            {contest.participants.map((participant) => (
              <Stack key={participant.id}>
                <Card radius='xl' sx={{ cursor: 'pointer' }} withBorder>
                  <UserPanel
                    onClick={() => modal.getInfoParticipant({ participant })}
                    user={participant.user}
                  />
                </Card>
              </Stack>
            ))}
          </SimpleGrid>
          <Space h={25} />
          <Text c='dimmed' ta='center'>
            Hər iştirakçıya klikləyərək daha çox informasiya əldə edin
          </Text>
        </Card>
        <Card withBorder>
          <Title order={3} ta='center'>
            Müsabiqənin kateqoriyaları
          </Title>
          <Text fz='sm' ta='center' c='dimmed'>
            Ümumi {contest.categories.length} kateqoriya mövcuddur
          </Text>
          <Space h={30} />
          <SimpleGrid
            cols={{
              xl: 4,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
          >
            {contest.categories.map((category) => (
              <CategoryCard
                dashboard={false}
                contestId={contest.id}
                category={category}
                key={category.id}
                completed={contest.status === 'Completed'}
              />
            ))}
          </SimpleGrid>
        </Card>
      </Stack>
    </Stack>
  );
}
