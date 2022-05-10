/* eslint-disable @typescript-eslint/no-explicit-any */
import { Business, Currency, getExchangeRate } from '@autonomo/common';
import { Form } from 'components/shared';
import { FormField, InvoiceMainInfo } from 'interfaces';
import React, { useState } from 'react';
import incomeInfoFormDefinition from './incomeInfo.form.json';

type IncomeInfoProps = {
  defaultValues?: {
    number?: string;
    issuedDate?: string;
    baseCurrency?: Currency;
  };
  business?: Business;
  onIncomeInfoUpdated?: (data: InvoiceMainInfo) => void;
};

const currencyRateField: FormField = {
  name: 'exchangeRate',
  label: 'GBP/EUR',
  required: true,
  gridSize: 4,
  setAfter: 'baseCurrency',
  pattern: {
    regex: 'amountTwoDigits',
    message: 'Invalid currency format'
  }
};

const IncomeInfo = ({
  defaultValues,
  business,
  onIncomeInfoUpdated
}: IncomeInfoProps) => {
  const [extraFields, setExtraFields] = useState<FormField[]>([]);
  const [values, setValues] = useState<{
    [Key: string]: any;
  }>({});

  const handleSubmit = (data: InvoiceMainInfo) => {
    onIncomeInfoUpdated(data);
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    if (fieldName === 'baseCurrency') {
      if (value !== business.defaultCurrency) {
        setExtraFields([
          {
            ...currencyRateField,
            label: `${value}/${business.defaultCurrency}`
          }
        ]);
        setValues({
          exchangeRate: getExchangeRate(
            business.exchangeRates,
            value,
            business.defaultCurrency
          )?.rate
        });
      } else {
        setExtraFields([]);
        setValues({});
      }
    }
  };

  return (
    <div>
      <Form
        formDefinition={incomeInfoFormDefinition}
        extraFields={extraFields}
        defaultValues={defaultValues}
        values={values}
        onSubmit={handleSubmit}
        onFieldChange={handleFieldChange}
      />
    </div>
  );
};

export default IncomeInfo;
