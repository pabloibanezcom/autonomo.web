import {
  Income,
  IncomeFilter,
  IncomeSearchResult,
  insertParamsInRoute,
  Routes
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchIncomesRequest = (
  businessId: string,
  searchFilter: IncomeFilter
): AxiosPromise<IncomeSearchResult> => {
  return axios.post(
    insertParamsInRoute(Routes.SEARCH_INCOMES, { businessId }),
    searchFilter
  );
};

export const getIncomeRequest = (
  businessId: string,
  id: string
): AxiosPromise<Income> => {
  return axios.get(insertParamsInRoute(Routes.GET_INCOME, { businessId, id }));
};

export const addIncomeRequest = (
  businessId: string,
  income: Income
): AxiosPromise<Income> => {
  return axios.post(
    insertParamsInRoute(Routes.ADD_INCOME, { businessId }),
    income
  );
};

export const updateIncomeRequest = (
  businessId: string,
  income: Income
): AxiosPromise<Income> => {
  return axios.put(
    insertParamsInRoute(Routes.UPDATE_INCOME, { businessId, id: income._id }),
    income
  );
};

export const deleteIncomeRequest = (
  businessId: string,
  id: string
): AxiosPromise<Income> => {
  return axios.delete(
    insertParamsInRoute(Routes.DELETE_INCOME, { businessId, id })
  );
};
