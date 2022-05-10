import { FieldPattern, FormField } from 'interfaces';
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
