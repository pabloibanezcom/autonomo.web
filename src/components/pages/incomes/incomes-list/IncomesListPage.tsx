import { Income, IncomeFilter } from '@autonomo/common';
import { DataTable, PageHeader, Panel } from 'components/shared';
import { PageProps } from 'interfaces';
import { IconButton, Tooltip } from 'material';
import { FilterListIcon } from 'material/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  return (
    <div>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        newItemButton={{
          labelId: 'incomes.list.newIncome',
          href: '/incomes/new'
        }}
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
