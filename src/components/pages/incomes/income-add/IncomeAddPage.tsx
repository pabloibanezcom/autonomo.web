import {
  Business,
  Company,
  Income,
  InvoiceProductOrService
} from '@autonomo/common';
import { IntlTypography, PageHeader } from 'components/shared';
import { InvoiceMainInfo, PageProps } from 'interfaces';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography
} from 'material';
import { ExpandMoreIcon } from 'material/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome, selectBusiness } from 'store';
import { updateIncomeTotals } from 'util/invoice';
import IncomeClientSelector from './income-client-selector/IncomeClientSelector';
import IncomeDocumentGenerator from './income-document-generator/IncomeDocumentGenerator';
import IncomeInfo from './income-info/IncomeInfo';
import IncomeProducts from './income-products/IncomeProducts';
import IncomeSummary from './income-summary/IncomeSummary';

type IncomeStep = {
  id: string;
  name: string;
  summary: JSX.Element;
  details: JSX.Element;
};

const IncomeAddPage = ({ title, breadcrumbs }: PageProps) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState<string | false>('client');
  const [income, setIncome] = useState<Income>(null);
  const [currencyRate, setCurrencyRate] = useState<number>(null);
  const business: Business = useSelector(selectBusiness);

  const handleAddIncome = async () => {
    await dispatch(addIncome({ income }));
  };

  const handleClientSelected = (selectedClient: Company) => {
    setIncome((prevIncome) => {
      return { ...prevIncome, client: selectedClient };
    });
    if (selectedClient) setExpanded('incomeInfo');
  };

  const handleIncomeInfoUpdated = (data: InvoiceMainInfo) => {
    setIncome((prevIncome) => {
      return {
        ...prevIncome,
        number: data.number,
        issuedDate: data.issuedDate,
        baseCurrency: data.baseCurrency,
        categories: data.categories
      };
    });
    setCurrencyRate(data.currencyRate);
    if (data) setExpanded('incomeProducts');
  };

  const handleIncomeProductsUpdated = (products: InvoiceProductOrService[]) => {
    setIncome((prevIncome) => {
      return updateIncomeTotals(
        {
          ...prevIncome,
          productsOrServices: products
        },
        business
      );
    });
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const isIncomeCompleted = () => {
    return !!(
      income &&
      income.client &&
      income.number &&
      income.issuedDate &&
      !!income.productsOrServices?.length
    );
  };

  const clientSummary = income?.client && (
    <Typography component="span" className="fw-bold">
      {(income.client as Company).name}
    </Typography>
  );

  const clientDetails = (
    <IncomeClientSelector onClientSelected={handleClientSelected} />
  );

  const incomeInfoSummary = income?.number && (
    <Typography component="span" className="fw-bold">
      {income.number}
    </Typography>
  );

  const incomeInfoDetails = (
    <IncomeInfo
      defaultValues={{
        number: 'INV-003',
        // issuedDate: '2021-06-01T00:00:00.000Z',
        baseCurrency: (income?.client as Company)?.defaultCurrency
      }}
      business={business}
      onIncomeInfoUpdated={handleIncomeInfoUpdated}
    />
  );

  const incomeProductsSummary = income?.productsOrServices?.length && (
    <IntlTypography
      component="span"
      className="fw-bold"
      id={
        income.productsOrServices.length > 1
          ? 'income.add.productsPlural'
          : 'income.add.productsSingular'
      }
      values={{ productsLength: income.productsOrServices.length }}
    />
  );

  const incomeProductsDetails = (
    <IncomeProducts
      incomeProducts={income?.productsOrServices}
      business={business}
      client={income?.client as Company}
      onIncomeProductsUpdated={handleIncomeProductsUpdated}
    />
  );

  const incomeSteps: IncomeStep[] = [
    {
      id: 'client',
      name: 'income.add.client',
      summary: clientSummary,
      details: clientDetails
    },
    {
      id: 'incomeInfo',
      name: 'income.add.incomeInfo',
      summary: incomeInfoSummary,
      details: incomeInfoDetails
    },
    {
      id: 'incomeProducts',
      name: 'income.add.incomeProductsOrServices',
      summary: incomeProductsSummary,
      details: incomeProductsDetails
    }
  ];

  return (
    <div>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            {incomeSteps.map((step) => (
              <Accordion
                key={step.id}
                expanded={expanded === step.id}
                onChange={handleAccordionChange(step.id)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div className="w-100 d-flex justify-content-between me-4">
                    <IntlTypography component="span" id={step.name} />
                    {step.summary}
                  </div>
                </AccordionSummary>
                <AccordionDetails>{step.details}</AccordionDetails>
              </Accordion>
            ))}
            <Accordion expanded={isIncomeCompleted()}>
              <AccordionSummary>
                <div className="w-100 d-flex justify-content-between me-4">
                  <IntlTypography component="span" id="income.add.summary" />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <IncomeSummary income={income} business={business} />
              </AccordionDetails>
            </Accordion>
            <div className="d-flex flex-row-reverse mt-4">
              <Button onClick={handleAddIncome}>Add income</Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <IncomeDocumentGenerator income={income} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default IncomeAddPage;
