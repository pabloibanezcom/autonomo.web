/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyFilter, Person, PersonFilter } from '@autonomo/common';
import {
  CountryLabel,
  FilterBar,
  PageHeader,
  PersonCard
} from 'components/shared';
import { PageProps } from 'interfaces';
import { TablePagination } from 'material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPeople, selectPeople, selectPersonFilter } from 'store';
import filterConfig from './filter.config.json';

const PeopleListPage = ({ title, breadcrumbs }: PageProps) => {
  const dispatch = useDispatch();
  const searchFilter: PersonFilter = useSelector(selectPersonFilter);
  const people: Person[] = useSelector(selectPeople);

  useEffect(() => {
    dispatch(searchPeople({ filter: searchFilter }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleItemsNumberChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(
      searchPeople({
        filter: {
          ...searchFilter,
          pagination: {
            ...searchFilter.pagination,
            page: 0,
            items: Number(event.target.value)
          }
        }
      })
    );
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    dispatch(
      searchPeople({
        filter: {
          ...searchFilter,
          pagination: {
            ...searchFilter.pagination,
            page
          }
        }
      })
    );
  };

  const handleSearchFilterChange = (_searchFilter: CompanyFilter) => {
    dispatch(searchPeople({ filter: _searchFilter }));
  };

  const generateCountryFieldItem = (item: any) => {
    if (item.countryCode) {
      return {
        label: <CountryLabel code={item.countryCode} flag />,
        value: item.countryCode
      };
    }
    return item;
  };

  const generateFields = () => {
    return filterConfig.fields.map((field) => {
      if (field.prop === 'country') {
        return {
          ...field,
          items: field.items.map((item) => generateCountryFieldItem(item))
        };
      }
      return field;
    });
  };

  const generateFilterSummary = () => {
    const items = [];
    // if (searchFilter.country) {
    //   items.push({ label: <CountryLabel code={searchFilter.country} flag /> });
    // }
    if (searchFilter.match) {
      items.push({ label: <span>&quot;{searchFilter.match.str}&quot;</span> });
    }
    return items;
  };

  return (
    <div>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        newItemButton={{
          labelId: 'people.list.newPerson',
          href: '/person/new'
        }}
      />
      <FilterBar
        searchFilter={searchFilter}
        sortByItems={filterConfig.sortByItems}
        filterFields={generateFields()}
        filterSummary={generateFilterSummary()}
        onChange={handleSearchFilterChange}
      />
      <ul className="grid-fill-sm">
        {people.map((p) => (
          <li key={p._id.toString()}>
            <PersonCard person={p} />
          </li>
        ))}
      </ul>
      {searchFilter && (
        <TablePagination
          component="div"
          className="mt-2"
          count={searchFilter.pagination.totalItems || 0}
          showFirstButton
          showLastButton
          rowsPerPageOptions={[12, 24, 36]}
          page={searchFilter.pagination.page}
          rowsPerPage={searchFilter.pagination.items}
          onRowsPerPageChange={handleItemsNumberChange}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PeopleListPage;
