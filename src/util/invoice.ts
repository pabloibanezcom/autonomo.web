import {
  Business,
  CurrencyAmount,
  getExchangeRate,
  Income,
  Invoice,
  InvoiceProductOrService,
  Money
} from '@autonomo/common';

const calculateCurrencyAmountSum = (invoice: Invoice, prop: string): number => {
  return invoice.productsOrServices.reduce((a, b) => {
    const currencyAmount = b[
      prop as keyof InvoiceProductOrService
    ] as CurrencyAmount;
    return a + currencyAmount.amount;
  }, 0);
};

const updateInvoiceTotals = (invoice: Invoice, business: Business): Invoice => {
  let subtotal: CurrencyAmount;
  let tax: CurrencyAmount;
  let total: CurrencyAmount;
  let subtotalBaseCurrency: CurrencyAmount = {
    currency: invoice.baseCurrency,
    amount: calculateCurrencyAmountSum(invoice, 'subtotal')
  };
  let taxBaseCurrency: CurrencyAmount = {
    currency: invoice.baseCurrency,
    amount: calculateCurrencyAmountSum(invoice, 'tax')
  };
  let totalBaseCurrency: CurrencyAmount = {
    currency: invoice.baseCurrency,
    amount: calculateCurrencyAmountSum(invoice, 'total')
  };

  if (invoice.baseCurrency !== business.defaultCurrency) {
    const exchangeRate = getExchangeRate(
      business.exchangeRates,
      invoice.baseCurrency,
      business.defaultCurrency
    );
    subtotal = Money.exchange(subtotalBaseCurrency, exchangeRate);
    tax = Money.exchange(taxBaseCurrency, exchangeRate);
    total = Money.exchange(totalBaseCurrency, exchangeRate);
  } else {
    subtotal = subtotalBaseCurrency;
    subtotalBaseCurrency = undefined;
    tax = taxBaseCurrency;
    taxBaseCurrency = undefined;
    total = totalBaseCurrency;
    totalBaseCurrency = undefined;
  }

  return {
    ...invoice,
    subtotal,
    subtotalBaseCurrency,
    tax,
    taxBaseCurrency,
    total,
    totalBaseCurrency
  };
};

export const updateIncomeTotals = (
  income: Income,
  business: Business
): Income => {
  return { ...updateInvoiceTotals(income, business), client: income.client };
};
