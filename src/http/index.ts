import { addInvoice, getInvoices } from './invoice/invoice';
import { getUser } from './user/user';

export default {
  invoice: {
    addInvoice,
    getInvoices
  },
  user: {
    getUser
  }
};
