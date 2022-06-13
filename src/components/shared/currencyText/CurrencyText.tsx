import { CurrencyAmount, getLocaleFromCurrency } from '@autonomo/common';

type CurrencyTextProps = {
  value: CurrencyAmount;
  locale?: string;
};

const CurrencyText = ({ value, locale }: CurrencyTextProps) => {
  const _locale = locale || getLocaleFromCurrency(value.currency);
  const currencyFormatter = new Intl.NumberFormat(_locale, {
    style: 'currency',
    currency: value.currency
  });

  return <span>{currencyFormatter.format(value.amount / 100)}</span>;
};

export default CurrencyText;
