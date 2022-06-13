export const cutString = (str: string, length: number): string => {
  return length >= str.length ? str : `${str.slice(0, length)}...`;
};
