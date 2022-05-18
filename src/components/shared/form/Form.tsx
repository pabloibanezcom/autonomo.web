/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectContentInfo } from 'components/shared';
import { FormDefinition, FormField } from 'interfaces';
import { Alert, Button, Grid } from 'material';
import React, { Fragment, useEffect } from 'react';
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
import styles from './form.module.scss';

type FormProps = {
  formDefinition: FormDefinition;
  values?: any;
  error?: string;
  submitOnChange?: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
};

const Form = ({
  formDefinition: { fields, submitButton, cancelButton, direction },
  values = {},
  error,
  submitOnChange,
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
        />
      );
    }
    if (field.element === 'currency') {
      return (
        <CurrencySelector
          value={val || values[field.name]}
          onChange={onChange}
          {...field.elementProps}
        />
      );
    }
    if (field.element === 'currencyAmount') {
      return (
        <CurrencyAmountTextField
          value={val || values[field.name]}
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
        <VatSelector value={val} onChange={onChange} {...field.elementProps} />
      );
    }
    return (
      <TextField
        value={val || values[field.name]}
        onChange={onChange}
        label={field.label}
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={[
        styles.form,
        direction === 'horizontal' ? styles.formHorizontal : styles.formVertical
      ].join(' ')}
      noValidate
    >
      <Grid container spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        {fields.map((field) => (
          <Fragment key={field.name}>
            <Grid item xs={field.gridSize || 12}>
              {renderFormField(field)}
            </Grid>
            {field.offset && <Grid item xs={field.offset} />}
          </Fragment>
        ))}
        {!submitOnChange && (submitButton || cancelButton) && (
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
      <ObjectContentInfo obj={watch()} />
    </form>
  );
};

export default Form;
