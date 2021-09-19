/* eslint-disable @typescript-eslint/no-explicit-any */
const formatDate = (item: any, prop: any): string => {
  const date = new Date(item[prop]);
  return date.toLocaleDateString('es-ES');
};

const formatCurrency = (item: any, prop: any): string => {
  const currencyFormatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: item[prop[1]]
  });
  return currencyFormatter.format(item[prop[0]]);
};

const formatter = (item: any, prop: any, type: string): any => {
  if (type === 'date') {
    return formatDate(item, prop);
  }
  if (type === 'currency') {
    return formatCurrency(item, prop);
  }
  return item[prop];
};

export default formatter;
