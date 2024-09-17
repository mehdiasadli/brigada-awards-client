import { useAwards } from '../api/queries/award.queries';
import DashboardLayout from '../components/layouts/dashboard.layout';
import AwardCard from '../components/ui/award-card';
import Infinite from '../components/ui/infinite';
import ListFilters from '../components/ui/list-filters';
import { useListFilters } from '../hooks/useListFilters';
import { TAward } from '../types/models';

export default function DashboardAwardsPage() {
  const { query, sorting, setSorting, searchValue, setSearch } = useListFilters<TAward>({
    searchFields: ['name'],
  });
  const { data, fetchNextPage, hasNextPage, refetch, status, error } = useAwards(query);

  return (
    <DashboardLayout
      title='List of Awards'
      createProps={{
        onModal: (modal) => modal.openCreateAward({}),
      }}
      filtersComponent={
        <ListFilters<TAward> filters={{ sorting, setSearch, setSorting, searchValue }} />
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
        render={({ item }) => <AwardCard dashboard award={item} />}
        emptyState='No awards were found'
      />
    </DashboardLayout>
  );
}
