/* eslint-disable @typescript-eslint/ban-types */
import { FormDefinition } from 'interfaces';
import { Alert, Button, TextField } from 'material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './form.module.scss';

type FormProps = {
  formDefinition: FormDefinition;
  error?: string;
  onSubmit?: Function;
};

const Form = ({
  formDefinition: { fields, submitButton, direction },
  error,
  onSubmit
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit(data);
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
      {error && <Alert severity="error">{error}</Alert>}
      {fields.map((field) => (
        <TextField
          key={field.name}
          type={field.type}
          fullWidth={field.fullWidth}
          label={field.label}
          error={!!errors[field.name]}
          helperText={errors[field.name] && `${field.label} is required`}
          {...register(field.name, { required: field.required })}
        />
      ))}
      {submitButton && (
        <Button
          type="submit"
          fullWidth={submitButton.fullWidth}
          variant={submitButton.variant || 'contained'}
        >
          {submitButton.text}
        </Button>
      )}
    </form>
  );
};

export default Form;
