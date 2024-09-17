import { useState } from 'react';
import { SortDir } from '../types/query';
import { useDebouncedValue } from '@mantine/hooks';

type Prisma = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type StringKeys<T> = Extract<keyof T, string>;
type SortingType<TModel extends Prisma> = `${SortDir}-${StringKeys<TModel>}`;

export interface UseListFiltersOptions<TModel extends Prisma> {
  defaultSorting?: SortingType<TModel>;
  defaultSearch?: string;
  debounceWait?: number;
  searchFields?: StringKeys<TModel>[];
}

export const useListFilters = <TModel extends Prisma>(
  options: UseListFiltersOptions<TModel> = {}
) => {
  const {
    searchFields = [],
    debounceWait = 500,
    defaultSearch = '',
    defaultSorting = 'asc-createdAt' as SortingType<TModel>,
  } = options;

  const [sorting, setSorting] = useState<SortingType<TModel>>(defaultSorting);
  const [search, setSearch] = useState(defaultSearch);
  const [debouncedSearch] = useDebouncedValue(search, debounceWait);

  return {
    searchValue: search,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    sorting,
    setSorting: (value: string | null) => {
      if (value !== null) {
        setSorting(value as SortingType<TModel>);
      }
    },
    query: {
      sort: sorting.split('-')[1],
      sort_dir: sorting.split('-')[0] as SortDir,
      search: debouncedSearch,
      search_fields: searchFields,
    },
  };
};
