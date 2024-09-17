import {
  MutationFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { HttpError } from '../resources/HttpError';
import { ToastOptions, useToast } from './useToast';
import { AnySuccessResponse } from '../types/server';

interface UseMutateOptions<TData extends AnySuccessResponse = AnySuccessResponse, TVariables = void>
  extends Omit<UseMutationOptions<TData, HttpError, TVariables>, 'mutationFn'> {
  toastOptions?: ToastOptions;
  showSuccess?: boolean | string | ((data: TData, vars: TVariables) => boolean | string);
  successToastOptions?: ToastOptions;
  showError?: boolean | string | ((error: HttpError, vars: TVariables) => boolean | string);
  errorToastOptions?: ToastOptions;
  autoRefetch?: QueryKey[] | ((data: TData, vars: TVariables) => QueryKey[]);
}

export const useMutate = <TData extends AnySuccessResponse = AnySuccessResponse, TVariables = void>(
  fn: MutationFunction<TData, TVariables>,
  options?: UseMutateOptions<TData, TVariables>
): UseMutationResult<TData, HttpError, TVariables> => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    showSuccess = true,
    showError = true,
    autoRefetch = [],
    toastOptions,
    errorToastOptions,
    successToastOptions,
    ...rest
  } = options ?? {};

  return useMutation({
    ...rest,
    mutationFn: fn,
    onSuccess(data, variables, context) {
      if (showSuccess !== false) {
        const result = showSuccess instanceof Function ? showSuccess(data, variables) : showSuccess;

        toast.success(typeof result === 'string' ? result : data, {
          ...toastOptions,
          ...successToastOptions,
        });
      }

      options?.onSuccess?.(data, variables, context);

      (autoRefetch instanceof Function ? autoRefetch(data, variables) : autoRefetch).forEach(
        (queryKey) => {
          queryClient.refetchQueries({
            queryKey,
          });
        }
      );
    },
    onError(error, variables, context) {
      if (showError !== false) {
        const result = showError instanceof Function ? showError(error, variables) : showError;

        toast.error(typeof result === 'string' ? result : error, {
          ...toastOptions,
          ...errorToastOptions,
        });
      }

      options?.onError?.(error, variables, context);
    },
  });
};
