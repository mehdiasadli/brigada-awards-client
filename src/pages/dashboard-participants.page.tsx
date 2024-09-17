import { useParticipants } from '../api/queries/participant.queries';
import DashboardLayout from '../components/layouts/dashboard.layout';
import ListFilters from '../components/ui/list-filters';
import { useListFilters } from '../hooks/useListFilters';
import { TParticipant } from '../types/models';
import Infinite from '../components/ui/infinite';
import DashboardParticipantCard from '../components/ui/dashboard-participant-card';
import { flatList } from '../utils/flat-list';

interface DashboardParticipantsPageProps {
  contestId: string;
}

export default function DashboardParticipantsPage({ contestId }: DashboardParticipantsPageProps) {
  const { query, sorting, setSorting, searchValue, setSearch } = useListFilters<TParticipant>();
  const { data, fetchNextPage, hasNextPage, refetch, status, error } = useParticipants(
    contestId,
    query
  );

  return (
    <DashboardLayout
      title='List of participants'
      createProps={{
        onModal: (modal) =>
          modal.openCreateParticipant({ contestId, ignore: flatList(data).map((p) => p.userId) }),
      }}
      filtersComponent={
        <ListFilters<TParticipant>
          filters={{ sorting, setSorting, searchValue, setSearch }}
          withSearching={false}
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
        render={({ item }) => <DashboardParticipantCard participant={item} />}
        emptyState='No participants were found'
      />
    </DashboardLayout>
  );
}
