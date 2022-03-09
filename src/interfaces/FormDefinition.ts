interface FormField {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
}

interface FormButton {
  text: string;
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
}

export default interface FormDefinition {
  fields: FormField[];
  submitButton?: FormButton;
  direction?: string;
}
