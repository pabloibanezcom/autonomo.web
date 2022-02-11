import {
  insertParamsInRoute,
  NationalInsurancePayment,
  NationalInsurancePaymentFilter,
  NationalInsurancePaymentSearchResult,
  Routes
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const searchNationalInsurancePaymentsRequest = (
  searchFilter: NationalInsurancePaymentFilter
): AxiosPromise<NationalInsurancePaymentSearchResult> => {
  return axios.post(Routes.SEARCH_NATIONAL_INSURANCE_PAYMENTS, searchFilter);
};

export const getNationalInsurancePaymentRequest = (
  id: string
): AxiosPromise<NationalInsurancePayment> => {
  return axios.get(
    insertParamsInRoute(Routes.GET_NATIONAL_INSURANCE_PAYMENT, { id })
  );
};

export const addNationalInsurancePaymentRequest = (
  nationalInsurancePayment: NationalInsurancePayment
): AxiosPromise<NationalInsurancePayment> => {
  return axios.post(
    Routes.ADD_NATIONAL_INSURANCE_PAYMENT,
    nationalInsurancePayment
  );
};

export const updateNationalInsurancePaymentRequest = (
  id: string,
  nationalInsurancePayment: NationalInsurancePayment
): AxiosPromise<NationalInsurancePayment> => {
  return axios.put(
    insertParamsInRoute(Routes.UPDATE_NATIONAL_INSURANCE_PAYMENT, { id }),
    nationalInsurancePayment
  );
};

export const deleteNationalInsurancePaymentRequest = (
  id: string
): AxiosPromise<NationalInsurancePayment> => {
  return axios.delete(
    insertParamsInRoute(Routes.DELETE_NATIONAL_INSURANCE_PAYMENT, { id })
  );
};
