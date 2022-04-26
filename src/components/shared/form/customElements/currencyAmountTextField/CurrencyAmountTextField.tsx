import { CurrencyAmount } from '@autonomo/common';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from 'material';
import React from 'react';
import { getCurrencySymbol } from 'util/currency';
import BaseElementProps from '../BaseElementProps';

interface CurrencyAmountSelectorProps extends BaseElementProps {
  value: CurrencyAmount;
  label?: string;
  error?: boolean;
  helperText?: string;
  defaultCurrency?: string;
}

const CurrencyAmountTextField = ({
  value,
  label,
  error,
  helperText,
  defaultCurrency = 'EUR',
  onChange
}: CurrencyAmountSelectorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (evt: any) => {
    onChange({
      ...value,
      amount: evt.target.value,
      currency: value?.currency || defaultCurrency
    });
  };

  return (
    <FormControl fullWidth>
      {label && (
        <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
      )}
      <OutlinedInput
        id="outlined-adornment-amount"
        defaultValue={value?.amount}
        error={!!error}
        onChange={handleOnChange}
        label={label}
        startAdornment={
          <InputAdornment position="start">
            {getCurrencySymbol(value?.currency || defaultCurrency)}
          </InputAdornment>
        }
      />
      {!!error && (
        <FormHelperText error id="accountId-error">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CurrencyAmountTextField;
