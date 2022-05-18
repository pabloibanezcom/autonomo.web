import { TextField as MaterialTextField } from 'material';
import React, { useState } from 'react';
import BaseElementProps from '../BaseElementProps';

type TextFieldProps = BaseElementProps;

const TextField = ({
  value,
  onChange,
  label,
  name,
  error,
  helperText
}: TextFieldProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleFocusLost = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <MaterialTextField
      label={label}
      name={name}
      value={currentValue}
      onChange={handleChange}
      onBlur={handleFocusLost}
      error={error}
      helperText={helperText}
      fullWidth
    />
  );
};

export default TextField;
