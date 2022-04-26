import { Category, Currency } from '@autonomo/common';

export default interface InvoiceMainInfo {
  number?: string;
  issuedDate?: Date;
  baseCurrency?: Currency;
  currencyRate?: number;
  categories?: Category[];
}
