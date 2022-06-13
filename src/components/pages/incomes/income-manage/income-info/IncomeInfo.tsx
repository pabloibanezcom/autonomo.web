/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Business,
  Category,
  Company,
  Currency,
  getExchangeRate,
  Income
} from '@autonomo/common';
import { Form } from 'components/shared';
import { FormField, InvoiceMainInfo } from 'interfaces';
import { useEffect, useState } from 'react';
import { addFieldToFormDefinition } from 'util/form';
import incomeInfoFormDefinition from './incomeInfo.form.json';

type IncomeInfoProps = {
  business: Business;
  income: Income;
  onIncomeInfoUpdated?: (data: InvoiceMainInfo) => void;
};

type FormValues = {
  number: string;
  issuedDate: Date;
  baseCurrency: Currency;
  categories: Category[];
  exchangeRate?: number;
};

const currencyRateField: FormField = {
  name: 'exchangeRate',
  label: '',
  required: true,
  gridSize: 4,
  pattern: {
    regex: 'amountTwoDigits',
    message: 'Invalid currency format'
  }
};

const ADD_AFTER_NAME = 'baseCurrency';

const createFormValues = (business: Business, income: Income): FormValues => {
  return {
    number: income.number,
    issuedDate: income.issuedDate,
    baseCurrency:
      (income.client as Company)?.defaultCurrency || business.defaultCurrency,
    categories: (income.categories as Category[]) || []
  };
};

const IncomeInfo = ({
  business,
  income,
  onIncomeInfoUpdated
}: IncomeInfoProps) => {
  const [formDefinition, setFormDefinition] = useState(null);
  const [values, setValues] = useState<FormValues>(null);

  useEffect(() => {
    const clientCurrency = (income.client as Company)?.defaultCurrency;
    if (clientCurrency && clientCurrency !== business.defaultCurrency) {
      setFormDefinition(
        addFieldToFormDefinition(
          incomeInfoFormDefinition,
          {
            ...currencyRateField,
            label: `${clientCurrency}/${business.defaultCurrency}`
          },
          ADD_AFTER_NAME
        )
      );
      setValues({
        ...createFormValues(business, income),
        exchangeRate: getExchangeRate(
          business.exchangeRates,
          clientCurrency,
          business.defaultCurrency
        )?.rate
      });
    } else {
      setFormDefinition(incomeInfoFormDefinition);
      setValues(createFormValues(business, income));
    }
  }, [business, income]);

  return (
    <div>
      {formDefinition && values && (
        <Form
          formDefinition={formDefinition}
          values={values}
          submitOnChange
          onSubmit={onIncomeInfoUpdated}
        />
      )}
    </div>
  );
};

export default IncomeInfo;
