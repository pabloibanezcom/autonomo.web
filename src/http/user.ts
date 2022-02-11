import { Routes, User } from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const getUserRequest = (): AxiosPromise<User> => {
  return axios.get(Routes.GET_USER);
};
