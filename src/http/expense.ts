import {
  Expense,
  ExpenseFilter,
  ExpenseSearchResult,
  insertParamsInRoute,
  Routes
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchExpensesRequest = (
  businessId: string,
  searchFilter: ExpenseFilter
): AxiosPromise<ExpenseSearchResult> => {
  return axios.post(
    insertParamsInRoute(Routes.SEARCH_INCOMES, { businessId }),
    searchFilter
  );
};

export const getExpenseRequest = (
  businessId: string,
  id: string
): AxiosPromise<Expense> => {
  return axios.get(insertParamsInRoute(Routes.GET_INCOME, { businessId, id }));
};

export const addExpenseRequest = (
  businessId: string,
  expense: Expense
): AxiosPromise<Expense> => {
  return axios.post(
    insertParamsInRoute(Routes.ADD_INCOME, { businessId }),
    expense
  );
};

export const updateExpenseRequest = (
  id: string,
  expense: Expense
): AxiosPromise<Expense> => {
  return axios.put(insertParamsInRoute(Routes.UPDATE_INCOME, { id }), expense);
};

export const deleteExpenseRequest = (id: string): AxiosPromise<Expense> => {
  return axios.delete(insertParamsInRoute(Routes.DELETE_INCOME, { id }));
};
