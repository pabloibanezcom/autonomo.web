import { Currency, ExchangeRate } from '@autonomo/common';

export const getCurrencySymbol = (currency: string): string => {
  return (0)
    .toLocaleString('en-GB', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    .replace(/\d/g, '')
    .trim();
};

const getExternalExchangeRate = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currencyFrom: Currency,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currencyTo: Currency
): number => {
  return 1.34;
};

export const getExchangeRate = (
  exchangeRates: ExchangeRate[] = [],
  currencyFrom: Currency,
  currencyTo: Currency
): number => {
  return (
    exchangeRates.find(
      (r) => r.currencyFrom === currencyFrom && r.currencyTo === currencyTo
    )?.rate || getExternalExchangeRate(currencyFrom, currencyTo)
  );
};
