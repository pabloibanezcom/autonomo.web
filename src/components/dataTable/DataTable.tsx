/* eslint-disable @typescript-eslint/no-explicit-any */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import formatter from '../../util/formatter';

type DataTableConfig = {
  columns: any[];
};

type DataTableProps = {
  config: DataTableConfig;
  items: any[];
};

const DataTable = ({ config, items }: DataTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {config.columns.map((col) => (
              <TableCell key={col.title}>{col.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.number}>
              {config.columns.map((col) => (
                <TableCell key={col.title}>
                  {formatter(item, col.prop, col.type)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
