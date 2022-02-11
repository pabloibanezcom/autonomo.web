import {
  Category,
  CategoryFilter,
  CategorySearchResult,
  insertParamsInRoute,
  Routes
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchCategoriesRequest = (
  searchFilter: CategoryFilter
): AxiosPromise<CategorySearchResult> => {
  return axios.post(Routes.SEARCH_CATEGORIES, searchFilter);
};

export const addCategoryRequest = (
  category: Category
): AxiosPromise<Category> => {
  return axios.post(Routes.ADD_CATEGORY, category);
};

export const updateCategoryRequest = (
  id: string,
  category: Category
): AxiosPromise<Category> => {
  return axios.put(
    insertParamsInRoute(Routes.UPDATE_CATEGORY, { id }),
    category
  );
};

export const deleteCategoryRequest = (id: string): AxiosPromise<Category> => {
  return axios.delete(insertParamsInRoute(Routes.UPDATE_CATEGORY, { id }));
};
