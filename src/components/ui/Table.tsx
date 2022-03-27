import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { ReactElement } from 'react';
import { Box } from '@mui/material';

type Props<T> = {
  columns: Array<GridColDef>;
  rows: Array<T>;
};

export const Table = <T,>({ columns, rows }: Props<T>): ReactElement => {
  return (
    <Box component="div" sx={{ width: '100%' }}>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        density="comfortable"
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 50, 100]}
        checkboxSelection
        autoHeight
      />
    </Box>
  );
};
