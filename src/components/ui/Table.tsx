import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { ReactElement } from 'react';
import { Box } from '@mui/material';

type Props = {
  columns: Array<GridColDef>;
  rows: Array<any>;
};

export const Table = ({ columns, rows }: Props): ReactElement => {
  return (
    <Box component="div" sx={{ width: '100%' }}>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10, 50, 100]}
        checkboxSelection
        autoHeight
      />
    </Box>
  );
};
