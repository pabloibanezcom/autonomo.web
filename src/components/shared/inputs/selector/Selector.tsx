/* eslint-disable @typescript-eslint/no-explicit-any */
import { IntlTypography } from 'components/shared';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from 'material';
import { useState } from 'react';

type SelectorProps = {
  name?: string;
  label: string;
  items: {
    label: any;
    value: any;
  }[];
  value?: unknown;
  onChange?: (val: any) => void;
};

const Selector = ({ name, label, items, value, onChange }: SelectorProps) => {
  const [currentValue, setCurrentValue] = useState<unknown>(
    value || items[0].value
  );

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    setCurrentValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const renderLabel = (_label: any) => {
    if (_label.includes && _label.includes('.')) {
      return <IntlTypography id={_label} />;
    }
    return _label;
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel>{renderLabel(label)}</InputLabel>
      <Select
        value={currentValue}
        label={renderLabel(label)}
        name={name}
        onChange={handleChange}
      >
        {items.map((item, i) => (
          <MenuItem key={i} value={item.value}>
            {renderLabel(item.label)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
