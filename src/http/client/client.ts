import { Client } from '@autonomo/common';
import axios from '../axios';

export const addClient = (client: Client) => {
  return axios.post('/client', client);
};
