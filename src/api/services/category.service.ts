import {
  TCreateCategoryInput,
  TDeleteCategoryInput,
  TGetCategoryInput,
  TGetCategoriesInput,
} from '../../types/inputs';
import {
  TCreateCategoryResponse,
  TDeleteCategoryResponse,
  TGetCategoryResponse,
  TGetCategoriesResponse,
} from '../../types/responses';
import { convertQuery } from '../../utils/convert-query';
import { create } from '../config';

const api = create('/categories');

export const categoryService = {
  getCategories: async (input: TGetCategoriesInput) =>
    await api.get<TGetCategoriesResponse>('/list' + convertQuery(input.query)),
  getCategory: async (input: TGetCategoryInput) =>
    await api.get<TGetCategoryResponse>('/' + input.id),
  createCategory: async (input: TCreateCategoryInput) =>
    await api.post<TCreateCategoryResponse>('/add', input),
  deleteCategory: async (input: TDeleteCategoryInput) =>
    await api.delete<TDeleteCategoryResponse>('/' + input.id),
};
