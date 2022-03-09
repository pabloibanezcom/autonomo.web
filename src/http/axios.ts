import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.response.use(null, (err) => {
  return Promise.reject(err);
});

if (localStorage.getItem('auth')) {
  instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'auth'
  )}`;
}

export default instance;
