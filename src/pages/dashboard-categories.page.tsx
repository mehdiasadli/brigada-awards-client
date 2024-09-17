import { useCategories } from '../api/queries/category.queries';
import DashboardLayout from '../components/layouts/dashboard.layout';
import CategoryCard from '../components/ui/category-card';
import Infinite from '../components/ui/infinite';
import ListFilters from '../components/ui/list-filters';
import { useListFilters } from '../hooks/useListFilters';
import { TCategory } from '../types/models';
import { flatList } from '../utils/flat-list';

interface DashboardCategoriesPageProps {
  contestId: string;
}

export default function DashboardCategoriesPage({ contestId }: DashboardCategoriesPageProps) {
  const { query, sorting, setSorting, searchValue, setSearch } = useListFilters<TCategory>();
  const { data, fetchNextPage, hasNextPage, refetch, status, error } = useCategories(
    contestId,
    query
  );

  return (
    <DashboardLayout
      title='List of Categories'
      createProps={{
        onModal: (modal) =>
          modal.openCreateCategory({ contestId, ignore: flatList(data).map((c) => c.awardId) }),
      }}
      filtersComponent={
        <ListFilters<TCategory>
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
        render={({ item }) => <CategoryCard dashboard  contestId={contestId} category={item} />}
        emptyState='No categories were found'
      />
    </DashboardLayout>
  );
}
