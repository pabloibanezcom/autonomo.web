import {
  insertParamsInRoute,
  Routes,
  TaxPayment,
  TaxPaymentFilter,
  TaxPaymentSearchResult
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchTaxPaymentsRequest = (
  searchFilter: TaxPaymentFilter
): AxiosPromise<TaxPaymentSearchResult> => {
  return axios.post(Routes.SEARCH_TAX_PAYMENTS, searchFilter);
};

export const getTaxPaymentRequest = (id: string): AxiosPromise<TaxPayment> => {
  return axios.get(insertParamsInRoute(Routes.GET_TAX_PAYMENT, { id }));
};

export const addTaxPaymentRequest = (
  taxPayment: TaxPayment
): AxiosPromise<TaxPayment> => {
  return axios.post(Routes.ADD_TAX_PAYMENT, taxPayment);
};

export const updateTaxPaymentRequest = (
  id: string,
  taxPayment: TaxPayment
): AxiosPromise<TaxPayment> => {
  return axios.put(
    insertParamsInRoute(Routes.UPDATE_TAX_PAYMENT, { id }),
    taxPayment
  );
};

export const deleteTaxPaymentRequest = (
  id: string
): AxiosPromise<TaxPayment> => {
  return axios.delete(insertParamsInRoute(Routes.DELETE_TAX_PAYMENT, { id }));
};
