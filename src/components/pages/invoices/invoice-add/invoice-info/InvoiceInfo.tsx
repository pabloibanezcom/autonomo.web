/* eslint-disable @typescript-eslint/no-explicit-any */
import { Business, Currency } from '@autonomo/common';
import { Form } from 'components/shared';
import { FormField, InvoiceMainInfo } from 'interfaces';
import React, { useState } from 'react';
import { getExchangeRate } from 'util/currency';
import invoiceInfoFormDefinition from './invoiceInfo.form.json';

type InvoiceInfoProps = {
  defaultValues?: {
    number?: string;
    issuedDate?: string;
    baseCurrency?: Currency;
  };
  business?: Business;
  onInvoiceInfoUpdated?: (data: InvoiceMainInfo) => void;
};

const currencyRateField: FormField = {
  name: 'currencyRate',
  label: 'GBP/EUR',
  required: true,
  gridSize: 4,
  setAfter: 'baseCurrency',
  pattern: {
    regex: 'amountTwoDigits',
    message: 'Invalid currency format'
  }
};

const InvoiceInfo = ({
  defaultValues,
  business,
  onInvoiceInfoUpdated
}: InvoiceInfoProps) => {
  const [extraFields, setExtraFields] = useState<FormField[]>([]);
  const [values, setValues] = useState<{
    [Key: string]: any;
  }>({});

  const handleSubmit = (data: InvoiceMainInfo) => {
    onInvoiceInfoUpdated(data);
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
          currencyRate: getExchangeRate(
            business.exchangeRates,
            value,
            business.defaultCurrency
          )
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
        formDefinition={invoiceInfoFormDefinition}
        extraFields={extraFields}
        defaultValues={defaultValues}
        values={values}
        onSubmit={handleSubmit}
        onFieldChange={handleFieldChange}
      />
    </div>
  );
};

export default InvoiceInfo;
