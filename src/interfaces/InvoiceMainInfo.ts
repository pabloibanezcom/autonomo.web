import { Category, Currency } from '@autonomo/common';

export default interface IncomeMainInfo {
  number?: string;
  issuedDate?: Date;
  baseCurrency?: Currency;
  currencyRate?: number;
  categories?: Category[];
}
