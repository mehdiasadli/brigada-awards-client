import { Group, GroupProps, Select, SelectProps, TextInput, TextInputProps } from '@mantine/core';
import { useListFilters } from '../../hooks/useListFilters';
import { SortDir } from '../../types/query';

type Prisma = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type StringKeys<T> = Extract<keyof T, string>;
type SortingType<TModel extends Prisma> = `${SortDir}-${StringKeys<TModel>}`;
type SortingDataArray<TModel extends Prisma> = Array<{ label: string; value: SortingType<TModel> }>;

interface ListFiltersProps<TModel extends Prisma> extends GroupProps {
  filters: Omit<ReturnType<typeof useListFilters<TModel>>, 'query'>;
  selectProps?: SelectProps;
  searchProps?: TextInputProps;
  sortingData?: SortingDataArray<TModel>;
  withSorting?: boolean;
  withSearching?: boolean;
}

export default function ListFilters<TModel extends Prisma>({
  filters: { searchValue, setSearch, setSorting, sorting },
  selectProps,
  searchProps,
  sortingData,
  children,
  withSorting = true,
  withSearching = true,
  ...props
}: ListFiltersProps<TModel>) {
  return withSearching || withSorting || !!children ? (
    <Group {...props}>
      {withSorting && (
        <Select
          w={{
            base: '100%',
            sm: 200,
            md: 250,
            lg: 300,
            xl: 400,
          }}
          label='Sıralama'
          clearable={false}
          onChange={setSorting}
          value={sorting}
          data={
            sortingData ?? [
              { label: 'Köhnədən yeniyə', value: 'asc-createdAt' },
              { label: 'Yenidən köhnəyə', value: 'desc-createdAt' },
            ]
          }
          allowDeselect={false}
          {...selectProps}
        />
      )}
      {withSearching && (
        <TextInput
          w={{
            base: '100%',
            sm: 250,
            md: 300,
            lg: 350,
            xl: 400,
          }}
          label='Axtar'
          placeholder='Ad və ya istifadəçi adı ilə axtarış edin'
          value={searchValue}
          onChange={setSearch}
          {...searchProps}
        />
      )}
      {children}
    </Group>
  ) : null;
}
