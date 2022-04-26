import { CurrencyAmount } from '@autonomo/common';
import React from 'react';

type CurrencyTextProps = {
  value: CurrencyAmount;
};

const CurrencyText = ({ value }: CurrencyTextProps) => {
  const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: value.currency
  });

  return <span>{currencyFormatter.format(value.amount)}</span>;
};

export default CurrencyText;
