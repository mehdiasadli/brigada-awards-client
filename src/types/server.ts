/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError } from '../resources/HttpError';

export type Id = { id: string }

export type PaginationMeta = {
  page: number;
  take: number;
  skip: number;
  total_pages: number;
  total_items: number;
  is_last_page: boolean;
  has_next_page: boolean;
  next_page: number | null;
};

export type SuccessResponseCommon = {
  message: string;
  status: number;
};

export type SuccessResponseBodyWithoutPagination<T> = {
  body: T;
};

export type SuccessResponseBodyWithPagination<T> = {
  body: {
    items: T[];
    meta: PaginationMeta;
  };
};

export type SuccessResponseWithoutPagination<T> = SuccessResponseCommon &
  SuccessResponseBodyWithoutPagination<T>;

export type SuccessResponseWithPagination<T> = SuccessResponseCommon &
  SuccessResponseBodyWithPagination<T>;

export type SuccessResponse<T, P extends boolean = false> = P extends true
  ? SuccessResponseWithPagination<T>
  : SuccessResponseWithoutPagination<T>;

export type ErrorResponse = ReturnType<HttpError['json']>;
export type AnySuccessResponse = SuccessResponseCommon & {
  body: any;
};
export type AnyPaginatedResponse = SuccessResponseCommon & {
  body: {
    items: any[];
    meta: PaginationMeta;
  };
};
