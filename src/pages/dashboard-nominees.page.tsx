import { Select } from '@mantine/core';
import { useCategories } from '../api/queries/category.queries';
import { useNominees } from '../api/queries/nominee.queries';
import DashboardLayout from '../components/layouts/dashboard.layout';
import ListFilters from '../components/ui/list-filters';
import { useListFilters } from '../hooks/useListFilters';
import { TNominee } from '../types/models';
import { selectData } from '../utils/select-data';
import DashboardNomineeCard from '../components/ui/dashboard-nominee-card';
import Infinite from '../components/ui/infinite';
import { useNullishParams } from '../hooks/useNullishParams';
import { useNavigate } from 'react-router-dom';
import { useContests } from '../api/queries/contest.queries';

export default function DashboardNomineesPage() {
  const category = useNullishParams('category');
  const contest = useNullishParams('contest');
  const navigate = useNavigate();

  const { query, sorting, setSorting, searchValue, setSearch } = useListFilters<TNominee>();
  const { data: categories } = useCategories(contest, {
    take: 100,
  });
  const { data: contests } = useContests({
    take: 100,
  });

  const { data, fetchNextPage, hasNextPage, refetch, status, error } = useNominees(
    category,
    contest,
    query
  );

  return (
    <DashboardLayout
      title='List of Nominees'
      createProps={
        contest
          ? {
              onModal: (modal) => modal.openCreateNominee({ contestId: contest }),
            }
          : false
      }
      filtersComponent={
        <ListFilters<TNominee>
          filters={{ sorting, setSorting, searchValue, setSearch }}
          withSearching={false}
        >
          <Select
            w={{
              base: '100%',
              sm: 250,
            }}
            searchable
            label='Contest'
            placeholder='Pick a contest'
            value={contest}
            allowDeselect
            onChange={(v) => {
              if (v === null) {
                navigate('/dashboard/nominees/');
              }
            }}
            onOptionSubmit={(value) => {
              navigate('/dashboard/nominees/' + value);
            }}
            data={selectData(contests, 'name')}
          />
          {contest && (
            <Select
              w={{
                base: '100%',
                sm: 250,
              }}
              searchable
              label='Category'
              placeholder='Pick a category'
              value={category}
              onChange={(v) => {
                if (v === null) {
                  navigate('/dashboard/nominees/' + contest);
                }
              }}
              onOptionSubmit={(value) => {
                navigate('/dashboard/nominees/' + contest + '/' + value);
              }}
              data={selectData(categories, 'award.name')}
            />
          )}
        </ListFilters>
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
        render={({ item }) => <DashboardNomineeCard nominee={item} />}
        emptyState='No nominees were found'
      />
    </DashboardLayout>
  );
}
