import { useContests } from '../api/queries/contest.queries';
import DashboardLayout from '../components/layouts/dashboard.layout';
import DashboardContest from '../components/ui/dashboard-contest-card';
import Infinite from '../components/ui/infinite';
import ListFilters from '../components/ui/list-filters';
import { useListFilters } from '../hooks/useListFilters';
import { TContest } from '../types/models';

export default function DashboardContestsPage() {
  const { query, sorting, setSorting, searchValue, setSearch } = useListFilters<TContest>({
    searchFields: ['name'],
    defaultSorting: 'desc-createdAt',
  });
  const { data, fetchNextPage, hasNextPage, refetch, status, error } = useContests(query);

  return (
    <DashboardLayout
      title='List of Contests'
      createProps={{
        onModal: (modal) => modal.openCreateContest({}),
      }}
      filtersComponent={
        <ListFilters<TContest>
          filters={{ sorting, setSorting, searchValue, setSearch }}
          searchProps={{ placeholder: 'Search by name' }}
        />
      }
    >
      <Infinite
        data={data}
        error={error}
        status={status}
        fetchNext={fetchNextPage}
        hasNext={hasNextPage}
        refetch={refetch}
        containerProps={{ cols: { xl: 4, lg: 3, md: 2, sm: 1 } }}
        render={({ item }) => <DashboardContest contest={item} />}
        emptyState='No categories in this contest were found'
      />
    </DashboardLayout>
  );
}
