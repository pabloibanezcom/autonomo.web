import { Invoice } from '@autonomo/common';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../../components/dataTable/DataTable';
import PageHeader from '../../../components/pageHeader/PageHeader';
import Panel from '../../../components/panel/Panel';
import api from '../../../http';
import invoicesTableConfig from './invoices.table.json';

const breadcrumbs = [
  {
    text: 'Home',
    href: '/'
  },
  {
    text: 'Invoices'
  }
];

const InvoicesListContainer = () => {
  const [invoices, setInvoices] = useState<Invoice[] | []>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoicesRes = await api.invoice.getInvoices();
      if (invoicesRes?.data) {
        setInvoices(invoicesRes.data);
      }
    };

    fetchInvoices();
  }, []);

  const toolBox = (
    <div>
      <Tooltip title="Add invoice">
        <IconButton
          color="primary"
          aria-label="Add invoice"
          component={Link}
          to="/invoices/new"
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <div>
      <PageHeader title="Invoices" breadcrumbs={breadcrumbs} />
      <Panel title="Invoices" toolBox={toolBox} zeroPadding>
        <DataTable config={invoicesTableConfig} items={invoices} />
      </Panel>
    </div>
  );
};

export default InvoicesListContainer;
