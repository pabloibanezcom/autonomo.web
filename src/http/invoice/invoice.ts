import { Invoice } from '@autonomo/common';
import axios from '../axios';

export const getInvoices = () => {
  return axios.get('/invoice');
};

export const addInvoice = (invoice: Invoice) => {
  return axios.post('/invoice', invoice);
};
