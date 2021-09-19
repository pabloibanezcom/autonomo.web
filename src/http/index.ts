import { addClient } from './client/client';
import { addInvoice, getInvoices } from './invoice/invoice';
import { getUser } from './user/user';

export default {
  client: {
    addClient
  },
  invoice: {
    addInvoice,
    getInvoices
  },
  user: {
    getUser
  }
};
