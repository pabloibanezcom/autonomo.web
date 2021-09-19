/* eslint-disable @typescript-eslint/no-explicit-any */
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
