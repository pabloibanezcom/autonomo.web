import { Invoice, InvoiceFilter } from '@autonomo/common';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataTable, PageHeader, Panel } from 'components/shared';
import { PageProps } from 'interfaces';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  searchInvoices,
  selectInvoices,
  selectInvoicesSearchFilter
} from 'store';
import invoicesTableConfig from './invoices.table.json';

const IncomesPage = ({ title, breadcrumbs }: PageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const searchFilter: InvoiceFilter = useSelector(selectInvoicesSearchFilter);
  const invoices: Invoice[] = useSelector(selectInvoices);

  useEffect(() => {
    dispatch(searchInvoices({ filter: null }));
  }, [dispatch]);

  const handleSearchFilterChange = (newSearchFilter: InvoiceFilter) => {
    dispatch(searchInvoices({ filter: newSearchFilter }));
  };

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
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <Panel title="Invoices" toolBox={toolBox} zeroPadding>
        <DataTable
          config={invoicesTableConfig}
          items={invoices}
          searchFilter={searchFilter}
          onSearchFilterChange={handleSearchFilterChange}
        />
      </Panel>
    </div>
  );
};

export default IncomesPage;
