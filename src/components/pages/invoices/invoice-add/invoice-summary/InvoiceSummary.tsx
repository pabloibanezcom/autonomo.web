import { Invoice } from '@autonomo/common';
import { IntlTypography } from 'components/shared';
import { Typography } from 'material';
import React from 'react';

type InvoiceSummaryProps = {
  invoice?: Invoice;
};

const InvoiceSummary = ({ invoice }: InvoiceSummaryProps) => {
  return (
    <div className="me-5">
      <div className="w-100 d-flex justify-content-between mb-2">
        <IntlTypography id="invoice.add.base" />
        <Typography component="span">£11,640.00</Typography>
      </div>
      <div className="w-100 d-flex justify-content-between mb-2">
        <IntlTypography id="invoice.add.totalWithCurrency" />
        <Typography component="span" className="fw-bold">
          £11,640.00
        </Typography>
      </div>
      <div className="w-100 d-flex justify-content-between mb-2">
        <IntlTypography id="invoice.add.totalWithCurrency" />
        <Typography component="span" className="fw-bold">
          13.386,00€
        </Typography>
      </div>
    </div>
  );
};

export default InvoiceSummary;
