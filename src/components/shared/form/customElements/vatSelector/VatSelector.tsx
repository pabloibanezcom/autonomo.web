/* eslint-disable react-hooks/exhaustive-deps */
import { TaxYear } from '@autonomo/common';
import { FormControl, InputLabel, MenuItem, Select } from 'material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTaxYear } from 'store';
import BaseElementProps from '../BaseElementProps';

interface VatSelectorProps extends BaseElementProps {
  label?: string;
}

const VatSelector = ({
  label = 'VAT',
  value,
  className,
  onChange
}: VatSelectorProps) => {
  const taxYear: TaxYear = useSelector(selectTaxYear);

  const getDefaultVatBand = taxYear.vatBands[taxYear.vatBands.length - 1];

  const buildValue = () => {
    return value !== undefined ? value : getDefaultVatBand;
  };

  useEffect(() => {
    onChange(buildValue());
  }, [value]);

  return (
    <FormControl className={className} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={buildValue()} label={label} onChange={onChange}>
        {taxYear.vatBands.map((vatBand) => (
          <MenuItem key={vatBand} value={vatBand}>
            {vatBand}%
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VatSelector;
