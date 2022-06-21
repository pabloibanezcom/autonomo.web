/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from 'material';
import { CancelIcon } from 'material/icons';
import React, { useState } from 'react';
import BaseElementProps from '../BaseElementProps';

interface TextFieldProps extends BaseElementProps {
  label?: any;
  type?: string;
  clearButton?: boolean;
  hanleOnChangeOnFocus?: boolean;
}

const TextField = ({
  value,
  onChange,
  label,
  type,
  name,
  className,
  error,
  helperText,
  fullWidth = true,
  clearButton,
  hanleOnChangeOnFocus
}: TextFieldProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    onChange(e.target.value);
  };

  const handleFocusLost = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    setCurrentValue('');
    onChange('');
  };

  const clearButtonAdorment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="clear"
        edge="end"
        size="small"
        disabled={!currentValue.length}
        onClick={handleClear}
      >
        <CancelIcon fontSize="small" />
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        className={className}
        label={label}
        name={name}
        type={type}
        value={currentValue}
        onChange={handleChange}
        onBlur={hanleOnChangeOnFocus ? handleFocusLost : null}
        error={error}
        fullWidth={fullWidth}
        endAdornment={clearButton && clearButtonAdorment}
      />
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextField;
