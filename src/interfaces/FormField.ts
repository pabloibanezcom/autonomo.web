/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridSize } from 'material/interfaces';

interface FormFieldOptions {
  label: string;
  value: unknown;
}

export default interface FormField {
  name: string;
  element?: string;
  elementProps?: unknown;
  options?: FormFieldOptions[];
  label: string;
  type?: string;
  required?: boolean;
  gridSize?: boolean | GridSize;
  offset?: GridSize;
  listenOnChange?: boolean;
  setAfter?: string;
  value?: any;
  pattern?: {
    regex: string;
    message: string;
  };
}
