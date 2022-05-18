import { FieldPattern, FormDefinition, FormField } from 'interfaces';
import regex from './regex';

export const getPatternByElement = (field: FormField): FieldPattern => {
  if (field.element === 'currencyAmount') {
    return {
      value: regex.amountTwoDigits,
      message: 'Invalid amount'
    };
  }
  return field.pattern
    ? {
        value: regex[field.pattern.regex],
        message: field.pattern.message
      }
    : undefined;
};

export const addFieldToFormDefinition = (
  formDefinition: FormDefinition,
  field: FormField,
  addAfter: string
): FormDefinition => {
  const addFieldToFieldArray = (
    arr: FormField[],
    index: number
  ): FormField[] => [...arr.slice(0, index), field, ...arr.slice(index)];

  const addAfterIndex =
    formDefinition.fields.map((f) => f.name).indexOf(addAfter) + 1;

  return {
    ...formDefinition,
    fields: addFieldToFieldArray(formDefinition.fields, addAfterIndex)
  };
};
