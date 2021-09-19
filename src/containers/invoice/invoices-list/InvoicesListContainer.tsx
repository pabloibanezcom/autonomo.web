import { Invoice } from '@autonomo/common';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FilterListIcon from '@material-ui/icons/FilterList';
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
