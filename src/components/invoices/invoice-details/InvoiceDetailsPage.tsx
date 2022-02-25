import { Invoice } from '@autonomo/common';
import { PageHeader } from 'components/shared';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInvoice, selectInvoice } from 'store';

const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const invoice: Invoice = useSelector(selectInvoice);

  useEffect(() => {
    dispatch(getInvoice({ id }));
  }, [dispatch, id]);

  const breadcrumbs = [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Invoices',
      href: '/invoices'
    },
    {
      text: 'Details'
    }
  ];

  return (
    <div>
      <PageHeader
        title={`Invoice #${invoice?.number}`}
        breadcrumbs={breadcrumbs}
      />
      <div>Invoice number: {invoice?.number}</div>;
    </div>
  );
};

export default InvoiceDetailsPage;
