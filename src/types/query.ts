export type SortDir = 'asc' | 'desc';

export type InputQuery = {
  sort_dir?: SortDir;
  page: number;
  take?: number;
  search?: string | undefined;
  sort?: string | undefined;
  search_fields?: string[] | undefined;
};

export type InputQueryWithoutPage = Omit<InputQuery, 'page'>;
