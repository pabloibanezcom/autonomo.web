/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseFilter } from '@autonomo/common';
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
  TableRow
} from 'material';
import { VisibilityIcon } from 'material/icons';
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

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {config.columns.map((col) => (
                <TableCell key={col.title}>{col.title}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <TableRow key={i}>
                {config.columns.map((col) => (
                  <TableCell key={col.title}>
                    {formatter(item, col.prop, col.type)}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton component={Link} to={`/invoices/${item._id}/`}>
                    <VisibilityIcon />
                  </IconButton>
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
