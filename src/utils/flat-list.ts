import { InfiniteData } from '@tanstack/react-query';
import { SuccessResponseWithPagination } from '../types/server';
import { Prisma } from '../types/models';

export function flatList<TModel extends Prisma>(
  data?: InfiniteData<SuccessResponseWithPagination<TModel>, unknown>
) {
  if (!data) {
    return [] as TModel[];
  }

  const result = data.pages.map((page) => page.body.items).flat();
  return result;
}
