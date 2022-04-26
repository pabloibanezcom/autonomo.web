import FormButton from './FormButton';
import FormField from './FormField';

export default interface FormDefinition {
  fields: FormField[];
  submitButton?: FormButton;
  cancelButton?: FormButton;
  direction?: string;
}
