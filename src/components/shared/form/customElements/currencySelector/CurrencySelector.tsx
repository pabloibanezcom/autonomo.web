/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, InputLabel, MenuItem, Select } from 'material';
import React, { useEffect } from 'react';
import BaseElementProps from '../BaseElementProps';

const currencies = ['EUR', 'GBP', 'USD'];
const DEFAULT_CURRENCY = 'EUR';

interface CurrencySelectorProps extends BaseElementProps {
  label?: string;
}

const CurrencySelector = ({
  label = 'Currency',
  value,
  onChange
}: CurrencySelectorProps) => {
  useEffect(() => {
    onChange(value || DEFAULT_CURRENCY);
  }, [value]);

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || DEFAULT_CURRENCY}
        label={label}
        onChange={onChange}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
