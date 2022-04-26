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
  businessId: string,
  searchFilter: CategoryFilter
): AxiosPromise<CategorySearchResult> => {
  return axios.post(
    insertParamsInRoute(Routes.SEARCH_CATEGORIES, { businessId }),
    searchFilter
  );
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
