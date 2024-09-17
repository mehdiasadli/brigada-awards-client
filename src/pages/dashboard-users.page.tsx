import { useUsers } from '../api/queries/user.queries';
import DashboardLayout from '../components/layouts/dashboard.layout';
import { useListFilters } from '../hooks/useListFilters';
import { TUser } from '../types/models';
import ListFilters from '../components/ui/list-filters';
import DashboardUserCard from '../components/ui/dashboard-user-card';
import Infinite from '../components/ui/infinite';

export default function DashboardUsersPage() {
  const { query, sorting, setSorting, searchValue, setSearch } = useListFilters<TUser>({
    defaultSorting: 'asc-createdAt',
    searchFields: ['username', 'name'],
  });
  const { data, fetchNextPage, hasNextPage, refetch, status, error } = useUsers(query);

  return (
    <DashboardLayout
      title='List of users'
      createProps={{
        children: 'Create User',
        onModal: (modal) => modal.openCreateUser({}),
      }}
      filtersComponent={
        <ListFilters<TUser>
          sortingData={[
            { label: 'Oldest first', value: 'asc-createdAt' },
            { label: 'Newest first', value: 'desc-createdAt' },
            { label: 'Alphabetical', value: 'asc-name' },
            { label: 'Alphabetical (reverse)', value: 'desc-name' },
          ]}
          filters={{ sorting, setSorting, searchValue, setSearch }}
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
        render={({ item }) => <DashboardUserCard user={item} />}
        emptyState='No users were found'
      />
    </DashboardLayout>
  );
}
