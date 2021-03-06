/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface BaseElementProps {
  label?: string;
  name?: string;
  className?: string;
  value?: any;
  onChange?: any;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}
