/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfiniteData } from '@tanstack/react-query';
import { SuccessResponseWithPagination } from '../types/server';
import { flatList } from './flat-list';
import { Prisma } from '../types/models';

type FlattenObject<T> = T extends Prisma
  ? {
      [K in keyof T]: T[K] extends object
        ? T[K] extends Array<any>
          ? T[K]
          : FlattenObject<T[K]>
        : T[K];
    } & {
      [K in keyof T as T[K] extends object
        ? T[K] extends Array<any>
          ? never
          : `${string & K}.${keyof T[K] & string}`
        : never]: T[K] extends object ? T[K][keyof T[K]] : never;
    }
  : never;

type FlattenedKeys<T> = keyof FlattenObject<T>;

export function selectData<TModel extends Prisma>(
  data?: InfiniteData<SuccessResponseWithPagination<TModel>, unknown>,
  labelKey: FlattenedKeys<TModel> = 'id' as FlattenedKeys<TModel>,
  valueKey: keyof TModel = 'id'
): { value: string; label: string }[] {
  const result = flatList(data);

  const getLabel = (item: TModel): string => {
    if (typeof labelKey === 'string' && labelKey.includes('.')) {
      const [field, nestedField] = labelKey.split('.') as [keyof TModel, string];
      const fieldValue = item[field];
      if (fieldValue && typeof fieldValue === 'object' && nestedField in fieldValue) {
        return String((fieldValue as any)[nestedField]);
      }
      return '';
    }
    return String(item[labelKey as keyof TModel]);
  };

  return result.map((item) => ({
    label: getLabel(item),
    value: String(item[valueKey]),
  }));
}
