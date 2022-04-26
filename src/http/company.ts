import {
  Company,
  CompanyFilter,
  CompanySearchResult,
  insertParamsInRoute,
  Routes
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchCompaniesRequest = (
  businessId: string,
  searchFilter: CompanyFilter
): AxiosPromise<CompanySearchResult> => {
  return axios.post(
    insertParamsInRoute(Routes.SEARCH_COMPANIES, { businessId }),
    searchFilter
  );
};

export const getCompanyRequest = (id: string): AxiosPromise<Company> => {
  return axios.get(insertParamsInRoute(Routes.GET_COMPANY, { id }));
};

export const addCompanyRequest = (company: Company): AxiosPromise<Company> => {
  return axios.post(Routes.ADD_COMPANY, company);
};

export const updateCompanyRequest = (
  id: string,
  company: Company
): AxiosPromise<Company> => {
  return axios.put(insertParamsInRoute(Routes.UPDATE_COMPANY, { id }), company);
};

export const deleteCompanyRequest = (id: string): AxiosPromise<Company> => {
  return axios.delete(insertParamsInRoute(Routes.DELETE_COMPANY, { id }));
};
