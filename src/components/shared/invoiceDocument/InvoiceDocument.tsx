import { Invoice } from '@autonomo/common';
import { Paper, Typography } from 'material';
import React from 'react';
import styles from './invoiceDocument.module.scss';

type InvoiceDocumentProps = {
  invoice: Invoice;
  zoom?: number;
};

const InvoiceDocument = ({ invoice, zoom }: InvoiceDocumentProps) => {
  return (
    <Paper sx={{ zoom }} className={styles.invoiceDocument}>
      <Typography variant="h4">Invoice / Factura</Typography>
      <div>{invoice?.number}</div>
    </Paper>
  );
};

export default InvoiceDocument;
