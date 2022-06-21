import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import esLocale from 'date-fns/locale/es';
import { DatePicker, TextField } from 'material';
import { useEffect } from 'react';
import BaseElementProps from '../BaseElementProps';

interface DateSelectorProps extends BaseElementProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  todayAsDefaultValue?: boolean;
}

const DateSelector = ({
  label,
  error,
  className,
  helperText,
  todayAsDefaultValue,
  value,
  onChange
}: DateSelectorProps) => {
  const handleOnChange = (date: Date) => {
    onChange(new Date(date.toDateString()));
  };

  useEffect(() => {
    if (!value && todayAsDefaultValue) {
      handleOnChange(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayAsDefaultValue]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={esLocale}
      className={className}
    >
      <DatePicker
        label={label}
        value={value || (todayAsDefaultValue ? new Date() : null)}
        onChange={handleOnChange}
        renderInput={({ ...params }) => (
          <TextField
            fullWidth
            helperText={helperText}
            {...{
              ...params,
              error,
              inputProps: {
                ...params.inputProps,
                readOnly: true
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
