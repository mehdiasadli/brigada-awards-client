/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryDto, QueryDtoOptions } from '../dtos/query.dto';
import { InputQuery } from '../types/query';

function keyIsPaginationKey(key: any): key is keyof InputQuery {
  const paginationsQueryKeys: (keyof InputQuery)[] = [
    'page',
    'search',
    'search_fields',
    'sort',
    'sort_dir',
    'take',
  ];

  return paginationsQueryKeys.includes(key);
}

const getPaginationQueryKeys = (query: Record<string, any>) => {
  const pagination: Partial<InputQuery> = {};
  const filters: Record<string, any> = {};

  for (const [key, value] of Object.entries(query)) {
    if (keyIsPaginationKey(key)) {
      pagination[key] = value;
    } else {
      filters[key] = value;
    }
  }

  return {
    pagination,
    filters,
  };
};

export const convertQuery = (
  query: {
    [k in keyof InputQuery | (string & {})]?: any;
  },
  options: QueryDtoOptions = {}
) => {
  const { pagination, filters } = getPaginationQueryKeys(query);

  const result = queryDto(options).safeParse(pagination);
  const output: string[] = [];

  if (!result.error) {
    for (const [key, value] of Object.entries(result.data)) {
      if (value !== undefined) {
        output.push(`${key}=${value}`);
      }
    }
  }

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      output.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return '?' + output.join('&');
};
