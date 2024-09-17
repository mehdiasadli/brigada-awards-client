import { useState } from 'react';
import { useVotes } from '../api/queries/vote.queries';
import DashboardLayout from '../components/layouts/dashboard.layout';
import ListFilters from '../components/ui/list-filters';
import { useListFilters } from '../hooks/useListFilters';
import { TContest, TVote } from '../types/models';
import { ActionIcon, Badge, Group, Select, Text } from '@mantine/core';
import Infinite from '../components/ui/infinite';
import VoteCard from '../components/ui/vote-card';
import { flatList } from '../utils/flat-list';
import { primaryColor } from '../app';
import { IconRefresh } from '@tabler/icons-react';

interface DashboardVotesPageProps {
  contest: TContest;
}

export default function DashboardVotesPage({ contest }: DashboardVotesPageProps) {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [voterId, setVoterId] = useState<string | null>(null);
  const [nomineeId, setNomineeId] = useState<string | null>(null);

  const possibleMaxPoints =
    contest.config.pointing
      .split(',')
      .map(Number)
      .slice()
      .sort((a, b) => b - a)?.[0] *
    contest.categories.length *
    (contest.participants.length - 1);

  const possibleMaxCategoryPoints = possibleMaxPoints / contest.categories.length;

  const { query, sorting, setSorting, searchValue, setSearch } = useListFilters<TVote>();
  const { data, fetchNextPage, hasNextPage, refetch, status, error, fetchStatus } = useVotes(
    contest.id,
    {
      ...query,
      nomineeId,
      voterId,
      categoryId,
    }
  );

  return (
    <DashboardLayout
      title={`List of Votes (${possibleMaxPoints} max points , ${possibleMaxCategoryPoints} m.p. for category)`}
      filtersComponent={
        <ListFilters<TVote>
          filters={{ sorting, setSorting, searchValue, setSearch }}
          withSearching={false}
        >
          <Select
            w={{
              base: '100%',
              sm: 350,
            }}
            clearable
            searchable
            onChange={setCategoryId}
            label='Category'
            placeholder='Pick a category'
            value={categoryId}
            allowDeselect
            data={contest.categories.map((c) => ({ value: c.id, label: c.award.name }))}
          />
          <Select
            w={{
              base: '100%',
              sm: 250,
            }}
            searchable
            clearable
            onChange={setVoterId}
            label='Voter'
            placeholder='Pick a voter'
            value={voterId}
            allowDeselect
            data={contest.participants.map((p) => ({ value: p.id, label: p.user.name }))}
          />
          <Select
            w={{
              base: '100%',
              sm: 250,
            }}
            searchable
            clearable
            onChange={setNomineeId}
            label='Nominee'
            placeholder='Pick a nominee'
            value={nomineeId}
            allowDeselect
            data={contest.participants.map((p) => ({ value: p.id, label: p.user.name }))}
          />
          <ActionIcon
            loading={fetchStatus === 'fetching'}
            mt='auto'
            variant='subtle'
            onClick={() => refetch()}
          >
            <IconRefresh />
          </ActionIcon>
        </ListFilters>
      }
    >
      <Group mx='auto' gap={5} align='center' justify='center'>
        <Badge size='lg' variant='white'>
          {data?.pages[0].body.meta.total_items ?? 0} total votes
        </Badge>
        <Text c={primaryColor}>•</Text>
        <Badge size='lg' variant='white'>
          {flatList(data).reduce((result, v) => result + v.point, 0) ?? 0} total points
        </Badge>
      </Group>
      <Infinite
        data={data}
        error={error}
        status={status}
        fetchNext={fetchNextPage}
        hasNext={hasNextPage}
        refetch={refetch}
        containerProps={{ cols: { xl: 4, lg: 3, md: 2, sm: 1 } }}
        render={({ item }) => (
          <VoteCard categoryId={categoryId} categories={contest.categories} vote={item} />
        )}
        emptyState='No votes were found'
      />
    </DashboardLayout>
  );
}
