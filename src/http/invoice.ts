import {
  insertParamsInRoute,
  Invoice,
  InvoiceFilter,
  InvoiceSearchResult,
  Routes
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchInvoicesRequest = (
  searchFilter: InvoiceFilter
): AxiosPromise<InvoiceSearchResult> => {
  return axios.post(Routes.SEARCH_INVOICES, searchFilter);
};

export const getInvoiceRequest = (id: string): AxiosPromise<Invoice> => {
  return axios.get(insertParamsInRoute(Routes.GET_INVOICE, { id }));
};

export const addInvoiceRequest = (invoice: Invoice): AxiosPromise<Invoice> => {
  return axios.post(Routes.ADD_INVOICE, invoice);
};

export const updateInvoiceRequest = (
  id: string,
  invoice: Invoice
): AxiosPromise<Invoice> => {
  return axios.put(insertParamsInRoute(Routes.UPDATE_INVOICE, { id }), invoice);
};

export const deleteInvoiceRequest = (id: string): AxiosPromise<Invoice> => {
  return axios.delete(insertParamsInRoute(Routes.DELETE_INVOICE, { id }));
};
