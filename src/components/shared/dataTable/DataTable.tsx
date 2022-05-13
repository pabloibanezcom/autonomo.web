/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseFilter } from '@autonomo/common';
import { getComponent } from 'components/shared';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from 'material';
import { PictureAsPdf, VisibilityIcon } from 'material/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import formatter from 'util/formatter';

type DataTableConfig = {
  columns: any[];
};

type DataTableProps = {
  config: DataTableConfig;
  items: any[];
  searchFilter?: BaseFilter;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSearchFilterChange?: Function;
};

const DataTable = ({
  config,
  searchFilter,
  items,
  onSearchFilterChange
}: DataTableProps) => {
  const handlePageChange = (event: any, newPage: number) => {
    onSearchFilterChange({
      ...searchFilter,
      pagination: { ...searchFilter.pagination, page: newPage + 1 }
    });
  };

  const handleRowsPerPageChange = (event: any) => {
    onSearchFilterChange({
      ...searchFilter,
      pagination: {
        ...searchFilter.pagination,
        page: 1,
        items: event.target.value
      }
    });
  };

  const renderCustomComponent = (item: any, col: any): JSX.Element => {
    if (col.component) {
      const CustomComponent = getComponent(col.component);
      return (
        <CustomComponent {...{ [col.componentPropName]: item[col.prop] }} />
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {config.columns.map((col) => (
                <TableCell key={col.title} align={col.align}>
                  {col.title}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i}>
                {config.columns.map((col) => (
                  <TableCell key={col.title} align={col.align}>
                    {col.component
                      ? renderCustomComponent(item, col)
                      : formatter(item, col.prop, col.type)}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="d-flex justify-content-end">
                    <Tooltip title="Show invoice pdf">
                      <IconButton>
                        <PictureAsPdf />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="See invoice details">
                      <IconButton component={Link} to={`/incomes/${item._id}/`}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {searchFilter?.pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchFilter.pagination.totalItems}
          rowsPerPage={searchFilter.pagination.items}
          page={searchFilter.pagination.page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </Box>
  );
};

export default DataTable;
