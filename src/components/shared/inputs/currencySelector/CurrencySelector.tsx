/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from 'material';
import { useState } from 'react';
import BaseElementProps from '../BaseElementProps';

const currencies = ['EUR', 'GBP', 'USD'];

interface CurrencySelectorProps extends BaseElementProps {
  label?: string;
}

const CurrencySelector = ({
  label = 'Currency',
  value,
  onChange
}: CurrencySelectorProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value || 'EUR');

  const handleChange = (e: SelectChangeEvent<string>) => {
    setCurrentValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={currentValue} label={label} onChange={handleChange}>
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
