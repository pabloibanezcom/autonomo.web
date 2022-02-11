import { insertParamsInRoute, Routes, YearReport } from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const getYearReportRequest = (id: string): AxiosPromise<YearReport> => {
  return axios.get(insertParamsInRoute(Routes.GET_YEAR_REPORT, { id }));
};
