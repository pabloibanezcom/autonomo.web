import {
  Business,
  Company,
  Invoice,
  InvoiceProductOrService
} from '@autonomo/common';
import { IntlTypography, PageHeader } from 'components/shared';
import { InvoiceMainInfo, PageProps } from 'interfaces';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography
} from 'material';
import { ExpandMoreIcon } from 'material/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBusiness } from 'store';
import { updateInvoiceTotals } from 'util/invoice';
import InvoiceClientSelector from './invoice-client-selector/InvoiceClientSelector';
import InvoiceDocumentGenerator from './invoice-document-generator/InvoiceDocumentGenerator';
import InvoiceInfo from './invoice-info/InvoiceInfo';
import InvoiceProducts from './invoice-products/InvoiceProducts';
import InvoiceSummary from './invoice-summary/InvoiceSummary';

type InvoiceStep = {
  id: string;
  name: string;
  summary: JSX.Element;
  details: JSX.Element;
};

const InvoiceAddPage = ({ title, breadcrumbs }: PageProps) => {
  const [expanded, setExpanded] = useState<string | false>('client');
  const [invoice, setInvoice] = useState<Invoice>(null);
  const [currencyRate, setCurrencyRate] = useState<number>(null);
  const business: Business = useSelector(selectBusiness);

  const handleClientSelected = (selectedClient: Company) => {
    setInvoice((prevInvoice) => {
      return { ...prevInvoice, issuerOrClient: selectedClient };
    });
    if (selectedClient) setExpanded('invoiceInfo');
  };

  const handleInvoiceInfoUpdated = (data: InvoiceMainInfo) => {
    console.log(data);
    setInvoice((prevInvoice) => {
      return {
        ...prevInvoice,
        number: data.number,
        issuedDate: data.issuedDate,
        baseCurrency: data.baseCurrency,
        categories: data.categories
      };
    });
    setCurrencyRate(data.currencyRate);
    if (data) setExpanded('invoiceProducts');
  };

  const handleInvoiceProductsUpdated = (
    products: InvoiceProductOrService[]
  ) => {
    setInvoice((prevInvoice) => {
      return updateInvoiceTotals({
        ...prevInvoice,
        productsOrServices: products
      });
    });
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const isInvoiceCompleted = () => {
    return !!(
      invoice &&
      invoice.issuerOrClient &&
      invoice.number &&
      invoice.issuedDate &&
      !!invoice.productsOrServices?.length
    );
  };

  const clientSummary = invoice?.issuerOrClient && (
    <Typography component="span" className="fw-bold">
      {(invoice.issuerOrClient as Company).name}
    </Typography>
  );

  const clientDetails = (
    <InvoiceClientSelector onClientSelected={handleClientSelected} />
  );

  const invoiceInfoSummary = invoice?.number && (
    <Typography component="span" className="fw-bold">
      {invoice.number}
    </Typography>
  );

  const invoiceInfoDetails = (
    <InvoiceInfo
      defaultValues={{
        number: 'INV-003',
        // issuedDate: '2021-06-01T00:00:00.000Z',
        baseCurrency: (invoice?.issuerOrClient as Company)?.defaultCurrency
      }}
      business={business}
      onInvoiceInfoUpdated={handleInvoiceInfoUpdated}
    />
  );

  const invoiceProductsSummary = invoice?.productsOrServices?.length && (
    <IntlTypography
      component="span"
      className="fw-bold"
      id={
        invoice.productsOrServices.length > 1
          ? 'invoice.add.productsPlural'
          : 'invoice.add.productsSingular'
      }
      values={{ productsLength: invoice.productsOrServices.length }}
    />
  );

  const invoiceProductsDetails = (
    <InvoiceProducts
      invoiceProducts={invoice?.productsOrServices}
      onInvoiceProductsUpdated={handleInvoiceProductsUpdated}
    />
  );

  const invoiceSteps: InvoiceStep[] = [
    {
      id: 'client',
      name: 'invoice.add.client',
      summary: clientSummary,
      details: clientDetails
    },
    {
      id: 'invoiceInfo',
      name: 'invoice.add.invoiceInfo',
      summary: invoiceInfoSummary,
      details: invoiceInfoDetails
    },
    {
      id: 'invoiceProducts',
      name: 'invoice.add.invoiceProductsOrServices',
      summary: invoiceProductsSummary,
      details: invoiceProductsDetails
    }
  ];

  return (
    <div>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            {invoiceSteps.map((step) => (
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
            <Accordion expanded={isInvoiceCompleted()}>
              <AccordionSummary>
                <div className="w-100 d-flex justify-content-between me-4">
                  <IntlTypography component="span" id="invoice.add.summary" />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <InvoiceSummary invoice={invoice} />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={6}>
            <InvoiceDocumentGenerator invoice={invoice} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default InvoiceAddPage;
