import axios from './axios';

export const getAuthToken = (): string => {
  return localStorage.getItem('auth');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth', token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('auth');
  delete axios.defaults.headers.common.Authorization;
};
