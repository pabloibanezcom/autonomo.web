/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectContentInfo } from 'components/shared';
import { FormDefinition, FormField } from 'interfaces';
import { Alert, Button } from 'material';
import { Fragment, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import regex from 'util/regex';
import {
  CategoriesSelector,
  CurrencyAmountTextField,
  CurrencySelector,
  DateSelector,
  TextField,
  VatSelector
} from './customElements';

type FormProps = {
  formDefinition: FormDefinition;
  values?: any;
  error?: string;
  submitOnChange?: boolean;
  objectInfo?: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
};

const Form = ({
  formDefinition: { fields, submitButton, cancelButton },
  values = {},
  error,
  submitOnChange,
  objectInfo,
  onSubmit,
  onCancel
}: FormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({ defaultValues: values });

  useEffect(() => {
    Object.entries(values).forEach(([name, val]) => {
      setValue(name, val);
    });
  }, [setValue, values]);

  const renderElement = (field: FormField, val: any, onChange: any) => {
    if (field.element === 'date') {
      return (
        <DateSelector
          label={field.label}
          error={!!errors[field.name]}
          className={field.gridColumn ? `grid-column-${field.gridColumn}` : ''}
          helperText={errors[field.name] && `${field.label} is required`}
          value={val || values[field.name]}
          onChange={onChange}
          {...field.elementProps}
        />
      );
    }
    if (field.element === 'categories') {
      return (
        <CategoriesSelector
          value={val || values[field.name]}
          onChange={onChange}
          className={field.gridColumn ? `grid-column-${field.gridColumn}` : ''}
        />
      );
    }
    if (field.element === 'currency') {
      return (
        <CurrencySelector
          value={val || values[field.name]}
          onChange={onChange}
          className={field.gridColumn ? `grid-column-${field.gridColumn}` : ''}
          {...field.elementProps}
        />
      );
    }
    if (field.element === 'currencyAmount') {
      return (
        <CurrencyAmountTextField
          value={val || values[field.name]}
          label={field.label}
          className={field.gridColumn ? `grid-column-${field.gridColumn}` : ''}
          error={!!errors[field.name]}
          helperText={errors[field.name] && `${field.label} is required`}
          onChange={onChange}
          {...field.elementProps}
        />
      );
    }
    if (field.element === 'vat') {
      return (
        <VatSelector
          value={val}
          onChange={onChange}
          className={field.gridColumn ? `grid-column-${field.gridColumn}` : ''}
          {...field.elementProps}
        />
      );
    }
    return (
      <TextField
        value={val || values[field.name]}
        onChange={onChange}
        className={field.gridColumn ? `grid-column-${field.gridColumn}` : ''}
        label={field.label}
        type={field.type}
        name={field.name}
        error={!!errors[field.name]}
        helperText={errors[field.name] && `${field.label} is required`}
        {...field.elementProps}
      />
    );
  };

  const renderFormField = (field: FormField): JSX.Element => (
    <Controller
      key={field.name}
      name={field.name}
      control={control}
      rules={{
        required: field.required,
        pattern: field.pattern
          ? {
              value: regex[field.pattern.regex],
              message: field.pattern.message
            }
          : undefined
      }}
      render={({ field: { onChange, value } }) => {
        const handleOnChange = (e: any) => {
          onChange(e);
          if (submitOnChange) {
            handleSubmit(onSubmit)();
          }
        };
        return renderElement(field, value, handleOnChange);
      }}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && <Alert severity="error">{error}</Alert>}
      <div className="grid-fill-xs grid-mb">
        {fields.map((field) => (
          <Fragment key={field.name}>{renderFormField(field)}</Fragment>
        ))}
      </div>
      {!submitOnChange && (submitButton || cancelButton) && (
        <div className="d-flex flex-row-reverse">
          {submitButton && (
            <Button
              type="submit"
              fullWidth={submitButton.fullWidth}
              variant={submitButton.variant || 'contained'}
            >
              {submitButton.text}
            </Button>
          )}
          {cancelButton && (
            <Button
              fullWidth={submitButton.fullWidth}
              variant={submitButton.variant || 'outlined'}
              color="error"
              className="me-4"
              onClick={onCancel}
            >
              {cancelButton.text}
            </Button>
          )}
        </div>
      )}
      {objectInfo && <ObjectContentInfo obj={watch()} />}
    </form>
  );
};

export default Form;
