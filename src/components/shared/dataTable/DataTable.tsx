/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseFilter } from '@autonomo/common';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link } from 'react-router-dom';
import formatter from 'util/formatter';

type DataTableConfig = {
  columns: any[];
};

type DataTableProps = {
  config: DataTableConfig;
  searchFilter: BaseFilter;
  items: any[];
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
