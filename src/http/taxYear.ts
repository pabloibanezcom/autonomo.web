import {
  insertParamsInRoute,
  Routes,
  TaxYear,
  TaxYearFilter,
  TaxYearSearchResult
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchTaxYearsRequest = (
  searchFilter: TaxYearFilter
): AxiosPromise<TaxYearSearchResult> => {
  return axios.post(Routes.SEARCH_TAX_YEARS, searchFilter);
};

export const getTaxYearRequest = (id: string): AxiosPromise<TaxYear> => {
  return axios.get(insertParamsInRoute(Routes.GET_TAX_YEAR, { id }));
};

export const getBusinessTaxYearRequest = (
  businessId: string
): AxiosPromise<TaxYear> => {
  return axios.get(
    insertParamsInRoute(Routes.GET_BUSINESS_TAX_YEAR, { businessId })
  );
};

export const addTaxYearRequest = (taxYear: TaxYear): AxiosPromise<TaxYear> => {
  return axios.post(Routes.ADD_TAX_YEAR, taxYear);
};

export const updateTaxYearRequest = (
  id: string,
  taxYear: TaxYear
): AxiosPromise<TaxYear> => {
  return axios.put(
    insertParamsInRoute(Routes.UPDATE_TAX_YEAR, { id }),
    taxYear
  );
};

export const deleteTaxYearRequest = (id: string): AxiosPromise<TaxYear> => {
  return axios.delete(insertParamsInRoute(Routes.DELETE_TAX_YEAR, { id }));
};
