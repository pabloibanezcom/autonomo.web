/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormDefinition, FormField } from 'interfaces';
import { Alert, Button, Grid, TextField } from 'material';
import React, { Fragment, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import regex from 'util/regex';
import {
  CategoriesSelector,
  CurrencyAmountTextField,
  CurrencySelector,
  DateSelector,
  VatSelector
} from './customElements';
import styles from './form.module.scss';

const controllerElements: string[] = [
  'categories',
  'currency',
  'currencyAmount',
  'date',
  'vat'
];

type FormProps = {
  formDefinition: FormDefinition;
  defaultValues?: any;
  values?: any;
  extraFields?: FormField[];
  error?: string;
  onSubmit?: (data: any) => void;
  onFieldChange?: (fieldName: string, value: any) => void;
  onCancel?: () => void;
};

const Form = ({
  formDefinition: { fields, submitButton, cancelButton, direction },
  defaultValues = {},
  values = {},
  extraFields = [],
  error,
  onSubmit,
  onFieldChange,
  onCancel
}: FormProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues });

  useEffect(() => {
    Object.entries(values).forEach(([name, value]) => {
      setValue(name, value);
    });
  }, [setValue, values]);

  const mergeFormFields = (
    baseFields: FormField[],
    xtraFields: FormField[]
  ): FormField[] => {
    const result = [...baseFields];

    const addXtraField = (xField: FormField) => {
      result.splice(
        result.findIndex((f) => f.name === xField.setAfter) + 1,
        0,
        xField
      );
    };

    xtraFields.forEach((xField) => addXtraField(xField));
    return result;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit(data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderElement = (field: FormField, value: any, onChange: any) => {
    if (field.element === 'date') {
      return (
        <DateSelector
          label={field.label}
          error={!!errors[field.name]}
          helperText={errors[field.name] && `${field.label} is required`}
          value={value || defaultValues[field.name]}
          onChange={onChange}
          {...field.elementProps}
        />
      );
    }
    if (field.element === 'categories') {
      return (
        <CategoriesSelector
          value={value || defaultValues[field.name]}
          onChange={onChange}
        />
      );
    }
    if (field.element === 'currency') {
      return (
        <CurrencySelector
          value={value || defaultValues[field.name]}
          onChange={onChange}
          {...field.elementProps}
        />
      );
    }
    if (field.element === 'currencyAmount') {
      return (
        <CurrencyAmountTextField
          value={value || defaultValues[field.name]}
          label={field.label}
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
          value={value}
          onChange={onChange}
          {...field.elementProps}
        />
      );
    }
    return null;
  };

  const renderController = (field: FormField): JSX.Element => (
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
          if (field.listenOnChange && !e?.target?.value) {
            onFieldChange(field.name, e);
          }
        };
        return renderElement(field, value, handleOnChange);
      }}
    />
  );

  const renderFormField = (field: FormField): JSX.Element => {
    if (controllerElements.includes(field.element)) {
      return renderController(field);
    }
    if (!field.element) {
      return (
        <TextField
          key={field.name}
          type={field.type}
          fullWidth
          label={field.label}
          error={!!errors[field.name]}
          helperText={errors[field.name] && `${field.label} is required`}
          {...register(field.name, {
            required: field.required,
            pattern: field.pattern
              ? {
                  value: regex[field.pattern.regex],
                  message: field.pattern.message
                }
              : undefined,
            onChange: field.listenOnChange
              ? (e) => onFieldChange(field.name, e?.target?.value)
              : null,
            value: field.value
          })}
        />
      );
    }
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={[
        styles.form,
        direction === 'horizontal' ? styles.formHorizontal : styles.formVertical
      ].join(' ')}
      noValidate
    >
      <Grid container spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        {mergeFormFields(fields, extraFields).map((field) => (
          <Fragment key={field.name}>
            <Grid item xs={field.gridSize || 12}>
              {renderFormField(field)}
            </Grid>
            {field.offset && <Grid item xs={field.offset} />}
          </Fragment>
        ))}
        {(submitButton || cancelButton) && (
          <Grid container item xs={12}>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default Form;
