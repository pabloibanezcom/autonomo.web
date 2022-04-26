export const AMOUNT_TWO_DIGITS = /^(?![.0]*$)\d+\.\d{2}$/i;

const regex: { [key: string]: RegExp } = {
  amountTwoDigits: AMOUNT_TWO_DIGITS
};

export default regex;
