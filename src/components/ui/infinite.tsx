import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { SuccessResponse } from '../../types/server';
import { HttpError } from '../../resources/HttpError';
import {
  AlertProps,
  Center,
  CenterProps,
  LoaderProps,
  SimpleGrid,
  SimpleGridProps,
  Text,
  TextProps,
} from '@mantine/core';
import { useStatus } from '../../hooks/useStatus';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';

type FetchFn<T> = (
  options?: FetchNextPageOptions
) => Promise<
  InfiniteQueryObserverResult<InfiniteData<SuccessResponse<T, true>, unknown>, HttpError>
>;

export interface InfiniteProps<T extends { id: string }> {
  data?: InfiniteData<SuccessResponse<T, true>, unknown> | undefined;
  containerProps?: SimpleGridProps;
  hasNext?: boolean;
  fetchNext: FetchFn<T>;
  loadingProps?: LoaderProps;
  statusContainerProps?: CenterProps;
  loaderProps?: LoaderProps;
  LoadingComponent?: JSX.Element;
  ErrorComponent?: JSX.Element;
  error?: HttpError | null;
  refetch?: () => void;
  errorProps?: AlertProps;
  status?: 'pending' | 'success' | 'error';
  inverse?: boolean;
  style?: React.CSSProperties | undefined;
  gap?: number;
  py?: number;
  px?: number;
  dir?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  render: React.FC<{ item: T; index: number }>;
  emptyState?: string | JSX.Element;
  emptyStateProps?: TextProps;
  emptyStateContainerProps?: CenterProps;
}

export default function Infinite<T extends { id: string }>({
  fetchNext,
  data,
  dir = 'column',
  gap = 10,
  hasNext,
  inverse = false,
  px = 0,
  py = 10,
  status = 'pending',
  style,
  render,
  statusContainerProps,
  loaderProps,
  LoadingComponent,
  ErrorComponent,
  error,
  refetch,
  containerProps,
  emptyState,
  emptyStateProps,
  emptyStateContainerProps,
}: InfiniteProps<T>) {
  const result = data?.pages.map((page) => page.body.items)?.flat();
  const { Component, Loader } = useStatus(status, {
    refetch,
    containerProps: statusContainerProps,
    loaderProps,
    LoadingComponent,
    ErrorComponent,
    error,
  });

  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: dir,
    gap: gap,
    paddingBlock: py,
    paddingInline: px,
    ...style,
  };

  const length = result?.length ?? 0;

  return (
    Component ??
    (length === 0 ? (
      typeof emptyState !== 'string' ? (
        emptyState
      ) : (
        <Center {...emptyStateContainerProps}>
          <Text fw='bold' {...emptyStateProps}>
            {emptyState}
          </Text>
        </Center>
      )
    ) : (
      <InfiniteScroll
        style={styles}
        dataLength={length}
        hasMore={hasNext ?? false}
        next={fetchNext}
        scrollThreshold={'50%'}
        inverse={inverse}
        loader={Loader}
      >
        <SimpleGrid
          cols={{
            xl: 5,
            lg: 4,
            md: 3,
            sm: 2,
            xs: 1,
          }}
          {...containerProps}
        >
          {result?.map((item, i) => (
            <React.Fragment key={item.id}>{render({ item, index: i })}</React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    ))
  );
}
