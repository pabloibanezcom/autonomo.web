import { Business, Income } from '@autonomo/common';
import { CurrencyText, IntlTypography } from 'components/shared';
import { Typography } from 'material';
import React from 'react';

type IncomeSummaryProps = {
  income?: Income;
  business?: Business;
};

const IncomeSummary = ({ income, business }: IncomeSummaryProps) => {
  return income?.total ? (
    <div className="me-5">
      <div className="w-100 d-flex justify-content-between mb-2">
        <IntlTypography component="span" id="income.add.subtotal" />
        <Typography component="span">
          <CurrencyText
            value={income.subtotalBaseCurrency || income.subtotal}
          />
        </Typography>
      </div>
      <div className="w-100 d-flex justify-content-between mb-2">
        <IntlTypography component="span" id="income.add.tax" />
        <Typography component="span">
          <CurrencyText value={income.taxBaseCurrency || income.tax} />
        </Typography>
      </div>
      <div className="w-100 d-flex justify-content-between mb-2">
        <IntlTypography
          component="span"
          id="income.add.totalWithCurrency"
          values={{ currency: income.baseCurrency }}
        />
        <Typography component="span" className="fw-bold">
          <CurrencyText value={income.totalBaseCurrency || income.total} />
        </Typography>
      </div>
      {income.totalBaseCurrency && (
        <div className="w-100 d-flex justify-content-between mb-2">
          <IntlTypography
            component="span"
            id="income.add.totalWithCurrency"
            values={{ currency: business.defaultCurrency }}
          />
          <Typography component="span" className="fw-bold">
            <CurrencyText value={income.total} />
          </Typography>
        </div>
      )}
    </div>
  ) : null;
};

export default IncomeSummary;
