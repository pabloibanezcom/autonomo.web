/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyFilter } from '@autonomo/common';
import { IntlTypography, Selector, TextField } from 'components/shared';
import { Accordion, AccordionDetails, AccordionSummary, Chip } from 'material';
import { ExpandMoreIcon, FilterListIcon } from 'material/icons';
import React from 'react';

type FilterField = {
  type: string;
  label: string;
  prop?: string;
  items?: any[];
};

type FilterBarProps = {
  searchFilter: CompanyFilter;
  sortByItems?: {
    label: string;
    value: string;
  }[];
  filterFields?: FilterField[];
  filterSummary?: {
    label: JSX.Element;
  }[];
  onChange: (searchFilter: CompanyFilter) => void;
};

const FilterBar = ({
  searchFilter,
  sortByItems,
  filterFields,
  filterSummary,
  onChange
}: FilterBarProps) => {
  const handleFilterChange = (newObj: any) => {
    onChange({
      ...searchFilter,
      pagination: {
        ...searchFilter.pagination,
        page: 0
      },
      ...newObj
    });
  };

  const handleSearchChange = (prop: string, val: string) => {
    const fireChange = () => {
      onChange({
        ...searchFilter,
        pagination: {
          ...searchFilter.pagination,
          page: 0
        },
        match: val.length > 2 ? { prop, str: val } : undefined
      });
    };

    if (val.length > 2 || searchFilter.match) {
      fireChange();
    }
  };

  const handleSelectorChange = (prop: string, val: string) => {
    onChange({
      ...searchFilter,
      pagination: {
        ...searchFilter.pagination,
        page: 0
      },
      [prop]: val !== 'any' ? val : undefined
    });
  };

  const handleSortChange = (val: string) => {
    handleFilterChange({
      sorting: {
        sortBy: val
      }
    });
  };

  const renderField = (field: FilterField): JSX.Element => {
    if (field.type === 'search') {
      return (
        <TextField
          label={
            field.label?.includes && field.label.includes('.') ? (
              <IntlTypography id={field.label} />
            ) : (
              field.label
            )
          }
          onChange={(val: string) => handleSearchChange(field.prop, val)}
          fullWidth={false}
          clearButton
        />
      );
    }
    if (field.type === 'selector') {
      return (
        <Selector
          label={field.label}
          items={field.items}
          onChange={(val: string) => handleSelectorChange(field.prop, val)}
        />
      );
    }
    return null;
  };

  return (
    <div className="mb-4">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="w-100 d-flex justify-content-between align-items-center me-4">
            <div className="d-flex flex-row align-items-center">
              <FilterListIcon />
              <IntlTypography
                component="span"
                className="fw-bold ms-2"
                id="filterBar.filters"
              />
            </div>
            <div className="d-flex flex-row gap-2">
              {filterSummary.map((fEl, i) => (
                <Chip
                  key={i}
                  variant="outlined"
                  color="primary"
                  label={fEl.label}
                />
              ))}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="d-flex justify-content-between">
            {' '}
            <div className="d-flex gap-4">
              {filterFields.map((field, i) => (
                <React.Fragment key={i}>{renderField(field)}</React.Fragment>
              ))}
            </div>
            {sortByItems && (
              <div>
                <Selector
                  label="filterBar.sortBy"
                  items={sortByItems}
                  onChange={handleSortChange}
                />
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterBar;
