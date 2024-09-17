import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HttpError } from '../resources/HttpError';
import { AnySuccessResponse } from '../types/server';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UseFetchOptions<
  TQueryFnData extends AnySuccessResponse = AnySuccessResponse,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends Omit<UseQueryOptions<TQueryFnData, HttpError, TData, TQueryKey>, 'queryKey'> {}

export const useFetch = <
  TQueryFnData extends AnySuccessResponse = AnySuccessResponse,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  key: TQueryKey,
  options: UseFetchOptions<TQueryFnData, TData, TQueryKey>
) => {
  return useQuery({
    queryKey: key,
    ...options,
  });
};
