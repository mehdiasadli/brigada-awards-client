import {
  GetNextPageParamFunction,
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { HttpError } from '../resources/HttpError';
import { AnyPaginatedResponse } from '../types/server';

export const useInfinite = <
  TQueryFnData extends AnyPaginatedResponse = AnyPaginatedResponse,
  TData = InfiniteData<TQueryFnData, unknown>,
  TQueryKey extends QueryKey = QueryKey,
>(
  key: TQueryKey,
  options?: Omit<
    UseInfiniteQueryOptions<TQueryFnData, HttpError, TData, TQueryFnData, TQueryKey, number>,
    'initialPageParam' | 'getNextPageParam' | 'queryKey'
  > & {
    initialPageParam?: number;
    getNextPageParam?: GetNextPageParamFunction<number, TQueryFnData>;
  }
) => {
  return useInfiniteQuery({
    queryKey: key,
    initialPageParam: 1,
    getNextPageParam(data) {
      return data.body.meta.next_page;
    },
    ...options,
  });
};
