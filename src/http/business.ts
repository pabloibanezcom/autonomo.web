import {
  Business,
  BusinessFilter,
  BusinessSearchResult,
  insertParamsInRoute,
  Routes
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchBusinessesRequest = (
  searchFilter: BusinessFilter
): AxiosPromise<BusinessSearchResult> => {
  return axios.post(Routes.SEARCH_BUSINESSES, searchFilter);
};

export const getBusinessRequest = (id: string): AxiosPromise<Business> => {
  return axios.get(insertParamsInRoute(Routes.GET_BUSINESS, { id }));
};

export const addBusinessRequest = (
  business: Business
): AxiosPromise<Business> => {
  return axios.post(Routes.ADD_BUSINESS, business);
};
