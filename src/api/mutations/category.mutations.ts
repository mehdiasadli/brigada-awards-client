import { useMutate } from '../../hooks/useMutate';
import { categoryKeys } from '../queries/keys';
import { categoryService } from '../services/category.service';

export const useDeleteCategory = () => {
  return useMutate(categoryService.deleteCategory, {
    autoRefetch: [categoryKeys.list()],
  });
};

export const useCreateCategory = () => {
  return useMutate(categoryService.createCategory, {
    autoRefetch: [categoryKeys.list()],
  });
};
