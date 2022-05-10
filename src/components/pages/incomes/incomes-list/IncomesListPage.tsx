import { Income, IncomeFilter } from '@autonomo/common';
import { DataTable, PageHeader, Panel } from 'components/shared';
import { PageProps } from 'interfaces';
import { Button, IconButton, Tooltip } from 'material';
import { AddIcon, FilterListIcon } from 'material/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearIncomes,
  searchIncomes,
  selectIncomes,
  selectIncomesSearchFilter
} from 'store';
import incomesTableConfig from './incomes.table.json';

const IncomesPage = ({ title, breadcrumbs }: PageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const searchFilter: IncomeFilter = useSelector(selectIncomesSearchFilter);
  const incomes: Income[] = useSelector(selectIncomes);

  useEffect(() => {
    dispatch(searchIncomes({ filter: null }));

    return () => {
      dispatch(clearIncomes());
    };
  }, [dispatch]);

  const handleSearchFilterChange = (newSearchFilter: IncomeFilter) => {
    dispatch(searchIncomes({ filter: newSearchFilter }));
  };

  const toolBox = (
    <div>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </div>
  );

  const newIncomeButton = (
    <Button
      size="small"
      startIcon={<AddIcon />}
      component={Link}
      to="/incomes/new"
    >
      New income
    </Button>
  );

  return (
    <div>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        rightContent={newIncomeButton}
      />
      <Panel title="Incomes" toolBox={toolBox} zeroPadding>
        <DataTable
          config={incomesTableConfig}
          items={incomes}
          searchFilter={searchFilter}
          onSearchFilterChange={handleSearchFilterChange}
        />
      </Panel>
    </div>
  );
};

export default IncomesPage;
