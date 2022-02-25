import {
  ChangePasswordData,
  LoginData,
  LoginResponse,
  RegisterData,
  Routes,
  User
} from '@autonomo/common';
import { AxiosPromise } from 'axios';
import axios from './axios';

export const loginRequest = (
  loginData: LoginData
): AxiosPromise<LoginResponse> => {
  return axios.post(Routes.LOGIN, loginData);
};

export const registerRequest = (
  registerData: RegisterData
): AxiosPromise<boolean> => {
  return axios.post(Routes.REGISTER, registerData);
};

export const changePasswordRequest = (
  changePasswordData: ChangePasswordData
): AxiosPromise<boolean> => {
  return axios.post(Routes.CHANGE_PASSWORD, changePasswordData);
};

export const getUserRequest = (): AxiosPromise<User> => {
  return axios.get(Routes.GET_USER);
};
