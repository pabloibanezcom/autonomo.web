import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.response.use(null, (err) => {
  if (axios.isAxiosError(err) && err.response.status === 401) {
    history.replace('login');
  }
  return Promise.reject(err);
});

if (localStorage.getItem('auth')) {
  instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'auth'
  )}`;
}

export default instance;
