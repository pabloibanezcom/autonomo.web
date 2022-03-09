import { SerializedError } from '@reduxjs/toolkit';

const DEFAULT_ERROR_MESSAGE = 'Request failed with status code ';

const findErrorCodeInMessage = (message: string): string => {
  if (message.includes(DEFAULT_ERROR_MESSAGE)) {
    return message.replace(DEFAULT_ERROR_MESSAGE, '');
  }
  return null;
};

export const simplifyError = (error: SerializedError): SerializedError => {
  return {
    message: error.message,
    code: findErrorCodeInMessage(error.message)
  };
};
